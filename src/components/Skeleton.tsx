import React from 'react'

export const Skeleton = () => {
  return (
    
<div role="status" className="w-full animate-pulse">
    <div className=" bg-gray-200 rounded-3xl dark:bg-gray-700 w-full h-[200px] mb-4"></div>
    <div className="h-5 bg-gray-200 rounded-xl dark:bg-gray-700 w-full mb-2.5"></div>
    <div className="h-5 bg-gray-200 rounded-xl dark:bg-gray-700 w-full mb-2.5"></div>
    <div className="h-5 bg-gray-200 rounded-xl dark:bg-gray-700 w-full mb-2.5"></div>
    
</div>

  )
}
