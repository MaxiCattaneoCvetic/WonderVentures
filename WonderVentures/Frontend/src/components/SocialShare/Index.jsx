/* eslint-disable react/prop-types */
import classes from './SocialShare.module.css';

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailIcon,
  EmailShareButton,
} from 'react-share';






// {
//   url = 'https://www.google.com.ar/',
//   title = 'react-share',
//   body = 'Enterate de lo ultimo',
// } 



const Index = (props) => {
  let id = props.id;
  const productURL = `http://127.0.0.1:5173/productDetails/${id}`;
  let image =props.image;
  let description = props.description;
  let name = props.name;


  return (
    <div className={classes['social-share-container']}>
      <h4>Comparte en:</h4>
      <div className={classes['social-share-buttons']}>
        <FacebookShareButton url={image} quote={"aaaaaaaaaaaaa"} hashtag={`#WonderVentures#`}>
          <FacebookIcon
            round={true}
            size={30}
            className={classes['social-share-icons']}
          />
          
        </FacebookShareButton>
        <WhatsappShareButton title={"#Wonder Ventures " + description} url={productURL}
        separator={" - "}
        >
          <WhatsappIcon
            round={true}
            size={30}
            className={classes['social-share-icons']}
          />
        </WhatsappShareButton>
        <EmailShareButton url={description} subject={"¡Veni a conocer esta experiencia a Wonder Ventures!"} body={description}>
          <EmailIcon
            iconFillColor='white'
            round={true}
            size={30}
            className={classes['social-share-icons']}
          />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default Index;
