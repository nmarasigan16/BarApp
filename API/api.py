#!/usr/bin/env python3
#used the following tutorial https://realpython.com/blog/python/token-based-authentication-with-flask/#register-route
import flask
import datetime

from user import User
from flask import Flask, jsonify, request, make_response
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt


__name__ = 'BarApp'
app = Flask(__name__)
bcrypt = Bcrypt(app)
mongo = PyMongo(app)

def add_to_db(user, collection):
    """
    Adds a user to the database
    :return: Nothing
    """
    obj = {'username': user.username, 'password':user.password,
        'age': user.age, 'gender': user.gender}
    collection.insert_one(obj)

def blacklist_token(token):
    """
    Blacklists a token so it cannot be used in the future
    :return: Nothing
    """
    obj = {'token':token, 'blacklisted_on': datetime.datetime.now()}
    mongo.db.BlackList.insert_one(obj)

def check_if_blacklisted(token):
    """
    Checks if a token has been blacklisted
    :return: Boolean, True if blacklisted, False if not
    """
    token = mongo.db.BlackList.find_one({'token':token})
    if token is None:
        return False
    else:
        return True

@app.route('/register', methods=['POST'])
def register():
    """
    Registers a user with out database and returns a auth token if successful
    :return: String and status
    """
    content = request.get_json()
    collection = mongo.db.Users
    user = collection.find_one({'username': content['username']})
    if user is None:
        try:
            user = User(content['username'], content['password'], content['age'], content['gender'], bcrypt)
            auth_token = user.encode_auth_token(user.username)
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
    """
    Logs the user in, passes a token back to the user
    :return: String and status
    """
    content = request.get_json()
    collection = mongo.db.Users
    try:
        user = collection.find_one({'username': content['username']})
        if user and bcrypt.check_password_hash(
            user['password'], content['password']):
            auth_token = User.encode_auth_token(user['username'])
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
        responseObject = {
            'status': 'fail',
            'message': 'Try again'
        }
        return make_response(jsonify(responseObject)), 500

@app.route('/logout', methods=['POST'])
def logout():
    """
    Logs the user out, blacklists the token so it cannot be used again for any further communications
    :return: String and status
    """
    auth_header = request.headers.get('Authorization')
    print(auth_header)
    if auth_header:
        auth_token = auth_header
    else:
        auth_token = ''
    if auth_token and not check_if_blacklisted(auth_token):
        resp = User.decode_auth_token(auth_token)
        print (type(resp))
        if isinstance(resp, str):
            try:
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged out.'
                }
                blacklist_token(auth_token)
                return  (jsonify(responseObject)), 200
            except Exception as e:
                responseObject = {
                    'status': 'fail',
                    'message': e
                }
                return make_response(jsonify(responseObject)), 200
        else:
            responseObject = {
                'status': 'fail',
                'message': resp
            }
            return make_response(jsonify(responseObject)), 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403

# app.run(debug=True)
