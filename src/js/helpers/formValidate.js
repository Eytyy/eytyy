export default (where, user) => {
  const obj = {};
  let data;
  switch (where) {
    case 0:
      data = this.nameField.value.trim();
      obj.type = data === '' ? 'error' : 'ok';
      obj.name = 'name';
      obj.field = this.nameField;
      obj.value = data;
      return obj;
    case 1:
      data = user.service;
      obj.type = typeof data === 'undefined' ? 'error' : 'ok';
      obj.name = 'service';
      obj.value = data || '';
      return obj;
    case 2:
      data = this.emailField.value.trim();
      obj.type = data === '' ? 'error' : 'ok';
      obj.name = 'email';
      obj.field = this.emailField;
      obj.value = data;
      return obj;
    case 3:
      data = this.messageField.value.trim();
      obj.type = 'ok';
      obj.name = 'message';
      obj.field = this.messageField;
      obj.value = data;
      return obj;
    case 4: // eslint-disable-line
      data = this.bottoField.value.trim();
      const notok = data === '' || data !== 'Tokyo';
      obj.type = notok ? 'error' : 'ok';
      obj.name = 'botto';
      obj.field = this.bottoField;
      obj.value = data;
      return obj;
    default:
      return true;
  }
};
