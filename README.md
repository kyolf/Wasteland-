# Wasteland
by Nick Jones, Jamie Wang, Paton Vinal, Kyle Szeto <br/>

## Production App
http://wasteland-adventure.herokuapp.com/

## Description
We made this game because we were passionate gamers and were motivated to make a game. We also believe that making a game is a good way to learn programming. The objective of the game is shown below.

## Objective of Game
The character is trying to avoid monsters in order to escape the wasteland. This may sound easy, but there is a catch! The character will need to collect batteries for his flashlight in order to see through the dark creepy wasteland.

## Technology Used
**FrontEnd**: HTML, Phaser, Javascript <br/>
**BackEnd**: NodeJS, Express, MongoDB, Mongoose, Mlab <br/>
**Deployment**: Heroku <br/>

## Documentation of API
* **GET** http://wasteland-adventure.herokuapp.com/api/topScores <br/>
  * This allows you to get the top 10 highscores in sorted order from the database <br/>
  * This is used to display the top 10 highscores in sorted order on the highscores page </br>
* **POST** http://wasteland-adventure.herokuapp.com/api/topScores <br/>
  * If there are 10 or more entries in the database, the POST will allow you to remove the lowest score from the top 10 highscores and allow you to add the new highscore to the database. <br/>
  * If there are less than 10 entries in the database, the POST will allow you to add the new highscore to the database.
  * This is used in the Victory and GameOver Page when your score is higher than the current lowest score from the top 10 highscore list. </br>

## How to Use our code
* Fork it to your Repo
* Git clone the Repo link
* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Make sure you do a `npm install` in the server folder before doing anything
* Run `npm run dev` in order to build the production app
* Type `localhost:8080` in your web browser and it should up and running locally.

**Note** You will need to close the current server that is running and run `npm run dev` everytime you make a change. <br/>

## Phaser Documentation 
https://phaser.io/docs/2.6.2/index

## Screenshots
#### Loading Screen <br/>
When you start the website, the loading screen appears and completes only when it finish preloading every sprite, background, and music we used in the game. <br/>
![LoadingScreen](README_images/loading.png "Loading Screen") <br/>

#### Menu Screen <br/>
Once the game finish loading, you are directed to the menu screen! You will have the option to play the game, see the game instructions, and see current highscores <br/>
![MenuScreen](README_images/menu.png "Menu Screen") <br/>

#### InfoModal Screen <br/>
If you selected the InfoModal Option, you will see the game instructions. You can click on the top left button to go back to Menu screen <br/>
![InfoModal](README_images/info.png "InfoModal Screen") <br/>

#### Highscores Screen <br/>
If you selected the HighScores Option, you will see the current highscores. You can click on the top left button to go back to Menu screen <br/>
![HighScores](README_images/scores.png "HighScores") <br/>

#### Game Screen <br/>
If you selected the Game Option, you are directed to the game. The time shows when your flashlight runs out of juice <br/>
![Game](README_images/game.png "Game") <br/>

#### Victory Screen <br/>
If you got to the end of Level3, then you will get loaded to the Victory Screen. You will be prompted if you receive a highscore! Once you enter your initials, you will be directed to the High Scores Page. <br/>
![Victory](README_images/victory.png "Victory") <br/>

#### Highscores Screen <br/>
If you have no more lives or if you run out of time, then you will get loaded to the GameOver Screen. You will be prompted if you receive a highscore! Once you enter your initials, you will be directed to the High Scores Page. <br/>
![GameOver](README_images/GameOver.png "GameOver") <br/>