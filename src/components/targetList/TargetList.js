import React from 'react';
import './targetList.scss'

const TargetList = () => {

  const positions = [
    {x: 100, y: 0},
    {x: 200, y: 0},
    {x: 300, y: 0},
  ]

  return (
    <div className='target-list'>
      {positions.map((position, i) => {
        return (
          <div
            key={i}
            className='target-list__item'
            style={{left: position.x}}
          >

          </div>
        )
      })}
    </div>
  );
};

export default TargetList;