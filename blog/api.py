from flask import Blueprint

bp = Blueprint("api", __name__)

@bp.route("/posts_list/")
def list_post():
    return "return list of posts with details for use home page"



@bp.route("/post-delete/<int:post_id>/")
def post_delete(post_id):
    return f'post {post_id} deleted'




@bp.route("/post-deactive/<int:post_id>/")
def post_deactive(post_id):
    return f'post {post_id}deactived'


@bp.route("/categories-list/")
def list_categories():
    return 'this page display categories list'



@bp.route("/tags-list/")
def list_tags():
    return "this page displays list of tags"




@bp.route("/search/")
def search():
    return "this page is for searching"




@bp.route("/user-profile/<int:user_id>")
def user_profile(user_id):
    return f'detail of user {user_id}'




@bp.route("/logout/")
def logout():
    return "logout"