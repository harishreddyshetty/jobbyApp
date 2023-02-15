import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookie from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', loginFailure: false, errorMessage: ''}

  onSuccessSubmit = jwtToken => {
    Cookie.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessSubmit(data.jwt_token)
    } else {
      this.setState({loginFailure: true, errorMessage: data.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderLoginPage = () => {
    const {username, password, loginFailure, errorMessage} = this.state

    return (
      <div className="login-page-bg">
        <div className="login-container">
          <div className="logo-container">
            <img
              className="websiteLogo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>

          <form className="user-inputs-form" onSubmit={this.submitForm}>
            <label className="input-heading" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input-element"
              value={username}
              onChange={this.onChangeUsername}
              id="username"
              type="text"
              placeholder="Username"
            />

            <label className="input-heading" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input-element"
              value={password}
              onChange={this.onChangePassword}
              id="password"
              type="password"
              placeholder="Password"
            />
            {loginFailure && <p className="error-msg">*{errorMessage}</p>}

            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  render() {
    const token = Cookie.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return <>{this.renderLoginPage()}</>
  }
}

export default LoginPage
