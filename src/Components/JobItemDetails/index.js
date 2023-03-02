import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    similarJobsList: [],
    apiStatus: apiStatusConstraints.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstraints.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const JobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        title: data.job_details.title,
        rating: data.job_details.rating,
        location: data.job_details.location,
        employmentType: data.job_details.employment_type,
        packagePerAnnum: data.job_details.package_per_annum,
        jobDescription: data.job_details.job_description,
        id: data.job_details.id,
        skills: data.job_details.skills.map(eachSkill => ({
          name: eachSkill.name,
          imageUrl: eachSkill.image_url,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
      }
      const similarJobs = data.similar_jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        title: eachJob.title,
        rating: eachJob.rating,
      }))

      this.setState({
        jobItemDetails: JobDetails,
        apiStatus: apiStatusConstraints.success,
        similarJobsList: similarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  renderSimilarJobs = () => {
    const {similarJobsList} = this.state

    return (
      <div className="similarJobs-container">
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobsList.map(eachJobItem => (
            <SimilarJobs jobDetails={eachJobItem} key={eachJobItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {jobItemDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobItemDetails

    return (
      <div>
        <div className="job-details-page">
          <div className="logo-title-section">
            <img
              className="company-logo"
              alt="job details company logo"
              src={companyLogoUrl}
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <p className="job-rating">
                <AiFillStar className="star" />
                {rating}
              </p>
            </div>
          </div>
          <div className="job-details-container">
            <p className="location-container">
              <MdLocationOn className="location-icon" />
              {location}
            </p>
            <p className="internship-container">{employmentType}</p>
            <p className="income">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-heading-container">
            <h1 className="description-heading">Description</h1>
            <a href={companyWebsiteUrl} className="visit-text">
              Visit <FaExternalLinkAlt className="link-icon" />
            </a>
          </div>

          <p className="job-details-description">{jobDescription}</p>
          <h1 className="sub-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(eachSkill => (
              <li className="skill-list-item">
                <img
                  className="skill-logo"
                  alt={eachSkill.name}
                  src={eachSkill.imageUrl}
                />
                <p className="skills-name-text">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="sub-heading">Life at Company</h1>
          <div className="life-at-company-section">
            <p className="life-at-company-details">
              {lifeAtCompany.description}
            </p>
            <img
              className="life-at-company"
              alt="life at company"
              src={lifeAtCompany.imageUrl}
            />
          </div>
        </div>
        {this.renderSimilarJobs()}
      </div>
    )
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSpecificJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstraints.success:
        return this.renderJobDetails()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobDetails-bg">
        <Header />
        {this.renderSpecificJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
