import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Service from './Service';
import BottyDefaults from './BottyDefaults';
import validate from '../helpers/formValidate';

class Contact extends Component {
  constructor() {
    super();
    this.errorTracker = {
      has: false,
      msg: '',
    };
    this.state = {
      services: [{
        key: 'dev',
        title: 'Development',
      }, {
        key: 'des',
        title: 'Design',
      }, {
        key: 'oth',
        title: 'Other',
      }],
      where: 0,
      error: false,
      errorMsg: '',
      user: {
        name: undefined,
        email: undefined,
        service: undefined,
        message: undefined,
        botto: undefined,
      },
    };
    this.updateStep = this.updateStep.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.handleKeyStrokes = this.handleKeyStrokes.bind(this);
    this.onClickService = this.onClickService.bind(this);
    this.showError = this.showError.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyStrokes);
  }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyStrokes);
  }
  onClickService(event) { //eslint-disable-line
    const user = {
      ...this.state.user,
      service: event.target.innerText,
    };
    this.setState({
      user,
    });
  }
  onNextClick(e) {
    this.handleFormInput('next');
    e.preventDefault();
  }
  handleKeyStrokes(event) {
    const { keyCode } = event;
    switch (keyCode) {
      case 13: // enter
        this.handleFormInput('next');
        break;
      case 8: // backspace
        this.handleFormInput('prev');
        break;
      default:
    }
  }
  handleFormInput(dir) {
    const { where, user } = this.state;
    const inputObj = {};
    switch (where) {
      case 0:
        inputObj.field = this.nameField;
        inputObj.name = 'name';
        inputObj.value = inputObj.field.value.trim();
        break;
      case 1:
        inputObj.field = document.querySelector('.service-item--active');
        inputObj.name = 'service';
        inputObj.value = user.service || '';
        break;
      case 2:
        inputObj.field = this.emailField;
        inputObj.name = 'email';
        inputObj.value = inputObj.field.value.trim();
        break;
      case 3:
        inputObj.field = this.messageField;
        inputObj.name = 'message';
        inputObj.value = inputObj.field.value.trim();
        break;
      case 4:
        inputObj.field = this.bottoField;
        inputObj.name = 'botto';
        inputObj.value = inputObj.field.value.trim();
        break;
      default:
        break;
    }
    const errors = validate(inputObj).filter(item => !item.valid);

    if (errors.length > 0) {
      const { msg } = errors[0];
      this.showError(msg);
      return false;
    }
    this.updateStep(dir, inputObj);
    return true;
  }
  submitContact() {
    const { user } = this.state;
    fetch('/api/contact', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        service: user.service,
        email: user.email,
        message: user.message,
      }),
    }).then(() => {
      browserHistory.push('/');
    });
  }
  showError(msg) {
    this.setState({
      error: true,
      errorMsg: msg,
    });
  }
  updateStep(dir, { name, value }) {
    const { where } = this.state;

    if ((where === 5 && dir === 'next') || (where === 0 && dir === 'prev')) {
      return false;
    }

    const user = {
      ...this.state.user,
      [name]: value,
    };

    this.setState({
      ...this.state,
      where: dir === 'next' ? where + 1 : where - 1,
      error: false,
      errorMsg: '',
      user,
    });
    if (where === 4) {
      this.submitContact();
    }
    return true;
  }
  renderStep(step) { // eslint-disable-line
    const { services, user } = this.state;
    switch (step) {
      case 0:
        return (
          <div className="form-group">
            <input
              ref={(node) => {
                this.nameField = node;
                return this.nameField;
              }}
              type="text"
            />
          </div>);
      case 1:
        return (
          <div className="form-group">
            <ul className="services">
              {
                services.map(({ key, title }) => (
                  <Service
                    activeService={user.service}
                    key={key}
                    service={key}
                    title={title}
                    onClick={this.onClickService}
                    ref={(node) => {
                      const nodeName = `service${key}`;
                      this[nodeName] = node;
                    }}
                  />
                ),
                )
              }
            </ul>
          </div>
        );
      case 2:
        return (
          <div className="form-group">
            <input
              ref={(node) => {
                this.emailField = node;
                return this.emailField;
              }}
              type="email"
            />
          </div>);
      case 3:
        return (
          <div className="form-group">
            <textarea
              ref={(node) => {
                this.messageField = node;
                return this.messageField;
              }}
              rows="4"
            />
          </div>);
      case 4:
        return (
          <input
            ref={(node) => {
              this.bottoField = node;
              return this.bottoField;
            }}
            type="text"
          />);
      default:
        return null;
    }
  }
  render() {
    const { where, user, error, errorMsg } = this.state;
    const buttons = () => {
      if (where === 5) {
        return null;
      }
      const navBtn = where === 4 ?
        <button className="send-msg" onClick={this.onNextClick}>👌</button> :
        <button className="next-step" onClick={this.onNextClick}>→</button>;
      return (
        <div className="form-btns">
          { navBtn }
          <Link className="form-link" to="/">&times;</Link>
        </div>);
    };
    return (
      <div>
        <form className="contactForm" action="" onSubmit={() => false} >
          <p className="botty">
            <span className="eytyy">{ where === 5 ? '🤘' : '🤖'}</span>
            <BottyDefaults user={user} where={where} error={error} errorMsg={errorMsg} />
          </p>
          <div className={`step step-${where}`}>
            { this.renderStep(this.state.where) }
          </div>
          { buttons() }{' '}
        </form>
      </div>
    );
  }
}

export default Contact;
