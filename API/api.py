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

def get_authorization(auth_header):
    if auth_header:
        auth_token = auth_header
    else:
        auth_token = ''
    return (auth_token, auth_token and not db_ops.check_if_blacklisted(auth_token))

def create_response(status, message, status_number):
    responseObject = {
            'status': status,
            'message': message
    }
    return make_response(jsonify(responseObject)), status_number

@app.route('/register', methods=['POST'])
def register():
    """
    Registers a user with out database and returns a auth token if successful
    :return: String and status
    """
    content = request.get_json()
    user = db_ops.check_user_db(content['username'])
    if user is None:
        try:
            user = User(content['username'], content['password'], content['name'], 'user',
                content['age'], content['gender'], bcrypt)
            auth_token = user.encode_auth_token(user.username)
            responseObject = {
                'status': 'success',
                'message': 'Successfully registered.',
                'auth_token': auth_token.decode()
            }
            db_ops.add_user_to_db(user)
            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            return create_response('fail', 'Some error occurred.', 401)
    else:
        return create_response('fail', 'User already exists. Please Log in.', 401)

@app.route('/login', methods=['POST'])
def login():
    """
    Logs the user in, passes a token back to the user
    :return: String and status
    """
    content = request.get_json()
    try:
        user = db_ops.check_user_db(content['username'])
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
            return create_response('fail', 'User does not exist', 401)
    except Exception as e:
        return create_response('fail', 'Try again.', 401)

@app.route('/logout', methods=['POST'])
def logout():
    """
    Logs the user out, blacklists the token so it cannot be used again for any further communications
    :return: String and status
    """
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        resp = User.decode_auth_token(auth_token)
        if resp[1]:
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
            return create_response('fail',resp[0], 401)
    else:
        return create_response('fail', 'Invalid Token', 401)

@app.route('/status', methods=['GET'])
def status():
    """
    Returns the status of the user, if they are logged in or not
    :return: User object as a dictionary
    """
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        resp = User.decode_auth_token(auth_token)
        if resp[1]:
            user = db_ops.check_user_db(resp[0])
            try:
                if user:
                    responseObject = {
                        'status': 'success',
                        'username': user['username'],
                        'bar': True
                    }
                    return make_response(jsonify(responseObject)), 200
                else:
                    return create_response('fail', 'User does not exist.', 401)
            except Exception as e:
                return create_response('fail', e, 401)
        else:
            return create_response('fail', resp[0], 401)
    else:
        return create_response('fail', 'Provide Valid Auth Token', 401)

@app.route('/fblogin', methods=['POST'])
def fblogin():
    content = request.get_json()
    code = content['code']
    payload = {'client_id': app_id, 'redirect_uri' : redirect_uri, 'client_secret': app_secret, 'code':code}
    resp = requests.get(oauth_url, params = payload)
    print(resp)
    token = resp.get_json()['access_token']
    payload = {'access_token':token}
    resp = requests.get(user_url, params = payload)
    resp = resp.get_json()
    user = db_ops.check_user_db(resp['email'])
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
            return create_response('fail', 'Try Again', 401)
    else:
        user = User(resp['email'], None, resp['first_name'], resp['age'], resp['gender'], bc)
        auth_token = user.encode_auth_token(user.username)
        if auth_token:
            responseObject = {
                'status': 'success',
                'message': 'Successfully logged in.',
                'auth_token': auth_token.decode()
            }
            db_ops.add_user_to_db(user)
            return make_response(jsonify(responseObject)), 200
        else:
            return create_response('fail', 'Try Again', 401)

@app.route('/createbar', methods=['POST'])
def create_bar():
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        resp, success = User.decode_auth_token(auth_token)
        user = db_ops.check_user_db(resp)
        if success:
            if user['status'] == 'admin':
                content = request.get_json()
                bar = Bar(content['username'], content['password'], content['name'],
                            content['location'], content['phone'])
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully added bar.'
                }
                db_ops.add_bar_to_db(bar)
                return make_response(jsonify(responseObject)), 200
            else:
                return create_response('fail', 'Incorrect Priveleges', 401)
        else:
            return create_response('fail', resp, 401)
    else:
        return create_response('fail', 'Invalid Token', 401)

def update_status(new_status, auth_token, bartender = False):
    resp, success = User.decode_auth_token(auth_token)
    user = db_ops.check_user_db(resp)
    content= request.get_json()
    if success:
        username = content['username']
        bar_id = content['bar_id']
        user_to_change = db_ops.check_user_db(username)
        if bartender:
            if bar_id not in user[bars]:
                return create_response('fail', 'Incorrect Priveleges', 401)
        elif user['status'] != 'admin':
            return create_response('fail', 'Incorrect Priveleges', 401)
        if user_to_change:
            try:
                responseObject = {
                'status': 'success',
                'message': 'Successfully added user.'
                }
                db_ops.update_user('bars', user_to_change['bars'].append((new_status, bar_id)), username)
                return make_response(jsonify(responseObject)), 200
            except Exception as e:
                return create_response('fail', 'Something went wrong', 401)
    else:
        return create_response('fail', 'resp', 401)

@app.route('/manager', methods = ['PUT'])
def manager():
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        return update_status('manager', auth_token)
    else:
        return create_response('fail', 'Invalid Token', 401)

@app.route('/bartender', methods = ['PUT'])
def bartender():
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        return update_status('bartender', auth_token, bartender = True)
    else:
        return create_response('fail', 'Invalid Token', 401)

@app.route('/bar/{bar_id}', methods = ['GET'])
def get_bar(bar_id):
    return "NOTHING"

@app.route('/specials', methods = ['GET'])
def get_specials():
    return "NOTHING"

@app.route('/updatespecials', methods = ['PUT'])
def update_specials():
    return "NOTHING"
# app.run(debug=True)
