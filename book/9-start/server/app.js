import express from 'express';
import session from 'express-session';
import mongoSessionStore from 'connect-mongo';
import next from 'next';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import logger from './logs';
import auth from './google';
// import api from './api';

import { insertTemplates } from './models/EmailTemplate';
// import Chapter from './models/Chapter';

// Refactored from ch.3 to use goole auth
// import User from './models/User';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const MONGO_URL = process.env.MONGO_URL_TEST;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose.connect(
  MONGO_URL,
  options,
);

const port = process.env.PORT || 8000;
const ROOT_URL = `http://localhost:${port}`;

const URL_MAP = {
  '/login': '/public/login',
};

const app = next({ dev });
const handle = app.getRequestHandler();

// Nextjs's server prepared
app.prepare().then(async () => {
  const server = express();

  // confuring MongoDB session store
  const MongoStore = mongoSessionStore(session);

  const sess = {
    name: 'goodfaith.sid',
    secret: 'Sun8Shines8',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60, // save session 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  };

  server.use(session(sess));

  await insertTemplates();

  auth({ server, ROOT_URL });
  // ch.5 Internal API GET books
  // api(server);

  // server.get('/books/:bookSlug/:chapterSlug', (req, res) => {
  //   const { bookSlug, chapterSlug } = req.params;
  //   app.render(req, res, '/public/read-chapter', { bookSlug, chapterSlug });
  // });

  // Refactored from ch.3 to use goole auth
  // server.get('/', (req, res) => {
  //   req.session.foo = 'bar';
  //   User.findOne({ slug: 'team-builder-book' }).then((user) => {
  //     req.user = user;
  //     app.render(req, res, '/');
  //   });
  // });

  server.get('*', (req, res) => {
    const url = URL_MAP[req.path];
    if (url) {
      app.render(req, res, url);
    } else {
      handle(req, res);
    }
  });

  // Refactored Custom routes Ch.5 Internal Api's
  // server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
  });
});
