import { useEffect, useRef, useState } from 'react';
import './languageList.scss'

const LanguageList = ({ selectedLanguage, setSelectedLanguage }) => {
  const [languageOptionsVisible, setLanguageOptionsVisible] = useState(false)

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setLanguageOptionsVisible(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const changeLanguage = (language) => {
    setSelectedLanguage(language)
    setLanguageOptionsVisible(false)
  }

  let optionsClassName = 'language-list__options'
  if (languageOptionsVisible) {
    optionsClassName += ' language-list__options_visible'
  }

  const languageRef = useRef(null);
  useOutsideAlerter(languageRef, 'theme');

  let languageLabel = ''
  switch (selectedLanguage) {
    case 'en':
      languageLabel = 'English'
      break;
    case 'ru':
      languageLabel = 'Русский'
      break;
    default:
      break;
  }

  return (
    <div className='language-list' ref={languageRef}>
      <button
        className='language-list__header'
        onClick={() => setLanguageOptionsVisible(prev => !prev)}
      >
        <div className='language-list__img'>
          <img src={'/language.svg'} alt='language' />
        </div>
        <div className='language-list__label'>
          {languageLabel}
        </div>
      </button>
      <div className={optionsClassName}>
        <button 
          onClick={(e) => changeLanguage('en')}
          className="language-list__option-item"
        >English</button>
        <button 
          onClick={(e) => changeLanguage('ru')}
          className="language-list__option-item"
        >Русский</button>
      </div>
    </div>
  )
}

export default LanguageList;