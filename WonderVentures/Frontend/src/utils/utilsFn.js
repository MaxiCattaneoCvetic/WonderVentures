export const getIconFromArrayOfIcons = (id, iconsArr) => {
    return iconsArr.find(obj => {
      return obj.id === id
    })
  }

export const hasError = (formErrors, fieldName) => {
  return formErrors.some((error) => error.path === fieldName);
};