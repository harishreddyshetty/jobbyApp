import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileComponent extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusConstraints.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstraints.inProgress})

    const jwtToken = Cookie.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstraints.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-bg">
        <img alt="profile" src={profileImageUrl} />
        <h1 className="username">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  onClickBtn = () => {
    this.getProfileDetails()
  }

  renderFailure = () => (
    <div className="profile-failure">
      <button onClick={this.onClickBtn} type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstraints.success:
        return this.renderProfile()
      case apiStatusConstraints.inProgress:
        return this.renderLoader()
      case apiStatusConstraints.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderProfileDetails()}</>
  }
}

export default ProfileComponent
