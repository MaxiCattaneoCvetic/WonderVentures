import React from "react";
import "./gallery.css";
import {useState} from "react";
import ImageViewer from "../imageViewer/ImageViewer";

const Gallery = ({ mainImageUrl, imageUrls }) => {
  const [showImageViewer, setShowImageViewer] = useState(false);
  const otherImages = imageUrls.slice(1);

  const openImageViewer = () => {
    setShowImageViewer(true);
  };

  const closeImageViewer = () => {
    setShowImageViewer(false);
  };

  return (
    <div className="galleryContainer">
      <div className="mainImage">
        <img src={mainImageUrl} alt="Main" />
      </div>
      <div className="imageGrid">
        {otherImages.map((imageUrl, index) => (
          <div key={index} className="imageItem">
            <img src={imageUrl} alt={`Image ${index}`} className="imageGrid" />
          </div>
        ))}
      </div>
      <div className="viewMore" onClick={openImageViewer}>
        <span>Ver más</span>
      </div>
      {showImageViewer && (
        <ImageViewer images={imageUrls} onClose={closeImageViewer} />
      )}
    </div>
  );
};

export default Gallery;
