import React, { useState } from 'react';
import DraggableItem from '../draggableItem/DraggableItem';
import './sourceList.scss'

const SourceList = () => {

  const [letterPositions, setLetterPositions] = useState([
    {taken: false, pos: {x: 100, y: -70}},
    {taken: false, pos: {x: 200, y: -70}},
    {taken: false, pos: {x: 300, y: -70}},
    {taken: true, pos: {x: 100, y: 0}},
    {taken: true, pos: {x: 200, y: 0}},
    {taken: true, pos: {x: 300, y: 0}},
  ])

  const [letters, setLetters] = useState([
    {text: 'A', position: {x: 100, y: 0}},
    {text: 'B', position: {x: 200, y: 0}},
    {text: 'C', position: {x: 300, y: 0}}
  ])

  const setPosition = (e, data, letter) => {
    console.group('drag end')
    console.log(data.x)
    console.log(data.y)
    console.log(letter)
    console.groupEnd()

    const index = letters.findIndex(el => el.text === letter)

    letterPositions.forEach(letter => {
      const diffX = Math.abs(letter.pos.x - data.x)
      const diffY = Math.abs(letter.pos.y - data.y)
      if (diffX < 20 && diffY < 20) {
        setLetters(prev => {
          const newState = [...prev]
          newState[index].position = {x: letter.pos.x, y: letter.pos.y}
          return newState
        })
      }
      
    })

    
  }

  return (
    <div className='source-list'>
      {letters.map((letter, i) => {
        return <DraggableItem 
          key={i} 
          style={{position: 'absolute'}}
          letter={letter.text} 
          position={letter.position} 
          setPosition={setPosition} />
      })}
      
    </div>
  );
};

export default SourceList;