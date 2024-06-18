import React from "react";

export interface IBanner {
  src: string | StaticImport;
  alt: string;
  containerClassName?: string;
}

export interface IInterestBadge {
  label: string;
}
