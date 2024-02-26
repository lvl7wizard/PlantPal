const baseURL = "https://plant-pal.onrender.com/api";

const getUser = async () => {
  const username = "strawberryman";

  try {
    // Using fetch
    const response = await fetch(`${baseURL}/users/${username}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
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
    // fixing this currently...
    console.log(response.status, "<--- response")
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error, "<--- error");
  }
}

// patchPlant(true, false, "strawberryman", "65dba7ccab562625296264e3")

export { postPlant, getUser, deletePlant, patchPlant };
