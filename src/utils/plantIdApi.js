const fetch = require('node-fetch');
const PLANTID_API_KEY = "iE2se41tN1aFpbnVFP2NnLrc0ZXqnYB3yAcasE7BRqwXDJQFxp"


export const identifyPlant = async (base64Image) => {
  try {
  const myHeaders = {
    'Content-Type': 'application/json',
    'Api-Key': PLANTID_API_KEY,
  };

  const raw = JSON.stringify({
    "images": [
      `data:image/jpg;base64,${base64Image}`,
    ],
    "latitude": 53.483,
    "longitude": -2.244,
    "similar_images": true  
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };


    const response = await fetch("https://plant.id/api/v3/identification", requestOptions);
    const responseData = response.json()
    return responseData
  } catch (error) {
    console.log('error', error);
  }
};

