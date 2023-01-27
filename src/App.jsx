import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/facts'

function useCatImage ({ fact }) {
  const [image, setImage] = useState()
  useEffect(() => {
    if (!fact) return
    const firstWords = fact.split(' ').slice(0, 3).join(' ')
    console.log(firstWords)
    fetch(
          `https://cataas.com/cat/says/${firstWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response
        setImage(`https://cataas.com/${url}`)
      })
  }, [fact])

  return { image }
}
// const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_RANDOM_URL = 'https://cataas.com/cat/says/${firstword}?size=50&color=red&json=true'
export function App () {
  const [fact, setFact] = useState()
  const { image } = useCatImage({ fact })

  useEffect(() => {
    getRandomFact().then(setFact)
  }, [])

  const handleClick = () => {
    getRandomFact().then(setFact)
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {image && (
        <img src={image} alt={`image extracted using the first three words for ${fact}`} />
      )}
      <button onClick={handleClick}>Get new fact</button>
    </main>
  )
}
