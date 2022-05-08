import React from 'react';
import FixedItem from '../fixedItem/FixedItem';
import './placeList.scss'

const PlaceList = ({letters, getRef, solvedRight, solvedWrong}) => {

  let className = 'place-list'
  if (solvedWrong) {
    className += ' place-list_not-solved'
  }
  if (solvedRight) {
    className += ' place-list_solved'
  }

  return (
    <div 
      style={{gridTemplateColumns: `repeat(${letters.length}, 35px)`}}
      className={className}>
      {letters.map(letter => {
        return (
          <FixedItem key={letter.id} getRef={getRef} />
        )
      })}
      {letters.map(letter => {
        return (
          <FixedItem key={letter.id + 100} getRef={getRef} />
        )
      })}
    </div>
  );
};

export default PlaceList;