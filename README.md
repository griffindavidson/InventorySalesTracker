# Inventory Management System

This Inventory Management System is a web-based application that enables users to manage and track their inventory efficiently. Built with Flask, the application offers a suite of features including product listings, category management, supplier interactions, sales tracking, and customer management.

## Features

- **Product Management**: Add, edit, delete, and view products in the inventory.
- **Category Management**: Organize products by categories for easy retrieval and stock management.
- **Supplier Portal**: Manage supplier information and track stock levels.
- **Sales Tracking**: Record sales transactions and view sales history.
- **Inventory Monitoring**: Monitor stock levels and receive alerts for low inventory.
- **Customer Management**: Keep track of customer information and purchase history.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- You have installed the latest version of Node.js.
- You have a MySQL server running locally or remotely.
- Python 3.6 or later
- pip (Python package manager)
- 

### 1. Installation

1. Clone the repository to your local machine:
git clone https://github.com/your-username/your-project-name.git

2. Before you begin, ensure you have met the following requirements

You have installed the latest version of Node.js.
You have a MySQL server running locally or remotely.

### 2. Database Setup
Importing the Database

Import the provided SQL file to set up the database schema and initial data. Execute the following command in your MySQL command interface:

```bash
mysql -u your_mysql_username -p your_database_name < path/to/inventorysalestracker.sql
```
Replace your_mysql_username and your_database_name with your MySQL username and the desired database name, respectively.

### 3. Configure Environment Variables

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
```

Copy the output and use it as the value for JWT_SECRET in your .env file.

### 4. Start the Application
With the database set up and the environment configured, start the application server by running:

```bash
npm start
```
This command launches the Node.js server, typically accessible via http://localhost:3000.

### 5. Create a virtual environment:
python -m venv venv

### 6. Activate the virtual environment:
On Windows: venv\Scripts\activate
On Unix or MacOS: source venv/bin/activate

### 7. Install the project dependencies:
   pip install -r requirements.txt

### 8. Configuration
Copy .env.example to a new file named .env and update the environment variables accordingly.

### 9. Running the Application
1. Set the FLASK_APP environment variable:
   export FLASK_APP=main.py  # Unix/MacOS
   set FLASK_APP=main.py  # Windows

2. Run the Flask development server:
   flask run
   The application will be accessible at http://127.0.0.1:5000/.

#### Usage

After setting up the project, you can access the backend APIs according to the routes defined in the application. Use tools like Postman or your browser to interact with the API.





