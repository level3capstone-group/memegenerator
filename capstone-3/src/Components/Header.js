import React from 'react';
import trollFace from '../troll-face.png'

export default function Header(){
    return(
        <>
<header className='header'>
    <img src={trollFace} alt="troll" className='header--image' />
    <h2 className='header--title'>Meme Generator</h2>
<h4 className='header--project'>React Course - Capstone</h4>
</header>
        </>
    )
};