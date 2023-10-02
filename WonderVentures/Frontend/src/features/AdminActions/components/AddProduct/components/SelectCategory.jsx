/* eslint-disable react/prop-types */
import Select from "react-select"
import { hasError } from "../../../../../utils/utilsFn"

const SelectCategory = ({setProductData, productData, categories, formErrors}) => {
    return (
    <div >
        <label htmlFor='category'>
          Seleccionar Categoría
        </label>
        <Select
          id='category'
          required
          name='category'
          onChange={(value) =>
            setProductData({ ...productData, category: value.value })
          }
          options={categories.map(category => ({value: category}))}
          className={`category-select ${hasError(formErrors, 'category') ? 'input-error' : ''} basic-single`}
          getOptionLabel={(category) => (
            <div>
              <img
                src={category.value.icon.url}
                alt={''}
                width='20'
                height='20'
              />
              {category.value.name}
            </div>
          )}
        />
        
      </div>
      
    )
}

export default SelectCategory