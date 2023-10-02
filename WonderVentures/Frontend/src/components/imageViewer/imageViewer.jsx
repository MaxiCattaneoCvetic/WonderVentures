import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import "./imageViewer.css";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    zIndex: 1000,
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: "none",
    background: "transparent",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0",
  },
};

const ImageModal = ({ images }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [scrollLocked, setScrollLocked] = useState(false);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setSelectedImageIndex(index);
    setModalIsOpen(true);

    setScrollLocked(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setScrollLocked(false);
  };

  useEffect(() => {
    if (scrollLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [scrollLocked]);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
    setSelectedImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="content">
      <button className="content-btn" onClick={() => openModal(0)}>
        Ver más
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        style={customStyles}
      >
        <div className="modal-content">
          <button className="close-btn" onClick={closeModal}>
            <FaTimes />
          </button>
          <button className="content-btn prev-btn" onClick={goToPreviousImage}>
            <FaArrowLeft />
          </button>
          <div className="image-container">
            <img
              className="images-modal"
              src={images[currentImageIndex]?.url}
              alt={`Image ${images?.url}`}
            />
          </div>
          <button className="content-btn next-btn" onClick={goToNextImage}>
            <FaArrowRight />
          </button>
          <div className="thumbnail-container">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Thumbnail ${index}`}
                className={
                  index === selectedImageIndex
                    ? "thumbnail selected"
                    : "thumbnail"
                }
                onClick={() => {
                  setSelectedImageIndex(index);
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
