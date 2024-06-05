const dotenv = require("dotenv")

dotenv.config()

const config = {
    env: process.env['ENV'] ?? 'dev',
    port: process.env['PORT'] ?? 3000,
    atlas_uri: process.env['ATLAS_URI'],
    api : process.env['API']
}

module.exports = config