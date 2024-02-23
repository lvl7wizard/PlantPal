// const axios = require("axios")


// const getUser = async () => {
//   const plantAPI = axios.create({
//     baseURL: `https://plant-pal.onrender.com/api`,
//   });
  
//   const res = await plantAPI.get(`/users/mangoman123`);
//   console.log(res.data)
// }

// export default getUser;

const getUser = async () => {
  const baseURL = "https://plant-pal.onrender.com/api";
  const username = "mangoman123";

  try {
    // Using fetch
    const response = await fetch(`${baseURL}/users/${username}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export default getUser;
