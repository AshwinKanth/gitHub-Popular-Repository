import Loader from 'react-loader-spinner'

import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstant = {
  initial: 'INITIAl',
  in_progress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    activeOptionId: languageFiltersData[0].id,
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getRepositoryList()
  }

  getRepositoryList = async () => {
    this.setState({apiStatus: apiStatusConstant.in_progress})

    const {activeOptionId} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeOptionId}`,
    )
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        name: eachRepository.name,
        starsCount: eachRepository.stars_count,
        forksCount: eachRepository.forks_count,
        issuesCount: eachRepository.issues_count,
        avatarUrl: eachRepository.avatar_url,
      }))
      this.setState({
        repositoryList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onClickLanguage = id => {
    this.setState({activeOptionId: id}, this.getRepositoryList)
  }

  renderRepositoryList = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repositoryList_container">
        {repositoryList.map(each => (
          <RepositoryItem repositoryItemDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-txt">Something went wrong</h1>
    </div>
  )

  renderRepositoryItems = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderRepositoryList()
      case apiStatusConstant.in_progress:
        return this.renderLoadingView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeOptionId} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="languages-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              languageDetails={eachItem}
              key={eachItem.id}
              onClickLanguage={this.onClickLanguage}
              isActive={activeOptionId === eachItem.id}
            />
          ))}
        </ul>
        {this.renderRepositoryItems()}
      </div>
    )
  }
}

export default GithubPopularRepos
