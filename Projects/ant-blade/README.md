# Blade for Project Ant

[![CircleCI](https://circleci.com/gh/Madadata/ant-blade.svg?style=svg&circle-token=239531cdea67a6cb506eb60dcc3ba3c94a363b42)](https://circleci.com/gh/Madadata/ant-blade)
[![Dependency Status](https://david-dm.org/Madadata/ant-blade.svg)](https://david-dm.org/Madadata/ant-blade)
[Docker Hub](https://hub.docker.com/r/mada/ant-blade/)

## How to start the backend

### 1. setup `postgres`

run PostgreSQL:
```
$ pg_ctl -D /usr/local/var/postgres -l logfile start
```
where `/usr/local/var/postgres` is where you put your data. If you don't have that folder or you want to put elsewhere, go create a directory and init it like this:
```
mkdir ~/Desktop/my_data
initdb -D my_data
```
and then use the prompted command that contains `pg_ctl`.

create database if it does not exist:
```
$ createdb ant_blade
```

### 2. migrate (i.e. setup) database:

```
$ cd ant_blade
$ npm run db:migrate
```

### 3. run PostgREST:
```
postgrest postgres://$(whoami)@/ant_blade -p 3001 -a $(whoami)
```
You will use port `3001` because the default `3000` is taken by the express server.

### 4. running and testing in local environment

Install and start MongoDB

```
$ brew install mongo
$ brew services start mongo # this start the server in background
```

### 5. Start ant-blade dev server

```
$ npm start
```

## running and testing in CI environment

In CircleCI, a database is automatically created for you at: `localhost:5432/circle_test`
with access for user `ubuntu`, so you can connect to it using `psql` or from within a
docker container. Note that this PostgreSQL runs 9.5 from within a docker container.

In the latter case you will have to add the host to be recognized from within the docker
container. See `circle.yml` for how to do that/it's done, specifically using `--addhost`
parameter.

The same rule applies to `mongo` which is run by CircleCI and if you want to use it.
