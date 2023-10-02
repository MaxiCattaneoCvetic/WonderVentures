import { hasError } from "../../../../../utils/utilsFn"
import style from "../editProduct.module.css"

const GeneralInformationInputs = ({productData, handleChange, formErrors}) => {
    return (
        <div className={style.gralInfoContainer}>
            <div>
                <div>
                    <label htmlFor='name'>Nombre</label>
                    <input
                    type='text'
                    name='name'
                    onChange={handleChange}
                    value={productData.name}
                    required
                    className={hasError(formErrors, 'name') ? 'input-error' : ''}
                    />
                </div>
                <div>
                    <label htmlFor='price'>Precio</label>
                    <input
                        type='number'
                        name='price'
                        onChange={handleChange}
                        value={productData.price}
                        required
                        className={hasError(formErrors, 'price') ? 'input-error' : ''}
                    />
                </div>
                <div>
                    <label htmlFor='location'>Ciudad</label>
                    <input
                    type='text'
                    name='location'
                    onChange={handleChange}
                    value={productData.location}
                    required
                    className={hasError(formErrors, 'location') ? 'input-error' : ''}
                    />
                </div>
            </div>
            <div>
                <label htmlFor='productDescription'>Descripción</label>
                <textarea
                    type='text'
                    cols={20}
                    rows={10}
                    name='description'
                    onChange={handleChange}
                    value={productData.description}
                    required
                    className={hasError(formErrors, 'description') ? 'input-error' : ''}
                />
            </div>
        </div>
    )
}

export default GeneralInformationInputs