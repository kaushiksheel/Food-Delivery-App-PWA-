import React, { FC } from "react";

export const VegIcon: FC<{ isVeg: number }> = ({ isVeg }) => {
  return (
    <div
    style={{
        
        border:isVeg===1?'1px solid green':'1px solid red'
    }}
      className={`w-6 h-6 border-2 border-${
        isVeg ? "green-600" : "red-600"
      } grid place-content-center`}
    >
      <div
      style={{
        backgroundColor:isVeg===1?'green':'red'
    }}
        className={`w-2 h-2  rounded-full`}
      ></div>
    </div>
  );
};
