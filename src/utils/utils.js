


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