import Image from 'next/image';

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhQJ/wlseKgAAAABJRU5ErkJggg=="
      className={`rounded-lg shadow-lg transition-opacity duration-300 ${className}`}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
}
