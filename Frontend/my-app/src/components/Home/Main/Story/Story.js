import React, { useState, useEffect } from 'react';
import './Story.css';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';


const Story = ({ stories, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
      } else {
        onClose();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentStoryIndex, stories, onClose]);

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      onClose();
    }
  };
  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      onClose();
    }
  };
  console.log(stories);

  return (

    <div className="story-container">
      <div className='prev navi'>
      {currentStoryIndex > 0 && (
      <button className='btn btn-primary'  onClick={handlePreviousStory}> <BsChevronLeft /></button>
    )}
        
        {/* <button className='btn ' onClick={handleNextStory}> <BsChevronRight /></button> */}
      </div>
      <div  className='image'>
        <img src={stories[currentStoryIndex]} alt={`Story ${currentStoryIndex + 1}`} />
      </div>
      <div className='next navi' >
        <button className='btn btn-primary ' onClick={handleNextStory}> <BsChevronRight /></button>
      </div>


    </div>

  );
};

export default Story;
