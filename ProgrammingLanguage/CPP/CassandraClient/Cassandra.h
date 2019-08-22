/*
 * Cassandra.h
 *  DESC: cassandra client wrapper of DataStax CPP-DRIVE
 *
 */

#ifndef __CASSANDRA_H__
#define __CASSANDRA_H__

#define CASS_TEST
#ifdef CASS_TEST
    #include <cassandra.h>
    #include <iostream>
    #include <string>
    #include "unistd.h"
    #include "assert.h"
    using namespace std;
#endif

class Cassandra{
    public:
        Cassandra(const char* contact_points);
        virtual ~Cassandra();
        int read_key_value(const string& key, string& value);
        int write_key_value(const string& key, const string& value);

    private:
        CassCluster* create_cluster(const char* contact_points) const;
        CassError connect_session(CassSession* session, const CassCluster* cluster) const;
        CassError execute_query(const char* query, CassFuture* &future_result);
        int process_query_result(CassFuture* &cass_future, string& value);
        void print_error(CassFuture* future) const;

    private:
        CassCluster* _cluster;
        CassSession* _session;
        //Application* _app;
        const string _cass_value_column_name;
};
#endif
