import React from "react";
import { IInterestBadge } from "../utils/types";

const InterestBadge = ({ label }: IInterestBadge) => {
  return (
    <div className="px-4 py-2 border border-gray-200 rounded-full inline-block hover:border-gray-300 cursor-default">
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default InterestBadge;
