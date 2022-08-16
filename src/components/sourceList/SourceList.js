import React, { useEffect, useRef, useState } from 'react';
import DraggableItem from '../draggableItem/DraggableItem';
import './sourceList.scss'

const SourceList = ({letters, handleLetters, refs, throwPositions, solvedRight, solvedWrong}) => {
  const [statePositions, setStatePositions] = useState([])
  const [contPos, setContPos] = useState({})
  const [takenRefs, setTakenRefs] = useState([])

  const changePosition = (id, ref, refIndex) => {
    // ставит букву на ref = {x, y}
    const prevLetterPosition = letters[id].pos
    let prevLetterPositionId
    if (!prevLetterPosition) {
      prevLetterPositionId = refs.length / 2 + id
    } else {
      prevLetterPositionId = refs.findIndex(el => Math.abs(el.x - prevLetterPosition.x) < 1 && Math.abs(el.y - prevLetterPosition.y) < 1)
    }
    setTakenRefs(prev => {
      const newState = [...prev]
      newState[refIndex] = true
      newState[prevLetterPositionId] = false
      return newState
    })

    setStatePositions(prev => {
      const newState = [...prev]
      newState[id] = {x: ref.x, y: ref.y}
      return newState
    })
    handleLetters(id, {x: ref.x, y: ref.y})
  }

  const setPosition = (e, data, id) => {
    const nodeX = data.node.getBoundingClientRect().x
    const nodeY = data.node.getBoundingClientRect().y

    const selfDiffX = Math.abs(statePositions[id].x - nodeX)
    const selfDiffY = Math.abs(statePositions[id].y - nodeY)

    if (selfDiffX < 2 && selfDiffY < 2) {
      // POSITION DID NOT CHANGED
      const semiLength = refs.length / 2
      if (Math.abs(statePositions[id].y - refs[0].y) < 1) {
        // first row
        let freeIndex = semiLength
        while (takenRefs[freeIndex] && freeIndex < refs.length) {
          freeIndex ++
        }
        changePosition(id, refs[freeIndex], freeIndex)
      } else if (Math.abs(statePositions[id].y - refs[refs.length - 1].y) < 1) {
        // second row
        let freeIndex = 0
        while (takenRefs[freeIndex] && freeIndex < semiLength) {
          freeIndex ++
        }
        changePosition(id, refs[freeIndex], freeIndex)
      }
      return null
    }
    
    refs.forEach((ref, refIndex) => {
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
          changePosition(id, ref, refIndex)
        }
      }
    })  
  }

  const sourceList = useRef(null)
  useEffect(() => {
    setContPos({x: sourceList.current.getBoundingClientRect().x, y: sourceList.current.getBoundingClientRect().y})
  }, [])

  useEffect(() => {
   if (throwPositions) {
    const refsSemiCount = refs.length / 2
    const newState = refs.map((ref, i) =>  i >= refsSemiCount)
    setTakenRefs(newState)
    
    setStatePositions([])
    for (let i = refs.length / 2; i < refs.length; i++) {
      setStatePositions(prev => [...prev, refs[i]])
    }
   }
  }, [throwPositions])

  useEffect(() => {
    const refsSemiCount = refs.length / 2
    const newState = refs.map((ref, i) =>  i >= refsSemiCount)
    setTakenRefs(newState)
    
    setStatePositions([])
    for (let i = refs.length / 2; i < refs.length; i++) {
      setStatePositions(prev => [...prev, refs[i]])
    }
  }, [refs])

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