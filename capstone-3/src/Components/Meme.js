import React, { useState, useEffect } from 'react';
import Memelist from './MemeList';
import { v4 as uuidv4 } from 'uuid'

//A user will see a meme image on page load
export default function Meme() {    
    const [meme, setMeme] = useState({
        id: 451155,
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
        edit: false
    })
    const [allMemeImages, setAllMemeImages] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(res => setAllMemeImages(res.data.memes))
    }, [])

    const getMemeImage = (e) => {
        e.preventDefault()
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        const url = allMemeImages[randomNumber].url
        const id = allMemeImages[randomNumber].id
        setMeme(prevMeme => ({
            ...prevMeme, 
            randomImage: url, 
            id: id
        }))
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    const [memeList, setMemeList] = useState([])
    const [toggleEdit, setToggleEdit] = useState(false)

    const handleAddToList = (e) => {
        e.preventDefault()
        setMemeList(prevList => ([...prevList, meme]))
        setMeme(
            {
                id: uuidv4,
                topText: "",
                bottomText: "",
                randomImage: "http://i.imgflip.com/1bij.jpg",
                edit: false
            }
        )
    }

    const handleDeleteFromList = (id) => {
        setMemeList(memeList.filter(meme => meme.id !== id))
    }

     /* A user will see a form with two inputs and a submit button, - Inputs will be:
    - top text
    - bottom text */
    const handleEditList = (id) => {
        setToggleEdit(prevToggle => !prevToggle)
        memeList.find(meme => meme.id === id)
    }

    const handleEditChange = (e) => {
        const {name, value, parentElement} = e.target
        const {id} = parentElement
        setMemeList(prevState => {
            const specificMeme = prevState.find(meme => meme.id === id)
            specificMeme[name] = value
            return prevState.map(meme => {
                if (meme.id === specificMeme.id) {
                    return specificMeme
                } else return meme
            })
        })
    }

    const listOfMemes = memeList.map(meme => (
        <Memelist 
            key={meme.id}
            {...meme}
            handleDeleteFromList={handleDeleteFromList}
            handleEditList={handleEditList}
            toggleEdit={toggleEdit}
            handleEditChange={handleEditChange}
        />
    ))

    const styles = {
        border: "5px solid black"
    }

    return (
        <div className="form" >
            <form onSubmit={handleAddToList}>
                <input 
                    name="topText"
                    type="text" 
                    className="text-box" 
                    placeholder='Top Text'
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    name="bottomText"
                    type="text" 
                    className="text-box" 
                    placeholder='Bottom Text'
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <br />
                {/* A user can click "refresh meme image" to load a new one */}
                <input 
                    onClick={getMemeImage} 
                    type="submit" 
                    className="generate" 
                    value="Get a new meme image "
                />
                <div className="meme-container">
                    <img src={meme.randomImage} className="meme-Image" alt=""/>
                    <h2 className="meme-text top">{meme.topText}</h2>
                    <h2 className="meme-text bottom">{meme.bottomText}</h2>
                </div>
                <button className="generate">Generate Meme</button>
            </form>
            {listOfMemes.length > 0 && <div style={styles} className="memelist-container">
                {listOfMemes}
            </div>}
        </div>
    )
}