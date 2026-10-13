const {ImageKit}=require("@imagekit/nodejs");


const imagekitclient = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

//yeh function image upload karne ke liye hai, ye file ko imagekit me upload karega aur uska url return karega
async function uploadImage(file){
    const result = await imagekitclient.files.upload({
        file:file, //yeh already base64 string hai, controller se aata hai (ImageKit raw Buffer accept nahi karta, sirf base64/url)
        fileName:"Music_"+Date.now(), //yeh file ka naam hai, jo ki current timestamp ke sath unique hoga
        folder:"spotify" //yeh folder ka naam hai jisme image upload hogi
    });
    return result;
}

module.exports = {
    uploadImage
};
