// Import the required libraries
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');

// Import the data you creatd above
var data = require('./data.json');

// Define the User type with two string fields: 'id' and 'name'.
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString }
  }
});

var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        // `args` describes the arguments that the `user` query accepts
        args: {
          id: {type:graphql.GraphQLString}
        },

        // The resolve function describes how to "resolve" or fulfill
        // the incoming query.
        resolve: function(_, args){
          return data[args.id];
        }
      }
    }
  })
});

express()
  .use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    pretty: true
  }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
