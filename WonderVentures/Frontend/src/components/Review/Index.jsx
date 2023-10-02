import style from "./review.module.css";
import { reviews } from "../../utils/getReview";
import ReviewCard from "./ReviewCard";
import { useEffect } from "react";
import { useState } from "react";

function Reviews() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setContador((prevContador) => (prevContador + 1) % reviews.length);
    }, 5000);
    promedio(reviews);

    return () => clearInterval(interval);
  }, []);

  const promedio = (arr) => {
    const reviewsPorId = {};

    arr.forEach((review) => {
      const id = review.experience.id;

      if (!reviewsPorId[id]) {
        reviewsPorId[id] = [review];
      } else {
        reviewsPorId[id].push(review);
      }
    });

    const revisionesRepetidas = Object.values(reviewsPorId).filter(
      (reviews) => reviews.length > 1
    );
    let promedio;
    let id;
    revisionesRepetidas.forEach((revisiones) => {
      id = revisiones[0].experience.id;
      promedio =
        revisiones.reduce((total, revision) => total + revision.score, 0) /
        revisiones.length;
    });

    let objProm = {
      promedio: promedio,
      id: id,
    };
    return objProm;
  };

  return (
    <div className={style.reviewContainer}>
      <ReviewCard
        review={reviews[contador] ? reviews[contador] : ""}
        key={reviews[contador] ? reviews[contador].id : ""}
        img={true}
      />
    </div>
  );
}

export default Reviews;
