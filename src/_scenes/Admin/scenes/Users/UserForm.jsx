import React, { Component } from 'react'
import { connect } from 'react-redux'

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

  state = {
    email: '',
    username: '',
    password: '',
    role: 'registered',
    takesPart: true,
    submitted: false
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
    const { email, username, password, role } = this.state
    const { dispatch } = this.props;

    let user = {
      data: {
        attributes: {
          email: email,
          username: username,
          password: password,
          role: role
        }
      }
    }
    if (email && username && password && role) {
      dispatch(userActions.addUser(user))
    }
  }

  render() {
    const { email, username, password, submitted } = this.state;
    const ROLES = [
        {value: 'registered'},
        {value: 'admin'}
    ]

    return (
      <Card className="card__form">
        <CardHeader tag="h2">
          User Form
        </CardHeader>
        <CardBody>
          <Form name="form" onSubmit={this.handleSubmit}>
            <FormGroup className={(submitted && !email ? ' has-error' : '')}>
                <Label htmlFor="email">Email</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="card__form__input__prepend">
                      <FaAt />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" 
                         className="form-control card__form__input" 
                         name="email" 
                         onChange={this.handleInputChange} />
                  {submitted && !email &&
                      <div className="help-block">Email is required</div>
                  }
                </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !username ? ' has-error' : '')}>
                <Label htmlFor="username">Username</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                      <InputGroupText className="card__form__input__prepend">
                        <FaUser />
                      </InputGroupText>
                    </InputGroupAddon>
                  <Input type="text" 
                         className="form-control card__form__input"
                         name="username" 
                         onChange={this.handleInputChange} />
                  {submitted && !username &&
                      <div className="help-block">Username is required</div>
                  }
                </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !password ? ' has-error' : '')}>
                <Label htmlFor="password">Password</Label>
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
                      <div className="help-block">Password is required</div>
                  }
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="role">Role</Label>
                <InputGroup>
                  <Input type="select" 
                         className="form-control card__form__input"
                         name="role" 
                         onChange={this.handleInputChange}
                         value={this.state.role}
                  >
                    {ROLES.map((el, index) => {
                      return <option
                                key={index + 1}
                                value={el.value}>
                                  {  el.value}
                              </option>
                    })}
                  </Input>
                </InputGroup>
            </FormGroup>
            <FormGroup check inline>
              <div>
                <CustomInput
                  id="takesPart"
                  type="checkbox"
                  name="takesPart"
                  label="Takes part"
                  onChange={this.handleInputChange} 
                  inline
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Button>
                Add
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

export { connectedUserForm as UserForm };