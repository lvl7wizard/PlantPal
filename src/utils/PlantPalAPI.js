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
      console.log(response)
      throw new Error("Error posting plant");
    }

    const responseData = await response.json();
    // console.log("Success:", responseData);
  } catch (error) {
    console.error("Error:", error);
  }
};

export { postPlant, getUser };
