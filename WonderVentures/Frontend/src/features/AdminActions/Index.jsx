/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import MainNavigation from '../../layouts/MainNavigation/Index';
import DesktopPanel from './components/DesktopPanel/Index';
import NotAvailableForMobile from './components/NotAvailableForMobile/Index';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Index() {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const isAuth = useSelector(state => state.auth)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(!isAuth.token){
      navigate('/login', {
        state:{
            previousUrl: location.pathname
        }
    })
    }

    if(!isAuth.isAdminLoggedIn){
      navigate('/')
    }

  }, [isAuth])


  // Función para manejar el cambio de resolución
  function handleResolution() {
    setScreenWidth(window.screen.width);
  }

  // Usar useEffect escuichar 'resize'
  useEffect(() => {
    window.addEventListener('resize', handleResolution);
    // recarga web para mostral al usuario
    return () => {
      window.removeEventListener('resize', handleResolution);
    };
  }, [screenWidth]);

  return (
    <>
      <section>
        <div>
          {screenWidth > 1000 ? (
            <section>
              <DesktopPanel />
            </section>
          ) : (
            <section>
              <MainNavigation
                color={'black'}
                bkColor={'var(--footerBackground)'}
                position={'relative'}
              />
              <NotAvailableForMobile />
            </section>
          )}
        </div>
      </section>
    </>
  );
}

export default Index;
