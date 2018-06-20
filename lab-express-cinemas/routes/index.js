const express = require('express');
const router  = express.Router();
const Movie = require('../models/movie');
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/movies/:id', (req, res, next) => {

  let movieId = req.params.id;
  if (!/^[0-9a-fA-F]{24}$/.test(movieId)) { 
    return res.status(404).render('not-found');
  }
  Movie.findOne({'_id': movieId})
    .then(movie => {
      if (!movie) {
          return res.status(404).render('not-found');
      }
      console.log(movie);
      res.render("movie-details", movie)
    })
    .catch(next)
});

router.get('/movies', (req, res, next) => {
  
  Movie.find()
  .then(movies => {
    console.log(movies)
    res.render('movies', {movies});
  })
  .catch(error => {
    console.log(error)
  })
  
  
});

module.exports = router;
