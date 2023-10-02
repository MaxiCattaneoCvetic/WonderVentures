import { useEffect, useState } from "react";
import { deleteImage, getCategories, getIcons } from "../../../../../services/productApi";
import FormErrorMsg from "../../../../../layouts/FormErrorMsg/Index";
import DragDrop from '../../DragDrop/Index';
import Spinner from "../../../../../components/Spinner/Index";
import validateProduct from "../../../../../utils/formValidators/validateProduct";
import GeneralInformationInputs from "./GeneralInformationInputs";
import SelectCategory from "./SelectCategory";
import ActivitiesInput from "./Activities";
import PoliticsInput from "./Politics";
import style from "../editProduct.module.css"
import {deleteFile, uploadFile} from '../../../../../utils/uploadFileS3'
import { BsTrash } from "react-icons/bs";

const FormLogic = ({setProductData, productData, formErrors, setFormErrors, handleSubmit, data}) => {
    const [icons, setIcons] = useState([]);
    const [categories, setCategories] = useState([])
    const [newActivity, setNewActivity] = useState({
        text: '',
        imagePathIconId: '',
      });
    const [addedActivities, setAddedActivities] = useState([]);
    const [newPolitic, setNewPolitic] = useState({
        title: '',
        description: '',
    });
    const [dropzoneKey, setDropzoneKey] = useState(0);
  
    useEffect(() => {
      const fetchData = async () => {
        const icons = await getIcons();
        setIcons(icons);
        const categories = await getCategories()
        setCategories(categories)
        setProductData({
          ...data,
          activities: [],
        });
        setAddedActivities(data.activities)
      };
      fetchData();
    }, []);

    const handleChange = (e) => {
        setProductData({
          ...productData,
          [e.target.name]: e.target.value,
        });
      };

    const imageSaveHandler = (imgs) => {
        setProductData(prevData => ({ ...prevData, imagePath: [...prevData.imagePath, ...imgs] }));
    }

    const deleteAllImgs = () => {
      setProductData(prevData => (
        { ...prevData, 
          imagePath: prevData.imagePath.filter(img => !(img instanceof File) )
        }))
    }

    const handleDeleteImage = async (image) => {
      setProductData({
        ...productData,
        imagePath: productData.imagePath.filter((img) => img.id !== image.id),
      });
      await deleteImage(image.id);
      await deleteFile(image.identificador);
    };

    const saveDataOnSubmit = async (e) => {
        e.preventDefault();
    
        const {isValidProduct, dataErrors} = validateProduct(productData, addedActivities)
    
        if(isValidProduct){
          try {
            const fileUploadRequests = await Promise.all(productData.imagePath.map(async (image) => {
              if (image instanceof File) {
                const imageS3 = await uploadFile(image);
                return imageS3
              } else {
                // Si no es un archivo, simplemente devolvemos el objeto
                return image;
              }
            }));

            productData.imagePath = fileUploadRequests
            productData.activities = addedActivities
        
            handleSubmit()
            
          } catch (error) {
            setFormErrors([{
              msg: error.message
            }])
          }
        }else{
          console.log(dataErrors)
          setFormErrors(dataErrors)
        }
    
      };

    if (icons.length === 0 || categories.length === 0) {
        return <div className={'container-spinner'}>
            <Spinner />
        </div>
    }

    return (
        <form className={style.formContainer} onSubmit={saveDataOnSubmit}>
            <GeneralInformationInputs
                formErrors={formErrors}
                handleChange={handleChange}
                productData={productData} />
            <SelectCategory 
                categories={categories}
                productData={productData}
                setProductData={setProductData}
                formErrors={formErrors}
            />
            <ActivitiesInput
                addedActivities={addedActivities}
                icons={icons}
                newActivity={newActivity}
                setAddedActivities={setAddedActivities}
                setNewActivity={setNewActivity}
                formErrors={formErrors}
                />
            <PoliticsInput 
                newPolitic={newPolitic}
                productData={productData}
                setNewPolitic={setNewPolitic}
                formErrors={formErrors}
                setProductData={setProductData}
            />
            <div className={style.imgs}>
              <div>
                <label htmlFor=''>Insertar Imágenes</label>
                
                <DragDrop
                  onSavedImages={imageSaveHandler}
                  key={dropzoneKey}
                  editMaxLimit={productData.imagePath.length % 5}
                  disabled={productData.imagePath.length > 4}
                  deleteAllImgs={deleteAllImgs}
                />
                {!(productData.imagePath.length < 5) && 
                  <p style={{fontWeight: 600}}>Borrar imágenes anteriores para agregar más</p>
                }
              </div>
              <nav>
                <label>Previous Images</label>
                <ul>
                  {productData.imagePath.map((image) => {
                    if (image.id !== undefined) {
                      return (
                        <li key={image.id}>
                          <img src={image.url} />
                          <BsTrash onClick={() => handleDeleteImage(image)} />
                        </li>
                      );
                    }
                  })}
                </ul>
              </nav>
            </div>
            
            <div>
                <button className={style.verExpBTN}>Editar Producto</button>
            </div>
            <FormErrorMsg formErrors={formErrors}/>
        </form>
    )
}

export default FormLogic