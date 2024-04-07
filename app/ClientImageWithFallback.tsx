"use client";
import { useState, useEffect } from "react";
import Image, {ImageProps} from "next/image";

type ClientImageWithFallbackProps = ImageProps & {fallbackSrc:string;};

export const ClientImageWithFallback = ({ src, alt="",fallbackSrc,...props }:ClientImageWithFallbackProps) => {
  const [error, setError] = useState(false);
  useEffect(()=>{setError(false)},[src])
  return (
   <Image
      alt={alt}
      onError={()=>setError(true)}
      src={error?fallbackSrc:src}
      {...props}
      />
  );
};
