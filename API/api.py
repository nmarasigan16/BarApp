#!/usr/bin/env python3
#used the following tutorial https://realpython.com/blog/python/token-based-authentication-with-flask/#register-route
import flask

from user import User
from flask import Flask, jsonify, request, make_response
from flask_pymongo import PyMongo
from flask.ext.bcrypt import Bcrypt

__name__ = 'BarApp'
app = Flask(__name__)
bcrypt = Bcrypt(app)
mongo = PyMongo(app)

def add_to_db(user, collection):
    """
    Adds a user to the database
    :return: boolean
    """
    obj = {'username': user.username, 'password':user.password,
        'age': user.age, 'gender': user.gender}
    collection.insert(obj)

def update_db(user):
    return "nothing"

@app.route('/register', methods=['POST'])
def register():
    """
    Registers a user with out database and returns a auth token if successful
    :return: String and status
    """
    content = request.get_json()
    collection = mongo.db.Users
    user = collection.find({'username': content['username']})
    if not user:
        try:
            user = User(content['username'], content['password'], content['age'], content['gender'])
            auth_token = user.encode_auth_token(user.id)
            responseObject = {
                'status': 'success',
                'message': 'Successfully registered.',
                'auth_token': auth_token.decode()
            }
            add_to_db(user, collection)
            return make_response(jsonify(responseObject)), 201
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'User already exists. Please Log in.',
        }
        return make_response(jsonify(responseObject)), 202

@app.route('/login', methods=['POST'])
def login():
    content = request.get_json()
    collection = mongo.db.Users
    try:
        user = collection.find({'username': content['username']})
        if user and bcrypt.check_password_hash(
            user['password'], content[password]):
            user = User(content['username'], content['password'], content['age'], content['gender'])
            auth_token = user.encode_auth_token(user.username)
            if auth_token:
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged in.',
                    'auth_token': auth_token.decode()
                }
                return make_response(jsonify(responseObject)), 200
        else:
            responseObject = {
                'status': 'fail',
                'message': 'User does not exist.'
            }
            return make_response(jsonify(responseObject)), 404
    except Exception as e:
        print(e)
        responseObject = {
            'status': 'fail',
            'message': 'Try again'
        }
        return make_response(jsonify(responseObject)), 500

@app.route('/logout', methods=['POST'])
def logout():
    return "nothing"

# app.run(debug=True)
