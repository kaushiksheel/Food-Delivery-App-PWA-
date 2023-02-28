import React,{FC,ReactNode} from 'react'
import { Scrollbars } from 'react-custom-scrollbars';

export const CustomScrollbar:FC<{children:ReactNode,height:number}> = ({children,height}) => {
  return (
    <Scrollbars style={{height }} autoHide>
    {children}
  </Scrollbars>
  )
}
