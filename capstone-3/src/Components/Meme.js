import React from 'react';
import memeData from '../MemeData';

export default function Meme()
//A user will see a meme image on page load
{
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemeImages, setAllMemeImages] = React.useState(memeData)

    function getMemeImage() {
        const memesArray = allMemeImages.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))

    }
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <>
            <main>

                {/* A user will see a form with two inputs and a submit button, - Inputs will be:
    - top text
    - bottom text */}

                <div className="form">

                    <input
                        type="text"
                        placeholder="top text"
                        className="form--input"
                        name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="bottom text"
                        className="form--input"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />

                    {/* A user can click "refresh meme image" to load a new one */}

                    <button
                        className="form--button"
                        onClick={getMemeImage}>
                        Get a new meme image 🖼
                    </button>
                    
                </div>
                <div className="meme">
                <img src={meme.randomImage}  alt="memeImage" className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
                {/* <img src={meme.randomImage} alt="memeImage" className="meme--image" /> */}
            </main>
        </>

    )
}
