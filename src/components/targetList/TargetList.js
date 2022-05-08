import React from 'react';
import FixedItem from '../fixedItem/FixedItem';
import './targetList.scss'

const TargetList = ({letters, getCoors}) => {

  return (
    <div className='target-list'>
      {letters.map((letter, i) => {
        return <FixedItem key={i} getCoors={getCoors}/>
      })}
    </div>
  );
};

export default TargetList;