import { validateEmail, validateEmptyInput, validateInputLength } from "./validators"

const validateRegister = (data) => {
    let isValidRegister = true
    let dataErrors = []

    for (let path in data){
        if(!validateEmptyInput(data[path])){
            isValidRegister = false
            dataErrors.push({
                msg: 'El campo no puede estar vacio',
                path
            })
        }
    }

    if(!validateEmail(data.username)){
        isValidRegister = false
        dataErrors.push({
            msg: 'Escriba el correo electrónico correctamente',
            path: 'username'
        })
    }

    if(!validateInputLength(data.password, 8)){
        isValidRegister = false
        dataErrors.push({
            msg: 'La contraseña debe tener al menos 8 caracteres',
            path: 'password'
        })
    }

    return {isValidRegister, dataErrors}
}

export default validateRegister