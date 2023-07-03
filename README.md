# Demo Client - Movies
## Setup

1. Fork and clone this repository
2. Copy the `.env.template` file and rename it `.env.local`
3. Add the relevant environment variable values to this file 
   1. If running with a local server, you will need the localhost URL and port number. 
   2. If running with a deployed server, you just need the URL to the deployed server.
4. `npm install`
5. `npm start`

N.B. The `.env` file should not contain any values, just variable name definitions. This file is used for the 
production deployment to allow for env vars to be correctly defined. The values are inserted in the deployment settings.
