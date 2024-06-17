const dotenv = require("dotenv")

dotenv.config()

//Create a object of environment variable accessed through .env
//Keeps sensitive data secure

const config = {
    env: process.env['ENV'] ?? 'dev',
    port: process.env['PORT'] ?? 3000,
    //TODO - REMOVE INFO ONCE ENV IS FIXED
    atlas_uri: process.env['ATLAS_URI'] ?? 'mongodb+srv://admin:admin@web601.0nemymn.mongodb.net/?retryWrites=true&w=majority&appName=WEB601',
    jwt_access_secret: process.env['JWT_ACCESS_SECRET'] ?? '2fad705fdc7020e1c3d5a835434581a889b140cc42dea5662bb1608effddc385a8b9d11e20abcdeda3c40a29d842f4b2fa9d0cf708bc46e20b165bbd8fffb688',
    jwt_refresh_secret: process.env['JWT_REFRESH_SECRET'] ?? '07528d75345229dfa42f3df2c8ea29d60cb49e940355e48a8cfc9ac380deb78e2bdd26bfd5df0cd0e813b155e2ece33aea8b3aa52669e96c6fdbebfd1c4f3d8a'
}

module.exports = config