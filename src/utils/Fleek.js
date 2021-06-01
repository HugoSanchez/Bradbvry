import  fleekStorage from '@fleekhq/fleek-storage-js';
import { v4 } from 'uuid';


export const UploadToIPFS = async (content) => {

    let dataToUpload
    let contentType = content.type
    let isFile = contentType.includes('image') || contentType.includes('video')

    if (isFile) {dataToUpload = content}
    else {dataToUpload = JSON.stringify(content.entry)}

    return await fleekUploading(content)
}


const fleekUploading = async (dataToUpload) => {
    let content = await fleekStorage.upload({
        data: dataToUpload,
        key: v4(),
        apiKey: process.env.REACT_APP_FLEEK_API_KEY,
        apiSecret: process.env.REACT_APP_FLEEK_API_SECRET,
    });

    return `https://ipfs.fleek.co/ipfs/${content.hash}`;
}