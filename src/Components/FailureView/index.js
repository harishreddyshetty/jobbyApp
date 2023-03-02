import './index.css'

const FailureView = props => {
  const {onClickRetry} = props

  const onClickBtn = () => {
    onClickRetry()
  }

  return (
    <div className="failureContainer">
      <img
        className="failure-Img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={onClickBtn} type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )
}

export default FailureView
