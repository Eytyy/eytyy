const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Blipp = require('blipp');

const port = process.argv[2] || 8080;
const server = new Hapi.Server();

const plugins = [
  Inert,
  Vision,
  Blipp,
];

server.register(plugins, (err) => {
  server.connection({
    host: 'localhost',
    port,
  });

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
