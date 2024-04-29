function getNumberOfCustomers() {
    fetch('/get_number_of_customers')
        .then(response => response.json())
        .then(data => {
            const customersfeed = document.getElementById('total-customers-quantity');
            customersfeed.textContent = `[${data}]`;
        })
        .catch(error => console.error('Error Fetching number of customers: ', error));
}

function getNumberOfProducts() {
    fetch('/get_number_of_products')
        .then(response => response.json())
        .then(data => {
            const customersfeed = document.getElementById('total-products-quantity');
            customersfeed.textContent = `[${data}]`;
        })
        .catch(error => console.error('Error Fetching number of products: ', error));
}

function getNumberOfCategories() {
    fetch('/get_number_of_categories')
        .then(response => response.json())
        .then(data => {
            const customersfeed = document.getElementById('total-categories-quantity');
            customersfeed.textContent = `[${data}]`;
        })
        .catch(error => console.error('Error Fetching number of categories: ', error));
}

function getNumberOfSuppliers() {
    fetch('/get_number_of_suppliers')
        .then(response => response.json())
        .then(data => {
            const customersfeed = document.getElementById('total-suppliers-quantity');
            customersfeed.textContent = `[${data}]`;
        })
        .catch(error => console.error('Error Fetching number of suppliers: ', error));
}

function getNumberOfTransactions() {
    fetch('/get_number_of_transactions')
        .then(response => response.json())
        .then(data => {
            const customersfeed = document.getElementById('total-transactions-quantity');
            customersfeed.textContent = `[${data}]`;
        })
        .catch(error => console.error('Error Fetching number of transactions: ', error));
}

function getNumberOfInventories() {
    fetch('/get_number_of_inventories')
        .then(response => response.json())
        .then(data => {
            const customersfeed = document.getElementById('total-inventories-quantity');
            customersfeed.textContent = `[${data}]`;
        })
        .catch(error => console.error('Error Fetching number of inventories: ', error));
}

function loadIndex() {
    getNumberOfCategories();
    getNumberOfProducts();
    getNumberOfCustomers();
    getNumberOfSuppliers();
    getNumberOfTransactions();
    getNumberOfInventories();
}

loadIndex();
