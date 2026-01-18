## Launch backend
> poetry run python manage.py runserver

#### Launch in production
> poetry run uvicorn core.asgi:application --host 0.0.0.0 --port 8000

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
