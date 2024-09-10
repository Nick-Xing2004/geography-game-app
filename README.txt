2024 Change++ Coding Challenge Project, Geography Trivia, Submission

Full name: Yuyang Xing
Email: yuyang.xing@vanderbilt.edu

#Instructions and explanations on how to run program:
Before running the program, we should have the following packages installed:
- frontend: 
please run "npm install {package name}" to install the specified packages below:
1.react-router-dom
2.axios
3.react-scroll-to-bottom
4.react-confetti

To run the backend, change the directory to 'server' and enter 'node index.js' in the terminal; for the frontend, first change the current directory to 'client', then enter 'npm start' to launch the react application.
(note: I've logged the correct answer to each question to the console (the console in the web browser), so that you can check and enter the correct answer to check for the ribbon animation!)


#Reflections on the coding process:
Besides achieving the basic requirements for the game desgin, I also did some enhancements on the funcitionalities of the app and below are some highlights of my code:
1. display ribbon animation for a few seconds when the user answers the geography question correctly
2. pop-up the name input box asking for player name for the leaderboard once the user completes five questions; entering name is optional and the score and the associated name  will not appear on the leaderboard if the player skip the input
3. clicking the hint button can get related hints
4. grade the players based on both their correctness and their speed (give 2.5pts if less than 5s, 2pts if less than 10s, 1.5pts if less than 20s, otherwise just 1pt)
5. set up a timer on the ui for user to check the time already elapsed (use second as the unit)
6. set up a leaderboard so that players could check their rank on the leaderborad
7. set up three pages and allow for going back ad forth among them

#Project feedback:
The project itself is interesting and gives a lot of room for free play! I really appreciate Change++ assigns this and desire to work on more web dev projects with the team later.

#Some potential improvements:
- For the leaderboard functionality, using database, like MongoDB, might be a more reasonable choice for storing the game records, in consideration of the stability of the app.
- For the leaderboard ranking, maybe rank the players based on both their scores and the time spent in total is more reasonable.
- For the guessing game part, maybe changing inputting answers manually to answering multiple choice questions would enhance the user experience a bit (I don't like the multiple choice mode, thus did not implement it...).


Really enjoy the time spent on the project. Besides, really appreciate the time and energy spent for holding the info session. Feel free to contact me if you have any questions while grading my project!









