Inventory Sales Tracker
This project is designed to manage inventory and sales for small to medium-sized businesses. It combines the robustness of Node.js with the simplicity of Flask, utilizing a MySQL database. The system includes product, category, and sales tracking, along with supplier and customer management.

Prerequisites
Before you begin, ensure you have the following:

Node.js (latest version)
Python 3.6 or later
MySQL server (local or remote)
pip (Python package manager)
Getting Started
1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/yourprojectname.git
cd yourprojectname
2. Install Dependencies
For Node.js backend:

bash
Copy code
npm install
For Flask frontend:

bash
Copy code
python -m venv venv
source venv/bin/activate  # Unix/MacOS
venv\Scripts\activate  # Windows
pip install -r requirements.txt
3. Database Setup
Import the SQL file to your MySQL server:

bash
Copy code
mysql -u your_mysql_username -p your_database_name < path/to/inventorysalestracker.sql
Replace your_mysql_username and your_database_name with your actual MySQL credentials.

4. Configure Environment Variables
Edit the .env file for Node.js backend:

plaintext
Copy code
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=your_database_name
JWT_SECRET=your_jwt_secret
For Flask frontend, copy .env.example to .env and update it:

plaintext
Copy code
FLASK_APP=main.py
# Add other Flask-specific env variables as needed
Generate a JWT secret key:

bash
Copy code
node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"
Copy the output and use it as the value for JWT_SECRET in your .env file.

5. Start the Application
Start the Node.js server:

bash
Copy code
npm start
Typically accessible via http://localhost:3000.

Run the Flask development server:

bash
Copy code
flask run
Accessible at http://127.0.0.1:5000/.

Usage
With both the Node.js backend and Flask frontend running, you can access the full suite of features through web-based APIs and the frontend interface. Utilize tools like Postman for backend API interactions.

Features
Product Management: Add, edit, delete, and view products.
Category Management: Organize products by categories.
Supplier Portal: Manage supplier info and stock levels.
Sales Tracking: Record transactions and view history.
Inventory Monitoring: Get alerts for low stock.
Customer Management: Track customer info and purchases.
Built with Node.js and Flask, this system provides an integrated solution for inventory and sales management, tailored for small to medium-sized enterprises.
