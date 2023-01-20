import React, { useRef } from 'react';

function Player() {
  
  return (
    <div>
      <video className='player' autoPlay>
        <source src="https://j4pro.com/upload/ecoshopping.mp4" type="video/mp4"/>
      </video>
    </div>
  );
}

export default Player;
