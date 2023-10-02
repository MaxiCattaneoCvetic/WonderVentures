/* eslint-disable react/prop-types */
import style from './card.module.css';
import { Link } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import axios from 'axios';
import { URL } from '../../utils/constants';
import { updateFavExperiences } from '../../features/user/Login/authSlice';
import { BsStar, BsStarFill } from 'react-icons/bs';
import SocialShare from '../SocialShare/Index';

function Index(props) {
  const isFav = () => {
    return props.userData.favExperiences?.some(
      (experience) => experience.id === props.product.id
    );
  };

  const handleFav = async () => {
    const data = {
      username: props.userData.userEmail,
      favExperiences: props.userData.favExperiences
        ? props.userData.favExperiences
        : [],
    };

    if (isFav()) {
      data.favExperiences = props.userData.favExperiences.filter(
        (experience) => experience.id !== props.product.id
      );
    } else {
      data.favExperiences = [...props.userData.favExperiences, props.product];
    }

    const res = await axios.put(`${URL}/user/update/favExperiences`, data);
    if (res.status === 200) {
      props.dispatch(updateFavExperiences(res.data));
    }
  };

  return (
    <div className={style.cardContainer}>
      <div className={style.categoriesItem}>
        <div className={style.favIconContainer} onClick={handleFav}>
          {props.userData?.favExperiences ? (
            isFav() ? (
              <BsStarFill className={style.favIcon} />
            ) : (
              <BsStar className={style.favIcon} />
            )
          ) : (
            <BsStar
              className={`${style.favIcon} ${style.favIconDisabled}`}
              onClick={() => location.replace('/login')}
            />
          )}
        </div>
        <Link
          className={style.cardImgContainer}
          to={`productDetails/${props.id}`}
        >
          {props.product?.imagePath && (
            <img src={props.product?.imagePath[0]?.url} alt='' />
          )}
          <div
            className={`${style.categoriesTitle} ${
              props.favList ? style.categoriesTitleFav : ''
            }`}
          >
            <h3 className={style.cardName}>{props.product.name}</h3>
            <p className={`${style.cardLocation}`}>
              <CiLocationOn /> {props.product.location}
            </p>
            <div className={`${style.categoriesSubDiv}`}>
              <p className={`${style.cardPrice}`}>
                desde ${props.product.price}
              </p>
            </div>
            <SocialShare 
            image={props.product?.imagePath[0]?.url}
            description={props.product.description}
            id={props.product.id}
            name={props.product}
            />
          </div>
          <div className={style.categoriesDescriptionOverlay}></div>
        </Link>
      </div>
    </div>
  );
}

export default Index;
