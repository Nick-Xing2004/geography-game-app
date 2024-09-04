import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export const Leaderboard = () => {
    const navigate = useNavigate(); //the navigation hook used to navigate to the leaderboard page
    const [leaderboard, setLeaderboard] = useState([]);   //the data structure used for storing player history data

    useEffect(() => {
        const fetchLeaderBoard = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/leaderboard");
                setLeaderboard(response.data);
            } catch(error) {
                console.error('error fetching leaderboard: ', error);
            }
        };

        fetchLeaderBoard();
    }, []);    //updates on when the component mounts

    return (
        <div className='max-w-2xl p-6 mx-auto my-8 bg-gray-100 shadow-lg rounded-lg'>
            <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>&#128073;  Leaderboard  &#128072;</h2>
            <ul className='space-y-4'>
                {leaderboard.map((entry, index) => {
                    return (
                        <li key={index} className='bg-teal-300 p-4 rounded-md shadow-sm flex justify-between items-center'>
                            {index + 1}: {entry.name} - {entry.score} pts
                        </li>
                    )
                })}
            </ul>
            <button onClick={() => {
                navigate('/game');
            }} className='w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 ease-in-out mt-4'>back to the game right now!</button>
        </div>

    );
}