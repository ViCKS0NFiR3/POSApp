from flask import Flask, request, jsonify, session, url_for
from flask_restful import Resource, Api
from flask_cors import CORS
from datetime import datetime
from receipt import createReceipt
from config import posDbConfig, posAppConfig, addReceiptNo
from flask_sqlalchemy import SQLAlchemy
from posDb import db, Customer, Product, Order, PosFunctions

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{user}:{password}@{host}:{port}/{dbName}'.format(
    user = posDbConfig["user"],
    password = posDbConfig["password"],
    host = posDbConfig["host"],
    port = posDbConfig["port"],
    dbName = posDbConfig["database"])
app.config['CORS_HEADERS'] = 'Content-Type'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db_2.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
db.init_app(app)

class CreateTables(Resource):
    def get(self):
        try:
            db.create_all()
            return "Done creating database tables."
        except Exception as e:
            return e

class GetProduct(Resource):
    def post(self):
        product_info = request.get_json()
        try:
            product = Product.query.filter_by(sku=product_info["sku"]).first()
            if (product):
                return {
                    "full_name": product.full_name,
                    "short_name": product.short_name,
                    "sku": product.sku,
                    "price": "Php {}".format(product.price)
                } 
        except Exception as e:
            return {"message" : "Product is not found."}

class InsertProduct(Resource):
    def post(self):
        product_info = request.get_json()
        product = Product(full_name=product_info["full_name"], 
                        short_name=product_info["short_name"], 
                        sku=product_info["sku"], 
                        price=product_info["price"])
        print(product)
        return PosFunctions.insert_data_to_db(product,"Product")

class DeleteProduct(Resource):
    def post(self):
        product_info = request.get_json()
        product = Product.query.filter_by(sku=product_info["sku"]).first()
        return PosFunctions.delete_data_from_db(product, "Product")

class PaymentHandler(Resource):
    def post(self):
        order_info = request.get_json()
        product_list = []
        for order in order_info["itemList"]:
            product = Product.query.filter_by(sku=order["sku"]).first()
            for item in range(1, order["quantity"]):
                product_list.append(product)
        try:
            order = Order(total_price=order_info["total_price"], 
                        receipt_id=posAppConfig["receipt_id"],
                        total_pay=order_info["total_pay"],
                        total_change=order_info["total_change"],
                        products=product_list)
            db.session.add(order)
            db.session.commit()
            createReceipt(
                order_info["itemList"],
                posAppConfig["receipt_id"],
                order_info["total_price"],
                order_info["total_pay"],
                order_info["total_change"])
            addReceiptNo("posConfig.ini","posApp","receipt_id")
            return "Order added successfully"  
        except Exception as e:
            print(e)
    # ORDER METHOD IT WORKS FOR NOW, TEST IF YOU CAN GET TOTAL PRICE AND QUANTITY

api.add_resource(CreateTables,'/')
api.add_resource(InsertProduct,'/pos/insert/product')
api.add_resource(GetProduct,'/pos/get/product')
api.add_resource(DeleteProduct,'/pos/delete/product')
api.add_resource(PaymentHandler,'/pos/pay')


if __name__ == '__main__':
    app.run(debug=True)