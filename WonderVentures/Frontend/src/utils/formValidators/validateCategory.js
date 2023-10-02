import { validateEmptyInput } from "./validators"

const validateCategory = (data) => {
    let isValidCategory = true
    let dataErrors = []

    for (let path in data){
        if(!validateEmptyInput(data[path])){
            isValidCategory = false
            dataErrors.push({
                msg: 'El campo no puede estar vacio',
                path
            })
        }
    }

    let validIcon = true
    for(let path in data['icon']){
        if(!validateEmptyInput(data['icon'][path])){
            validIcon = false
        }
    }
    if(!validIcon){
        isValidCategory = false
        dataErrors.push({
            msg: 'El campo no puede estar vacio',
            path: 'icon'
        })
    }

    return {isValidCategory, dataErrors}
}

export default validateCategory