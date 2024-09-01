import {useState, useEffect} from 'react';
import axios from "axios"

export const GeographyGame = () => {
    const [question, setQuestion] = useState("");       //several states used to update the component
    const [submissionTimes, setSubmissionTimes] = useState(0);
    const [answer, setAnswer] =  useState("");
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    
    //the hook used for fetching data from the backend 
    useEffect(() => {
        fetch("http://localhost:3001/api/questions").then((res) => {
            return res.json();
        }).then((data) => {
            setQuestion(data.question);
            // console.log(data.answer);
        })
    }, [submissionTimes]);    //being called once submissionTimes changed 

    //submission handling function
    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/verifications", { answer });
    
            if (response.data.correctness) {
                setScore(score + 1);
                setFeedback("Yes, your answer is correct and you will be given a point!");
            } else {
                setFeedback(`Unfortunately, the answer is wrong. The correct answer is ${response.data.correctAnswer}.`);
            }
    
            setSubmissionTimes(submissionTimes + 1);        //updating the submissionTimes
            setAnswer("");       //clearing the answer for the next question
        } catch (error) {
            console.error("Error during submission:", error);
            setFeedback("There was an error submitting your answer. Please try again.");
        }
    }
    
    return (
        <div>
            <h1>Welcome to the Geography Guessing Game!</h1>
            <h3>Current Question: {question}</h3>
            <input placeholder='enter the name of the country here...' onChange = {(e) => setAnswer(e.target.value)} />
            <p>{feedback}</p>
            {submissionTimes % 5 === 0 ? <h3>Your total score for the recent 5 attempts is: {score}</h3> : <></>}
            <button onClick={handleSubmit}>Submit the answer</button>
        </div>
    );
}