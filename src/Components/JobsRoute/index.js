import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobItems from '../JobItems'
import FailureView from '../FailureView'

import Header from '../Header/index'
import ProfileComponent from '../ProfileComponent'
import FiltersComponent from '../FiltersComponent'
import './index.css'
// import AllJobs from '../AllJobs'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NO_JOBS',
}

class JobsRoute extends Component {
  state = {
    jobDetailsList: [],
    employmentType: [],
    minPackage: '',
    searchInput: '',
    apiStatus: apiStatusConstraints.initial,
  }

  componentDidMount() {
    this.getAllJobDetails()
  }

  getAllJobDetails = async () => {
    const {employmentType, minPackage, searchInput} = this.state
    const employmentTypeString = employmentType.join(',')

    this.setState({apiStatus: apiStatusConstraints.inProgress})
    const jwtToken = Cookie.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${minPackage}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (data.jobs.length === 0) {
      this.setState({apiStatus: apiStatusConstraints.noJobs})
    } else if (response.ok) {
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

  onClickRetry = () => {
    this.getAllJobDetails()
  }

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobs = () => (
    <div className="noJobsContainer">
      <img
        className="noJobs-img"
        alt="no jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs.Try other filters
      </p>
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
      case apiStatusConstraints.noJobs:
        return this.renderNoJobs()
      default:
        return null
    }
  }

  updateSearch = event => {
    this.setState({searchInput: event.target.value}, this.getAllJobDetails)
  }

  SearchJobs = () => {
    this.getAllJobDetails()
  }

  updateEmploymentType = value => {
    const {employmentType} = this.state
    if (employmentType.includes(value)) {
      const filteredArray = employmentType.filter(
        eachType => eachType !== value,
      )
      this.setState({employmentType: filteredArray}, this.getAllJobDetails) // this.getAllJobDetails
    } else {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, value],
        }),
        this.getAllJobDetails,
      )
    }
  }

  updateSalary = value => {
    this.setState({minPackage: value}, this.getAllJobDetails)
  }

  render() {
    const {searchInput} = this.setState
    return (
      <div className="jobs-route-bg">
        <Header />
        <div className="jobs-page-container">
          <div className="jobs-route-section">
            {/* left side section */}
            <div className="leftSide-banner-section">
              <div className="searchContainer-sm">
                <input
                  className="search-input-element-sm"
                  value={searchInput}
                  onChange={this.updateSearch}
                  placeholder="search"
                  type="search"
                />
                <button
                  className="search-btn"
                  onClick={this.SearchJobs}
                  type="button"
                  data-testid="searchButton"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              <ProfileComponent />
              <FiltersComponent
                employmentData={employmentTypesList}
                salaryRangesList={salaryRangesList}
                updateEmploymentType={this.updateEmploymentType}
                updateSalary={this.updateSalary}
              />
              <hr />
            </div>
          </div>
          <div className="jobs-list-section">
            <div className="searchContainer">
              <input
                className="search-input-element"
                value={searchInput}
                onChange={this.updateSearch}
                placeholder="search"
                type="search"
              />
              <button
                className="search-btn"
                onClick={this.SearchJobs}
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            {this.renderAllJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsRoute
