const express = require("express");
const crypto = require("node:crypto");
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/validationScheme.js')
const app = express();
const movies = require("./movies.json");
const PORT = process.env.PORT ?? 3000;

app.disable("x-powered-by");
app.use(express.json());
app.use(cors())

app.get("/movies", (req, res) => {
  const { genre } = req.query;

  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toUpperCase() === genre.toUpperCase())
    );

    if (filteredMovies.length) {
      res.json(filteredMovies);
    } else {
      res.send("No genero");
    }
  } else {
    res.json(movies);
  }
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const foundMovie = movies.find((movie) => movie.id === id);

  if (foundMovie) return res.json(foundMovie);

  res.status(404).json({ message: "Movie not found" });
});

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  } 
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.unshift(newMovie);

  res.status(201).json(movies);
});

app.patch("/movies/:id", (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  } 

  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
});

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

app.use((req, res) => {
  res.send("404");
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
