import React, { Component } from 'react'
import { Button,
         Card, CardHeader, CardBody,
         CustomInput, Form, FormGroup, 
         Input, InputGroup, InputGroupAddon, InputGroupText, 
         Label } from 'reactstrap';
import { FaAt, FaLock, FaUser } from 'react-icons/fa';

import '../../../../App/App.css'

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  state = {
    user: {
        email: '',
        username: '',
        password: '',
        role: '',
        takesPart: true
    },
    submitted: false
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(value)
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('submit')
  }

  render() {
    const { user, submitted } = this.state;
    const ROLES = ['registered', 'admin']

    return (
      <Card className="card__form">
        <CardHeader tag="h2">
          User Form
        </CardHeader>
        <CardBody>
          <Form name="form" onSubmit={this.handleSubmit}>
            <FormGroup className={(submitted && !user.email ? ' has-error' : '')}>
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
                  {submitted && !user.email &&
                      <div className="help-block">Email is required</div>
                  }
                </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !user.username ? ' has-error' : '')}>
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
                  {submitted && !user.username &&
                      <div className="help-block">Username is required</div>
                  }
                </InputGroup>
            </FormGroup>
            <FormGroup className={(submitted && !user.password ? ' has-error' : '')}>
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
                  {submitted && !user.password &&
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
                  >
                    {ROLES.map(el => {
                      return <option>{el}</option>
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

export { UserForm }