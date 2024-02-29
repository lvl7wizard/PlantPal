import { createContext } from "react"
import { useState } from "react"

export const PlantContext = createContext()

export const PlantProvider = ({children}) => {
  const [myPlantsList, setMyPlantsList] = useState([])
  const [plantsListChanged, setPlantsListChanged] = useState(false)

  return (
    <PlantContext.Provider value={{ myPlantsList, setMyPlantsList, plantsListChanged, setPlantsListChanged }}>
      {children}
    </PlantContext.Provider>
  )
}