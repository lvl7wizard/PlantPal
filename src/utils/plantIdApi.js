const fetch = require('node-fetch');
const PLANTID_API_KEY = "YXtQ1YBfeNdyCHkmxT1H0YUapK7S85iSpqgVC4Ra0ovpu9payW"


export const identifyPlant = async (base64Image) => {
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
    "similar_images": true,
    // "health": "all"
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    const response = await fetch("https://plant.id/api/v3/identification", requestOptions);
    const responseData = await response.json();
    console.log(responseData, typeof responseData, "lwrwrk021k-0219341-02393123131232----")
    console.log(responseData.result.classification.suggestions)
    return responseData
  } catch (error) {
    console.log('error', error);
  }
};

