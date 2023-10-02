

export const URL = 'http://wonder-ventures-env.eba-fn8ccs8p.us-east-1.elasticbeanstalk.com';
export const URL_LOGIN = 'http://wonder-ventures-env.eba-fn8ccs8p.us-east-1.elasticbeanstalk.com/user/login'
export const URL_PRODUCTS = 'http://wonder-ventures-env.eba-fn8ccs8p.us-east-1.elasticbeanstalk.com/experience';
export const URL_IMAGES = 'http://3.142.65.68:8080/images';
export const URL_USER = 'http://wonder-ventures-env.eba-fn8ccs8p.us-east-1.elasticbeanstalk.com/user/all';
export const USR_USER_UPDATE = 'http://wonder-ventures-env.eba-fn8ccs8p.us-east-1.elasticbeanstalk.com/user/role'
export const URL_SEND_EMAIL = 'http://wonder-ventures-env.eba-fn8ccs8p.us-east-1.elasticbeanstalk.com/enviarCorreo/'
export const URL_PRODUCTS_NAME = 'http://wonder-ventures-env.eba-fn8ccs8p.us-east-1.elasticbeanstalk.com/experience/name/';
export const URL_REVIEW = 'http://wonder-ventures-env.eba-fn8ccs8p.us-east-1.elasticbeanstalk.com/reviews/getAll';
export const URL_REVIEW_ADD = 'http://wonder-ventures-env.eba-fn8ccs8p.us-east-1.elasticbeanstalk.com/reviews';
export const URL_BOOKING= 'http://wonder-ventures-env.eba-fn8ccs8p.us-east-1.elasticbeanstalk.com/bookings/';
export const USER_NEW = 'http://wonder-ventures-env.eba-fn8ccs8p.us-east-1.elasticbeanstalk.com/user/new';


// image tiene id de imagePaths que estan en la base de datos con url 
// a iconos en s3. Después se trae con un fetch los iconos con la url
// /images/icons
export const CATEGORIES = [
  { id: 1, name: 'Aventura Extrema', image: 1 },
  { id: 2, name: 'Para toda la familia', image: 5 },
  { id: 3, name: 'Escapada rapida', image: 17 },
  { id: 4, name: 'Viaje con historia', image: 14 },
  { id: 5, name: 'Conoce otra cultura', image: 4 },
  { id: 6, name: 'Luna de miel', image: 8 },
  { id: 7, name: 'Viaje con amigos', image: 7 },
];


