

const validateEmptyInput = (input) => {
    if(typeof input === 'string'){
        if(input.trim().length === 0){
            return false
        }
    }else if (Array.isArray(input)){
        if(input.length === 0){
            return false
        }
    }
    return true
}

const validateInputLength = (input, length) => {
    if(input.trim().length < length){
        return false
    }
    return true
}

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email)
}

export {validateEmptyInput, validateEmail, validateInputLength}