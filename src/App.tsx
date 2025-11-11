import { useEffect, useState } from "react"

function App() {
 
const [pokemon, setPokemon] = useState(null)

  useEffect(() => {


    const URL: string = "https://pokeapi.co/api/v2/pokemon/818"
    fetch(URL)
      
      .then(response => response.json())
      .then(data => setPokemon(data))
  }, [])

  return (
    <div>
      <p className="text-4xl font-bold">{pokemon?.name} </p>

      pokemon?.abilities.map((ability: any) => (
        <p key={ability.ability.name}>{ability.ability.name}</p>
      ))}
    </div>
  )
}

export default App
