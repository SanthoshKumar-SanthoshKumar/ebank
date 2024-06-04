import {Component} from 'react'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'
import './style.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    setMessage: false,
    errorMessage: '',
  }

  handleuserIdChange = event => {
    this.setState({userId: event.target.value})
  }

  handlePinChage = event => {
    this.setState({pin: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  onFailureLogin = errorMessage => {
    this.setState({
      setMessage: true,
      errorMessage,
    })
  }

  onSuccessBankLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state

    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  render() {
    const {userId, pin, errorMessage, setMessage} = this.state
    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="container">
          <div className="login-container">
            <div className="img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
                alt="website login"
              />
            </div>
            <div className="input-container">
              <h1 className="welcome-heading">Welcome Back!</h1>
              <form
                className="form-container"
                onSubmit={this.onSuccessBankLogin}
              >
                <div>
                  <label htmlFor="userId">User ID</label>
                  <input
                    id="userId"
                    type="text"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={this.handleuserIdChange}
                  />
                </div>
                <div>
                  <label htmlFor="pin">PIN</label>
                  <input
                    type="password"
                    id="pin"
                    placeholder="Enter PIN"
                    value={pin}
                    onChange={this.handlePinChage}
                  />
                </div>
                <button type="submit">Login</button>
              </form>
              <div>
                {setMessage === true && (
                  <p className="required">{errorMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Login
