"use client";

import React, { useState } from "react";
import { Logo as FallbackLogo } from "./icons";

export const CustomLogo: React.FC<{ className?: string; size?: number }> = ({
  className,
  size = 32,
}) => {
  const [hasError, setHasError] = useState(false);

  return hasError ? (
    <FallbackLogo style={{ width: size, height: size }} className={className} />
  ) : (
    // tries to load /logo.svg provided by you; falls back to inline svg on error
    <img
      src="/logo.png"
      alt="logo"
      width={size}
      height={size}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default CustomLogo;
