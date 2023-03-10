import './index.css'

const RepositoryItem = props => {
  const {repositoryItemDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryItemDetails

  return (
    <li className="repositoryItem">
      <img src={avatarUrl} alt={name} className="avatarImg" />
      <div>
        <h1 className="repositoryName">{name}</h1>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p className="count">{`${starsCount} stars`}</p>
        </div>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p className="count">{`${forksCount} forks`}</p>
        </div>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p className="count">{`${issuesCount} issues`}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
