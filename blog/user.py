from flask import Blueprint, render_template, request, redirect, session

from blog.db import get_db

bp = Blueprint("user", __name__)


@bp.route("/profile/")
def profile():
    db = get_db()
    login_user = db.users.find({"username": session["username"]}, {"_id": 0})
    return render_template("profile_content.html", logged_in_user=login_user[0])


@bp.route("/posts-list/")
def posts_list():
    return "list of posts"


@bp.route("/creat-post/")
def creat_post():
    return "creat a post"


@bp.route("/edit-post/<int:post_id>/")
def edit_post(post_id):
    return f"{post_id} post edited"
