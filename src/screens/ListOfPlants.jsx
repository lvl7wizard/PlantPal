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
  const { myPlantsList, setMyPlantsList, plantsListChanged, setPlantsListChanged } = useContext(PlantContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdded] = useState(false);

  
  useEffect(() => {
    navigation.setOptions({headerShown:false})
    getUserPlants(user.username).then((response) => {
      setMyPlantsList(response.plants);
      setIsLoading(false);
      navigation.setOptions({headerShown:true})
    });
  }, [isDeleted, isAdded, plantsListChanged]);
  
  if (isLoading) {
    return <Loading text={"Loading plants..."}/>;
  }
  
  return (
    <GradientBackground>
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
            pressHandler={() => navigation.navigate("Selector")}
          />
        </>
      ) : (
        <>
          <NoPlantsMsg username={user.username} />
          <FormButton
            text={"Add a Plant"}
            pressHandler={() => navigation.navigate("Selector")}
          />
        </>
      )}
    </GradientBackground>
  );
}