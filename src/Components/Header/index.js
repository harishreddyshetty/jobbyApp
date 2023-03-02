import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookie from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const renderLargeView = () => (
    <nav className="nav-bar-lg">
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

  const renderSmallView = () => (
    <nav className="nav-bar-sm">
      <Link to="/">
        <img
          className="header-website-logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>
      <ul className="nav-items-container">
        <Link className="remove-underline" to="/">
          <li>
            <AiFillHome className="icons" />
          </li>
        </Link>
        <Link className="remove-underline" to="/jobs">
          <li className="nav-items">
            <BsFillBriefcaseFill className="icons" />
          </li>
        </Link>
        <li className="">
          <button
            className="logout-btn-icon"
            onClick={onClickLogout}
            type="button"
          >
            <FiLogOut />
          </button>
        </li>
      </ul>
    </nav>
  )

  return (
    <>
      {renderSmallView()}
      {renderLargeView()}
    </>
  )
}

export default withRouter(Header)
