const express = require("express")
const router = express.Router()
const axios = require("axios")

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

router.get("/:game_id", function(req, res){
  let rawgId = req.params.game_id 

  axios.get(
    `https://api.rawg.io/api/games/${rawgId}?key=${process.env.RAWG_KEY}`
  )
  .then((apiRes)=>{
    console.log(apiRes.data.name)
    let name = apiRes.data.name
    let description = apiRes.data.description
    let released = apiRes.data.released 
    let background_image = apiRes.data.background_image
    let metacritic = apiRes.data.metacritic

    res.render("detail", {
      name: name,
      description: description,
      released: released,
      background_image: background_image,
      metacritic: metacritic,
    })
  })
  .catch((err) => {
      console.log(err)
  })
})






module.exports = router