import React from 'react';
import Draggable from 'react-draggable';
import './draggableItem.scss'

const DraggableItem = ({id, text, position, setPosition, solvedRight, solvedWrong}) => {

  let className = 'handle'
  if (solvedWrong) {
    className += ' handle_not-solved'
  }
  if (solvedRight) {
    className += ' handle_solved'
  }

  const handleStart = (e, data) => {

  }

  const handleDrag = (e, data) => {
    // console.log(data.y)
  }

  const handleStop = (e, data) => {
    setPosition(e, data, id)
  }

  return (
    <Draggable
        handle=".handle"
        position={position}
        grid={[1, 1]}
        scale={1}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}>
        <div>
          <div className={className}>{text}</div>
        </div>
      </Draggable>
  );
};

export default DraggableItem;