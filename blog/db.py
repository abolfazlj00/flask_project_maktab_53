from flask import current_app
from flask import g
from pymongo import MongoClient


# this is configuration of database
def get_db():
    if "db" not in g:
        client = MongoClient()
        db_name = current_app.config['DB_NAME']
        g.db = client[db_name]
    return g.db
