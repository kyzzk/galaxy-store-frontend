# colaborafarma-web-api

- pip install django-extensions
- pip install pyparsing
- pip install graphviz
- pip install pydot
- conda install graphviz

- py manage.py graph_models -a -X auth,AbstractUser,User,Group,Permission,ContentType,Session,AbstractBaseSession,LogEntry -o bd.png