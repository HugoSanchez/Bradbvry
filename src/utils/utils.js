

// Turn a given file into a Base64 
// string representation.
const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
}

// Get File object from Base64
// string representation;
const fileFromBase64 = (dataurl, filename) => {
 
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){ u8arr[n] = bstr.charCodeAt(n);}
    
    return new File([u8arr], filename, {type:mime});
}

export {
    getBase64,
    fileFromBase64
}