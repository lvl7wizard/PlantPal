import { createContext } from "react"
import { useState } from "react"

export const PlantContext = createContext()

export const PlantProvider = ({children}) => {
  const [myPlantsList, setMyPlantsList] = useState([])

  return (
    <PlantContext.Provider value={{ myPlantsList, setMyPlantsList }}>
      {children}
    </PlantContext.Provider>
  )
}