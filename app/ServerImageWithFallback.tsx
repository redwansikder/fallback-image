import Image, {ImageProps} from "next/image";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import fs from "fs";
import path from "path";

async function checkLocalImageExists(imagePath:string): Promise<boolean> {
  try {
    await fs.promises.access(imagePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

async function checkRemoteImageExists(imagePath:string): Promise<boolean> {
  try {
    const res = await fetch(imagePath,{method:"HEAD"});
    return res.ok;
  } catch (error) {
    return false;
  }
}

async function getImageSrc(src:string | StaticImport, fallbackSrc:string) {
  //if we passed a statically imported Image
  if (typeof src === "object") return src;

  //if no src provided
  if(!src) return fallbackSrc;

  //if src is a data:image string
  if (src.startsWith("data:")) return src;

  //for remote images
  if (src.startsWith("http") || src.startsWith("//")){
    const imageExists = await checkRemoteImageExists(src);
    return imageExists ? src : fallbackSrc;
  }

  //for local images in public folder, ensure the src is a server path not a url
  const localImagePath = path.join(process.cwd(),"public",src);
  //check local image exists
  const imageExists = await checkLocalImageExists(localImagePath);
  return imageExists ? src : fallbackSrc; 
}

type ServerImageWithFallbackProps = ImageProps & {fallbackSrc:string;};

export const ServerImageWithFallback = async ({ src, alt="",fallbackSrc,...props }:ServerImageWithFallbackProps) => {
  const imageSrc = await getImageSrc(src, fallbackSrc);

  return (
   <Image
      alt={alt}
      src={imageSrc}
      {...props}
    />
  );
};
