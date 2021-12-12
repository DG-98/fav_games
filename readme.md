# VGDB SEI project 2 overview
The goal for this project was to create a full stack application using data from an API of my choosing. The app I created uses the RAWG video game dataase api (https://rawg.io/apidocs) and allows the users to search for games by name and view the game of their choosing along with a descpription and some additional info. 

# The Back-End
![image](https://user-images.githubusercontent.com/85405879/145733348-284e44a2-8a9d-4195-ad77-3678e0a8a59a.png)
Using postgresQL

 
 









# Set Up For Use on Local Machine (Mac & Postgres)

Here's how to download and run this application on your local mac:

* Fork & Clone
* `npm i` to install dependencies
* create database with `createdb express_auth_development` ***OR CHANGE DB NAME TO MATCH THE NAME OF YOUR APP*** _(you'll need to make changes to `config/config.json` too)_
* if your postgress process requires a username and password, add these to the `config/config.json` file
* migrate models to your database with `sequelize db:migrate` (This command assumes you have the sequelize-cli installed globally. If you don't, run `npm i sequelize-cli` to install in this project.)




