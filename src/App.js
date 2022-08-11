import React, { useEffect, useState } from 'react';
import SourceList from './components/sourceList/SourceList';
import PlaceList from './components/placeList/PlaceList';
import Header from './components/Header/Header';
import LanguageList from './components/languageList/LanguageList';
import iconsNames from './icons.json';
import appTexts from './texts.json';
import './App.scss';

const App = () => {
  const [letters, setLetters] = useState([])
  const [refs, setRefs] = useState([])
  const [mainWord, setMainWord] = useState({})
  const [mainWordText, setMainWordText] = useState('')
  const [throwPositions, setThrowPositions] = useState(false)
  const [solvedRight, setSolvedRight] = useState(false)
  const [solvedWrong, setSolvedWrong] = useState(false)
  const [solvedWords, setSolvedWords] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState('en')

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
      wordArray = getRandomArray(mainWord.word[selectedLanguage].toUpperCase().split(''))
    } while (wordArray.join('') === mainWord.word[selectedLanguage].toUpperCase());
    
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
      alert(appTexts[selectedLanguage].over)
    } else {
      let index = Math.round(Math.random() * (iconsNames.icons.length - 1))
    
      while (solvedWords.indexOf(iconsNames.icons[index].word.en) !== -1) {
        if (index >= iconsNames.icons.length - 1) {
          index = 0
        } else {
          index += 1
        }
      }

      setMainWord(iconsNames.icons[index])
      setMainWordText(iconsNames.icons[index].word[selectedLanguage])
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
    if (mainWord.file) {
      setRandomLetters()
    }
  }, [mainWordText])

  useEffect(() => {
    handleSetMainWord()
  }, [])

  useEffect(() => {
    if (mainWord.file) {
      setRefs([])
      setLetters([])
      setMainWordText(mainWord.word[selectedLanguage])
    }
  }, [selectedLanguage])

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
      
      if (word === mainWord.word[selectedLanguage].toUpperCase()) {
        setSolvedWords(prev => [...prev, mainWord.word.en])
        setSolvedRight(true)
      } else {
        setSolvedWrong(true)
      }
    }
  }, [letters, selectedLanguage])

  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='upper-line'>
          <LanguageList 
            selectedLanguage={selectedLanguage} 
            setSelectedLanguage={setSelectedLanguage}/>
        </div>
        <Header 
          img={mainWord ? mainWord.file : null} 
          nextWord={handleSetMainWord}
          resetWord={resetWord}
          solvedRight={!solvedRight}
          texts={appTexts[selectedLanguage]}/>
        <PlaceList 
          solvedRight={solvedRight} 
          solvedWrong={solvedWrong} 
          letters={letters} 
          getRef={getRef}
          throwPositions={throwPositions}/>
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