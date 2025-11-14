// src/components/ImageGallery.tsx (or .jsx)
import React, {useState} from 'react';
import {clsx} from 'clsx';
interface ImageGalleryProps {
  /** Array of image URLs */
  images: string[];
  /** Base alt text for images (will be appended with index) */
  altText?: string;
  /** Tailwind classes for the main container */
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  altText = 'Product image',
  className,
}) => {
  // Handle cases with no images

  // State to track the currently selected image index
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Get the URL of the currently selected large image
  const selectedImageUrl = images[selectedIndex];

  // Determine the thumbnails to display (up to 5)
  // If there are 6 or more images total, we only show the first 5 as clickable thumbnails.
  // If there are 5 or fewer total, all are shown as thumbnails.
  const thumbnailImages = images.slice(0, Math.min(images.length, 5));

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };
  if (!images || images.length === 0) {
    return (
      <div className={clsx('text-center text-muted-foreground', className)}>
        No images provided.
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Large Image Display */}
      <div className="mb-3 md:mb-4 aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted relative z-0">
        {selectedImageUrl ? (
          <img
            key={selectedIndex} // Re-render img element on change if needed for transitions
            src={selectedImageUrl}
            alt={`${altText} ${selectedIndex + 1}`}
            className="h-full w-full object-cover" // Use object-cover to fill the square area
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground">
            Image not available
          </div>
        )}
      </div>

      {/* Thumbnails Container - Only show if there's more than one image */}
      {images.length > 1 && (
        // Use grid for thumbnails. Adjust columns based on the number of thumbnails. Max 5 cols.
        <div className={`flex gap-2 md:gap-3`}>
          {thumbnailImages.map((imageUrl, index) => {
            return (
              <button
                key={imageUrl}
                onClick={() => handleThumbnailClick(index)}
                className={clsx(
                  'aspect-square w-full overflow-hidden rounded-md border transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'hover:border-primary/80', // Subtle hover border
                  selectedIndex === index
                    ? 'border-primary ring-2 ring-primary ring-offset-2' // Selected state
                    : 'border-border hover:opacity-90', // Default state
                )}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={imageUrl}
                  alt={`${altText} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover" // Ensure thumbnail images also cover their square area
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
