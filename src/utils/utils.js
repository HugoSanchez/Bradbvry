
export const isASCII = (str) => {
    // Check if string has regular characters
    // ASCII compliant
    return /^[\x00-\x7F]*$/.test(str);
}

export const getBase64 = (file) => {
    // Turn a given file into a Base64 
    // string representation.
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
}

export const parseCollectionName = string => {

    return string
            .trim()
            .replace(/ /g,'-')
            .replace(/(?:^|\s|["'([{])+\S/g, 
                match => match.toLowerCase())
}

export const parseToDisplayCollectionName = string => {
    return string
            .replace(/-/g,' ')
            .replace(/(?:^|\s|["'([{])+\S/g, 
                match => match.toUpperCase())
}

export const replaceItemInArray = (array, itemToReplace, newItem) => {
    // This functions is usually used to update some 
    // array in redux state, ie: an item or thread has been updated.
    let index = array.indexOf(itemToReplace)
    let newArray = array.filter(item => item !== itemToReplace)
    newArray.splice(index, 0, newItem)
    return newArray
}