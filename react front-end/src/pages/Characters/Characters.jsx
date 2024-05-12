import { useState } from "react"
import { bringAllCharacters } from "../../services/apiCalls"
import "./Characters.css"

export const Characters =() =>{
    const [characters, setCharacters]= useState([])
    const bringCharacters=//async//
    () =>{
    bringAllCharacters()

    .then((res)=>{
        setCharacters(res)
         
    }).catch((error) =>{
        console.log(error);
    })
    
    }
    return (

        <div className="characters-design">
           HOLA AQUI HABRAN PERSONAJES 
           <button onClick={bringCharacters}>traer personajes</button>
           <ol>
            {characters.map((char,index)=>{
            return (
                <li key={char.id}>{char.name}</li>
            )
            })}
           </ol>
            </div>
    )
}