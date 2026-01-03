- create repository
- Initialize the repository
- node-module,package.json,package-lock.json
-Install express
- create a server
- Listen to port 3000
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json

- Initialize git
- gitignore
-create a remote repo on github
- push all code to remote origin

- You have to play with route extension
- ex /hello, /hello/2,/xyz
- Order of the routes is matter

-Install Postman App and make a workspace/collection > test API call

-write logic to handle get,post,patch,delete API calls  and test them on Postman
-Explore routing and use of ?,+,(), * in the routes
-Use of regex in routes /a/ , /.*fly$/
-Reading the query params in the routes
- Reading the dynamic routes

-Multiple Route Handlers - Play with the code
-next()
-next function and errors along with res.send
-app.use("/route", rH, [rH2, rH3], rH4, rH5);
- what is middleware 
- how express js basically  handle request
- difference between app.use and app.all
- error handling app.use("/", err,req,res,next)