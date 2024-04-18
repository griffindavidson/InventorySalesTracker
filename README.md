# InventorySalesTracker

This project is designed to manage inventory and sales for small to medium-sized businesses. It provides a robust backend built with Node.js and a MySQL database, offering features such as product management, category management, and sales tracking.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of [Node.js](https://nodejs.org/).
* You have a MySQL server running locally or remotely.

## Getting Started

### 1. Clone the Repository

To get started with the Inventory Sales Tracker, clone this repository to your local machine using:

```bash
git clone https://github.com/yourusername/yourprojectname.git
cd yourprojectname
```

### 2. Install Dependencies
Navigate to the project directory and install the required dependencies:


```bash
npm install
```

### 3. Database Setup
Importing the Database

Import the provided SQL file to set up the database schema and initial data. Execute the following command in your MySQL command interface:

```bash
mysql -u your_mysql_username -p your_database_name < path/to/inventorysalestracker.sql
Replace your_mysql_username and your_database_name with your MySQL username and the desired database name, respectively.
```

### 4. Configure Environment Variables

Edit the .env file with your specific database and authentication settings:

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=your_database_name
JWT_SECRET=your_jwt_secret
```

#### Generating a JWT Secret Key

Generate a new JWT secret key using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"
Copy the output and use it as the value for JWT_SECRET in your .env file.
```

### 5. Start the Application
With the database set up and the environment configured, start the application server by running:

```bash
npm start
```
This command launches the Node.js server, typically accessible via http://localhost:3000.

#### Usage

After setting up the project, you can access the backend APIs according to the routes defined in the application. Use tools like Postman or your browser to interact with the API.
