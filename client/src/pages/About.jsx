import React from 'react'

const about = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
    <div className='max-w-2xl mx-auto p-3 text-center'>
      <div>
        <h1 className='text-3xl font font-semibold text-center my-7'>
          About Aryan's Blog
        </h1>
        <div className='text-md text-gray-500 flex flex-col gap-6'>
          <p>
            Welcome to Aryans's Blog! This blog was created by Aryan Birkhani
            as a personal project to share his thoughts and ideas with the
            world.
          </p>
          <p>
          Discover the perfect blend of inspiration and flavor! Here, we share uplifting lifestyle tips, motivational insights, 
          and mouthwatering recipes to elevate your everyday life. 
          </p>
          <p>
          Whether you're seeking encouragement to chase your dreams, looking for ways to bring balance to your routine, or searching for a delicious new dish to try, you've come to the right place. Join us on this journey of growth, positivity, and culinary creativity. Let's inspire and savor life's best moments together!
          </p>
        </div>
      </div>
    </div>
  </div>
);
}

export default about