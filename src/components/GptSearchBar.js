import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import lang from '../utilis/languageConstants'
import openAi from '../utilis/openAi'

const GptSearchBar = () => {
  const langKey=useSelector(store=>store.config.lang);
  const searchText=useRef(null);

  // const hanldeGptSearchClick= async()=>{
  //   console.log(searchText.current.value)

  //   //Make an API call
  //   const gptQuery="Act as a Movie Recommendation system and sugges some movies for the query :" + searchText.current.value + 
  //   ". only give names of 5 movies, comma separated like the example result given ahead.Example Result: Gadar, Sholay, Don, Golmaal, koi mil gaya"
  //   const gptResults=await openAi.chat.completions.create({
  //     model: "gpt-3.5-turbo",
  //     messages:[
  //       {
  //       role:"user",
  //       content:gptQuery
  //     }
  //   ],
  //   });
  //   console.log("Results",gptResults.choices?.[0]?.message?.content);

  //   //A,B,C,D,E
  //   const gptMovies=gptResults.choices?.[0]?.message?.content.split(",")
  //   //Now Data will look like
  //   //[A,B,C,D,E]

  // }
  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    // Your refined GPT query to ensure only movie names
    const gptQuery = "Act as a Movie Recommendation system. Suggest 5 funny Indian retro movies. Only return the movie names, comma-separated, with no additional information, characters, or actors. Example: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya. Please only return the movie names, no other text.";

    // Hugging Face API URL and token
    const HF_API_URL = "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B";
    const HF_API_TOKEN = "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"; // Replace with your Hugging Face token

    try {
        // Make the API call
        const response = await fetch(HF_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: gptQuery,
                parameters: {
                    max_length: 100, // Limiting response size
                    temperature: 0.7, // Control creativity
                    top_p: 0.9,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                },
            }),
        });

        // Check if the response is successful
        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`API call failed with status: ${response.status}, message: ${errorDetails?.error || "Unknown error"}`);
        }

        // Parse the response
        const data = await response.json();

        // Log the full response for debugging purposes
        console.log("Full Response:", data);

        // Extract and clean the generated text
        const generatedText = data[0]?.generated_text || "No response generated";

        // Process the response: remove unwanted text and only extract movie names
        let movieNames = generatedText
            .split("Example:")[1] // Grab text after the example part
            .replace(/[^\w\s,]/g, '') // Remove unwanted special characters
            .replace(/(Act as a.*?movies)|(Please.*)/g, '') // Remove any remaining instructions
            .replace(/\s+/g, ' ') // Normalize spaces
            .trim(); // Remove leading/trailing spaces

        // Ensure the names are comma-separated and clean
        movieNames = movieNames.split(',').map(name => name.trim()).join(', ');

        // Log the final cleaned movie suggestions
        console.log("Movie Suggestions:", movieNames);

    } catch (error) {
        console.error("Error fetching GPT results:", error.message);
    }
};
  return (
    <div className='pt-[10%] flex justify-center'>
        <form 
         onSubmit={(e)=>e.preventDefault()}
        className='w-1/2  bg-black grid grid-cols-12'
        >
            <input 
            ref={searchText}
            className='p-4 m-4 col-span-9'
            type='text'
            placeholder={lang[langKey].gptSearchPlaceholder}
            />
            <button className='py-2 px-4 m-4 col-span-3 bg-red-700 text-white rounded-lg'
            onClick={handleGptSearchClick}
            >
              {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar