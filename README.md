## Django + React boilerplate

This project is a starting boilerplate for a react frontend using webpack + babel with a django backend using django rest framework.

To install + startup the react frontend go into the reactpy folder:
```
cd reactpy
```
Then install the project's node dependencies:
```
npm install
```
Then startup webpack:
```
npm start
```
This will build a webpack bundle using the configuration file in `reactpy/webpack.config.js`.  By default this creates a bundle.js file in `reactpy/assets/bundles/bundle.js` from source file `reactpy/assets/js/index.js`.  Of course all of this is reconfigurable by editing the webpack settings and django-webpack-loader settings.

To install + run the django api, go into the reactpy folder:
```
cd reactpy
```
Then install the projects python dependencies (I recommend doing this in a virtualenv):
```
pip install -r requirements.txt
```
The Database is configured by setting the following environment variables (I also recommend doing this in a virual environment):
```
DB_NAME # database name
DB_USER # psql username
DB_PASS # psql password
DB_HOST # psql host
```
Run you migrations and setup your super user:
```
python manage.py migrate
python manage.py createsuperuser
```
Now you're ready to run your django api and react project:
```
python manage.py runserver
```
All django backend files are located in `reactpy/reactpy` and `reactpy/api`