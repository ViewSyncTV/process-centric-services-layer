/**
 * This nampespace defines the routes for accessing the data from the Mediaset API and Rai API
 * @namespace API.TvProgram
 * @category API
 * @subcategory External Resources
 * @requires express
 */

const express = require("express")
const TvProgramController = require("../controllers/tv-program-controller")
const { asyncHandler } = require("../middleware/error-handler")
// eslint-disable-next-line no-unused-vars
const API = require("./router")
const { checkJwt } = require("../middleware/api-protection")

const router = express.Router()
const tvProgramController = new TvProgramController()

/**
 * Base route of the TV Programs API
 * @name Root
 * @route {GET} /api/tv-program
 * @memberof API.TvProgram
 */
router.get("/", (req, res) => {
    res.send("This is the TV Programs API endpoint!")
})

/**
 * Get the list of Tv programs for today for both Mediaset and Rai.
 * @name RaiTodayGet
 * @route {GET} /api/tv-program/today/
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * GET /api/tv-program/today
 *
 * // Example of response
 * {
 *  "data": [
 *    {"title":"Porta a Porta - Puntata del 28/05/2024","description":"Programma di informazione e approfondimento di Bruno Vespa dedicato all'attualità politica, alla cronaca e al costume.... - Un programma di Bruno Vespa Con la collaborazione di Antonella Martinelli, Maurizio Ricci, Giuseppe Tortora, Paola Miletich, Vito Sidoti, Concita Borrelli E di Vladimiro Polchi Produttore esecutivo Rossella Lucchi Regia di Sabrina Busiello","channel_id":"rai-1","category":"ProgrammiTv","start_time":"2024-05-28T21:30:00.000Z","end_time":"2024-05-28T21:55:00.000Z"},
 *    {"title":"TG1 Sera","description":"","channel_id":"rai-1","category":"ProgrammiTv","start_time":"2024-05-28T21:55:00.000Z","end_time":"2024-05-28T22:00:00.000Z"}
 *    ...
 *   ]
 * }
 */
router.get("/today", asyncHandler(tvProgramController.getTodayPrograms))

/**
 * Get the list of Tv programs for the week for both Mediaset and Rai.
 * @name RaiTodayGet
 * @route {GET} /api/tv-program/week/
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * GET /api/tv-program/week
 *
 * // Example of response
 * {
 *  "data": [
 *    {"title":"Porta a Porta - Puntata del 28/05/2024","description":"Programma di informazione e approfondimento di Bruno Vespa dedicato all'attualità politica, alla cronaca e al costume.... - Un programma di Bruno Vespa Con la collaborazione di Antonella Martinelli, Maurizio Ricci, Giuseppe Tortora, Paola Miletich, Vito Sidoti, Concita Borrelli E di Vladimiro Polchi Produttore esecutivo Rossella Lucchi Regia di Sabrina Busiello","channel_id":"rai-1","category":"ProgrammiTv","start_time":"2024-05-28T21:30:00.000Z","end_time":"2024-05-28T21:55:00.000Z"},
 *    {"title":"TG1 Sera","description":"","channel_id":"rai-1","category":"ProgrammiTv","start_time":"2024-05-28T21:55:00.000Z","end_time":"2024-05-28T22:00:00.000Z"}
 *    ...
 *   ]
 * }
 */
router.get("/week", asyncHandler(tvProgramController.getWeekPrograms))

/**
 * Add a Tv program to the favorite list of the user.
 * @name FavoriteAdd
 * @route {POST} /api/tv-program/favorite
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * POST /api/tv-program/favorite
 * {
 *     "movie_id": "12345",  // or tvshow_id
 *     "title": "Title"
 * }
 */
router.post("/favorite", checkJwt, asyncHandler(tvProgramController.addFavorite))

/**
 * Remove a Tv program from the favorite list of the user.
 * @name FavoriteRemove
 * @route {DELETE} /api/tv-program/favorite
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * DELETE /api/tv-program/favorite
 * {
 *    "tvshow_id": "12345"  // or movie_id
 * }
 */
router.delete("/favorite", checkJwt, asyncHandler(tvProgramController.removeFavorite))

/**
 * Get the list of favorite Tv programs of the user.
 * @name FavoriteGet
 * @route {GET} /api/tv-program/favorites
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * GET /api/tv-program/favorites
 *
 * // Example of response
 * {
 *     "data": [
 *          {"movie_id": 8384, "title": "title1"}
 *          {"tvshow_id": 88829, "title": "title2"},
 *     ]
 * }
 */
router.get("/favorites", checkJwt, asyncHandler(tvProgramController.getFavorites))

module.exports = router
