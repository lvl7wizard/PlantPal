const uploadImage = async (base64Image) => {

    // Create form for request
    const formData = new FormData();
    formData.append("image",base64Image);

    // Define the ImgBB API key
    const apiKey = "bab027d5c9b7eba0c3dd3b6fc61b7caa";
    // URL address for request
    const url=`https://api.imgbb.com/1/upload?key=${apiKey}`;

    // post request using fetch
    const res = await fetch(url,{
        method: 'post',
        headers:{"content-type": "multipart/form-data"},
        body:formData
    })
    const data = await res.json() // Parse the response as JSON
    return data.data.url
};

export default uploadImage;