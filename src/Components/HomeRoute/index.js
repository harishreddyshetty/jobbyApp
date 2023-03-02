import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const HomeRoute = () => (
  <div className="home-route-page">
    <Header />
    <div className="home-page-section">
      <h1 className="home-page-heading">
        Find The Job That <br />
        Fits Your Life
      </h1>
      <p className="home-page-description">
        Millions of people are searching for jobs, salary information, company
        reviews.Find the job that fits your abilities and potential
      </p>
      <Link to="/jobs">
        <button className="findJobs-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default HomeRoute
