/* eslint-disable react/prop-types */
import Select from "react-select";
import FormErrorMsg from "../../../../layouts/FormErrorMsg/Index";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import {URL} from "../../../../utils/constants"
import swal from 'sweetalert';
const codigoAdm = import.meta.env.VITE_REACT_APP_CODE_ADM;


const RemoveCategory = ({ categories }) => {
  const [category, setCategory] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  const handleCategorySelect = (val) => {
    setCategory(val);
  };

  function alertCategoryDelete () {
    try {
      swal("Por seguridad tu cuenta de administrador necesita una clave para hacer esto, ingresa la clave o pidele a Maxi que te brinde una:", {
        content: "input",
      })
      .then((value) => {
        if(value === codigoAdm){
          swal({
            title: `¿Está seguro que desea eliminar la categoría ${category.name}?`,
            text: "Todos los productos que tengan esta categoria se eliminaran",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((confirmDelete) => {
            if (confirmDelete) {
              deleteCategory()
            } else {
              swal("Se cancelo el proceos de eliminacion de categoria");
              return
            }
          });
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
    }catch(e){
      console.log(e)
    }

  }

  async function deleteCategory(){
    try {
      const res = await axios.delete(`${URL}/category/${category.val}`)
      if(res.status === 200){
        swal(`La categoria ${category.name}? se elimino con exito`, {
          icon: "success",
        }).then((value)=>{
          if(value){
            location.reload()
          }
        })
      }
  } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
          if (error.data) {
          setFormErrors([
              {
              msg: error.message + ': ' + error.response.data,
              },
          ]);
          } else {
          setFormErrors([
              {
              msg: error.message,
              },
          ]);
          }
      }
  }
  }


    const handleSubmit = async(e) => {
        e.preventDefault()
        alertCategoryDelete()
      }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category">Selecciona la categoria que deseas eliminar:</label>
        <Select
        id="category"
        name="category"
        required
        className={`category-select`}
        value={category}
        onChange={(value) => handleCategorySelect(value)}
        options={categories.map((category) => ({
            val: category.id,
            name: category.name,
            icon: category.icon.url,
        }))}
        theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
            ...theme.colors,
            primary25: "orange",
            primary: "neutral10",
            },
        })}
        getOptionLabel={(category) => (
            <div>
            <img
                src={category.icon}
                alt={category.name}
                width="20"
                height="20"
            />
            {category.name}
            </div>
          )}
        />
      </div>
      <div>
        <button className={"btn-primary"}>Eliminar Categoría</button>
      </div>
      <FormErrorMsg formErrors={formErrors} />
    </form>
  );
        }

export default RemoveCategory;
