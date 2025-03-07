import { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext();

export default function ThemeContextProvider(props){

    const [darkMode, setDarkMode] = useState(true);

    useEffect(
        ()=>{
          const storedData = localStorage.getItem('darkMode');
          if(storedData){
            setDarkMode(JSON.parse(storedData))
          }

        }, []
    )


    useEffect(
        ()=>{
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        },[darkMode]
    )

    return(
        <ThemeContext.Provider value={{darkMode, setDarkMode}}>
            {props.children}
        </ThemeContext.Provider>
    )
}
