import React from 'react'
import { FaBowlingBall } from 'react-icons/fa';

function LoadingView() {
  return (
    <div className='spinner fadein'>
      <FaBowlingBall />
    </div>
  )
}

export { LoadingView }
