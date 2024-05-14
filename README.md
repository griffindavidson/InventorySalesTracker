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
- Python 3.6 or later
- pip (Python package manager)

### Installation

1. Clone the repository to your local machine:
git clone https://github.com/your-username/your-project-name.git


2. Create a virtual environment:
python -m venv venv

3. Activate the virtual environment:
On Windows: venv\Scripts\activate
On Unix or MacOS: source venv/bin/activate

4. Install the project dependencies:
   pip install -r requirements.txt

Configuration
Copy .env.example to a new file named .env and update the environment variables accordingly.

Running the Application
1. Set the FLASK_APP environment variable:
   export FLASK_APP=main.py  # Unix/MacOS
   set FLASK_APP=main.py  # Windows

2. Run the Flask development server:
   flask run
   The application will be accessible at http://127.0.0.1:5000/.

Built With
Flask - The web framework used




