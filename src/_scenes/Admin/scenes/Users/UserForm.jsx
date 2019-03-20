import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next';

import { Button,
         Card, CardHeader, CardBody,
         CustomInput, Form, FormGroup, 
         Input, InputGroup, InputGroupAddon, InputGroupText, 
         Label } from 'reactstrap';
import { FaAt, FaLock, FaUser } from 'react-icons/fa';

import '../../../../App/App.css'
import { userActions } from '../../../../_actions';

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    isEditing: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
  }

  state = {
    email: this.props.user.attributes.email,
    role: this.props.user.attributes.role,
    submitted: false,
    takesPart: this.props.user.attributes.take_part,
    type: this.props.user.type,
    userId: this.props.user.id,
    username: this.props.user.attributes.username
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault()

    const userId = this.state.userId
    const isEditing = this.props.isEditing
    console.log(this.state)
    const { email, username, password, role, takesPart } = this.state
    const { dispatch } = this.props;

    let user = {
      data: {
        type: 'users',
        attributes: {
          email: email,
          username: username,
          role: role,
          take_part: takesPart
        }
      }
    }

    if (isEditing) {
      dispatch(userActions.updateUser(user, userId))
    } else {
      if (email && username && password && role) {
        Object.assign(user.data.attributes, {password: password})
        dispatch(userActions.addUser(user))
      }
    }
  }

  setButtonName(t) {
    if (this.props.isEditing) {
      return t('admin.userForm.updateUserButton')
    } else {
      return t('admin.userForm.addUserButton')
    }
  }

  render() {
    const { email, username, password, role, takesPart, submitted } = this.state;
    const ROLES = [
        {value: 'registered'},
        {value: 'admin'}
    ]
    const { t } = this.props

    return (
      <Card className="card__form">
        <CardHeader tag="h2">
          {t('admin.userForm.title')}
        </CardHeader>
        <CardBody>
          <Form name="form" onSubmit={this.handleSubmit}>
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
                         name="email" 
                         onChange={this.handleInputChange}
                         value={email}
                  />
                  {submitted && !email &&
                      <div className="help-block">{t('shared.email')} {t('shared.isRequired')}</div>
                  }
                </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !username ? ' has-error' : '')}>
                <Label htmlFor="username">{t('shared.username')}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                      <InputGroupText className="card__form__input__prepend">
                        <FaUser />
                      </InputGroupText>
                    </InputGroupAddon>
                  <Input type="text" 
                         className="form-control card__form__input"
                         name="username" 
                         onChange={this.handleInputChange}
                         value={username}
                  />
                  {submitted && !username &&
                      <div className="help-block">{t('shared.username')} {t('shared.isRequired')}</div>
                  }
                </InputGroup>
            </FormGroup>
            { !this.props.isEditing && 
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
                         onChange={this.handleInputChange} 
                  />
                  {submitted && !password &&
                      <div className="help-block">{t('shared.password')} {t('shared.isRequired')}</div>
                  }
                </InputGroup>
              </FormGroup>
            }
            <FormGroup>
                <Label htmlFor="role">{t('shared.role')}</Label>
                <InputGroup>
                  <Input className="form-control card__form__input"
                         name="role" 
                         onChange={this.handleInputChange}
                         type="select" 
                         value={role}
                  >
                    <option value="" disabled>Select role</option>
                    {ROLES.map((el, index) => {
                      return <option
                                key={index + 1}
                                value={el.value}>
                                  { el.value }
                              </option>
                    })}
                  </Input>
                </InputGroup>
            </FormGroup>
            <FormGroup check inline>
              <div>
                <CustomInput
                  checked={takesPart ? true : false}
                  id="takesPart"
                  inline
                  label={t('shared.takesPart')}
                  name="takesPart"
                  onChange={this.handleInputChange}
                  type="checkbox"
                  value={takesPart} 
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Button>
                {this.setButtonName(t)}
              </Button>
            </FormGroup>
        </Form>
      </CardBody>
    </Card>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedUserForm = connect(mapStateToProps)(UserForm);
const translatedUserForm = withNamespaces()(connectedUserForm)

export { translatedUserForm as UserForm };