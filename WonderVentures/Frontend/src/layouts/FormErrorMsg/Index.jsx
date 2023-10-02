const FormErrorMsg = ({formErrors}) => {
    return (
        <nav className='form-errors'>
            <ul>
            {formErrors.length > 0 &&
                formErrors.map((error, i) => <li key={i}>{error.msg}</li>)}
            </ul>
        </nav>
    )
}

export default FormErrorMsg