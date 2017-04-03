//schema.js
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt
} from 'graphql';

let count = 0;

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: GraphQLInt,
        //Add description
        description: 'The count!',
        resolve: () => {
          return count;
        }
      }
    }
  }),
  //Note：this is the newly added mutation query
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      updateCount: {
        type: GraphQLInt,
        description: 'Update the count',
        resolve: () => {
          count += 1;
          return count;
        }
      }
    }
  })
});

export default schema;
