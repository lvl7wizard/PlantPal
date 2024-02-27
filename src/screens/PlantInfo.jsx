import { Text } from "react-native"
import { useRoute } from "@react-navigation/core"

export default function PlantInfo () {
    const route = useRoute()
    const plant = route.params?.plant
    return <Text>{plant.name}</Text>
}