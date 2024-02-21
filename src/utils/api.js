import * as FileSystem from 'expo-file-system';

const someModule = async () => {
    const base64 = await FileSystem.readAsStringAsync('/Users/dave/northcoders/PlantPal/assets/adaptive-icon.png', { encoding: 'base64' });
    console.log(base64)
}
someModule();


// const imgbbUploader = require('imgbb-uploader');

// export const imageUploader = async (imgPath) => {
//   try {
//     const key = 'bab027d5c9b7eba0c3dd3b6fc61b7caa'
//     const res = await imgbbUploader(key, imgPath)
//     console.log(res.image.url)
//   } catch (error) {
//     console.log(error)
//   }
// }


// const RNFS = require('react-native-fs');
// const axios = require('axios');

// const convertImageToBase64 = async (imagePath) => {
//   try {
//     const base64Data = await RNFS.readFile(imagePath, 'base64');
//     return base64Data;
//   } catch (error) {
//     console.error('Error converting image to base64:', error);
//     throw error;
//   }
// };

// export default convertImageToBase64;


// const uploadImage = async (imagePath) => {

//     const apiKey = 'YOUR_API_KEY';    
//     // Set up the endpoint URL
//     const apiUrl = 'https://api.imgbb.com/1/upload';
    
//     // Example image data (you can replace this with your actual image data)
//     const imageData = {
//       name: 'example-image',
//       image: 'base64-encoded-image-data', // Replace with your actual base64-encoded image data
//     };
    
//     // Set up the headers with your API key
//     const headers = {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     };
    
//     // Set up the data for the POST request
//     const data = new URLSearchParams();
//     data.append('key', apiKey);
//     data.append('name', imageData.name);
//     data.append('image', imageData.image);
    
//     // Make the POST request using Axios
//     axios.post(apiUrl, data, { headers })
//       .then(response => {
//         console.log('Upload successful:', response.data);
//       })
//       .catch(error => {
//         console.error('Error uploading image:', error.message);
//       });

// }

