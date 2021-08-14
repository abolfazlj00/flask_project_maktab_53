


Flask_Project
======

This is a Group Poject, Order By Maktabsharif.com [Maktab_53].. _flask_project: https://group3.ir/

Technologies. 
-------
This is what Techs that we used in our project
s ::
    -> Flask
    -> HTML
    -> CSS
    -> JS
    -> MongoDB

Install
-------

**Be sure to use the same version of the code as the version of the docs
you're reading.** You probably want the latest tagged version, but the
default Git version is the main branch. ::

    # clone the repository
    $ git clone https://github.com/sepehrab1996/flask_project_maktab_53.git
    $ cd flask_project_maktab_53
    # checkout the correct version

Create a virtualenv and activate it::

    $ python3 -m venv venv
    $ . venv/bin/activate

Or on Windows cmd::

    $ py -3 -m venv venv
    $ venv\Scripts\activate.bat

Install needed apps:

    $ pip install -e .

Or if you are using the main branch, install Flask from source before
installing Flaskr::

    $ pip install -e ../..
    $ pip install -e .


Run
---

::

    $ export FLASK_APP=blog
    $ export FLASK_ENV=development
    $ flask run

Or on Windows cmd::

    > set FLASK_APP=flaskr
    > set FLASK_ENV=development
    > flask run

Open http://127.0.0.1:5000 in a browser.



