import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Item from '../Item'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, data: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const coursesApiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(coursesApiUrl, options)
    const resData = await response.json()

    if (response.ok) {
      this.setState({
        data: resData.courses,
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
      <button type="button" className="retry-button" onClick={this.getData}>
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
    const {data} = this.state

    return (
      <div>
        <h1 className="heading">Courses</h1>
        <ul className="items">
          {data.map(each => (
            <Item key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderContext = () => {
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
        <div className="main">{this.renderContext()}</div>
      </>
    )
  }
}

export default Home
