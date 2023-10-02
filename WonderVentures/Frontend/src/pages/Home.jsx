import Body from '../components/Body/Index';
import Title from "../components/Title/Index"
import MainNavigation from '../layouts/MainNavigation/Index/';
import { useEffect,useState } from "react";
import Spinner from '../components/Spinner/Index';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {//agrego este spinner falso, para que el video cargue un poco, es 1 segundo.
    setTimeout(() => {
      setIsLoading(false); 
    }, 1000); 
  }, []);

  if (isLoading) {
    return (
      <div className={"container-spinner container-spinner-full"}>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <MainNavigation
        bkColor={"var(--footerBackground)"}
      />
      <main>
        <Title/>
        <Body/>
      </main>
    </>
  )
};

export default Home;
