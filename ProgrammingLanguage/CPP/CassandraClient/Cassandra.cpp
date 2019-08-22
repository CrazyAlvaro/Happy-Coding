/*********************************************************************************
 * File:   Cassandra.cpp
 * Author: Yechen Huang
 * Email:  yechen.huang@cision.com
 * Date:   05/06/15
 *
 * Desc:   cassandra client wrapper of DataStax CPP-DRIVE source file
 *
 * Copyright 2015 Cision. All rights reserved.
 ********************************************************************************/

#include "Cassandra.h"

/***********************************************************************
 *
 *  Constructor
 *  variables, contact_points: "127.0.0.1,127.0.0.2,127.0.0.3"
 *
 ***********************************************************************/
Cassandra::Cassandra(const char* contact_points) : _cluster(NULL), _session(NULL), _cass_value_column_name("value") {
    //_app = &Application::instance();
    _cluster = this->create_cluster(contact_points);
    _session = cass_session_new();

    if (this->connect_session(_session, _cluster) != CASS_OK) {
        //_app->logger().information(":: INFO :: Cassandra::Cassandra:: Fail to connect to Cassandra.");
    }
}

/***********************************************************************
 *
 *  Desctuctor
 *
 ***********************************************************************/
Cassandra::~Cassandra() {
    //_app->logger().information(":: INFO :: Cassandra :: ~Cassandra :: Destructor being called");

    if (_session) {
        /* close connect session */
        CassFuture* future = cass_session_close(_session);
        cass_future_wait(future);
        cass_future_free(future);
        cass_session_free(_session);
    }

    if (_cluster) {
        cass_cluster_free(_cluster);
    }
}

/***********************************************************************
 *
 *  Execute Query
 *
 ***********************************************************************/
CassError Cassandra::execute_query(const char* query, CassFuture* &future_result){
    CassError rc = CASS_OK;
    CassStatement* statement = cass_statement_new(query, 0);

    assert(_session != NULL);
    future_result = cass_session_execute(_session, statement);
    cass_future_wait(future_result);

    rc = cass_future_error_code(future_result);
    if (rc != CASS_OK) {
        print_error(future_result);
    }

    cass_statement_free(statement);
    return rc;
}

/***********************************************************************
 *
 *  read_key_value
 *
 ***********************************************************************/
int Cassandra::read_key_value(const string& key, string& value) {

    int rc = 0;
    CassFuture* future_result = NULL;

    // read query: SELECT * FROM viralheat.stats WHERE key = 'STATUVTOTALVIDEOS:69423:2015-04-06';
    string query_string = "SELECT " + _cass_value_column_name +" FROM viralheat.stats WHERE key = \'" + key + "\';";
    const char* query = query_string.c_str();

    if (this->execute_query(query, future_result) == CASS_OK ){
        rc = this->process_query_result(future_result, value);
    } else {
        value = "";
        rc = 1;
    }

    cass_future_free(future_result);
    return rc;
}

/***********************************************************************
 *
 *  write_key_value
 *
 ***********************************************************************/
int Cassandra::write_key_value(const string& key, const string& value) {
    int rc = 0;
    CassFuture* future_result = NULL;

    // insert query: INSERT INTO
    string query_string = "INSERT INTO viralheat.stats (key, value) VALUES (\'" + key + "\', \'" + value + "\');";
    const char* query = query_string.c_str();

    rc = this->execute_query(query, future_result) == CASS_OK ? 0 : 1;
    cass_future_free(future_result);

    return rc;
}

/***********************************************************************
 *
 *  Parse CQL result
 *
 ***********************************************************************/
int Cassandra::process_query_result(CassFuture* &future_result, string &value_string) {
    int rc = 0;
    const CassResult* result = NULL;
    result = cass_future_get_result(future_result);
    CassIterator* iterator = cass_iterator_from_result(result);

    const char* char_str;
    size_t char_str_length;

    /* only expect to have one row here */
    while(cass_iterator_next(iterator)) {
        const CassValue* cass_value = cass_row_get_column_by_name( cass_iterator_get_row(iterator), _cass_value_column_name.c_str() );

        if(cass_value_get_string(cass_value, &char_str,&char_str_length) == CASS_OK){
            value_string = string(char_str, char_str_length);
        } else {
            value_string = "";
            rc = 1;
        }
    }

    cass_result_free(result);
    cass_iterator_free(iterator);
    return rc;
}

/***********************************************************************
 *
 *  print out error message with CassFuture
 *
 ***********************************************************************/
void Cassandra::print_error(CassFuture* future) const {
    const char* message;
    size_t message_length;
    cass_future_error_message(future, &message, &message_length);
    string error_message(message, message_length);
    //_app->logger().information(":: INFO :: Cassandra :: ERROR " + error_message);
}

/***********************************************************************
 *
 *  Create cluster and by a list of server addresses
 *  "127.0.0.1,127.0.0.2,127.0.0.3"
 *
 ***********************************************************************/
CassCluster* Cassandra::create_cluster(const char* contact_points) const {
    CassCluster* cluster = cass_cluster_new();
    cass_cluster_set_contact_points(cluster, contact_points);
    return cluster;
}

/***********************************************************************
 *
 * Connect a session by providing a cluster
 *
 ***********************************************************************/
CassError Cassandra::connect_session(CassSession* session, const CassCluster* cluster) const {
    CassError rc = CASS_OK;
    CassFuture* future = cass_session_connect(session, cluster);

    cass_future_wait(future);
    rc = cass_future_error_code(future);
    if (rc != CASS_OK) {
        this->print_error(future);
    }
    cass_future_free(future);

    return rc;
}

#ifndef CASSANDRA_CLIENT_TEST
int main(int argc, char* argv[]){
    /* Create Cassandra instance */
    Cassandra* cass_client = new Cassandra("192.168.8.145");
    const string key = "STATMBTRAFFIC:50904:2015-04-25";
    string result_string;
    cass_client -> read_key_value(key, result_string);
    std::cout<<"Test read from Cassandra: readback value for key \""<<key<<"\" is: "<<result_string<<std::endl;

    const string write_key = "test_key_from_stats";
    const string write_value ="stats_key_value";
    std::cout<<"Test write (key, value) : ("<<write_key<<", "<<write_value<<")"<<std::endl;
    cass_client -> write_key_value(write_key, write_value);

    string write_result;
    cass_client -> read_key_value(write_key, write_result);
    std::cout<<"Test read from Cassandra: readback value for key \""<<write_key<<"\" is: "<<write_result<<std::endl;

    std::cout<<"##################################################\n";
    std::cout<<"        Test bad query \n";
    
    std::cout<<"## with unescapted single quote '\n";
    const string bad_key = "STATMBTRAFFIC':50904:2015-04-25";
    string bad_result_string;
    cass_client -> read_key_value(bad_key, bad_result_string);
    std::cout<<"Test read from Cassandra: readback value for key \""<<bad_key<<"\" is: "<<bad_result_string<<std::endl;

    delete cass_client;
    return 0;
}
#endif
