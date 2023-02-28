import React, { FC, ReactNode } from 'react'

export const Container:FC<{children:ReactNode}> = ({children}) => {
  return (
    <div className='max-w-container px-5 mx-auto' >{children}</div>
  )
}
