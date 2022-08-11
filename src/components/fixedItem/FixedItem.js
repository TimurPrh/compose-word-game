import React, { useEffect, useRef } from 'react';

const FixedItem = ({ getRef }) => {

  const ref = useRef(null)

  useEffect(() => {
    getRef(ref.current.getBoundingClientRect())
  }, [])

  return (
    <div
      ref={ref}
      className='place-list__item'
    >
      
    </div>
  );
};

export default FixedItem;