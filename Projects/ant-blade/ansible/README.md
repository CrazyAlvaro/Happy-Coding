## Ant-blade 部署说明

Ant-blade 用 Ansible + Docker 部署，此说明假设你已经大概熟悉他们的运作原理。

### 运行

```sh
./deploy.sh
```

这个时候会依次提醒你输入 ssh 密码、sudo 密码、ansible vault 密码。前两个和部署的目标机器有关，
最后一个和 `group_vars` 下面的环境变量（主要是数据库密码）有关系。这三个密码不保存到代码里面。

### 基本结构

`main.yml`会起以下 docker container：

- mongo
- ant-rotor
- postgres
- postgrest
- ant-blade

其中两个数据库各自还带了一个 data container。

`inventory`文件里面是目标机器分组。

### 在本地用 Vagrant 部署

```
brew cask install vagrant
brew install ansible
cd ant-blade/ansible
export DOCKER_USER="你的docker hub账号"
export DOCKER_PSSS="你的docker hub密码"
vagrant up
```

如果中途因为下载失败，就执行`vagrant provision`来重试。

等一切就绪之后，就可以根据以下 port mapping 的情况来访问 `localhost` 的端口了：
```
guest: 80, host: 4080
guest: 3001, host: 4001
guest: 5432, host: 15421
guest: 27017, host: 37017
```
比如最终的地址就是 `http://localhost:4080`。

如果需要，你也可以在 `Vagrantfile` 的文件目录里面 `vagrant ssh` 进机器看情况。
