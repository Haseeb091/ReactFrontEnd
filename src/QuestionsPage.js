import logo from './logo.svg';

import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';



const movObjects = [
    {
        "title": "ironMan",
        "image": 'IronMan.jpg',
        "description": 'A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.),is conducting weapons tests overseas, but terrorists kidnap him to force him to build adevastatingweapon. Instead, he builds an armored suit and upends his captors.',
        "rating": 4.7,
        "numbOfReview": 200,
        "video": 'https://www.youtube.com/embed/8ugaeA-nMTc'

    },
    {
        "title": "ironMan2",
        "image": 'IronMan2.jpg',
        "description": 'A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.),is conducting weapons tests overseas, but terrorists kidnap him to force him to build adevastatingweapon. Instead, he builds an armored suit and upends his captors.',
        "rating": 4.7,
        "numbOfReview": 200,
        "video": 'https://www.youtube.com/embed/8ugaeA-nMTc'
    }, {
        "title": "ironMan3",
        "image": 'IronMan.jpg',
        "description": 'A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.),is conducting weapons tests overseas, but terrorists kidnap him to force him to build adevastatingweapon. Instead, he builds an armored suit and upends his captors.',
        "rating": 4.7,
        "numbOfReview": 200,
        "video": 'https://www.youtube.com/embed/8ugaeA-nMTc'
    },
    {
        "title": "ironMan4",
        "image": 'IronMan2.jpg',
        "description": 'A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.),is conducting weapons tests overseas, but terrorists kidnap him to force him to build adevastatingweapon. Instead, he builds an armored suit and upends his captors.',
        "rating": 4.7,
        "numbOfReview": 200,
        "video": 'https://www.youtube.com/embed/8ugaeA-nMTc'
    }]


let films=null;
async function getData(){
    const data = await axios.get('http://localhost:8080/home/actor/1');
    console.log(data);
 }
function QuestionPage() {
 
    
    useEffect(() => {
        (async () => {
          try {
            //setIsLoading(true);
           await getData();
           // setPosts(data);
          } catch (error) {
           // setIsError(true);
          } finally {
           // setIsLoading(false);
          }
        })();
      },[]);
    return (

        <div >
            
            <h2 id='allmovies'>All Movies</h2><br/>
            <div className="container center">
            
            </div>
        </div>
    )
}


export default QuestionPage;