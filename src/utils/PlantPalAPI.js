const baseURL = "https://plant-pal.onrender.com/api";

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

const patchPlant = async (water_plant, feed_plant, username, plantID) => {
  try {
    const response = await fetch(`${baseURL}/users/${username}/plants/${plantID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        water_plant: water_plant,
        feed_plant: feed_plant
      })

    });
    return response.status
    // Error returning from API "[SyntaxError: JSON Parse error: Unexpected end of input]""
    // const responseData = await response.json();
    // return responseData;
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

    // if (!response.ok) {
    //   throw new Error("Error posting user");
    // }

    const responseData = await response.json();
    return responseData;
  } catch(error) { 
    // console.error("Error creating user:", error)
  }
}

export { postUser, postPlant, getUser, deletePlant, patchPlant, getUserPlants };
