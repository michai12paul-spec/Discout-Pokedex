import { useEffect, useState } from "react"

function App() {

  interface Poke {
    name: string;
    abilities: Array<{
      ability: {
        name: string;
      }
    }>;
  }

  const [pokemon, setPokemon] = useState<Poke>()

  useEffect(() => {


    const URL: string = "https://pokeapi.co/api/v2/pokemon/818"
    fetch(URL)
      .then(response => response.json())
      .then((data: Poke) => setPokemon(data))
  }, [])

  const capName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  const calcHP = (baseStat: number, ivHP: number, evHP: number, Level: number): number => {
    return parseInt(0.01 * (2 * baseStat + ivHP + parseInt(0.25 * evHP)) * Level) + Level + 10
  }

  return (
    <div className="flex flex-col items-center">
      {pokemon ?
        <>

          <p className="text-4xl font-bold">{capName(pokemon.name)} </p>
          <img className="h-90" src={pokemon.sprites.other.dream_world.front_default} alt="" />
          <p className="text-3xl font-underline">Abilities:</p>

          <ul className="list-disc pl-8">
            {
              pokemon?.abilities.map((skill: unknown) => {
                return <li className="text-2xl">{skill.ability.name}</li>
              })
            }
          </ul>

          <audio controls src={pokemon?.cries.latest}></audio>


        </>
        :
        <h1 className="text-5xl">Fetching...</h1>
      }
    </div>

  )
}

export default App
