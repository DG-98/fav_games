const express = require("express")
const router = express.Router()
const axios = require("axios")

router.get("/results", function (req, res) {
  let gameTitle = req.query.gameTitle

  axios
    .get(
      `https://rawg.io/api/games?key=6123ae3d0d994d6aac19947f1736b1fb&search=${gameTitle}`
    )
    .then((apiResults) => {
      console.log(apiResults.data.results[3].name)
      const results = apiResults.data.results
      res.render("results", { results: results })
    })
    .catch((error) => {
      console.log(error)
    })
})







module.exports = router