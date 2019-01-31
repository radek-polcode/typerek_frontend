import React, { Component } from 'react'
import { Card, CardHeader, CardBody, CardTitle,
         CustomInput, Form, FormGroup, 
         Input, InputGroup, InputGroupAddon, InputGroupText, 
         Label } from 'reactstrap';
import { FaAt, FaLock, FaUser } from 'react-icons/fa';
import cx from 'classnames';

import styles from './UserForm.module.css'

class UserForm extends Component {
  state = {
    user: {
        email: '',
        username: '',
        password: ''
    },
    submitted: false
  }

  handleSubmit() {

  }

  render() {
    const { user, submitted } = this.state;
    const ROLES = ['registered', 'admin']

    return (
      <Card>
        <CardHeader>
          User Form
        </CardHeader>
        <CardBody>
          <Form name="form" onSubmit={this.handleSubmit}>
            <FormGroup className={(submitted && !user.email ? ' has-error' : '')}>
                <Label htmlFor="email">Email</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className={styles.form__input__prepend}>
                      <FaAt />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" 
                          className={cx("form-control", styles.form__input)} 
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
                      <InputGroupText className={cx(styles.form__input__prepend)}>
                        <FaUser />
                      </InputGroupText>
                    </InputGroupAddon>
                  <Input type="text" 
                          className={cx("form-control", styles.form__input)} 
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
                      <InputGroupText className={styles.form__input__prepend}>
                        <FaLock />
                      </InputGroupText>
                    </InputGroupAddon>
                  <Input type="password" 
                          className={cx("form-control", styles.form__input)} 
                          name="password" 
                          value={user.password} 
                          onChange={this.handleChange} />
                  {submitted && !user.password &&
                      <div className="help-block">Password is required</div>
                  }
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="role">Role</Label>
                <InputGroup>
                  <Input type="select" 
                          className={cx("form-control", styles.form__input)} 
                          name="role" 
                          value={user.password} >
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
                  inline
                />
              </div>
            </FormGroup>
        </Form>
      </CardBody>
    </Card>
    )
  }
}

export { UserForm }