import React, { ReactNode } from "react";

interface ISearchBar extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

const Searchbar = ({ icon, ...props }: ISearchBar) => {
  return (
    <div className="flex relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          {icon}
        </div>
      )}
      <input
        {...props}
        className="pl-8 pr-4 py-2 rounded-md outline-gray-300"
      />
    </div>
  );
};

export default Searchbar;
