from flask import Blueprint, render_template
from blog.db import get_db

bp = Blueprint("blog", __name__)


@bp.route('/', defaults={'page': None})
@bp.route('/<page>/')
def index(page):
    if page is None:
        return render_template('base.html')
    else:
        if page not in ('home', 'login', 'register', 'profile'):
            return "Page not Found!", 404
        content_html = f"{page}_content.html"
        if page in ('login', 'register'):
            return render_template(f'auth/{content_html}')
        else:
            return render_template(content_html)


# @bp.route("/home/")
# def home():
#     return "hello home"


@bp.route("/post/<int:post_id>/")
def post(post_id):
    return f'post_id is {post_id}'


@bp.route("/category-posts/<int:category_id>/")
def category(category_id):
    return f'category_id is {category_id}'


@bp.route("/tag-posts/<int:tag_id>/")
def tag(tag_id):
    return f'tag_id is {tag_id}'

# @bp.route("/login/")
# def login():
#     return 'yourwelcome to our page please login or register'
