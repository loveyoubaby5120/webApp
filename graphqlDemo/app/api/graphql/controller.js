import schema from '.。/../../schema/schema';
import { graphql } from 'graphql';

export const list = (req, res, next) => {
  graphql(schema, req.body)
    .then((result) => {
      res.send(JSON.stringify(result, null, 2));
    })
};

export const create = (req, res, next) => {
  graphql(schema, req.body)
    .then((result) => {
      res.send(JSON.stringify(result, null, 2));
    })
};

export const getById = (req, res, next) => {
  res.send('Hello!');
};

export const edit = (req, res, next) => {
  res.send('Hello!');
};

export const deleteById = (req, res, next) => {
  res.send('Hello!');
};
