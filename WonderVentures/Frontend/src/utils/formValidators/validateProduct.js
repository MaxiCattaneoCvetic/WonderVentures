import { validateEmptyInput } from "./validators"

const validateProduct = (data, addedActivities) => {
    let isValidProduct = true
    let dataErrors = []

    for (let path in data){
        if(!validateEmptyInput(data[path]) && path !== 'activities' && path !== 'reviews'){
            isValidProduct = false
            dataErrors.push({
                msg: 'El campo no puede estar vacio',
                path
            })
        }
    }

    if(!validateEmptyInput(addedActivities)){
        isValidProduct = false
            dataErrors.push({
                msg: 'El campo no puede estar vacio',
                path: 'activities'
            })
    }

    return {isValidProduct, dataErrors}
}

export default validateProduct