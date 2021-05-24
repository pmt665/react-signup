## Project Name

SignUp User

An application which allows user to signup after passing the required validations and then after the delay of 4 secs it calls the another api to return the user data.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Run App:

`npm start`

Runs the app in the development mode.
This will automatically launch your browser with Hot Module Reload running. Saved changes to file in src/ will automatically reload the page.

To Visit App:

`localhost:3000`  

To build for production:

`npm run build`

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Project Explanation
## components
    SignUpForm.js --> This is the signup page gets displayed when user starts the application. It contains FirstName, LastName, Email and Password fields which user needs to pass to send the signup request. This component uses yup and formik for validation and submission of form.

    Validations fired on this page: Yup is used for validation
    -----------------------------------------------------------
    FirstName: Required and should contain only letters
    LastName: Required and should contain only letters
    Email: Required and Email Format validation
    Password: Following validations fires on password field:
        1. Required
        2. should contain minimum 8 characters.
        3. should contain 1 uppercase and 1 lowercase character
        4. should not contain firstname as well as lastname and it also covers caseinsenstivity for firstname and lastname. 

    Data will be send to server only if the form is valid.

    Users.js --> This component will be called after 4 secs of signup api call which calls same url but with get request to reterieve users data and displays it in the table.

    Errors.js --> This component is used to display validation errors or errors came from api on the UI.

## containers
    SignUpForm.js
    -------------
    This is the main container file which is rendered in the App.js

    This container renders the signupComponent and Users component, As soon as user submits the valid form 'handleRegister' method is called from this container.
    
    Then 'handleRegister'method call the 'addUser method' which is in 'userService' and it post the user data.
    
    If no error is returned then it waits for 4 sec and renders 'Users' component which  calls 'reterieveUsers' and gets the user data from the API. 
    
    If any Error occurs then the Error component gets rendered.
## services
    userService --> This service has two methods:
        1. addUser--> which recieves the user object as 
            {user: {firtName: 'Puneet', lastName: 'Gupta', email: 'test@gmail.com', password:  'testUser@1223'}} and POST it to `https://demo-api.now.sh/users`
        2. reterieveUsers --> This method makes get request to the same url to reterive users data.
## tests
    users.test.js --> This file contains tests for user component
    signup.test.js --> This file contains tests for signup component.
## styling
    styles.css --> This is the styling file used for styling the components.

## Tools & Technologies
React, CSS, Javascript, axios, Jest, Yup, Formik, react-bootstrap.
Used React hooks (useState, useEffect) , async/await, arrow functions, destructuring.

## Time taken To Complete
    1) Boiler Plate using create-react-app template, styling and documentation - 1 hr
    2) Testing -1 hr
    3) Logic(components, containers and service) - 2.5 hr