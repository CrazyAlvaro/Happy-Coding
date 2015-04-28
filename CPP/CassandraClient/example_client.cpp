#include <cassandra.h>
#include <stdio.h>

#define ITERATION_NUMBER 10

int main() {
    /* Setup and connect to cluster */
    CassFuture* connect_future = NULL;
    CassCluster* cluster = cass_cluster_new();
    CassSession* session = cass_session_new();

    /* Add contact points */
    cass_cluster_set_contact_points(cluster, "192.168.8.145");

    /* Provide the cluster object as configuration to connect the session */
    connect_future = cass_session_connect(session, cluster);

    if (cass_future_error_code(connect_future) == CASS_OK) {
        printf("connection succeed!\n");
        CassFuture* close_future = NULL;

        for( int i = 0; i < ITERATION_NUMBER; i++ ) {
            /* Build statement and execute query */
            CassStatement* statement
                = cass_statement_new("SELECT * FROM ycsb.usertable LIMIT 100", 0);

            CassFuture* result_future = cass_session_execute(session, statement);

            if(cass_future_error_code(result_future) == CASS_OK) {
                //printf("statement execution succeed!\n");
                /* Retrieve result set and iterate over the rows */
                const CassResult* result = cass_future_get_result(result_future);
                CassIterator* rows = cass_iterator_from_result(result);
                //print("Executing Rows");

                while(cass_iterator_next(rows)) {
                    const CassRow* row = cass_iterator_get_row(rows);
                    //const CassValue* value = cass_row_get_column_by_name(row, "keyspace_name");

                    //const char* keyspace;
                    //size_t keyspace_length;
                    //cass_value_get_string(value, &keyspace, &keyspace_length);
                    //printf("keyspace_name: '%.*s'\n", (int)keyspace_length, keyspace);
                }

                cass_result_free(result);
                cass_iterator_free(rows);
            } else {
                /* Handle error */
                const char* message;
                size_t message_length;
                cass_future_error_message(result_future, &message, &message_length);
                fprintf(stderr, "Unable to run query: '%.*s'\n",
                        (int)message_length, message);
            }

            cass_statement_free(statement);
            cass_future_free(result_future);
        }

        printf("Successful iterate query for %d times\n", (int)ITERATION_NUMBER);

        /* Close the session */
        close_future = cass_session_close(session);
        cass_future_wait(close_future);
        cass_future_free(close_future);
    } else {
        /* Handle error */
        const char* message;
        size_t message_length;
        cass_future_error_message(connect_future, &message, &message_length);
        fprintf(stderr, "Unable to connect: '%.*s'\n",
                (int)message_length, message);
    }

    cass_future_free(connect_future);
    cass_cluster_free(cluster);
    cass_session_free(session);

    return 0;
}
