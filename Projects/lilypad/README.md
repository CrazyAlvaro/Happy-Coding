# lilypad

[![CircleCI](https://circleci.com/gh/Madadata/lilypad.svg?style=svg&circle-token=540ef7f64dd4caab18a277395373d279652fe354)](https://circleci.com/gh/Madadata/lilypad)

## Project Structure

* folder structure: inspired by [lancejpollard](https://gist.github.com/lancejpollard/1398757)
* css organization: inspired by [JIN SU PARK](https://thisdata.com/blog/organize-css-with-express/)
* routes settings: inspired by [Zihua Li](http://zihua.li/2014/05/good-practices-to-structure-an-express-app/)

## Deployment

The build is on [Dockerhub](https://hub.docker.com/r/mada/lilypad/)

`docker pull mada/lilypad`

## Concepts

```
.
└── Group
  └── Board
      └── Card
          ├── ChartCard
          ├── MetricCard
          └── SortingTableCard
```

* Group: a collections of Board -> sections in Domo, page in Domo.
* Board: a placeholder for collections of Card -> sub-page in Domo.
* Card: a displaying unit. -> card in Domo.

## Naming Conventions
* Card: `Name${CardName}`

## How to Start

### development

1. start mongo and fake-leancloud-auth services. To use fake-leancloud-auth, you can clone this [repo](https://github.com/Jimexist/fake-leancloud-auth). You may also have to change the server port because port 3000 is taken by lilypad. then

  ```
  npm start
  ```

  But, I highly recommend running it inside a docker container -

  ```
  docker run -d --name mongo mongo
  docker run -d \
  --name fake-leancloud-auth \
  --link mongo \
  -p 3001:3000 \
  -e 'NODE_ENV=production'
  -e 'MONGO_URL=mongodb://mongo:27017/local'
  jimexist/fake-leancloud-auth
  ```

2. start lilypad

  ```
  npm start
  ```

### production

In production, mongo and fake-leancloud-auth are replaced by real leancloud service. Therefore, you have to provide leancloud appId and appKey through environment variables -

```
npm run build
LEAN_CLOUD_APP_ID=your_app_id LEAN_CLOUD_APP_KEY=your_app_key npm run start:prod
```
