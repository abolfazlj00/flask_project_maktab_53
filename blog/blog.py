from flask import Blueprint, render_template
from blog.db import get_db

bp = Blueprint("blog", __name__)

@bp.route("/home/")
def home():
    return "hello home"


@bp.route("/post/<int:post_id>/")
def post(post_id):
    return f'post_id is {post_id}'


@bp.route("/category-posts/<int:category_id>/")
def category(category_id):
    return f'category_id is {category_id}'


@bp.route("/tag-posts/<int:tag_id>/")
def tag(tag_id):
    return f'tag_id is {tag_id}'

@bp.route("/login/")
def login():
    return 'yourwelcome to our page please login or register'
