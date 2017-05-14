const validationFunctions = {
  notEmpty(value) {
    return value !== '';
  },
  equals(value, expected) {
    return value.toUpperCase() === expected.toUpperCase();
  },
  validEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
    return re.test(email);
  },
  selected(value) {
    return !!value;
  },
};

const config = {
  name: [{
    rule: 'notEmpty',
    errorMessage: ['A mother always knows.', 'Consult with your passport.', 'What\'s your name?'],
  }],
  service: [{
    rule: 'selected',
    errorMessage: ['Three doesn\'t qualify as a tyranny of choice.', 'Maybe <a href="https://www.youtube.com/watch?v=vCGtkDzELAI" target="_blank">this</a> can help?'],
  }],
  message: [],
  email: [{
    rule: 'notEmpty',
    errorMessage: ['This is not the right place for existential riddles.', 'What is your email?', 'Nothing exists except atoms and empty space; everything else is opinion.'],
  }, {
    rule: 'validEmail',
    errorMessage: ['<a href="https://www.google.jo/search?q=what+is+an+email&oq=what+is+an+email&aqs=chrome..69i57j0l5.4591j0j4&sourceid=chrome&ie=UTF-8" target="_blank">email</a>', 'Nope.', 'Try harder!'],
  }],
  botto: [{
    rule: 'notEmpty',
    errorMessage: ['Are you a bot?'],
  }, {
    rule: 'equals',
    expected: 'Tokyo',
    errorMessage: ['<a href="https://www.tripadvisor.com/Travel_Guide-g298184-Tokyo_Tokyo_Prefecture_Kanto.html" target="_blank">つづく</a>?', 'Are you okay?'],
  }],
};

export default ({ field, name, value }) => { // eslint-disable-line
  const fieldConfig = config[name];
  if (!fieldConfig) {
    return { valid: true, msg: '' };
  }
  return fieldConfig.map((item) => {
    const isValid = item.rule === 'equals' ?
      validationFunctions[item.rule](value, item.expected) :
      validationFunctions[item.rule](value);
    const rnum = Math.floor(Math.random() * ((item.errorMessage.length - 1) + 1));
    const randomMessage = item.errorMessage[rnum];
    return isValid ?
      { valid: true, msg: '' } :
      { valid: false, msg: randomMessage };
  });
};
