import React from 'react';
import trollFace from '../troll-face.png'

export default function Header() {
    return (
        <header className="header">
            <img src={trollFace} alt="troll" className='header--image' />
            <h1 className="header-title">MemeGenerator</h1>
            <h3 className="header-project3">React Course - Project 3</h3>
        </header>
    )
}