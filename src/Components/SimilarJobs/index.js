import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = jobDetails

  return (
    <li className="similar-job-list-item">
      <div className="top-section">
        <img
          className="company-logo"
          alt="similar job company logo"
          src={companyLogoUrl}
        />
        <div>
          <h1 className="title">{title}</h1>
          <div>
            <p className="rating-container">
              <AiFillStar className="star-icon" />
              {rating}
            </p>
          </div>
        </div>
      </div>

      <h1 className="similar-jobs-description">Description</h1>
      <p className="desc">{jobDescription}</p>
      <div className="bottom-section">
        <p className="location-container">
          <MdLocationOn className="location-icon" />
          {location}
        </p>
        <p className="employment-type">
          {/* <BsFillBagDashFill /> */}
          {employmentType}
        </p>
      </div>
    </li>
  )
}

export default SimilarJobs
