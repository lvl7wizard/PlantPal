const axios = require("axios")

const plantAPI = axios.create({
  baseURL: `https://plant-pal.onrender.com/api`,
});

const getPlants = async () => {
  const res = await plantAPI.get(`/users/mangoman123`);
  console.log(res.data)
}

getPlants()