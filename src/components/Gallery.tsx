"use client";

import { useState } from 'react';

type Image = {
  id: string;
  imageUrl: string;
  altText: string | null;
};

export default function Gallery({ images }: { images: Image[] }) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  return (
    <>
      <div className="masonry-grid">
        {images.map((img) => (
          <div key={img.id} className="masonry-item" onClick={() => setSelectedImage(img)}>
            <img src={img.imageUrl} alt={img.altText || 'Tattoo Portfolio Image'} loading="lazy" />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <span className="lightbox-close">&times;</span>
          <img src={selectedImage.imageUrl} alt={selectedImage.altText || 'Expanded Image'} />
        </div>
      )}
    </>
  );
}
