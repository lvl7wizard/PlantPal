import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { PlantContext } from "../Contexts/PlantContext";
import PlantCard from "../Components/PlantCard";
import { UserContext } from "../Contexts/UserContext";
import { getUserPlants } from "../utils/PlantPalAPI";
import Loading from "../Components/Loading";
import GradientBackground from "../Components/GradientBackround";
import FormButton from "../StyledComponents/FormButton";
import NoPlantsMsg from "../StyledComponents/NoPlantMsg";

export default function ListOfPlants({ navigation }) {
  const { user } = useContext(UserContext);
  const { myPlantsList, setMyPlantsList } = useContext(PlantContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdded] = useState(false);

  
  useEffect(() => {
    // here?
    getUserPlants(user.username).then((response) => {
      setMyPlantsList(response.plants);
      setIsLoading(false);
    });
  }, [isDeleted, isAdded]);
  
  if (isLoading) {
    navigation.setOptions({headerShown:false})
    return <Loading text={"Loading plants..."}/>;
  }

  return (
    <GradientBackground>
      {navigation.setOptions({headerShown:true})}
      {myPlantsList.length !== 0 ? (
        <>
          <ScrollView>
            {myPlantsList.map((plant) => (
              <PlantCard
                key={plant._id}
                plant={plant}
                setIsDeleted={setIsDeleted}
                isDeleted={isDeleted}
                setIsLoading={setIsLoading}
              />
            ))}
          </ScrollView>
          <FormButton
            text={"Add a Plant"}
            pressHandler={() => navigation.navigate("AddPlant")}
          />
        </>
      ) : (
        <>
          <NoPlantsMsg username={user.username} />
          <FormButton
            text={"Add a Plant"}
            pressHandler={() => navigation.navigate("AddPlant")}
          />
        </>
      )}
    </GradientBackground>
  );
}