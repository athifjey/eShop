# eShop - Node.js application

This is an Angular - Node.js - MySQL application that handles orders.

This model application is built with Angular 7, Node.js + Express.js, Sequelize and MySQL, and the application is CORS enabled. The services are built with Microservices approach. 

### Features:
1.	Lists all the orders from DB
2.	Lists the details of each order when clicked on the order ID.
3.	The orders can be edited and saved, the Order ID is not editable in Edit mode.
4.  The order can be deleted by entering the edit mode
5.  New order can be added by clicking 'Add new order' button


### Available endpoints:
1.	/api/orders – GET method - List all orders
2.	/api/orders/:id – PUT – To save/update the details of order bearing the ‘id’
3.	/api/orders – POST – To add a new order
a.	Request Body:
`{"orderid": 191919191,
"servicenumber": 2100003647,
"segmentgroup": "Wellington",
"productname": "High speed Internet in the world is not enough",
"orderstatus": "Processing",
"remark": "This is a remark",
"state": "Kuala Lumpur"}`

6.	/api/orders/:id – DELETE – To delete a specific order with 'id'

### Installation:

The application can be installed downloading this code to your system, navigate to the root directory, and run the following command.

#### `yarn install` or `npm install`

The above command installs all dependencies required to run the Angular7 / node.js application. 

The application needs a MySQL database to run. Create a database and update the DB details in the following location.

#### config/env.json

Enter required DB connection details in the above file and run the following script to import test data to the MySql table. 

`npm run setup-db`

To start the app, run the following command

#### `npm run build`

Once you could find the message ‘Server started successfully’ message in the console, the application is accessible at `http://localhost:4200/`

#### Author:
Athif J --- athifbijli@gmail.com <br />
GitHub and Skype: athifjey
