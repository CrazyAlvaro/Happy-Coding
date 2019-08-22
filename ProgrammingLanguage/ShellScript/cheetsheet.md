cheet sheet for various tools
================================

## etcd client

### Release page:
[etcd release page](https://github.com/coreos/etcd/releases/)

### Create a new directory

```
$ etcdctl mkdir /foodir
$ etcdctl mkdir /foodir/dir
```

### Listing a directory
```
$ etcdctl ls
$ etcdctl ls /foodir
```

Add `--recursive` to list subdirectories
```
$ etcdctl ls --recursive
```

### Set a config file
```
$ etcdctl set /backend_config/Client/foo "$(cat foo.config)"
```


### TODO: get value from a docker instance using curl

## docker

### commit a change to a docker image
```
$ sudo docker commit -m="commit message" container_id repository/image:tag
```

### build a docker image from a dockerfile
```
$ sudo docker build -t="repository/image:tag" . 
$ sudo docker build -t="repository/image:tag" . > ~/build.log &
```

### run a docker image
```
$ sudo docker run -it -v /local_dir/:/container_dir/ image:tag /bin/bash
```

## backend

### backend structure

Class ElasticSearch:
    vector<string> entries, each time add an entry to vector, flush the datebase
    by send http req to server "~/_bulk", using mutex to synchronize this vector<string>

## command 

### find and remove files
```
$ find . -name test -type d -print0 | xgars -0 rm -r --
$ find . -name test -type d -exec rm -r {} \;
```
