import { useEffect, useState } from "react"
import StatBar from "./Components/StatBar";

function App() {

  interface Poke {
    name: string;
    abilities: Array<{
      ability: {
        name: string;
      }
    }>
  }

  const [pokemon, setPokemon] = useState<Poke>()

   useEffect(() => {
    const randomInt = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const URL: string = "https://pokeapi.co/api/v2/pokemon/" + randomInt(1, 151)

    fetch(URL)
      .then(response => response.json())
      .then((data: Poke) => setPokemon(data))
  }, [])

  const capWord = (word: string): string => {
    return word[0].toUpperCase() + word.slice(1)
  }

  //const calcHP = (baseStat: number, ivHP: number, evHP: number, Level: number): number => {
   // return parseInt(0.01 * (2 * baseStat + ivHP + parseInt(0.25 * evHP)) * Level) + Level + 10
  //}

  return (
    <div className="flex flex-col items-center">
      {pokemon ?
        <>
         <p className="text-7xl mb-6">{capWord(pokemon.name)}</p>
          <img src={pokemon.sprites.other.dream_world.front_default} alt="" />
          <p className="text-3xl font-underline">Stats</p>
          {
            pokemon.stats.map((elem, index: number) => {
              return <StatBar key={pokemon.id + index} name={capWord(elem.stat.name)} value={elem.base_stat} />
            })
          }

          <p className="text-4xl font-bold">{capWord(pokemon.name)} </p>
          <p className="text-3xl font-underline">Abilities:</p>

          <ul className="list-disc pl-8">
           {
              pokemon.abilities.map((skill: { ability }) => {
                return <li className="text-2xl">{capWord(skill.ability.name)}</li>
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
