/*
 * Cassandra Client Wrapper
 *
 */

#include <cassandra.h>
#include <assert.h>

#include <string>
#include <cstdio>
#include <iostream>


class CassandraClient{
    private:
        CassCluster* _cluster;
        CassSession* _session;
        CassFuture* _close_future;

    public:
        /*
         *  Constructor
         *  variables, contact_points: "127.0.0.1,127.0.0.2,127.0.0.3"
         */
        CassandraClient(const char* contact_points) {
            _cluster = create_cluster(contact_points);
            _session = cass_session_new();
            _close_future = NULL;

            if (connect_session(_session, _cluster) != CASS_OK) {
                std::cout<<"Fail to connect to Cassandra.\n";
                this -> ~CassandraClient();
            }
        }

        /*
         *  Desctuctor
         */
        virtual ~CassandraClient() {
            std::cout<<"destructor being called\n";

            /* close connect session */
            _close_future = cass_session_close(_session);
            cass_future_wait(_close_future);
            cass_future_free(_close_future);

            cass_cluster_free(_cluster);
            cass_session_free(_session);
        }

        /*
         *  Execute Query
         *  Potentially can accept a struct to store result
         */
        CassError execute_query(const char* query) {
            CassError rc = CASS_OK;
            CassFuture* future = NULL;
            CassStatement* statement = cass_statement_new(query, 0);

            assert(_session != NULL);
            future = cass_session_execute(_session, statement);
            cass_future_wait(future);

            rc = cass_future_error_code(future);
            if (rc != CASS_OK) {
                print_error(future);
            }

            cass_future_free(future);
            cass_statement_free(statement);

            return rc;
        }

    private:
        CassError execute_query(CassSession* session, const char* query) {
            CassError rc = CASS_OK;
            CassFuture* future = NULL;
            CassStatement* statement = cass_statement_new(query, 0);

            future = cass_session_execute(session, statement);
            cass_future_wait(future);

            rc = cass_future_error_code(future);
            if (rc != CASS_OK) {
                print_error(future);
            }

            cass_future_free(future);
            cass_statement_free(statement);

            return rc;
        }

        /*
         *  print out error message with CassFuture
         */
        void print_error(CassFuture* future) {
            const char* message;
            size_t message_length;
            cass_future_error_message(future, &message, &message_length);
            fprintf(stderr, "Error: %.*s\n", (int)message_length, message);
        }

        /*
         *  Create cluster and by a list of server addresses
         *  "127.0.0.1,127.0.0.2,127.0.0.3"
         */
        CassCluster* create_cluster(const char* contact_points) {
            CassCluster* cluster = cass_cluster_new();
            cass_cluster_set_contact_points(cluster, contact_points);
            return cluster;
        }

        /*
         * Connect a session by providing a cluster
         */
        CassError connect_session(CassSession* session, const CassCluster* cluster) {
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

};

#ifndef CASSANDRA_CLIENT_TEST

int main(int argc, char* argv[]){
    /* Create CassandraClient instance */
    CassandraClient* cass_client = new CassandraClient("192.168.8.145");
    cass_client -> execute_query("SELECT * FROM ycsb.usertable LIMIT 100");
    delete cass_client;
    return 0;

}
#endif
