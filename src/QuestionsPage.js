import logo from './logo.svg';

import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SingleQuestion from './SingleQuestion';

const numberOfFilms = 4;

const preSetSeed = true;

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

function getSeed() {

    if (preSetSeed == true) {

        return 1;
    } else {

        let seed = Math.floor(Math.random() * 10);
        console.log(seed)

        return seed;
    }
}
let films = null;
let Questions = null;

function populateInitAnswersState(numberOfAnswers){
let answerStateArray=[]

for(let answerStateIndex=0;answerStateIndex<numberOfAnswers;answerStateIndex++){

    answerStateArray.push({answer: null,marked:false})
}
return answerStateArray;
}
async function getMovies() {
    const data = await axios.get('http://localhost:8080/home/getRandomMovies/' + getSeed() + '/' + numberOfFilms);
    return data.data;
}

async function getYearQuestion(filmid) {
    let tempseed = getSeed();
   
    const data = await axios.get('http://localhost:8080/home/getLanguageQuestion/' + filmid + '/' + filmid)
    return data.data;
}
function QuestionPage() {
    const [isLoading, setIsLoading] = useState(
        true
    )


    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                films = await getMovies();
                console.log(films);

                Questions = await Promise.all(films.map((film, fIndex) => getYearQuestion(film.filmid)));

                console.log();
                // setPosts(data);
            } catch (error) {
                // setIsError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    console.log(populateInitAnswersState(4));
    const handleChange = e => {


        // setNewRating(existingValues => ({
        //     // Retain the existing values
        //     ...existingValues,

        //     rating: e.target.value, requiresUpdating: true,
        // }))
        // setMyList(myList.map(artwork => {
        //     if (artwork.id === artworkId) {
        //       // Create a *new* object with changes
        //       return { ...artwork, seen: nextSeen };
        //     } else {
        //       // No changes
        //       return artwork;
        //     }
        //   }))

    };
    console.log(Questions);
    let renderedQuestions = "";
    if (Questions != null) {
        renderedQuestions = Questions.map((question, index) => {

            const uniqueInputKey = index + question.questionType;
            console.log(uniqueInputKey);

            return (
                <SingleQuestion key={uniqueInputKey} uid={uniqueInputKey} qindex={index} question={question.question} questionType={question.questionType} answers={question.possibleAnswers}  />
            );

        });

    }
    return (

        <div >

            <h2 id='allmovies'>All Movies</h2><br />
            <div className="container center">
                {renderedQuestions}
            </div>
        </div>
    )
}


export default QuestionPage;