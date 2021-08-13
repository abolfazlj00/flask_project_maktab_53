from flask import Blueprint, render_template, request
from werkzeug.utils import secure_filename
import hashlib
import base64
import uuid

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


@bp.route("/register", methods=["POST"])
def register():
    if request.method == 'POST':
        f_name = request.form.get('f_name')
        l_name = request.form.get('l_name')
        username = request.form.get('username')
        password = request.form.get('password')

        salt = base64.urlsafe_b64encode(uuid.uuid4().bytes).hex()
        hashed_password = hashlib.sha512((password + salt).encode()).hexdigest()

        email = request.form.get('email')
        # phone_number = request.form.get('phone')
        f = request.files.get('image')
        if f:
            file_name = secure_filename(f.filename)
            f.save('blog/static/img/' + file_name)
            image = file_name
    else:
        image = None

    db = get_db()
    user = {'f_name': f_name, 'l_name': l_name, 'password': hashed_password, 'salt': salt, 'username': username,
            'email': email,
            'image': image}
    skip = 0
    for i in range(db.users.count()):
        if skip == 0:
            if username == db.users.find({}, {'username': 1, "_id": 0})[i]["username"]:
                skip = 1

    if skip == 0:
        db.users.insert_one(user)
        return {'f_name': f_name, 'l_name': l_name}

    else:
        return "ERROR"


@bp.route("/post/<int:post_id>/")
def post(post_id):
    return f'post_id is {post_id}'


@bp.route("/category-posts/<int:category_id>/")
def category(category_id):
    return f'category_id is {category_id}'


@bp.route("/tag-posts/<int:tag_id>/")
def tag(tag_id):
    return f'tag_id is {tag_id}'
