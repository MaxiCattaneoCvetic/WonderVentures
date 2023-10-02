/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import style from './editProduct.module.css'
import {
  addData,
} from '../../../../services/productApi';
import MainNavigation from '../../../../layouts/MainNavigation/Index';
import { useNavigate } from 'react-router-dom';
import FormLogic from './components/FormLogic';
import swal from 'sweetalert';
const codigoAdm = import.meta.env.VITE_REACT_APP_CODE_ADM;

const Index = ({ data }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    category: '',
    imagePath: [],
    activities: [],
  });
  const [formErrors, setFormErrors] = useState([]);
  const [edited, setEdited] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if(edited) navigate('/admin/productManagement')
  }, [edited]);

  const handleSubmit = async () => {
        try {
      swal("Por seguridad tu cuenta de administrador necesita una clave para hacer esto, ingresa la clave o pidele a Maxi que te brinde una:", {
        content: "input",
      })
      .then((value) => {
        if(value === codigoAdm){
          swal("¡Buen trabajo!", "El producto fue editado correctamente", "success")
          .then((value)=>{
              addData('PUT', productData, 'update');
              if(value){
                setEdited(true)
              }
          })
        }else if (value != codigoAdm){
          swal("Codigo incorrecto", "El codigo que ingresaste no es valido", "error")
          .then((value)=>{
              if(value){
                location.reload()
                return
              }
          })
        }
      })
  }catch(er){
    console.log(er)
  }
}

  return (
    <>
      <MainNavigation
        bkColor={'var(--footerBackground)'}
        position={'relative'}
      />
      <main className={style.container}>
        <button onClick={() => navigate(-1)} className={style.volverBtn}>Volver</button>
        <h3>Editar Experiencia</h3>
        <FormLogic 
          formErrors={formErrors}
          handleSubmit={handleSubmit}
          productData={productData}
          setFormErrors={setFormErrors}
          setProductData={setProductData} 
          data={data}     
        />
      </main>
    </>
  );
};

export default Index;
