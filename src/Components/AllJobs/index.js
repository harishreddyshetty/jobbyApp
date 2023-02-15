import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobItems from '../JobItems'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobs extends Component {
  state = {
    jobDetailsList: [],
    employmentType: '',
    minPackage: '',
    searchInput: '',
    apiStatus: apiStatusConstraints.initial,
  }

  componentDidMount() {
    this.getAllJobDetails()
  }

  getAllJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstraints.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const {employmentType, minPackage, searchInput} = this.state

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minPackage}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = data.jobs.map(eachJobItem => ({
      id: eachJobItem.id,
      companyLogoUrl: eachJobItem.company_logo_url,
      employmentType: eachJobItem.employment_type,
      jobDescription: eachJobItem.job_description,
      location: eachJobItem.location,
      packagePerAnnum: eachJobItem.package_per_annum,
      rating: eachJobItem.rating,
      title: eachJobItem.title,
    }))

    if (response.ok) {
      this.setState({
        jobDetailsList: updatedData,
        apiStatus: apiStatusConstraints.success,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  renderJobsList = () => {
    const {jobDetailsList} = this.state

    return (
      <ul className="jobs-lists-container">
        {jobDetailsList.map(eachJob => (
          <JobItems jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => <FailureView />

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstraints.success:
        return this.renderJobsList()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderAllJobsList()}</>
  }
}

export default AllJobs
