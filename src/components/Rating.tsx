import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";

export const Rating: FC<{ rating: number | string; isVeg: boolean }> = ({
  rating,
  isVeg,
}) => {
  return (
    // fix later
    <div
      style={{
        backgroundColor: isVeg ? "green" : "#ED4C67",
      }}
      className={`flex items-center gap-2 border p-1 px-2 bg-${
        isVeg ? "green-500" : "customRed"
      } text-white rounded-xl border-none`}
    >
      <p className="text-xl">{rating}</p>
      <StarIcon width={18} height={18} />
    </div>
  );
};
