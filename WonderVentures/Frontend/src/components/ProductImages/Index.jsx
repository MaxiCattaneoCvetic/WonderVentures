/* eslint-disable react/prop-types */
import { useState, useMemo, useCallback } from 'react';

const Index = ({ data }) => {
  const [showAllImages, setShowAllImages] = useState(false);

  const firstFiveImages = useMemo(() => data.images.slice(0, 5), [data.images]);

  const toggleImageHandler = useCallback(() => {
    setShowAllImages((prevShowAllImages) => !prevShowAllImages);
  }, []);

  return (
    <>
      {firstFiveImages.map((img) => (
        <div key={Math.random()}>
          <img src={`/${img.path}`} alt='Imagen' />
        </div>
      ))}
      <div>
        <button type='button' onClick={toggleImageHandler}>
          {!showAllImages ? 'Ver más' : 'Ocultar'}
        </button>
      </div>
      {showAllImages && (
        <div>
          {data.images.map((img) => (
            <div key={Math.random()}>
              <img src={`../../../public/${img.path}`} alt='imagenes' />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Index;
