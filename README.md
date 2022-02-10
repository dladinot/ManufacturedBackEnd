# Manufactured API
REST API designed to query manufactured GraphQl dataset and return stats found on channel messages

## Technologies
This API was built with `Express Js` framework on `Node Js 14.17.0` .

## Starting 🚀

_Instructions to obtain a project's copy and run it on localhost for testing and development purposes._

### Prerequisite 📋

_Necessary stuff for software installation_

```
Docker & Docker Compose on its latests versions
```

### Environment variables  🔧

_Environment variables are necessary for the project execution on Docker and don't require any modification. If you wish to run this project in your computer instead with nodeJs installed, the following parameters must be configured:_

_API parameters:_

```
PORT=[API Port]
CORS_ORIGIN=[Allowed domain, use * for development]
GRAPHQL_ENDPOINT= [URL Endpoint for GraphQl dataset]
AUTH = [Authorization Token for endpoint]
```

### Installation 👷

_Build Docker Compose Image_

```
docker-compose build
```

_Start Docker Compose_

```
docker-compose up
```

_Server will be executed in the selected port at the PORT environment variable, for example: http://localhost:3015_


### Visualization 👀

_Rest API exposes one endpoint /stats of GET type, in order to hit the manufactured GraphQL dataset and analyze the channel messages counting characters, words, verbs, nouns, emojis, numbers and queries. This endpoint can be found at an address such as:_

```
http://localhost:3015/stats
```

_A Swagger is also exposed for the API documentation and it can be queried from:_

```
http://localhost:3015/api-docs/
```

_Content would be seen like:_

![Swagger](https://i.imgur.com/8E1ctLq.png)


## Built with 🛠️

_Tools_

* [NodeJs](https://nodejs.org/es/) - Javascript execution envirnoment.
* [Express](https://expressjs.com/es/) - Open Source Framework for API building using NodeJs.
* [Docker](https://www.docker.com/) - Open Source project for the deployment automatization on containers.
* [Docker compose](https://docs.docker.com/compose/) - Tool to define and execute docker applications.

## Author ✒️

* Daniel Esteban Ladino Torres - [Dladinot](https://github.com/dladinot)
