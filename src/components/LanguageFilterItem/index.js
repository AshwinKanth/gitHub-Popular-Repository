import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onClickLanguage, isActive} = props
  const {language, id} = languageDetails

  const activeButton = isActive ? 'active' : ''

  const onClickLanguageButton = () => {
    onClickLanguage(id)
  }

  return (
    <li className="list_item">
      <button
        className={`button ${activeButton}`}
        type="button"
        onClick={onClickLanguageButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
