import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'

import './index.css'

const JobItems = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    id,
  } = jobDetails

  return (
    <Link className="remove-underline horizontal-line" to={`jobs/${id}`}>
      <li className="job-details-card">
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
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItems
