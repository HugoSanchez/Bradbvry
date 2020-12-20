

// Turn a given file into a Base64 
// string representation.
export const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
}

export const parseCollectionName = string => {
    return string.replace(/\s+/g, '-').toLowerCase();
}