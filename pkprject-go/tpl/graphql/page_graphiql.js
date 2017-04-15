import React from 'react';
import render from 'common/render';
import GraphiQL from 'graphiql';
// import fetch from 'isomorphic-fetch';
import {ajaxPost} from 'common/ajax';
import '../../node_modules/graphiql/graphiql.css';

declare var globalData : {
  graphqlEndpoint : string,
}

function graphQLFetcher(graphQLParams) {
  return new Promise((resolve, reject) => {
    ajaxPost(
      globalData.graphqlEndpoint,
      graphQLParams,
      (result) => resolve(result),
      (error) => reject(error));
  });
}

render(<GraphiQL fetcher={graphQLFetcher} />);
