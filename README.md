# Campaign Tracker
This site is designed to track the sessions and journey for a tabletop RPG group. In the sessions tab you can take notes and keep track of any items or gold found during a session of play. Saved sessions are stored in the database and can be viewed, edited, or deleted using this site. In the journey tab you can keep track of where the party has been by adding locations and paths to the map. You can then link the sessions you created to any location or path.

## Getting started
The Session-Tracker, Journey-Tracker, and Login page are each their own React app. The API server runs on Express and connects to a MongoDB database. To start the API server you must provide a valid MongoDB connection string as a .env variabled named DB.
To run the apps individually on a dev server use any following commands:

```
npm run sessions
npm run journey:
npm run login
```

These commands will run their respective React apps on the development server and also start the API server.

Currently there is no way to run each app simultaneously in the dev environment. It appears this would require ejecting from create-react-app, and I am holding off on doing this until I have more experience creating advanced configurations with Webpack. However, to get each app running on localhost:3000 simultaneously you can run:
```
npm run build-dev
```
This will create a build for each app as if it were running on localhost:3000/campaign-tracker. Next run:

```
npm start
```
This will serve each app from its build folder and start the API server.

## Built With:
Each React app uses:
* [Bootstrap](https://getbootstrap.com/) as a CSS framework
* [Axios](https://www.npmjs.com/package/axios) for API requests
* [React-Router-Dom](https://www.npmjs.com/package/react-router-dom) for any client side routing

The Journey Tracker and Login page were created with [Redux](https://redux.js.org/) and [Redux-Thunk](https://www.npmjs.com/package/redux-thunk) middleware.

The Journey Tracker uses [Konva](https://github.com/konvajs/react-konva) for HTML canvas manipulation

The API server uses:
* [Express](https://expressjs.com/) for the framework
* [MongoDB](https://www.mongodb.com/) for the database
* [Mongoose](https://mongoosejs.com/) for database object modeling
* [Passportjs](http://www.passportjs.org/) for authentication
* [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing
