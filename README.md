# Demo Client: Movies

## Using Local Version
1. Copy the `.env.template` file and rename it `.env`
2. Add the relevant environment variable values to this file 
   1. If running with a local server, you will need the localhost URL and port number. 
   2. If running with a deployed server, you just need the URL to the deployed server.
3. `npm install`
4. `npm start`

## A Deployed Version
https://democlientmovies-julesnuggy.b4a.run/

# How to Deploy to Back4App
1. FORK this repo (don't just clone it).
2. Create an account on https://www.back4app.com.
3. Go to your account and select "Create New App".
4. Configure the repos that you want to allow Back4App access to (if you haven't already).
5. Find this app from the list of repos, and click "Select":
   1. Give the app a name.
   2. Select the branch that it should deploy (typically `main`) and source directory (keep it as the project root directory `./` unless your structure is different).
   3. Keep "Auto deploy" on.
   4. Add the env vars - this will be the `REACT_APP_API_BASE_URL` env var, and the value for this should be to the 
      relevant deployed server app, e.g. `https://demoservermovies-julesnuggy.b4a.run/`
6. Click "Create App".
7. It will take a few minutes to deploy. Once it is ready, you can click on the deployed domain URL displayed in the left hand menu.
