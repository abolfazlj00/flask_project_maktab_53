py -3 -m venv venv
venv\Scripts\activate
pip install -e .
pip install -r requirements.txt
FLASK_APP=blog
FLASK_ENV=development
