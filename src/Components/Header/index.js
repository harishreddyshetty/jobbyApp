import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  //   const onClickLogo = () => {
  //     const {history} = props
  //     history.replace('/')
  //   }

  return (
    <nav className="nav-bar">
      <Link to="/">
        <img
          className="header-website-logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>
      <ul className="nav-items-container">
        <Link className="remove-underline" to="/">
          <li className="nav-items">Home</li>
        </Link>
        <Link className="remove-underline" to="/jobs">
          <li className="nav-items">Jobs</li>
        </Link>
        <li className="btn-list-item">
          <button className="logOut-btn" onClick={onClickLogout} type="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
