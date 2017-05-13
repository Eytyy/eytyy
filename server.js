const Hapi = require('hapi');
const Inert = require('inert');
const Good = require('good');
// const Joi = require('joi');
const nodemailer = require('nodemailer');

const port = process.env.PORT || 3000;
const server = new Hapi.Server();

const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.mailId,
    pass: process.env.mailSecret,
  },
};

const emailDestination = 'e.tayyem@gmail.com';
const transport = nodemailer.createTransport(emailConfig);

function emailTemplate(user) {
  const msg = user.message ? `He wrote "${user.message}".` : '';
  const template = `You have a contact submission from ${user.name} @ ${user.email}. ${user.name} is looking for a ${user.service} service. ${msg}.`;
  return template;
}

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

  server.route({
    method: 'POST',
    path: '/api/contact',
    handler(request, reply) {
      const envelope = {
        from: `"${request.payload.name} 👻" <${emailDestination}>`, // sender address
        to: emailDestination,
        subject: `🤖: Submission from ${request.payload.name}`, // Subject line
        text: emailTemplate(request.payload),
      };
      transport.sendMail(envelope, (error, info) => { // eslint-disable-line
        if (error) {
          return console.log(error);
        }
        reply({
          status: 'ok',
          errors: [],
          result: {
            response: info.response,
          },
        });
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    },
  });

  server.start(() => {
    console.log(`Running on: ${server.info.uri}`);
  });

  if (err) {
    throw Error;
  }
});
