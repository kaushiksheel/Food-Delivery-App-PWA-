import React, { FC, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/Firebase";

export const UserDropdown: FC<{ imgSrc: string }> = ({ imgSrc }) => {
  const [dropdownActive, setDropdownActive] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((e) => alert(e));
  };

  return (
    <>
      <div
        onClick={() => setDropdownActive((prev) => prev != true)}
        className="flex items-center space-x-2"
      >
        <img
          src={imgSrc}
          alt="user"
          className="w-[30px] h-[30px] object-cover rounded-full cursor-pointer"
        />
        {dropdownActive ? (
          <ChevronUpIcon width={15} height={15} className="cursor-pointer" />
        ) : (
          <ChevronDownIcon width={15} height={15} className="cursor-pointer" />
        )}
      </div>
      {dropdownActive && (
        <div className="absolute border mt-3 p-4 shadow-lg top-50">
          <p
            className="text-2xl font-medium cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      )}
    </>
  );
};
