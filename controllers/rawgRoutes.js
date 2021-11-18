const express = require("express")
const router = express.Router()
const axios = require("axios")


//route to show various games after searcing a title. Displays titles using api call
router.get("/results", function (req, res) {
  let gameTitle = req.query.gameTitle

  axios
    .get(
      `https://rawg.io/api/games?key=${process.env.RAWG_KEY}&search=${gameTitle}`
    )
    .then((apiResults) => {
      console.log(apiResults.data.results[0].id)
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

  axios.get(
    `https://api.rawg.io/api/games/${rawgId}?key=${process.env.RAWG_KEY}`
  )
  .then((apiRes)=>{
    // console.log("this is the api response data", apiRes.data) 
    let name = apiRes.data.name
    let description = apiRes.data.description.replace(/<[^>]+>/g, " ")
    let released = apiRes.data.released 
    let background_image = apiRes.data.background_image
    let metacritic = apiRes.data.metacritic
    let gameId = apiRes.data.id 

    res.render("detail", {
      name: name,
      description: description,
      released: released,
      background_image: background_image,
      metacritic: metacritic,
      gameId: gameId
    })
  })
  .catch((err) => {
      console.log(err)
  })
})

//route in progress to make comments 
router.post("/comments", (req, res) => {
  let gameId = req.params.game_id
  db.comment
    .create({
      name: res.locals.currentUser.name,
      userId: res.locals.currentUser.id,
      gameId: data.gameId,
      content: req.body.content,
      //may have to re do comments table and add name
    })
    .then((resPost) => {
      res.redirect(`/:game_id`) //<-- not sure about routes
    })
    .catch((err) => {
      console.log(error)
    })
})

//route in progress to update/edit comments 
router.put("/:game_id/edit/comments", (req, res)=>{ //maybe .patch instead of put?
})

//route in progress to delete comments 
router.delete("/:game_id/comments", (req, res)=>{
})




module.exports = router