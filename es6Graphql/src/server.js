import { Schema } from './schema';
import graphqlHTTP from 'express-graphql';
import express from 'express';
import 'babel-polyfill';
import path from 'path';
import passport from './passport';
import session from 'express-session';


const config = require('./config/main.json');
const port = (!global.process.env.PORT) ? 1234 : global.process.env.PORT;
const server = global.server = express();

server.set('port', port);
server.use(express.static(path.join(__dirname, 'public')));
server.use(passport.initialize());
server.use(passport.session());
server.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true
}));

server.use('/graphql', graphqlHTTP(request => ({
  schema: Schema,
  rootValue: { session: request.session },
  graphiql: true
})));

server.listen(server.get('port'), () => {
  console.log('The server is running at http://localhost:' + server.get('port'));
});
