import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import './draggableItem.scss'

const DraggableItem = ({letter, position, setPosition, getCoors}) => {

  // const [position, setPosition] = useState({x: 10, y:10})

  const ref = useRef(null)

  useEffect(() => {
    console.group('get coors')
    console.log(ref.current)
    console.groupEnd()
  }, [])

  const handleStart = (e, data) => {

  }

  const handleDrag = (e, data) => {
    // console.log(data.y)
  }

  const handleStop = (e, data) => {
    setPosition(e, data, letter)
  }

  return (
    <Draggable
        // axis="x"
        ref={ref}
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        // position={null}
        position={position}
        grid={[1, 1]}
        scale={1}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
        >
        <div>
          <div className="handle">{letter}</div>
        </div>
      </Draggable>
  );
};

export default DraggableItem;