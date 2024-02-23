import { createContext } from "react"
import { useState, useEffect } from "react"
import getUser from "../utils/PlantPalAPI"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}