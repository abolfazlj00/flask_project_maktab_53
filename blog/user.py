from flask import Blueprint

bp = Blueprint("user", __name__)

@bp.route("/profile/")
def profile():
    return "profile"


@bp.route("/posts-list/")
def posts_list():
    return "list of posts"


@bp.route("/creat-post/")
def creat_post():
    return "creat a post"

@bp.route("/edit-post/<int:post_id>/")
def edit_post(post_id):
    return f"{post_id} post edited"