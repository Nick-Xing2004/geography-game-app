const express = require("express");
const app = express();   //setting up the express server 
const axios = require("axios");   //loading axios used for web data fetching from api
const port = 3001;

const cors = require('cors');
app.use(cors()); //configure the cors to allow req from all origins
app.use(express.json());

let currentQuestion = "";     //global variable for storing the answer and the question (the lattest one)

//helper function for the main callback function below for making questions for the user 
const getRandomCountryQuestion = async () => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");    //the recommended external api   
        const countries = response.data;
        const countryIndex = Math.floor(Math.random() * countries.length);    //get one of all states randomly 
        const country = countries[countryIndex];

        //the possible question list(array of multiple questions):
        const questions = [{   //q1
             question: `fun-fact-question: which country belongs to ${country.continents} and one of its alternative names is ${country.altSpellings[0]}?`,
             key: country.name.common
        },   
        {    //q2
            question: `which country's capital is ${country.capital[0]}?`,
            key: country.name.common
        },
        {
            //q3
            question: `which country has a total population of ${country.population.toString()}?`,
            key: country.name.common
        },
        {
            //q4
            question: `which country's official name is ${country.name.official}?`,
            key: country.name.common
        },
        {
            //q5
            question: `which country's overall area is ${country.area.toString()} sq km?`,
            key: country.name.common
        },
        {
            //q6
            question: `in which country do people drive in the ${country.car.side} side and with ${country.car.signs[0]} as their car sign ?`,
            key: country.name.common
        },
        {
            //q7
            question: `which country normally uses ${country.demonyms.eng.f} as the demonym for local female?`,
            key: country.name.common
        },
        {
            //q8
            question: `which country normally uses ${country.demonyms.eng.m} as the demonym for local male?`,
            key: country.name.common
        },
        {   //q9
            question: `which country has ${country.idd.root} as the root of its idd(international direct dialing code) and ${country.idd.suffixes[0]} as the suffix of its idd?`,
            key: country.name.common
        },
        {
            //q10 multi-medium geography question
            question: `which country is this ${country.flag}?`,
            key: country.name.common
        }
        ];
        const randomQuestionIndex = Math.floor(Math.random() * questions.length);   //similarly, get one of the question for the country randomly 
        const randomQuestion = questions[randomQuestionIndex];

        return randomQuestion;    //returning the question and the key and the hints array 
    } catch (error) {
        console.log("exist errors while fetching data from the api");
        return null;
    }
}


//the route dealing with getting question http request 
app.get('/api/questions', async (req, res) => {
    const userQuestion = await getRandomCountryQuestion();
    if (userQuestion) {
        keyOfQuestion = userQuestion.key;
        res.json({question: userQuestion.question, answer: keyOfQuestion});
    } else {
        res.status(500).json("currently unable to fetch questions from the dependent api.");
    }
});


//the route dealing with verifying the answer sent back from the front end
app.post('/api/verifications', (req, res) => {
    //some processing on the user input and the api data  
    const userAnswer = req.body.answer.trim().toLowerCase();
    const correctAnswer = keyOfQuestion.trim().toLowerCase();

    res.json({correctness: userAnswer === correctAnswer, correctAnswer: correctAnswer});
});

let leaderboard = [];

//the route dealing with leadrboard info posting 
app.post('/api/leaderboard', (req, res) => {
    const {name, score} = req.body;
    leaderboard.push({name, score});
    leaderboard.sort((a, b) => b.score - a.score);

    res.status(200).json({message: 'player info and score added to the leaderboard!'});
});

//the route dealing with the leaderboard info getting
app.get('/api/leaderboard', (req, res) => {
    res.status(200).json(leaderboard);
});


app.listen(port, () => {        //setting up the server on port 3001
    console.log(`the server is now running on port ${port}`);
});

