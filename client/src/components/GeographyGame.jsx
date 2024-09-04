import {useState, useEffect} from 'react';
import axios from "axios";
import image1 from '../images/world.webp';
import Confetti from 'react-confetti'; //the component library used for animation after user submission 
import { Link, useNavigate} from 'react-router-dom';

export const GeographyGame = () => {
    const navigate = useNavigate(); //the navigation hook used to navigate to the leaderboard page

    const [question, setQuestion] = useState("");       //several states used for main info update
    const [submissionTimes, setSubmissionTimes] = useState(0);
    const [answer, setAnswer] =  useState("");
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");

    const [isCorrect, setIsCorrect] = useState(null);  //the state set to control the color conversion of the feedback statement
    
    //states reponsible for hints functionality
    const [hint, setHint] = useState("");
    const [hintIndex, setIndex] = useState(1);
    const [hintInfo, setHintInfo] = useState("");

    //state used for submission animation controlling
    const [showConfetti, setShowConfetti] = useState(false);    
    
    //the hook used for fetching data from the backend 
    useEffect(() => {
        fetch("http://localhost:3001/api/questions").then((res) => {
            return res.json();
        }).then((data) => {
            setQuestion(data.question);
            setHint(data.answer);
            console.log(data.answer);       //used for testing program stability
        })
    }, [submissionTimes]);    //being called once submissionTimes changed 

    //submission handling function
    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/verifications", { answer });

            if (response.data.correctness) {
                if (submissionTimes % 5 === 0) {
                    setScore(1);
                } else {
                    setScore(score+1);
                }
                setFeedback("Yes, your answer is correct and you will be given a point!");
                setIsCorrect(true);
                setShowConfetti(true);

                //the time controlling functionality set to control the submission animation time length
                setTimeout(() => {
                    setShowConfetti(false);
                }, 3000);
                

            } else {
                if (submissionTimes % 5 === 0) {
                    setScore(0);
                }
                setFeedback(`Unfortunately, the answer is wrong. The correct answer is ${response.data.correctAnswer}.`);
                setIsCorrect(false);
            }

            if (submissionTimes !== 0 && (submissionTimes + 1) % 5 === 0) {
                saveScore(score);
            }
    
            setSubmissionTimes(submissionTimes + 1);        //updating the submissionTimes
            setAnswer("");       //clearing the answer to prepare for the next question

            setHint("");     //clearing the hint stuff to prepare for the next question
            setHintInfo("");
            setIndex(1);
        } catch (error) {
            console.error("Error during submission:", error);
            setFeedback("There was an error submitting your answer. Please try again.");
        }
    }

    //hints request handling function
    const handleHints = () => {
        if (hintIndex >= 3) {     //only 2 hints are allowed for each question, or it's too easy!!!
            setHintInfo("... bro, no more hints can be provided at this point");
        } else {
            setHintInfo(hint.substring(0, hintIndex));
            setIndex(hintIndex+1);
        }
    }

    //save the user's score to the leaderboard 
    const saveScore = async (score) => {
        try {
            const playerName = prompt("Please enter your name for the leaderboard: ");
            if (playerName) {
                await axios.post("http://localhost:3001/api/leaderboard", {name : playerName, score});
                alert('score submitted successfully!');
            }
        } catch (err) {
            console.error("Error saving score: ", err);
        }
    }
    
    return (
        <div className='p-8 mx-auto bg-sky-100 rounded-lg shadow-md max-w-lg'>
            <img src={image1} className='w-80 height-auto mx-auto -mt-4'></img>
            {/* <h1 className='text-4xl font-bold text-center text-sky-400 mb-6'>Welcome to the Geography Guessing Game!</h1> */}
            <h3 className='text-2xl font-semibold mb-4 text-purple-500 italic '>Current Question: {question}</h3>
            <input className='p-3 mb-4 border-gray-300 w-full rounded-md focus:outline-none focus:ring-4 focus:ring-teal-600' placeholder='Enter the name of the country here:' onChange = {(e) => setAnswer(e.target.value)} value={answer} onKeyDown={(e) => {
                if (e.key === "Enter") {             //implements the 'enter' submission functionality (another answer submission method added)
                    handleSubmit();
                }
            }}/>
            {/* displays the animation when the user answers the question correctly */}
            {showConfetti && <Confetti/>}      
            <p className={`text-lg font-semibold mb-8 ${
                    isCorrect === true ? 'text-green-600' : 
                    isCorrect === false ? 'text-red-600' : 'text-teal-600'
                }`}>{feedback}</p>
            {submissionTimes % 5 === 0  && submissionTimes !== 0 ? <h3 className='text-xl font-semibold mb-6 text-teal-600'>score for the past 5 attempts: {score} pts</h3> : <></>}
            <hr className='border-2 border-dashed border-gray-300'/>
            <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-green-700 mb-4  mt-6 transition duration-200 ease-in-out' onClick={handleHints}>Stuck? Click here to obtain hint for the country name!</button>
            <p className='text-lg mb-6 text-gray-700'>&#x27A1; {hintInfo}...</p>
            <button className='w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 ease-in-out' onClick={handleSubmit}>Submit the answer</button>
            {/* <Link to='../leaderboard'>Jump to the Leaderboard</Link> */}
            <button onClick={() => {
                navigate('/leaderboard');
            }} className='w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 ease-in-out mt-2'>Jump to the Leaderboard</button>
        </div>
    );
}