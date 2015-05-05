/*
 *  Cassandra.cpp
 *  DESC: cassandra client wrapper of DataStax CPP-DRIVE
 *
 */

#include "Cassandra.h"

/*
 *  Constructor
 *  variables, contact_points: "127.0.0.1,127.0.0.2,127.0.0.3"
 */
CassandraClient::CassandraClient(const char* contact_points) : _cluster(NULL), _session(NULL) {
    //_app = &Application::instance();
    _cluster = create_cluster(contact_points);
    _session = cass_session_new();

    if (connect_session(_session, _cluster) != CASS_OK) {
        //_app->logger().information("Fail to connect to Cassandra.\n");
    }
}

/*
 *  Desctuctor
 */
CassandraClient::~CassandraClient() {
    std::cout<<"destructor being called\n";
    if (_session) {
        /* close connect session */
        CassFuture* future= cass_session_close(_session);
        cass_future_wait(future);
        cass_future_free(future);
        cass_session_free(_session);
    }

    if (_cluster) {
        cass_cluster_free(_cluster);
    }
}

/*
 *  Execute Query
 */
CassError CassandraClient::execute_query(const char* query, CassFuture* &future_result){
    CassError rc = CASS_OK;
    CassStatement* statement = cass_statement_new(query, 0);

    assert(_session != NULL);
    future_result = cass_session_execute(_session, statement);
    cass_future_wait(future_result);

    rc = cass_future_error_code(future_result);
    if (rc != CASS_OK) {
        print_error(future_result);
        future_result = NULL;       /* set future_result to NULL */
    }

    cass_statement_free(statement);
    return rc;
}

/*
 *  print out error message with CassFuture
 */
void CassandraClient::print_error(CassFuture* future) const {
    const char* message;
    size_t message_length;
    cass_future_error_message(future, &message, &message_length);
    string error_message(message, message_length);
    //_app->logger().information(":: INFO :: CassandraClient :: ERROR " + error_message);
}

/*
 *  Create cluster and by a list of server addresses
 *  "127.0.0.1,127.0.0.2,127.0.0.3"
 */
CassCluster* CassandraClient::create_cluster(const char* contact_points) const {
    CassCluster* cluster = cass_cluster_new();
    cass_cluster_set_contact_points(cluster, contact_points);
    return cluster;
}

/*
 * Connect a session by providing a cluster
 */
CassError CassandraClient::connect_session(CassSession* session, const CassCluster* cluster) const {
    CassError rc = CASS_OK;
    CassFuture* future = cass_session_connect(session, cluster);

    cass_future_wait(future);
    rc = cass_future_error_code(future);
    if (rc != CASS_OK) {
        print_error(future);
    }
    cass_future_free(future);

    return rc;
}

#ifndef CASSANDRA_CLIENT_TEST
int main(int argc, char* argv[]){
    /* Create CassandraClient instance */
    CassandraClient* cass_client = new CassandraClient("192.168.8.145");
    CassFuture *future_result = NULL;

    const CassResult* result = NULL;
    cass_client -> execute_query("SELECT * FROM viralheat.stats LIMIT 100", future_result);

    if(future_result != NULL){
        result = cass_future_get_result(future_result);
        CassIterator* rows = cass_iterator_from_result(result);
        while (cass_iterator_next(rows)) {
            const CassRow * row = cass_iterator_get_row(rows);

            //const CassValue* value = cass_row_get_column_by_name(row, "keyspace_name");

            //CassString keyspace_name;
            //cass_value_get_string(value, &keyspace_name);
            //printf("keyspace_name: '%.*s'\n", (int)keyspace_name.length, keyspace_name.data);
        }
        cass_iterator_free(rows);
        cass_result_free(result);
        cass_future_free(future_result);
    }

    delete cass_client;
    return 0;

}
#endif
