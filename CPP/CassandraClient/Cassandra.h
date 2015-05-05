/*
 * Cassandra.h
 *  DESC: cassandra client wrapper of DataStax CPP-DRIVE
 *
 */

#include <cassandra.h>
//#include "../../../Common/Headers/common.h"

#include <assert.h>
#include <string>
#include <cstdio>
#include <iostream>
#include <string>
using namespace std;

class CassandraClient{
    public:
        CassandraClient(const char* contact_points);
        virtual ~CassandraClient();
        CassError execute_query(const char* query, CassFuture* &future_result);

    private:
        void print_error(CassFuture* future) const;
        CassCluster* create_cluster(const char* contact_points) const;
        CassError connect_session(CassSession* session, const CassCluster* cluster) const;

    private:
        CassCluster* _cluster;
        CassSession* _session;
        //Application* _app;
};
