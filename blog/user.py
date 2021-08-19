import base64
import hashlib
import re
import uuid

from flask import Blueprint, render_template, request, redirect, session
from werkzeug.utils import secure_filename

from blog.db import get_db

bp = Blueprint("user", __name__)


@bp.route("/profile/")
def profile():
    db = get_db()
    login_user = db.users.find({"username": session["username"]}, {"_id": 0})
    return render_template("profile_content.html", logged_in_user=login_user[0])


@bp.route("/edit-profile/")
def edit_profile():
    db = get_db()
    login_user = db.users.find({"username": session["username"]}, {"_id": 0})
    return render_template("edit_profile_content.html", logged_in_user=login_user[0])


@bp.route("/merge_change/", methods=["POST"])
def merge_change():
    if request.method == 'POST':
        db = get_db()
        myquery = {"username": session["username"]}
        f_name = request.form.get('f_name')
        l_name = request.form.get('l_name')
        email = request.form.get('email')
        phone_number = request.form.get('phone')
        f = request.files.get('image')
        password = request.form.get('new_password')
        confirm_password = request.form.get('new_confirm_password')
        # update name and lastname
        name_lastname = {
            'f_name': f_name,
            'l_name': l_name,
        }
        for item in name_lastname:
            if name_lastname[item]:
                newvalues = {"$set": {item: name_lastname[item]}}
                db.users.update_one(myquery, newvalues)
        # update email
        regex_for_email = r"^[a-zA-Z0-9]+[\._]?[a-zA-Z0-9]+[@]\w+[.]\w{2,3}$"
        if email:
            if not re.search(regex_for_email, email):
                return "ایمیل نامعتبر است"
            newvalues = {"$set": {'email': email}}
            db.users.update_one(myquery, newvalues)
        # update phone_number
        regex_for_phone = r"^(\+98?)?{?(0?9[0-9]{9,9}}?)$"
        if phone_number:
            if not re.search(regex_for_phone, phone_number):
                return "شماره موبایل نامعتبر است"
            newvalues = {"$set": {'phone_number': phone_number}}
            db.users.update_one(myquery, newvalues)
        # update image
        if f:
            file_name = secure_filename(f.filename)
            f.save('blog/static/img/profiles/' + file_name)
            image = file_name
            newvalues = {"$set": {'image': image}}
            db.users.update_one(myquery, newvalues)
        if password:
            salt = base64.urlsafe_b64encode(uuid.uuid4().bytes).hex()
            hashed_password = hashlib.sha512((password + salt).encode()).hexdigest()
            if password != confirm_password:
                return 'رمز عبور با تکرار خود همخوانی ندارد'
            newvalues = {"$set": {'password': hashed_password, 'salt': salt}}
            db.users.update_one(myquery, newvalues)
        if confirm_password:
            if password != confirm_password:
                return 'رمز عبور با تکرار خود همخوانی ندارد'
        return "success"


@bp.route("/my_posts/")
def my_posts():
    db = get_db()
    user_posts = db.posts.find({"owner": session["username"]}, {"_id": 0})
    sort_user_posts = user_posts.sort("pub_date", -1)
    list_of_user_posts = [post for post in sort_user_posts]
    return render_template("my_posts_content.html", list_of_user_posts=list_of_user_posts)


@bp.route("/posts-list/")
def posts_list():
    return "list of posts"


@bp.route("/creat-post/")
def create_post():
    return "creat a post"


@bp.route("/edit-post/<int:post_id>/")
def edit_post(post_id):
    return f"{post_id} post edited"
