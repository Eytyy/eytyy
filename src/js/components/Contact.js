import React, { Component } from 'react';
import { Link } from 'react-router';
import Service from './Service';

class Contact extends Component {
  constructor() {
    super();
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
      user: {
        name: undefined,
        email: undefined,
        service: undefined,
        message: undefined,
      },
    };
    this.updateStep = this.updateStep.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.handleKeyStrokes = this.handleKeyStrokes.bind(this);
    this.validate = this.validate.bind(this);
    this.onClickService = this.onClickService.bind(this);
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
    this.updateStep('next');
    e.preventDefault();
  }
  handleKeyStrokes(event) {
    const { keyCode } = event;
    switch (keyCode) {
      case 13: // enter
        this.updateStep('next');
        break;
      case 8: // backspace
        this.updateStep('prev');
        break;
      default:
    }
  }
  validate() {
    const { where, user } = this.state;
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
      default:
        return true;
    }
  }
  updateStep(dir) {
    const { where } = this.state;
    const validation = this.validate();

    if (validation.type === 'error') {
      validation.field.classList.add('error');
      validation.field.dataset.msg = validation.errorMsg;
      return false;
    }
    if (validation.field) {
      validation.field.classList.remove('error');
      validation.field.dataset.msg = '';
    }

    if ((where === 3 && dir === 'next') || (where === 0 && dir === 'prev')) {
      return false;
    }
    const user = {
      ...this.state.user,
      [validation.name]: validation.value,
    };
    this.setState({
      ...this.state,
      where: dir === 'next' ? where + 1 : where - 1,
      user,
    });
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
              placeholder="Your name?"
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
      default:
        return <div />;
    }
  }
  render() {
    const { where, user } = this.state;
    const whereAmi = () => {
      switch (where) {
        case 0:
          return <span>{'"Hi! What should I call you?"'}</span>;
        case 1:
          return <span>{`Nice to meet you ${user.name.split(' ')[0]}. Choose a service:`}</span>;
        case 2:
          return <span>{'"What is your email?"'}</span>;
        case 3: //eslint-disable-line
          const service = user.service === 'development' ? 'develop' : 'design';
          return (
            `Okay ${user.name.split(' ')[0]}! You want me to ${service} something for you.
            If there are more details that you'd like to add, please use the message field below. Once you're done, click send and
            I'll get back to you on your email ${user.email} within a couple of days.`
          );
        default:
          return null;
      }
    };
    return (
      <div>
        <form className="contactForm" action="">
          <p className="botty">
            <span className="eytyy">🤖</span> { whereAmi() }
          </p>
          <div className={`step step-${where}`}>
            { this.renderStep(this.state.where) }
          </div>
          {
            where === 3 ?
              <button className="send-msg" onClick={this.onClickSend}>send</button> :
              <button className="next-step" onClick={this.onNextClick}>→</button>
          }{' '}
          <Link className="form-link" to="/">&times;</Link>
        </form>
      </div>
    );
  }
}

export default Contact;
