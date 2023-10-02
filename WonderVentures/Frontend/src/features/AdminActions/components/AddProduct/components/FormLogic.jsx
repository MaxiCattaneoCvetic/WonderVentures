/* eslint-disable react/prop-types */
import {  useState } from "react";
import FormErrorMsg from "../../../../../layouts/FormErrorMsg/Index";
import DragDrop from "../../DragDrop/Index";
import validateProduct from "../../../../../utils/formValidators/validateProduct";
import GeneralInformationInputs from "./GeneralInformationInputs";
import SelectCategory from "./SelectCategory";
import ActivitiesInput from "./Activities";
import PoliticsInput from "./Politics";
import "../addProduct.css";
import style from "../../DesktopPanel/panelADM.module.css";
import { uploadFile } from "../../../../../utils/uploadFileS3";
import { hasError } from "../../../../../utils/utilsFn";

const FormLogic = ({
  setProductData,
  productData,
  formErrors,
  setFormErrors,
  handleSubmit,
  formSelectData,
}) => {
  const [newActivity, setNewActivity] = useState({
    text: "",
    imagePathIconId: "",
  });
  const [addedActivities, setAddedActivities] = useState([]);
  const [newPolitic, setNewPolitic] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const imageSaveHandler = (imgs) => {
    setProductData((prevData) => ({ ...prevData, imagePath: imgs }));
  };

  const saveDataOnSubmit = async (e) => {
    e.preventDefault();

    const { isValidProduct, dataErrors } = validateProduct(
      productData,
      addedActivities
    );

    if (isValidProduct) {
      try {
        const fileUploadRequests = productData.imagePath.map(
          async (image) => await uploadFile(image)
        );
        const imagesUrls = await Promise.all(fileUploadRequests);
        productData.imagePath = imagesUrls;
        productData.activities = addedActivities.map((activity) => ({
          text: activity.text,
          imagePathIconId: activity.imagePathIconId.value,
        }));

        handleSubmit();
      } catch (error) {
        setFormErrors([
          {
            msg: error.message,
          },
        ]);
      }
    } else {
      console.log(dataErrors);
      setFormErrors(dataErrors);
    }
  };

  return (
    <form onSubmit={saveDataOnSubmit} className="add-product-form">
      
      <div className="container-form-master">
        <div className="gral-info-categories-container">
          <GeneralInformationInputs
            formErrors={formErrors}
            handleChange={handleChange}
            productData={productData}
          />
        </div>

        <div className="drag-category-descriptionContainer">
        <div className="inputFlex">
          <label htmlFor="productDescription">Descripción</label>
          <textarea 
            type="text"
            id="description"
            name="description"
            onChange={handleChange}
            value={productData.description}
            required
            className={hasError(formErrors, "description") ? "input-error" : ""}
            placeholder="Descripción de la experiencia"
          />
        </div>
        <div className="drag-category-container">
          <SelectCategory
            categories={formSelectData.categories}
            productData={productData}
            setProductData={setProductData}
            formErrors={formErrors}
          />
          <div >
            <label htmlFor="">Insertar Imágenes</label>
            <DragDrop onSavedImages={imageSaveHandler} key={0} />
          
          </div>
          </div>
          </div>
          

        <div className="activities-politics-container">
          <ActivitiesInput
            addedActivities={addedActivities}
            icons={formSelectData.icons}
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
        </div>
        <div>
          <button className={style.verExpBTN}>Agregar Producto</button>
          <FormErrorMsg formErrors={formErrors} />
        </div>
      </div>
    </form>
  );
};

export default FormLogic;
