"use client";
import Jazzicon from "@raugfer/jazzicon";
import Image from "next/image";
// builds an image data url for embedding
function buildDataUrl(address: string): string {
  return "data:image/svg+xml;base64," + btoa(Jazzicon(address));
}

// sample code for react component
export default function JazziconImage({ address }: { address: string }) {
  const imageUrl = buildDataUrl(address);
  return (
    <Image
      src={imageUrl}
      alt={address}
      className="rounded-full w-12 h-12"
      width="12"
      height="12"
    />
  );
}
