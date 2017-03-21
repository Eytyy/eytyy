const Hapi = require('hapi');
const Inert = require('inert');
const Good = require('good');

const port = process.env.PORT || 3000;
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port,
});

server.register([
  Inert,
  { register: Good,
    options: {
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            response: '*',
            log: '*',
          }],
        }, {
          module: 'good-console',
        }, 'stdout'],
      },
    },
  },
], (err) => {
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: './dist',
        listing: false,
        index: true,
      },
    },
  });

  server.start(() => {
    console.log(`Running on: ${server.info.uri}`);
  });

  if (err) {
    throw Error;
  }
});
