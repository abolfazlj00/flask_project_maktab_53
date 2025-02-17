import pymongo
from flask import Blueprint, render_template, request, session
from werkzeug.utils import secure_filename
import hashlib
import base64
import uuid
from datetime import datetime
import jdatetime
import re
from blog.db import get_db
from bson import ObjectId

bp = Blueprint("blog", __name__)


@bp.route('/', defaults={'page': None})
@bp.route('/<page>/')
def index(page):
    if page is None:
        # create admin of website
        db = get_db()
        find_admin = db.users.find({'username': 'admin'}, {"_id": 0})
        if find_admin.count() == 0:
            password = '1234'
            salt = base64.urlsafe_b64encode(uuid.uuid4().bytes).hex()
            hashed_password = hashlib.sha512((password + salt).encode()).hexdigest()
            admin = {
                'f_name': 'f_name',
                'l_name': 'l_name',
                'password': hashed_password,
                'salt': salt,
                'username': 'admin',
                'email': 'admin@example.com',
                'image': 'avatar.jfif',
                'phone_number': '11111111111',
                'is_admin': 1
            }
            db.users.insert_one(admin)
        return render_template('base.html', Session=session)
    else:
        if page not in (
                'home', 'login', 'register', 'profile', 'insert_post', 'edit_post', 'posts_by_tag', 'new_category'):
            return "Page not Found!", 404
        content_html = f"{page}_content.html"
        if page in ('login', 'register'):
            return render_template(f'auth/{content_html}')
        else:
            return render_template(content_html)


@bp.route("/home/")
def view_home():
    db = get_db()
    active_posts = db.posts.find({"active_state": 1})
    sort_active_posts = active_posts.sort("pub_date", -1)
    list_active_posts = list()
    for item in sort_active_posts:
        item["_id"] = str(item["_id"])
        list_active_posts.append(item)
    return render_template("home_content.html", list_active_posts=(list_active_posts, session))


@bp.route("/register", methods=["POST"])
def register():
    if request.method == 'POST':
        f_name = request.form.get('f_name')
        l_name = request.form.get('l_name')
        username = request.form.get('username')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        salt = base64.urlsafe_b64encode(uuid.uuid4().bytes).hex()
        hashed_password = hashlib.sha512((password + salt).encode()).hexdigest()

        email = request.form.get('email')
        phone_number = request.form.get('phone')
        f = request.files.get('image')
        if f:
            file_name = secure_filename(f.filename)
            f.save('blog/static/img/profiles/' + file_name)
            image = file_name
        else:
            image = 'avatar.jfif'

    db = get_db()
    regex_for_email = r"^[a-zA-Z0-9]+[\._]?[a-zA-Z0-9]+[@]\w+[.]\w{2,3}$"
    regex_for_phone = r"^(\+98?)?{?(0?9[0-9]{9,9}}?)$"
    if not re.search(regex_for_email, email):
        return "ایمیل نامعتبر است"
    if not re.search(regex_for_phone, phone_number):
        return "شماره موبایل نامعتبر است"
    if password != confirm_password:
        return "رمز عبور با تکرار خود همخوانی ندارد"
    user = {
        'f_name': f_name,
        'l_name': l_name,
        'password': hashed_password,
        'salt': salt,
        'username': username,
        'email': email,
        'image': image,
        'phone_number': phone_number,
        'is_admin': 0
    }

    skip_username = 0
    skip_phone = 0
    for i in range(db.users.count()):
        if skip_username == 0 and skip_phone == 0:
            if username == db.users.find({}, {'username': 1, "_id": 0})[i]["username"]:
                skip_username = 1
            if phone_number == db.users.find({}, {'phone_number': 1, "_id": 0})[i]["phone_number"]:
                skip_phone = 1
    if skip_username == 0 and skip_phone == 0:
        db.users.insert_one(user)
        return {'f_name': f_name, 'l_name': l_name}

    else:
        if skip_username == 1:
            return "این نام کاربری قبلا ثبت شده است"
        return "شماره همراه قبلا ثبت شده است"


@bp.route("/login", methods=["POST"])
def login():
    db = get_db()
    username = request.form.get('username')
    password = request.form.get('password')
    login_user = db.users.find({"username": username}, {"_id": 0})

    if login_user.count() != 0:
        valid_password = login_user[0]["password"]
        generated_password = hashlib.sha512((password + login_user[0]["salt"]).encode()).hexdigest()
        if valid_password == generated_password:
            session["username"] = username
            return {'f_name': login_user[0]["f_name"], 'l_name': login_user[0]["l_name"],
                    "username": session["username"]}

        else:
            return "رمز عبور اشتباه است"
    else:
        return "نام کاربری پیدا نشد"


@bp.route("/logout", methods=["GET"])
def logout():
    session.pop('username', None)
    return ""


@bp.route("/post/create", methods=["POST"])
def create_post():
    db = get_db()

    # this section get an image for our post
    f = request.files.get('image')
    if f:
        file_name = secure_filename(f.filename)
        f.save('blog/static/img/posts/' + file_name)
        image = file_name
    else:
        image = None
    username = session["username"]
    title = request.form.get('title')
    main_text = request.form.get('main_text')
    list_of_tags = request.form.get("tags")
    if len(list_of_tags) == 0:
        tags = None
    else:
        tags = list_of_tags.split(",")
        for tag in tags:
            tag = tag.strip()
            tag_in_database = db.tag_db.find({"tag_name": tag}, {"_id": 0})
            if tag_in_database.count() == 0:
                db.tag_db.insert_one({"tag_name": tag})

    jalali_pub_date = jdatetime.datetime.now()
    pub_date = datetime(jalali_pub_date.year, jalali_pub_date.month,
                        jalali_pub_date.day, jalali_pub_date.hour,
                        jalali_pub_date.minute, jalali_pub_date.second)
    id_of_cat_in_post = request.form.get("id_of_cat_in_post")
    id_of_cat = id_of_cat_in_post[18:]
    liked_by = []
    active_state = 1

    user_post = {
        "owner": username,
        "title": title,
        "main_text": main_text,
        "image": image,
        "tags": tags,
        "pub_date": pub_date,
        "liked_by": liked_by,
        "category_of_post": id_of_cat,
        "active_state": active_state
    }

    db.posts.insert_one(user_post)
    user_post['_id'] = str(user_post['_id'])
    return user_post


@bp.route("/create_category/")
def create_category():
    db = get_db()
    all_categories = db.categories.find()
    list_of_all_categories = list()
    for item in all_categories:
        item['parent_id'] = str(item['parent_id'])
        item['_id'] = str(item["_id"])
        list_of_all_categories.append(item)
    categories = {'list_of_all_categories': list_of_all_categories}
    return categories


@bp.route("/category_in_database/", methods=["POST"])
def category_in_database():
    db = get_db()
    if request.method == "POST":
        category_name = request.form.get('category_name')
        parent_category_name = request.form.get('parent_category')
        id_of_parent_category_str = request.form.get('id_of_par_category')
        print(category_name)
        print(parent_category_name)
        print(type(id_of_parent_category_str))
        if category_name:
            if id_of_parent_category_str:
                print(id_of_parent_category_str)
                id_of_parent_category = ObjectId(id_of_parent_category_str[2:])
                parent_in_database = db.categories.find({"_id": id_of_parent_category})
                list_of_children = parent_in_database[0]['children']
                list_of_children.append(category_name)
                new_values = {"$set": {"children": list_of_children}}
                my_query = {"_id": id_of_parent_category}
                db.categories.update_one(my_query, new_values)
                new_category = {"category_name": category_name, "parent_id": id_of_parent_category,
                                "children": list()}
                db.categories.insert_one(new_category)
                return "دسته بندی مورد نظر با موفقیت ثبت شد"
            else:
                new_category = {"category_name": category_name, "parent_id": None,
                                "children": list()}
                db.categories.insert_one(new_category)
                return "دسته بندی مورد نظر با موفقیت ثبت شد"
        else:
            return 'لطفا نام دسته بندی مورد نظر را وارد کنید'


@bp.route("/post/<int:post_id>/")
def post(post_id):
    return f'post_id is {post_id}'


@bp.route("/category-posts/<int:category_id>/")
def category(category_id):
    return f'category_id is {category_id}'


@bp.route("/tag-posts/<int:tag_id>/")
def tag(tag_id):
    return f'tag_id is {tag_id}'


@bp.route('/search', methods=['POST'])
def search():
    db = get_db()
    if request.method == 'POST':
        # display indexes
        # it can be deleted
        index_list = sorted(list(db.posts.index_information()))
        index_list = sorted(list(db.users.index_information()))
        type_of_search = request.form.get("type_of_search")
        if type_of_search == "title":
            posts_by_title = db.posts.find({'title': request.form.get("search"), 'active_state': 1})
            list_posts_by_title = list()
            for item in posts_by_title:
                item["_id"] = str(item["_id"])
                list_posts_by_title.append(item)
            return render_template('search_content.html', posts_by_search=list_posts_by_title)
        elif type_of_search == "main_text":
            db.posts.create_index([('main_text', pymongo.TEXT)], name='main_text')
            posts_by_main_text = db.posts.find({'$text': {'$search': request.form.get("search")}, 'active_state': 1})
            list_posts_by_main_text = list()
            for item in posts_by_main_text:
                item["_id"] = str(item["_id"])
                list_posts_by_main_text.append(item)
            return render_template('search_content.html', posts_by_search=list_posts_by_main_text)
        elif type_of_search == "tag":
            posts_by_tag = db.posts.find({"tags": request.form.get("search"), "active_state": 1})
            list_posts_by_tag = list()
            for item in posts_by_tag:
                item["_id"] = str(item["_id"])
                list_posts_by_tag.append(item)
            return render_template('search_content.html', posts_by_search=list_posts_by_tag)
        elif type_of_search == "category":
            list_of_category_id = db.categories.find({"category_name": request.form.get("search")}, {"_id": 1})
            posts_by_category = list()
            for id_of_category in list_of_category_id:
                posts_by_category.append(
                    list(db.posts.find({"category_of_post": str(id_of_category["_id"]), "active_state": 1})))
            flat_list = [item for sublist in posts_by_category for item in sublist]
            list_posts_by_category = list()
            for item in flat_list:
                item["_id"] = str(item["_id"])
                list_posts_by_category.append(item)
            return render_template('search_content.html', posts_by_search=list_posts_by_category)
        else:
            return render_template('search_content.html', posts_by_search='', type_of_search=type_of_search)


@bp.route("/search_by_category/", methods=["POST"])
def search_by_category():
    db = get_db()
    if request.method == "POST":
        cat_id = request.form.get("category")[10:]
        posts_by_category = db.posts.find({"category_of_post": cat_id, "active_state": 1})
        list_posts_by_category = list()
        for item in posts_by_category:
            item["_id"] = str(item["_id"])
            list_posts_by_category.append(item)
        return render_template("posts_by_category_content.html", posts_by_category=list_posts_by_category)
