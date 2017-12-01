#!/usr/bin/env python3
#used the following tutorial https://realpython.com/blog/python/token-based-authentication-with-flask/#register-route
import flask
import datetime
import sys, traceback
import requests

from user import User
from bar import Bar
from db_ops import DBOperations
from flask import Flask, jsonify, request, make_response
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from validate_email import validate_email

app_id = '1977845439150436'
app_secret = 'f0b983e1471377f2a3f1eab8d3813ca3'
redirect_uri = 'outwithbarcode.com?'
user_url = 'https://graph.facebook.com/me?'
oauth_url = 'https://www.facebook.com/v2.11/dialog/oauth?'

__name__ = 'BarApp'
app = Flask(__name__)
bcrypt = Bcrypt(app)
mongo = PyMongo(app)
db_ops = DBOperations(mongo)

@app.route('/register', methods=['POST'])
def register():
    """
    Registers a user with out database and returns a auth token if successful
    :return: String and status
    """
    content = request.get_json()
    user = db_ops.check_bar_user_db(content['username'])
    if user is None:
        try:
            if content['bar']:
                user = Bar(content['username'], content['password'], content['name'],
                    content['location'], content['phone'], bcrypt)
            else:
                user = User(content['username'], content['password'], content['name'],
                    content['age'], content['gender'], bcrypt)
            auth_token = user.encode_auth_token(user.username)
            responseObject = {
                'status': 'success',
                'message': 'Successfully registered.',
                'auth_token': auth_token.decode()
            }
            if content['bar']:
                db_ops.add_bar_to_db(user)
            else:
                db_ops.add_user_to_db(user)
            return make_response(jsonify(responseObject)), 201
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            traceback.print_exc(file=sys.stdout)
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
    try:
        user = db_ops.check_bar_user_db(content['username'])
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
    if auth_header:
        auth_token = auth_header
    else:
        auth_token = ''
    if auth_token and not db_ops.check_if_blacklisted(auth_token):
        resp = User.decode_auth_token(auth_token)
        if isinstance(resp, str):
            try:
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged out.'
                }
                db_ops.blacklist_token(auth_token)
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

@app.route('/status', methods=['GET'])
def status():
    """
    Returns the status of the user, if they are logged in or not
    :return: User object as a dictionary
    """
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header
    else:
        auth_token = ''
    if auth_token and not db_ops.check_if_blacklisted(auth_token):
        resp = User.decode_auth_token(auth_token)
        if isinstance(resp, str):
            user = db_ops.check_bar_user_db(resp)
            try:
                if not user['isbar']:
                    responseObject = {
                        'status': 'success',
                        'username': user['username'],
                        'bar': False
                    }
                    return make_response(jsonify(responseObject)), 200
                elif user['isbar']:
                    responseObject = {
                        'status': 'success',
                        'username': user['username'],
                        'bar': True
                    }
                    return make_response(jsonify(responseObject)), 200
                else:
                    responseObject = {
                    'status': 'fail',
                    'message': 'User does not exist'
                    }
                    return make_response(jsonify(responseObject)), 401
            except Exception as e:
                responseObject = {
                    'status': 'fail',
                    'message': e
                }
                return make_response(jsonify(responseObject)), 401
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

@app.route('/fblogin', methods=['POST'])
def fblogin():
    content = request.get_json()
    code = content['code']
    payload = {'client_id': app_id, 'redirect_uri' : redirect_uri, 'client_secret': app_secret, 'code':code}
    resp = requests.get(oauth_url, params = payload)
    token = resp.json()['access_token']
    payload = {'access_token':token}
    resp = requests.get(user_url, params = payload)
    resp = resp.json()
    user = db_ops.check_bar_user_db(resp['email'])
    if user:
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
            'message': 'Try again'
            }
            return make_response(jsonify(responseObject)), 500
    else:
        user = User(resp['email'], None, resp['first_name'], resp['age'], resp['genger'], bc)
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
            'message': 'Try again'
            }
            return make_response(jsonify(responseObject)), 500
app.run(debug=True)
