// eslint-disable-next-line no-unused-vars
const { Logger } = require("pino")
// eslint-disable-next-line no-unused-vars
const { Response, Request } = require("express")

/** @namespace Types */

/**
 * @template T
 * @typedef {Request} Request
 * @property {T} [body] - The body object
 * @property {Logger} log - The logger object
 * @property {Session} session - The session object
 * @memberof Types
 */

/**
 * @template T
 * @typedef {Response} Response
 * @memberof Types
 */

/**
 * @typedef {object} Session - The session object
 * @property {UserInfo} user - The user object
 * @property {string} access_token - The access token
 * @memberof Types
 */

/**
 * @template T
 * @typedef {object} ApiResponse - The response object of the APIs functions
 * @property {T} [data] - The data object in case of success
 * @property {ErrorObject} [error] - The error object in case of failure
 * @memberof Types
 */

/**
 * @typedef {object} ErrorObject - The error object in case of failure in the APIs functions
 * @property {number} code - The error code number
 * @property {string} message - The error message
 * @memberof Types
 */

/**
 * @typedef {object} TvProgram - The TV program object
 * @property {string} channel_id - The id of the channel broadcasting the program
 * @property {string} title - The title of the TV program
 * @property {string} description - The description of the program
 * @property {string} category - The category of the program
 * @property {Date} start_time - The start time of the TvProgram
 * @property {Date} end_time - The end time of the TvProgram
 * @memberof Types
 */

/**
 * @typedef {object} TvChannel - The channel object
 * @property {string} id - The id of the channel
 * @property {string} description - The description of the channel
 * @property {string} company - The company that owns the channel
 * @memberof Types
 */

/**
 * @typedef {object} Movie - The movie object
 * @property {number} id - The id of the movie (TMDB id)
 * @property {string} title - The title of the movie (current language)
 * @property {string} original_title - The original title of the movie
 * @property {string} description - The description of the movie
 * @property {Date} release_date - The release date of the movie
 * @property {string} poster_path - The path of the image of the movie
 * @property {string} original_language - The original language of the movie
 * @property {?string[]} genres - The genres of the movie
 * @property {?number} vote_average - The average vote for the movie
 * @memberof Types
 */

/**
 * @typedef {object} TVShow - The TV show object
 * @property {number} id - The id of the TV show (TMDB id)
 * @property {string} title - The title of the TV show (current language)
 * @property {string} original_title - The original title of the TV show
 * @property {string} description - The description of the TV show
 * @property {string} poster_path - The path of the image of the TV show
 * @property {string} original_language - The original language of the TV show
 * @property {?Date} first_air_date - The first air date of the TV show
 * @property {?Date} last_air_date - The last air date of the TV show
 * @property {?number} number_of_episodes - The number of episodes in the TV show
 * @property {?number} number_of_seasons - The number of seasons in the TV show
 * @property {?string[]} genres - The genres of the TV show
 * @property {?boolean} in_production - Whether the TV show is still in production
 * @property {?string[]} languages - The languages available for the TV show
 * @property {?string[]} origin_country - The origin countries of the TV show
 * @property {?number} vote_average - The average vote for the TV show
 * @property {?TvShowSeason[]} seasons - The seasons of the TV show
 * @memberof Types
 */

/**
 * @typedef {object} TvShowSeason - The season object
 * @property {number} id - The id of the season
 * @property {string} name - The name of the season
 * @property {string} overview - The overview of the season
 * @property {number} season_number - The season number
 * @property {number} episode_count - The number of episodes in the season
 * @property {Date} air_date - The air date of the season
 * @property {string} poster_path - The path of the image of the season
 * @memberof Types
 */

/**
 * @typedef {object} UserInfo
 * @property {string} given_name - The name of the user
 * @property {string} family_name - The surname of the user
 * @property {string} nickname - The nickname of the user
 * @property {string} name - The full name of the user
 * @property {string} picture - The link to the picture of the user
 * @property {string} locale - The locale of the user
 * @property {string} updated_at - The last update of the user
 * @property {string} email - The email of the user
 * @property {boolean} email_verified - Whether the email is verified
 * @property {string} sub - The subject of the user
 * @memberof Types
 */

/**
 * @typedef {object} Favorite - The favorite object
 * @property {?string} user_email - The email of the user
 * @property {?string} movie_id - The id of the movie
 * @property {?string} tvshow_id - The id of the tv show
 * @property {?string} title - The title of the favorite
 * @memberof Types
 */

module.exports = {}
