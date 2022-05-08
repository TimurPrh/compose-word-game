import React from 'react';
import './header.scss'

const Header = ({img, nextWord, resetWord, solvedRight}) => {
  return (
    
    <div className='header'>
      <h1 className='header__label'>Собери слово</h1>
      <div className='header__wrapper'>
        <div className='header__img'>
          <img src={`/icons/${img}.svg`} alt={img}/>
        </div>
        <div className='header__buttons'>
          <button 
            onClick={resetWord}
            className='header__button'>
            Сброс
          </button>
          <button 
            disabled={solvedRight}
            onClick={nextWord}
            className='header__button header__button_filed'>
            Следующее слово
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;