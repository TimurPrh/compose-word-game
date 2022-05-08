import React, { useEffect, useState } from 'react';
import SourceList from './components/sourceList/SourceList';
import PlaceList from './components/placeList/PlaceList';
import Header from './components/Header/Header';
import iconsNames from './icons.json';
import './App.scss';

const App = () => {
  const [letters, setLetters] = useState([])
  const [refs, setRefs] = useState([])
  const [mainWord, setMainWord] = useState({})
  const [throwPositions, setThrowPositions] = useState(false)
  const [solvedRight, setSolvedRight] = useState(false)
  const [solvedWrong, setSolvedWrong] = useState(false)
  const [solvedWords, setSolvedWords] = useState([])

  const getRef = (ref) => {
    setRefs(prev => {
      return [...prev, { x: ref.x, y: ref.y }]
    })
  }

  const getRandomArray = (arr) => {
    const mixed = []
    arr.forEach(item => {
      let index = Math.round(Math.random() * (arr.length - 1))
    
      while (mixed[index]) {
        if (index >= arr.length - 1) {
          index = 0
        } else {
          index += 1
        } 
      }
    
      mixed[index] = item
    })

    return mixed
  }

  const setRandomLetters = () => {
    let wordArray
    do {
      wordArray = getRandomArray(mainWord.word.toUpperCase().split(''))
    } while (wordArray.join('') === mainWord.word.toUpperCase());
    
    const newState = []
    wordArray.forEach((letter, i) => {
      const item = {}
      item.id = i
      item.text = letter
      newState.push(item)
    })
    
    setLetters(newState)
  }

  const handleLetters = (id, pos) => {
    // приходит при окончании движения буквы
    // меняется положение
    setSolvedWrong(false)
    setThrowPositions(false)
    setLetters(prev => {
      const newState = [...prev]
      newState[id].pos = pos
      return newState
    })
  }

  const handleSetMainWord = () => {
    if (solvedWords.length >= iconsNames.icons.length) {
      alert('слова закончились')
    } else {
      let index = Math.round(Math.random() * (iconsNames.icons.length - 1))
    
      while (solvedWords.indexOf(iconsNames.icons[index].word) !== -1) {
        if (index >= iconsNames.icons.length - 1) {
          index = 0
        } else {
          index += 1
        }
      }

      setMainWord(iconsNames.icons[index])
    }

    setRefs([])
    setLetters([])
    setSolvedRight(false)
  }

  const resetWord = () => {
    setRandomLetters()
    setThrowPositions(true)
  }

  useEffect(() => {
    if (mainWord.word) {
      setRandomLetters()
    }
  }, [mainWord])

  useEffect(() => {
    handleSetMainWord()
  }, [])

  useEffect(() => {
    let completed = true
    letters.forEach(letter => {
      if (!letter.pos) {
        completed = false
      } else {
        if (letter.pos.y > refs[0].y) {
          completed = false
        }
      }
    })
    if (completed && letters.length > 0) {
      const sorted = letters.map(i => i).sort((a, b) => a.pos.x - b.pos.x)
      const word = sorted.map(letter => letter.text).join('')
      
      if (word === mainWord.word.toUpperCase()) {
        setSolvedWords(prev => [...prev, mainWord.word])
        setSolvedRight(true)
      } else {
        setSolvedWrong(true)
      }
    }
  }, [letters])

  return (
    <div className='container'>
      <div className='wrapper'>
        <Header 
          img={mainWord ? mainWord.file : null} 
          nextWord={handleSetMainWord}
          resetWord={resetWord}
          solvedRight={!solvedRight}/>
        <PlaceList 
          solvedRight={solvedRight} 
          solvedWrong={solvedWrong} 
          letters={letters} 
          getRef={getRef}/>
        {
          refs.length > 0 ?
          <SourceList 
            solvedRight={solvedRight} 
            solvedWrong={solvedWrong} 
            letters={letters} 
            handleLetters={handleLetters} 
            refs={refs} 
            throwPositions={throwPositions}/>
          :
          null
        }
      </div>
    </div>
  );
};

export default App;