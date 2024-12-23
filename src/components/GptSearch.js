import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptSearchSuggestions from './GptSearchSuggestions'
import { BG_URL } from '../utilis/constants'

const GptSearch = () => {
  return (
    <div>
    <div className='absolute -z-10'>
    <img
      src={BG_URL}
      alt='Logo'
    />

    </div>
        <GptSearchBar/>
        <GptSearchSuggestions/>
    </div>
  )
}

export default GptSearch