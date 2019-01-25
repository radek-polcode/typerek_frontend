import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';
import { Card, CardGroup, CardImg, CardText,
         CardBody,  CardTitle, CardSubtitle } from 'reactstrap';
import { Button, Form, FormGroup, 
         Input, InputGroup, InputGroupAddon, InputGroupText, 
         Label } from 'reactstrap';
import { FaAt, FaLock, FaUser } from 'react-icons/fa';

import './RegisterPage.css'
import { userActions } from '../_actions';

class RegisterPage extends Component {
  constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    user: {
        email: '',
        username: '',
        password: ''
    },
    submitted: false
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.email && user.username && user.password) {
      dispatch(userActions.register(user));
    }
  }
  render() {
    const { registering  } = this.props;
    const { user, submitted } = this.state;

    return (
      <Row className="main">
        <Col md="6">
          <Card className="card__register">
            <CardBody>
              <CardTitle>
                  <h2>Register</h2>
              </CardTitle>
              <CardSubtitle>
                <p className="text-muted">Create your account</p>
              </CardSubtitle>
              <Form name="form" onSubmit={this.handleSubmit}>
                  <FormGroup className={(submitted && !user.email ? ' has-error' : '')}>
                      <Label htmlFor="email">Email</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="form__input__prepend">
                            <FaAt />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" 
                               className="form-control form__input" 
                               name="email" 
                               value={user.email} 
                               onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                        }
                      </InputGroup>
                  </FormGroup>
                  <FormGroup className={(submitted && !user.username ? ' has-error' : '')}>
                      <Label htmlFor="username">Username</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className="form__input__prepend">
                              <FaUser />
                            </InputGroupText>
                          </InputGroupAddon>
                        <Input type="text" 
                               className="form-control form__input" 
                               name="username" 
                               value={user.username} 
                               onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                      </InputGroup>
                  </FormGroup>
                  <FormGroup className={(submitted && !user.password ? ' has-error' : '')}>
                      <Label htmlFor="password">Password</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className="form__input__prepend">
                              <FaLock />
                            </InputGroupText>
                          </InputGroupAddon>
                        <Input type="password" 
                               className="form-control form__input" 
                               name="password" 
                               value={user.password} 
                               onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                      </InputGroup>
                  </FormGroup>
                  <FormGroup>
                      <button className="btn btn-success">Register</button>
                      {registering && 
                          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      }
                      <Link to="/login" className="btn card__register__btn--link">Cancel</Link>
                  </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
      registering
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };