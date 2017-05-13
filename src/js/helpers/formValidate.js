const validationFunctions = {
  notEmpty(value) {
    return value !== '';
  },
  equals(value, expected) {
    return value === expected;
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
    errorMessage: 'I can\'t talk to strangers.',
  }],
  service: [{
    rule: 'selected',
    errorMessage: 'There\'s got to be something that you want',
  }],
  message: [],
  email: [{
    rule: 'notEmpty',
    errorMessage: 'No the right place for existential riddles',
  }, {
    rule: 'validEmail',
    errorMessage: 'Double check your email',
  }],
  botto: [{
    rule: 'notEmpty',
    errorMessage: 'Are you a bot?',
  }, {
    rule: 'equals',
    expected: 'Tokyo',
    errorMessage: 'Really?',
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
    return isValid ? { valid: true, msg: '' } : { valid: false, msg: item.errorMessage };
  });
};
