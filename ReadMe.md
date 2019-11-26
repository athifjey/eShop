# BoomCar - Node.js application

This is a Node.js application that exposes endpoints for a Rental Car booking application.

This model application is built with Node.js + Express.js, Sequelize and MySQL, and the application is CORS enabled. The services are built with Microservices approach. 

The following operations can be performed with the endpoints exposed by BoomCar application

### New features added

* Application implemented with ORM - Sequelize and MySQL is used
* Filter feature for availability dates implemented

### Features:
1.	List all users and their cars with available date and time
2.	Lists the detail of each User
3.	Allows to add user and car along with availability
#### 4.  Filter cars based on their available date 
5.	Lists all cars and their availability
6.	Lists the availability details of a particular car
7.	Allows to add/edit/update cars availability

The following are the end points and they are also available as ARC endpoint JSON file in the following location (endpoints/arc-data-export-boomcar-v2.json)

### Available endpoints:
1.	/cars – GET method - List all users and their cars with availability date and time
2.	/cars/:id – GET – Lists the details of user bearing the ‘id’
3.	/cars – POST – To add user and car data & timings
a.	Request Body:
`{
    "id": 1001,
    "custName": "Barrack Obama",
    "mobile": "601234567890",
    "carId": 99880,
    "carName": "BMW E series",
    "carBrand": "BMW",
    "carModel": "E250",
    "carMakeYear": 2018,
    "avlDateFrom": "2019-09-09 00:00:00+0530Z",
    "avlTimeFrom": "13:00",
    "avlDateTo": "2019-09-09 00:00:00+0530Z",
    "avlTimeTo": "13:00"
}`
4.	/timings – GET – Lists all cars filtered with the available date and time
    Headers:
    `avlDateFrom: 2018-11-08 00:00:00+0530Z, avlDateTo: 2019-11-08 00:00:00+0530Z`
5.	/timings/:carId – GET – Lists the details of car with ‘carId’
6.	/timings/:carId – PUT – To add/update availability date and time
a.	Request body:
`{
  "avlDateFrom": "2019-12-08 00:00:00+0530Z",
  "avlTimeFrom": "15:00",
  "avlDateTo": "2019-12-10 00:00:00+0530Z",
  "avlTimeTo": "11:00"
}`


### Installation:

The application can be installed downloading this code to your system, navigate to the root directory, and run the following command.

#### `yarn install` or `npm install`

The above command installs all dependencies required to run the node.js application. 

The application needs a MySQL database to run. Create a database and update the DB details in the following location.

#### config/env.json

Enter required DB connection details in the above file and run the following script to import test data to the MySql table. 

`npm run setup-db`

To start the app, run the following command

#### `npm start`

Once you could find the message ‘Server started successfully’ message in the console, open ARC from Chrome apps. The application is accessible at `http://localhost:3100/`

Follow the link to install ARC to chrome extensions.

https://webkul.com/blog/advanced-rest-clientapi-testing-tool/

Once ARC opens, import the JSON file from endpoints folder in root (endpoints/arc-data-export-boomcar.json) to access the endpoints described above.

#### Author:
Athif J --- athifbijli@gmail.com <br />
GitHub and Skype: athifjey
