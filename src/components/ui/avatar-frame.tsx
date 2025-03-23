import { useState } from 'react';

interface AvatarFrameProps {
  src: string;
  alt: string;
  width?: number;
  showGrid?: boolean;
  height?: number;
}

export default function AvatarFrame({
  src,
  alt,
  width = 50, // Default values
  height = 50,
  showGrid = true,
}: AvatarFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
      {showGrid && (
        <div
          className="absolute inset-0 z-0 rounded-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
            backgroundSize: `${width}px ${height}px`, // Adjust grid dynamically
          }}
        />
      )}
      <div className="absolute inset-0 rounded-full border-4  z-10" />
      <div className="absolute inset-0 rounded-full overflow-hidden z-5">
        <img
          src={src || '/placeholder.svg'}
          alt={alt}
          className={`rounded-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          style={{ width: '100%', height: '100%' }} // Make image fill container
        />
      </div>
    </div>
  );
}
