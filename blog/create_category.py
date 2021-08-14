from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client["blog"]


def create_category(c_name, p_id):
    new_category = {"category_name": c_name, "parent_id": p_id}
    a = db.categories.find({"category_name": c_name})
    if a.count() == 0:
        db.categories.insert_one(new_category)
    return 0


parent_category = "electronic"
child_of_parent = "mobile"
b = db.categories.find({"category_name": parent_category})
if b.count() == 0:
    db.categories.insert_one({"category_name": parent_category, "parent_id": None})
parent_id = db.categories.find({"category_name": parent_category})
parent_id = parent_id[0]["_id"]
create_category(child_of_parent, parent_id)
