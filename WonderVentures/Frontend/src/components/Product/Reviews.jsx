/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReviewCard from "../Review/ReviewCard";

const Reviews = ({ reviews }) => {
  const [contador, setContador] = useState(0);
  useEffect(() => {
    let interval;
    if (reviews) {
      interval = setInterval(() => {
        setContador((prevContador) => (prevContador + 1) % reviews.length);
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [reviews]);

  return (
    <div className="product-detail-reviews">
      <h2>Reseñas</h2>
      {reviews?.length ? (
        <ReviewCard
          review={reviews[contador]}
          key={reviews[contador].id}
          img={false}
        />
      ) : (
        "Aun no hay reseñas de esta experiencia"
      )}
    </div>
  );
};

export default Reviews;
