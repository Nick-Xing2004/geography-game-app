import { Link, useNavigate} from 'react-router-dom';
import backgroundImage from '../images/background_main_menu.jpg';   //background image for the page
// import { GeographyGame } from './GeographyGame';
// import { Leaderboard } from './Leaderboard';

export const MainMenu = () => {
    const navigate = useNavigate(); //the navigation hook used to navigate to the leaderboard page

    return (
        <div className='py-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center' style={{
            backgroundSize: 'cover',      //set the background image attribute for the page
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${backgroundImage})`
        }}>
            <h1 className='text-4xl font-bold text-indigo-900 mb-8 text-center'>Welcome to the Geography Trivia</h1>
            <div className='space-y-6'>
                <button onClick={() => {
                    navigate('/game');
                }} className='max-w-xs w-full text-white bg-green-600 py-3 px-6 rounded-md hover:bg-blue-500 transition duration-200 ease-in-out'>Play the Geography guessing game</button>
                <br/>
                <button onClick={() => {
                    navigate('/leaderboard');
                }} className='max-w-xs w-full text-white bg-pink-500 py-3 px-6 rounded-md hover:bg-violet-700 transition duration-200 ease-in-out'>View the Leaderboard</button>
            </div>
        </div>
    );
}