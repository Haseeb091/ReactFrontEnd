import logo from './logo.svg';

import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SingleQuestion from './SingleQuestion';

const numberOfFilms = 4;

const preSetSeed = true;



function getSeed() {

    if (preSetSeed == true) {

        return 1;
    } else {

        let seed = Math.floor(Math.random() * 10);

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
    const data = await axios.get('http://ec2-3-17-239-145.us-east-2.compute.amazonaws.com:8080/home/getRandomMovies/' + getSeed() + '/' + numberOfFilms);
    return data.data;
}

async function getLanguageQuestion(filmid) {
    

    const data = await axios.get('http://ec2-3-17-239-145.us-east-2.compute.amazonaws.com:8080/home/getYearQuestion/' + filmid + '/' + filmid)
    return data.data;
}

async function getActorQuestion(filmid) {
    

    const data = await axios.get('http://ec2-3-17-239-145.us-east-2.compute.amazonaws.com:8080/home/getActorQuestion/' + filmid + '/' + filmid)
    return data.data;
}

async function getCategoryQuestion(filmid) {
    

    const data = await axios.get('http://ec2-3-17-239-145.us-east-2.compute.amazonaws.com:8080/home/getCategoryQuestion/' + filmid + '/' + filmid)
    return data.data;
}


async function getYearQuestion(filmid) {


    let tempseed = getSeed();

    const data = await axios.get('http://ec2-3-17-239-145.us-east-2.compute.amazonaws.com:8080/home/getLanguageQuestion/' + filmid + '/' + filmid)
    return data.data;
}


function checkIfAllQuestionsAnswered(userAnswers) {
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

    const [isUserError, setIsUserError] = useState(false);

    const [userAnswers, setUserAnswer] = useState(null)

    const [quizCompleted, setquizCompleted] = useState(false)

    const handleChange = (e, questionIndex, questionType, value) => {

        setUserAnswer(userAnswers.map((userAnswer, index) => {
            if (index === questionIndex) {
                // Create a *new* object with changes
                return { ...userAnswer, answer: value };
            } else {
                // No changes
                return userAnswer;
            }
        }))
        

    };
    



    const handleSubmit = () => {

        setIsUserError(false);

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



        } else {

            setIsUserError(true);
        }


    };


    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                films = await getMovies();


                questions = await Promise.all(films.map((film, fIndex) => getYearQuestion(film.filmid)));

                films = await getMovies();
                questions = questions.concat(await Promise.all(films.map((film, fIndex) => getLanguageQuestion(film.filmid))))
                films = await getMovies();
                questions = questions.concat(await Promise.all(films.map((film, fIndex) => getActorQuestion(film.filmid))))
                films = await getMovies();
                questions = questions.concat(await Promise.all(films.map((film, fIndex) => getCategoryQuestion(film.filmid))))



            } finally {
                setIsLoading(false);
            }
        })();
    }, []);




    let renderedQuestions = "";

    if (isLoading || questions === null) {


        return (<div><h1>Loading</h1></div>)


    } else if (userAnswers == null) {
        setUserAnswer(populateInitAnswersState(questions.length));
    } else if (questions != null) {
        renderedQuestions = questions.map((question, index) => {

            const uniqueInputKey = index + "a";

            return (
                <SingleQuestion key={uniqueInputKey} uid={uniqueInputKey} qindex={index} correctAnswer={question.correctAnswer} question={question.question} questionType={question.questionType} answers={question.possibleAnswers} correct={userAnswers[index].correct} completed={quizCompleted} onChange={handleChange} />
            );

        });

    }







    return (

        <div >

            <h2 id='mark'>Mark: {correctAnswerCounter}/{questions.length}</h2><br />
            <div className="container center">
                {renderedQuestions}
                <input id="submitQuiz" type="button" value="Submit" onClick={handleSubmit} /><br />

            </div>
            {isUserError === true &&
                <h2 id="userError">
                    please complete questions before submitting
                </h2>
            }
        </div>
    )
}


export default QuestionPage;