from application import app
from flask import render_template

from flask import Flask, jsonify
from flask_mysqldb import MySQL


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/products")
def products():
    productsData = [{"id": 1, "name": "Product 1", "description": "Description 1", "price": 100},
                    {"id": 2, "name": "Product 2", "description": "Description 2", "price": 200},
                    {"id": 3, "name": "Product 3", "description": "Description 3", "price": 300},
                    {"id": 4, "name": "Product 4", "description": "Description 4", "price": 400},
                    {"id": 5, "name": "Product 5", "description": "Description 5", "price": 500},
                    {"id": 6, "name": "Product 6", "description": "Description 6", "price": 600},
                    {"id": 7, "name": "Product 7", "description": "Description 7", "price": 700},
                    {"id": 8, "name": "Product 8", "description": "Description 8", "price": 800},
                    {"id": 9, "name": "Product 9", "description": "Description 9", "price": 900},
                    {"id": 10, "name": "Product 10", "description": "Description 10", "price": 1000}
    ]

    apiProductsData = list_products()

    return render_template("products.html", productsData=apiProductsData)

@app.route("/categories")
def categories():

    apiCategoryData = list_categories()

    return render_template("categories.html", categoriesData=apiCategoryData)

@app.route("/suppliers")
def suppliers():

    apiSupplierData = list_suppliers()

    return render_template("suppliers.html", supplierData=apiSupplierData)

@app.route("/inventories")
def inventories():

    apiInventoryData = list_inventories()

    return render_template("inventories.html", inventoryData=apiInventoryData)

@app.route("/sales_items")
def sales_items():

    apiTransactionData = list_transactions()

    return render_template("sales_items.html", transactionData=apiTransactionData)

@app.route("/customers")
def customers():
    return render_template("customers.html")

@app.route("/logout")
def logout():
    return render_template("logout.html")

#Configure MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'davidson1'
app.config['MYSQL_DB'] = 'buisness'

#create instance of database
mysql = MySQL(app)

@app.route('/get_number_of_customers')
def get_number_of_customers():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT COUNT(`id`) FROM customers''')
    num = cur.fetchall()
    cur.close()
    print(jsonify(num))
    return jsonify(num)

@app.route('/get_number_of_products')
def get_number_of_products():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT COUNT(`id`) FROM products''')
    num = cur.fetchall()
    cur.close()
    return jsonify(num)

@app.route('/get_number_of_categories')
def get_number_of_catagories():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT COUNT(`id`) FROM categories''')
    num = cur.fetchall()
    cur.close()
    return jsonify(num)

@app.route('/get_number_of_suppliers')
def get_number_of_suppliers():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT COUNT(`id`) FROM suppliers''')
    num = cur.fetchall()
    cur.close()
    return jsonify(num)

@app.route('/get_number_of_transactions')
def get_number_of_transactions():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT COUNT(`id`) FROM transactions''')
    num = cur.fetchall()
    cur.close()
    return jsonify(num)

@app.route('/get_number_of_inventories')
def get_number_of_inventories():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT COUNT(`productID`) FROM inventories''')
    num = cur.fetchall()
    cur.close()
    return jsonify(num)

def list_products():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT `id`, `name`, `description`, `price` FROM products''')
    products = cur.fetchall()
    cur.close()
    return products

def list_categories():
    cur = mysql.connection.cursor()

    query = 'SELECT categories.id, categories.title, COUNT(products.id) FROM categories LEFT JOIN products ON categories.id = products.categoryID GROUP BY categories.id, categories.title;'

    cur.execute(query)
    categories = cur.fetchall()
    cur.close()
    return categories

def list_suppliers():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM suppliers')
    suppliers = cur.fetchall()
    cur.close()
    return suppliers

def list_inventories():
    cur = mysql.connection.cursor()
    
    query = 'SELECT p.id, p.name, i.quantity, i.location FROM products p INNER JOIN inventories i on p.id = i.productID'

    cur.execute(query)
    inventories = cur.fetchall()
    cur.close()
    return inventories

def list_transactions():
    cur = mysql.connection.cursor()

    query = """
            SELECT t.id, t.productID, p.name, t.quantityPurchased, concat(c.firstName, ' ', c.lastName), p.price, t.price 
            FROM transactions t 
            INNER JOIN products p on (t.productID = p.id) 
            INNER JOIN customers c on (t.customerID = c.id)
            """

    cur.execute(query)
    transactions = cur.fetchall()
    cur.close()
    return transactions















