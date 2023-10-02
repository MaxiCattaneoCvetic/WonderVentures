/* eslint-disable react/prop-types */
import { BsXLg } from 'react-icons/bs';
import classes from './ModalExperience.module.css';

const Index = ({
  onClick,
  title = '',
  children = 'TEXTO MODAL',
}) => {
  return (
    <>
      <div className='blur-background'></div>
      <div className={`${classes.backdrop}`}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <h2>{title}</h2>
          </div>
          <div className={classes.content}>{children}
          </div>
          <div className={classes.actions}>
            <button className={classes.btn} onClick={onClick}>
              <BsXLg />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
