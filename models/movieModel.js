import { randomUUID } from "node:crypto"
import { readJSON } from "../utils.js";
const movies = readJSON('./movies.json')

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.some((g) => g.toUpperCase() === genre.toUpperCase())
      );
  
      return filteredMovies.length ? filteredMovies : "Sin genero";
    } 

    return movies
  }

  static async getId({ id }) {
    return movies.find((movie) => movie.id === id);
  }

  static async post({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input,
    }

    movies.unshift(newMovie);

    return newMovie
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false
  
    movies.splice(movieIndex, 1)

    return true
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false
    
    movies[movieIndex] = {
      ...movies[movieIndex],
      ... input
    }

    return movies[movieIndex]
  }
}