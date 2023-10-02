import { useState } from 'react';
import './addProduct.css';
import { addData } from '../../../../services/productApi';
import FormLogic from './components/FormLogic';
import swal from 'sweetalert';
const codigoAdm = import.meta.env.VITE_REACT_APP_CODE_ADM;

const Index = ({formSelectData}) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    category: '',
    imagePath: [],
    activities: [],
    politics: []
  });

  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async () => {
    try {
      swal("Por seguridad tu cuenta de administrador necesita una clave para hacer esto, ingresa la clave o pidele a Maxi que te brinde una:", {
        content: "input",
      })
      .then((value) => {
        if(value === codigoAdm){
          swal("¡Buen trabajo!", "El producto fue creado correctamente", "success")
          .then((value)=>{
              addData('POST', productData, 'add');
              if(value){
                location.reload()
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
      });
  
      setProductData({
        name: '',
        description: '',
        price: '',
        location: '',
        category: {},
        imagePath: [],
        activities: [],
        politics: []
      });

    setFormErrors([]);
      
    } catch (error) {
      setFormErrors([{
        msg: error.message
      }])
    }
  }


  return (
    <FormLogic 
      productData={productData} 
      setProductData={setProductData}
      formErrors={formErrors}
      setFormErrors={setFormErrors}
      handleSubmit={handleSubmit} 
      formSelectData={formSelectData}
      />
  );
};

export default Index;
