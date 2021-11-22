const express = require("express")
const router = express.Router()
const axios = require("axios")
const db = require("../models")
const game = require("../models/game")
const isLoggedIn = require("../middleware/isLoggedIn")


//route to show various games after searcing a title. Displays titles using api call
router.get("/results", function (req, res) {
  let gameTitle = req.query.gameTitle

  axios
    .get(
      `https://rawg.io/api/games?key=${process.env.RAWG_KEY}&search=${gameTitle}`
    )
    .then((apiResults) => {
      // console.log(apiResults.data.results[0].id)
      const results = apiResults.data.results
      res.render("results", { results: results })
    })
    .catch((error) => {
      console.log(error)
    })
})


//route to show details of clicked game with api call
router.get("/:game_id", function(req, res){
  let rawgId = req.params.game_id 

  axios
    .get(`https://api.rawg.io/api/games/${rawgId}?key=${process.env.RAWG_KEY}`)
    .then((apiRes) => {
      // console.log("this is the api response data", apiRes.data)
      let name = apiRes.data.name
      let description = apiRes.data.description.replace(/<[^>]+>/g, " ")
      let released = apiRes.data.released
      let background_image = apiRes.data.background_image
      let metacritic = apiRes.data.metacritic
      let gameId = apiRes.data.id

      return {
        name: name,
        description: description,
        released: released,
        background_image: background_image,
        metacritic: metacritic,
        gameId: gameId,
      }
    })
    .then((gameInfo) => {
      // console.log("This is game info", gameInfo)
      // console.log("this is the game id", gameInfo.gameId)
      db.comment
        .findAll({
          where: { gameId: gameInfo.gameId },
        })
        .then((result) => {
          console.log("this is comment result", result)
          console.log("gamedata?", gameInfo)
          return { gameInfo: gameInfo, comments: result }
        })
        .then((stuff) => {
          console.log("this is stuff", stuff)
          res.render("detail", { gameInfo: stuff.gameInfo, comments: stuff.comments })
        }) 
    })
    
    
       
  .catch((err) => {
      console.log(err)
  })
})

//route in progress to make comments 
router.post("/comments", isLoggedIn , (req, res) => {
  db.comment
    .create({
      name: res.locals.currentUser.name,
      userId: res.locals.currentUser.id,
      gameId: req.body.gameId,
      content: req.body.content,
      //may have to re do comments table and add name
    })
    .then((resPost) => {
      console.log("IS THIS GAME ID\n\n\n", resPost.gameId)
      res.redirect(`/games/${resPost.gameId}`) //<-- not sure about routes
    })
    .catch((error) => {
      console.log(error)
    })
})


//route in progress to update/edit comments 
router.put("/comments", isLoggedIn, (req, res) => {
  //maybe .patch instead of put?
  db.comment
    .findOne({
      where: { userId: res.locals.currentUser.id, id: req.body.id },
    })
    .then((updatedComment) => {
      updatedComment.update({ content: req.body.content })
      console.log("updated comment\n", updatedComment)
    })
    .then((donut) => {
      console.log("this is the updated comment pt 2:", donut)
      res.redirect(`/games/${req.body.gameId}`)
    })
    .catch((error) => {
      console.log(error)
    })
})


//route in progress to delete comments 
router.delete("/comments", isLoggedIn, (req, res) => {
  db.comment
    .destroy({
      where: { id: req.body.id, userId: res.locals.currentUser.id },
    })
    .then((deleted) => {
      console.log("I deleted", deleted)
      res.redirect(`/games/${req.body.gameId}`)
    })
    .catch((error) => {
      console.log(error)
    })
})










module.exports = router