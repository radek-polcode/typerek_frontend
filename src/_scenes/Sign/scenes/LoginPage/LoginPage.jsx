import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import cx from 'classnames';
import { Row, Col } from 'reactstrap';
import { Card, CardGroup, CardImg, CardText,
         CardBody,  CardTitle, CardSubtitle } from 'reactstrap';
import { Button, Form, FormGroup, 
         Input, InputGroup, InputGroupAddon, InputGroupText, 
         Label } from 'reactstrap';
import { FaAt, FaLock } from 'react-icons/fa';

import { ButtonLink } from '../../components/'
import styles from './LoginPage.module.css'
import '../../../../App/App.css'

import { userActions } from '../../../../_actions';

class LoginPage extends Component {  
  constructor(props) {
    super(props);

    this.props.dispatch(userActions.logout());    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    email: '',
    password: '',
    submitted: false
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true })
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password))
    }
  }

  render() {
    const { loggingIn, t } = this.props;
    const { email, password, submitted } = this.state;

    return(
      <Row>
        <Col md="12">
          <CardGroup className={styles.cardgroup}>
            <Card className="card__form">
              <CardBody>
                <CardTitle>
                  <h2>{t('auth.loginCardTitle')}</h2>
                </CardTitle>
                <CardSubtitle>
                  <p className="text-muted">{t('auth.loginCardSubtitle')}</p>
                </CardSubtitle>
                <Form className="form" onSubmit={this.handleSubmit}>
                  <FormGroup className={(submitted && !email ? ' has-error' : '')}>
                      <Label htmlFor="email">{t('shared.email')}</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="card__form__input__prepend">
                            <FaAt />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" 
                              className="form-control card__form__input" 
                              name="email" value={email} 
                              onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block">
                              {t('shared.email')} {t('shared.isRequired')}
                            </div>
                        }
                      </InputGroup>
                  </FormGroup>
                  <FormGroup className={(submitted && !password ? ' has-error' : '')}>
                      <Label htmlFor="password">{t('shared.password')}</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="card__form__input__prepend">
                            <FaLock />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" 
                              className="form-control card__form__input"
                              name="password" 
                              value={password} 
                              onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">
                              {t('shared.password')} {t('shared.isRequired')}
                            </div>
                        }
                      </InputGroup>
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Button className="btn btn-primary button__default">
                      {t('auth.loginButton')}
                    </Button>
                      {loggingIn &&
                          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      }
                    <ButtonLink 
                      link='/login'
                      linkText={t('auth.forgotPassword')} 
                    />
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            <Card className={styles.card__signup}>
              <CardBody>
                <CardTitle>
                  <h2>{t('auth.signUpCardTitle')}</h2>
                </CardTitle>
                <CardSubtitle>
                  {t('auth.loginCardSubtitle')}
                </CardSubtitle>
                <Link to="/register" className={cx("btn", styles.card__signup__button)}>
                  {t('auth.registerButton')}
                </Link>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
      loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
const translatedLoginPage = withNamespaces()(connectedLoginPage)

export { translatedLoginPage as LoginPage }; 