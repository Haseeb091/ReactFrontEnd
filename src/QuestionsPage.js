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
let questions = null;

function populateInitAnswersState(numberOfAnswers) {
    let answerStateArray = []

    for (let answerStateIndex = 0; answerStateIndex < questions.length; answerStateIndex++) {

        answerStateArray.push({ answer: null, correct: false })
    }
    return answerStateArray;
}
async function getMovies() {
    const data = await axios.get('http://localhost:8080/home/getRandomMovies/' + getSeed() + '/' + numberOfFilms);
    return data.data;
}

async function getLanguageQuestion(filmid) {
    let tempseed = getSeed();

    const data = await axios.get('http://localhost:8080/home/getYearQuestion/' + filmid + '/' + filmid)
    return data.data;
}

async function getYearQuestion(filmid) {

    
    let tempseed = getSeed();

    const data = await axios.get('http://localhost:8080/home/getLanguageQuestion/' + filmid + '/' + filmid)
    return data.data;
}


function checkIfAllQuestionsAnswered(userAnswers){
    let questionsComplete = true;
    for (let answerIndex = 0; answerIndex < userAnswers.length; answerIndex++) {
        if (userAnswers[answerIndex].answer == null) {

            questionsComplete = false;
            break;
        }

    }

    return questionsComplete

}
function QuestionPage() { 
    const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    const [userAnswers, setUserAnswer] = useState(null)

    const [quizCompleted, setquizCompleted] = useState(false)

    const handleChange = (e, questionIndex, questionType, value) => {

        console.log(questionIndex + "" + value);
        setUserAnswer(userAnswers.map((userAnswer, index) => {
            if (index === questionIndex) {
                // Create a *new* object with changes
                return { ...userAnswer, answer: value };
            } else {
                // No changes
                return userAnswer;
            }
        }))
        console.log("update");
        console.log(userAnswers);

    };
    console.log(questions);

   

    const handleSubmit = () => {

        

        if (checkIfAllQuestionsAnswered(userAnswers)) {
            //
            let answeredCorrectlyCounter = 0;
            const newUserAnswers = userAnswers.slice();
            userAnswers.map((userAnswer, answerIndex) => {
                if (questions[answerIndex].correctAnswer === userAnswer.answer) {

                    newUserAnswers[answerIndex].correct = true;
                    answeredCorrectlyCounter += 1;

                } else {
                    newUserAnswers[answerIndex].correct = false;
                }
            });

            setUserAnswer(newUserAnswers);

            setCorrectAnswerCounter(answeredCorrectlyCounter)
            
                setquizCompleted(true);
            

            console.log("counter "+answeredCorrectlyCounter)

        }else{

            console.log("not complete");
        }


    };


    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                films = await getMovies();
                console.log(films);

                questions = await Promise.all(films.map((film, fIndex) => getYearQuestion(film.filmid)));

                films = await getMovies();
               questions= questions.concat(await Promise.all(films.map((film, fIndex) => getLanguageQuestion(film.filmid))))
                

                console.log();
                // setPosts(data);
            } catch (error) {
                // setIsError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    let renderedQuestions = "";

if(isLoading||questions===null){

    
        return(<div><h1>Loading</h1></div>)

    
}else  if (userAnswers == null) {
    setUserAnswer(populateInitAnswersState(questions.length));
} else if (questions != null) {
    renderedQuestions = questions.map((question, index) => {
    
        const uniqueInputKey = index + question.questionType;
        console.log(uniqueInputKey);

        return (
            <SingleQuestion key={uniqueInputKey} uid={uniqueInputKey} qindex={index} question={question.question} questionType={question.questionType} answers={question.possibleAnswers}correct={userAnswers[index].correct} completed={quizCompleted} onChange={handleChange} />
        );

    });

}
   
    console.log(userAnswers);
  


   
console.log(userAnswers);

    return (

        <div >

            <h2 id='allmovies'>Mark: {correctAnswerCounter}/{questions.length}</h2><br />
            <div className="container center">
                {renderedQuestions}
                <input id="submitQuiz" type="button" value="Submit" onClick={handleSubmit} /><br />

            </div>
        </div>
    )
}


export default QuestionPage;