const baseURL = "https://plant-pal-p6my.onrender.com/api";

const getUser = async (username) => {
  try {
    const response = await fetch(`${baseURL}/users/${username}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // console.error("Error fetching user:", error);
    // console.error("User not found", "<<<< PlantPalAPI")
  }
};

const postPlant = async (newPlant) => {
  try {
    const response = await fetch(`${baseURL}/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    });

    if (!response.ok) {
      throw new Error("Error posting plant");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
}

const deletePlant = async (username, plantID) => {
  try {
    const response = await fetch(`${baseURL}/users/${username}/plants/${plantID}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Error deleting plant");
    }

    return response.status

  } catch (error) {
    console.log(error);
  }
}

const patchPlant = async (water_plant=null, feed_plant=null, image_url=null, image=null, username, plantID) => {
  try {
    const response = await fetch(`${baseURL}/users/${username}/plants/${plantID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        water_plant: water_plant,
        feed_plant: feed_plant,
        image_url: image_url,
        image: image
      })
    });
    return response.status
    // const responseData = await response.json()
    // console.log(responseData)

  } catch (error) {
    console.log(error, "<--- error");
  }
}

const getUserPlants = async (username) => {
  try {
    const response = await fetch(`${baseURL}/users/${username}/plants`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const postUser = async (username, email) => {
  try {
    const response = await fetch(`${baseURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email
      }),
    });

    if (!response.ok) {
      throw new Error("Error posting plant");
    }

    const responseData = await response.json();
    return responseData;
  } catch(error) { 
    console.error("Error creating user:", error)
  }
}

const getPlantById = async (plantId) => {
  try {
    const response = await fetch(`${baseURL}/plants/${plantId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export { postUser, postPlant, getUser, deletePlant, patchPlant, getUserPlants, getPlantById };




