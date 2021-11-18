const express = require("express")
const router = express.Router()
const axios = require("axios")
const db = require("../models")


router.get('/', (req, res) => {
db.userGame.findAll({
    where: {userId: res.locals.currentUser.id}
})
.then((faves)=>{
    console.log(res.locals.currentUser.id)
    console.log("these are faves", faves);
    res.render('profile', { results: faves})
})
.catch((error) => {
      console.error
    })
})

//route to save faves 
router.post("/addFave", (req, res)=>{
    // console.log('favegames');
    const data = JSON.parse(JSON.stringify(req.body))
    console.log("this is data", data)
    console.log("current user?", res.locals.currentUser);
    db.userGame.create({
      gameId: data.gameId,
      userId: res.locals.currentUser.id,
      name: data.name,
    })
   
      .then(createdFave =>{
          console.log("this is the created fave", createdFave)
          res.redirect(`/`)
      })
    // db.games
    //   .findOrCreate({
    //       where:{gameId: data.rawgId, title: data.name }       
    //   })
    //   .then(([game, created]) => {
    //       console.log("this is game", game)
    //       console.log("this is created", created);
    //       db.games.findAll
          
          
    //   })
      .catch((error) => {
        console.log(error)
      })
})


//post route idea
// db.toy.findOrCreate({ <-- create game
//     where: {type: 'ball', color: 'green'} <-- specify rawgId
// })
// .then(([toy, created])=>{ <-- create game in game db if id does not exist 
//     db.pet.findByPk(1)
//     .then(foundPet=>{
//         console.log(`Adding ${toy.color} ${toy.type} tp ${foundPet.name}`);
//         foundPet.addToy(toy)
        //possibly do the join function in the .then area?
//     })
// })


module.exports = router