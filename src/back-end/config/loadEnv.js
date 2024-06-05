const dotenv = require("dotenv")

dotenv.config()

//Create a object of environment variable accessed through .env
//Keeps sensitive data secure

const config = {
    env: process.env['ENV'] ?? 'dev',
    port: process.env['PORT'] ?? 3000,
    atlas_uri: process.env['ATLAS_URI'],
}

module.exports = config