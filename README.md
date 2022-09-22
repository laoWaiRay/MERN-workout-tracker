# MERN Workout Tracker
#### Video Demo:  https://www.youtube.com/watch?v=4e5I5kqSd_w&ab_channel=RaymondLy
#### Description:

MERN Workout Tracker is a web application that I made to track workout and exercise information, using (as the title suggests) the MERN (MongoDB + Mongoose, Express, React and NodeJS). This is the first application that I've ever developed using this stack, and the first full-stack web application that I've made.

I have learned many skills in the process of creating this project, namely: database management, creating a back-end API, creating a front-end user interface using React, and linking everything together so that the front-end can send fetch requests to my back-end API in order to access and update data stored in my database. Some of the more complicated implementation details of my project that I encountered during the build process were: storing sessions via tokens/local storage, creating validations on forms, creating a user authentication system (both server-side and client-side), using React to create a dynamic UI, using various different React libraries, and linking my back-end with my front-end.

## Storing sessions via cookies (JSON Web Tokens)

In order to have semi-persistent state on my application, I used `jsonwebtoken` in order to create and validate tokens which I stored in local storage on the client's browser whenever they log into an account or sign up for a new account. I set the tokens to expire in 3 days, which meant that users can access the application and stay logged in for up to 3 days before being asked to re-authenticate.

## Creating form validations

In order to protect my database from users, I implemented several validation checks both on the server-side and the client-side.
On the server-side, one example of a validation check I needed to implement was checking before deletion of an exercise whether any workouts or goals were actively using that exercise. Due to the way I chose to model my data, `Workout` and `Goal` models both depended on and `Exercise` model in order to exist. Therefore, if an exercise was accidentally deleted from the database, and that same exercise was linked to some workout or goal, there might be problems. I chose to explicitly prevent this from happening in my API code.

On the client-side, I used some basic validations on form inputs such as checking that fields were not empty, usernames were not already taken, and that passwords were of sufficient strength. In the event that these requirements were not met, I blocked submission of data and displayed the corresponding error message to the user. I found that these steps were very important for maintaining the integrity of my database.

## Creating user authentication system

I knew from the beginning that I wanted multiple users to all be able to have their own "accounts", and to store their own exercise data seperately. Thus, I needed to learn how to implement a user authentication system. This worked via the previously mentioned JSON Web Tokens. For information that was only available to logged-in users, I checked whether or not there was a token stored on the browser in order to determine whether or not to display sensitive data.

I also had my UI change depending on the log-in status of the user. For example, the navbar shows `Login` and `Signup` options if the user is logged out, but not if they are logged in. I was also able to use user ID stored in tokens to determine which user specifically was logged in, and only display to them the appropriate workout data.

## Using React

I came into this project with some prior knowledge of React, this being the second React application I've ever made (and the first one was just plain React, without any database or backend).

The most complicated part about this was figuring out how to link my React application to my database via an API. I set up an API running on a seperate server via Express + NodeJS, and my React application just made HTTP requests to the exposed endpoints of my API in order to access and update data.

## Using React libraries

I learned three new React libraries to create this application: `react-chartjs-2`, `chroma-js` and `react-select`.

## Dependencies

These can be found in the `package.json`, but the dependencies that I learned to use for the first time were: `bcrypt` for hashing passwords, `jsonwebtoken`, `validator` for password validations, and the above-mentioned React libraries

Special credit to NetNinja, who's YouTube tutorials I used to learn about using MERN stack