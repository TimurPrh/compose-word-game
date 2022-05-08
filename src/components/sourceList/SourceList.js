import React, { useEffect, useRef, useState } from 'react';
import DraggableItem from '../draggableItem/DraggableItem';
import './sourceList.scss'

const SourceList = ({letters, handleLetters, refs, throwPositions, solvedRight, solvedWrong}) => {
  const [statePositions, setStatePositions] = useState([])
  const [contPos, setContPos] = useState({})

  const setPosition = (e, data, id) => {
    const nodeX = data.node.getBoundingClientRect().x
    const nodeY = data.node.getBoundingClientRect().y
    
    refs.forEach(ref => {
      const diffX = Math.abs(ref.x - nodeX)
      const diffY = Math.abs(ref.y - nodeY)
      if (diffX < 25 && diffY < 25) {
        let exist = false
        statePositions.forEach(pos => {
          if (pos.x === ref.x && pos.y === ref.y) {
            exist = true
          }
        })
        if (!exist) {
          setStatePositions(prev => {
            const newState = [...prev]
            newState[id] = {x: ref.x, y: ref.y}
            return newState
          })
          handleLetters(id, {x: ref.x, y: ref.y})
        }
      }
    })  
  }

  const sourceList = useRef(null)
  useEffect(() => {
    setContPos({x: sourceList.current.getBoundingClientRect().x, y: sourceList.current.getBoundingClientRect().y})
  }, [])

  useEffect(() => {
    setStatePositions([])
    for (let i = refs.length / 2; i < refs.length; i++) {
      setStatePositions(prev => [...prev, refs[i]])
    }
  }, [refs, throwPositions])

  console.group('render source list')
  console.log(refs)
  console.groupEnd()

  return (
    <div className='source-list' ref={sourceList}>
      {letters.map((letter, i) => {
        return <DraggableItem
          key={letter.id}
          solvedRight={solvedRight}
          solvedWrong={solvedWrong}
          id={letter.id}
          text={letter.text}
          position={statePositions.length > 0 ? {x: statePositions[i].x - contPos.x, y: statePositions[i].y - contPos.y} : null}
          setPosition={setPosition}
          />
      })}
      
    </div>
  );
};

export default SourceList;