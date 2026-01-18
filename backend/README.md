## Launch backend
> poetry run python manage.py runserver


### DB setup
> poetry run python manage.py makemigrations
> poetry run python manage.py migrate

#### App sepcific migrations (e.g., for quiz app)
> poetry run python manage.py makemigrations quiz
> poetry run python manage.py migrate

#### Add mock data
python manage.py shell

#### Create superuser
> poetry run python manage.py createsuperuser

