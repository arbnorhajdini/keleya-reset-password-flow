# keleya-reset-password-flow

Project is devided into 2 parts:
1. web (Frontend)
2. backend

Run the project by nivigating to both folders and run:
(web):
1. npm install
2. npm start
3. npm run lint ( linting)
4. npm run test ( unit tests)
5. npm run e2e ( end-to-end test)

(backend):
1. npm install
2. npm start

Note 1: e2e tests need to have also both web and backend runing
Note 2: the reason why I have also colors, breakpoints and notification types and so on, without using them is just in case you are not convinced of my work and want me to expand the project more ( so just in case hahaha )
Note 3: please use postman to check if the password is changed


# USAGE

1. One the project is running you will se http://localhost:8000/en for english version and you can switch to http://localhost:8000/de for german translation.
2. Email for testing is arbnorhajdini1@gmail.com with an existing password of 1234
3. On the landing page please provide the given email address arbnorhajdini1@gmail.com, otherwise the BE will not find it on the list and reject the request.
4. The email template sent is mocked with Ethereal, so a new window will popup to show the email ( if it dose not display, please disable the popup blocker).
5. After you click on the button it will direct the user to the change password page and there you need to enter a new password.
6. The password muss be at least 4 characters long.

# TECHNOLOGIES USED

1. Frontend: react, bootstrap, noty, i18next, universal-cookies, react-icons.
2. Backend: node, express, mongodb, nodemailer.
3. Unit test: enzyme, mocha.
4. E2e: Cypress