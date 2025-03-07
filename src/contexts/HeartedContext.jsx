import { createContext, useState, useEffect} from "react";
export const HeartedContext = createContext()

export default function HeartedContextProvider(props){

    const [hearted, setHearted] = useState([]);

    const addProduct = (productToAdd) =>{

        let listOfProducts = [...hearted, productToAdd];
        setHearted(listOfProducts);
    };


    const removeProduct = (productId)=>{

        let updatedProducts = hearted.filter(item => item.id !== productId);

        setHearted(updatedProducts)
    }

    useEffect(
        ()=>{
            const storedCartedData = localStorage.getItem("Carted");

            if(storedCartedData){
                setHearted(JSON.parse(storedCartedData))
            }

        },[]
    )

  useEffect(
        ()=>{
            localStorage.setItem("Carted", JSON.stringify(hearted));
        },[hearted]
    )

    return(
        <HeartedContext.Provider value={{hearted, addProduct, removeProduct, setHearted}}>
            {props.children}
        </HeartedContext.Provider>
        )
}
