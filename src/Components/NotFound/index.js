import './index.css'

const NotFound = () => (
  <div className="not-found-bg">
    <img
      alt="not found"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
    />
    <h1 className="page-heading">Page Not Found</h1>
    <p className="page-description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
