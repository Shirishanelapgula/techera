import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MiniPage extends Component {
  state = {apiStatus: apiStatusConstants.initial, page: {}}

  componentDidMount() {
    this.getMiniData()
  }

  getMiniData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const courseDetailsApiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(courseDetailsApiUrl, options)
    const resData = await response.json()

    if (response.ok) {
      this.setState({
        page: resData.course_details,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="fail-heading">Oops! Something Went Wrong</h1>
      <p className="fail-para ">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.getMiniData}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="failure-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {page} = this.state

    return (
      <div className="success-container">
        <img src={page.image_url} alt={page.name} className="card-image" />
        <div>
          <h1 className="success-heading">{page.name}</h1>
          <p className="success-para">{page.description}</p>
        </div>
      </div>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state

    switch (true) {
      case apiStatus === apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatus === apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatus === apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return ''
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="main">{this.renderContent()}</div>
      </>
    )
  }
}

export default MiniPage
