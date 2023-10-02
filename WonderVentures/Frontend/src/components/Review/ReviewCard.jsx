/* eslint-disable react/prop-types */
import { useEffect } from "react";
import style from "./review.module.css";
import { BsCircle, BsCircleFill } from "react-icons/bs";


const ReviewCard = ({ review, ...props }) => {
  

  function setDate(arrDate) {
    let separador = "/";
    const date = arrDate.join(separador);
    return date;
  }


  // si las props son FALSE, se renderiza solo los comeentarios
  // si las props son TRUE, renderiza normal

  

  return (
    <div
      className={props.img ? style.reviewItem : style.reviewItemOff} 
      style={
        props.img
          ? {
              backgroundImage: `url(${review ?  review.experience.imagePath[0].url : ""})`,
            }
          : {backgroundImage:"none"}
      }
    >
      {review ? 
            <div className={ !props.img ? style.revContainerTextB :  style.revContainerText}>
            <div className={style.titleBox}>
              <h5>{review.experience.name}</h5>
              <p>&quot;{review.comment}&quot;</p>
            </div>
            <div className={style.containerInfoExperience}>
              <div className={style.scoreContainer}>
                {Array.from({ length: 5 }, (_, starIndex) => {
                  const starValue = starIndex + 1;
                  if (review.score >= starValue) {
                    return <BsCircleFill key={starIndex} className={style.icon} />;
                  } else {
                    return <BsCircle key={starIndex} className={style.icon} />;
                  }
                })}
              </div>
              <p>{review.user.name}</p>
              <p>{setDate(review.date)}</p>
            </div>
          </div>
          :""
    
    }

    </div>
  );
};

export default ReviewCard;
