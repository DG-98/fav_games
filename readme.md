# VGDB SEI project 2 overview
The goal for this project was to create a full stack application using data from an API of my choosing. The app I created uses the RAWG video game dataase api (https://rawg.io/apidocs) and allows the users to search for games by name and view the game of their choosing along with a descpription and some additional info. 

# The Back-End
![image](https://user-images.githubusercontent.com/85405879/145733348-284e44a2-8a9d-4195-ad77-3678e0a8a59a.png)

Using postgresQL I constructed a diagram to show the relationship and interactions of the different tables of the database. Users of the site(user table) can serach for games they're interested in (games table) and if logged in can leave comments are add a game to their favorites list (comments and user games tables respectively). 

# The Front-End 
![image](https://user-images.githubusercontent.com/85405879/145738803-67244fb5-d36a-4b89-af83-bb443898fd8d.png)

When visiting the site you have the option to sigh up, log in or search for a game. I did not want users to feel like they had to have an account to access the basic features of the website. 

![image](https://user-images.githubusercontent.com/85405879/145738869-e93e3082-2bc0-4551-a7b6-1ee9e0c1a49f.png)

After searching for a game you'll be presented with a list of the game you searched and all related titles to that search term. 

![image](https://user-images.githubusercontent.com/85405879/145738977-1294d70d-5ce5-420d-b464-fa9e30ff31f2.png)
 Finally after selecting a game you have a poster for the title, a review score and a description of the game along with the favorite and comment features that require an account to use. 
 
 









# Set Up For Use on Local Machine (Mac & Postgres)

Here's how to download and run this application on your local mac:

* Fork & Clone
* `npm i` to install dependencies
* create database with `createdb express_auth_development` ***OR CHANGE DB NAME TO MATCH THE NAME OF YOUR APP*** _(you'll need to make changes to `config/config.json` too)_
* if your postgress process requires a username and password, add these to the `config/config.json` file
* migrate models to your database with `sequelize db:migrate` (This command assumes you have the sequelize-cli installed globally. If you don't, run `npm i sequelize-cli` to install in this project.)




