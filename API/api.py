#!/usr/bin/env python3
#used the following tutorial https://realpython.com/blog/python/token-based-authentication-with-flask/#register-route
import flask
import datetime
import sys, traceback
import requests
import datetime

from user import User
from bar import Bar
from special import Special
from db_ops import DBOperations
from flask import Flask, jsonify, request, make_response
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from validate_email import validate_email
from card_special import Card

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
                'auth_token': auth_token.decode(),
                'user' : user.to_dict()
            }
            db_ops.add_user_to_db(user)
            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            return create_response('fail', 'Threw an exception', 401)
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

            user = User(user['username'], user['password'], user['name'], user['status'],
                user['age'], user['gender'], bcrypt)

            if auth_token:
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged in.',
                    'auth_token': auth_token.decode(),
                    'user': user.to_dict()
                }
                return make_response(jsonify(responseObject)), 200
        else:
            return create_response('fail', 'User does not exist', 401)
    except Exception as e:
        return create_response('fail', 'Threw an exception', 401)

@app.route('/logout', methods=['POST'])
def logout():
    """
    Logs the user out, blacklists the token so it cannot be used again for any further communications
    :return: String and status
    """
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        try:
            resp = User.decode_auth_token(auth_token)
            if resp[1]:
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged out.'
                }
                db_ops.blacklist_token(auth_token)
                return  (jsonify(responseObject)), 200
            else:
                return create_response('fail',resp[0], 401)
        except Exception as e:
            return create_response('fail', 'Threw an excetion', 401)
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
        try:
            resp = User.decode_auth_token(auth_token)
            if resp[1]:
                user = db_ops.check_user_db(resp[0])
                if user:
                    responseObject = {
                        'status': 'success',
                        'username': user['username'],
                        'bar': True
                    }
                    return make_response(jsonify(responseObject)), 200
                else:
                    return create_response('fail', 'User does not exist.', 401)
            else:
                return create_response('fail', resp[0], 401)
        except Exception as e:
            return create_response('fail', 'Threw an exception', 401)
    else:
        return create_response('fail', 'Provide Valid Auth Token', 401)

@app.route('/fblogin', methods=['POST'])
def fblogin():
    content = request.get_json()
    code = content['code']
    payload = {'client_id': app_id, 'redirect_uri' : redirect_uri, 'client_secret': app_secret, 'code':code}
    resp = requests.get(oauth_url, params = payload)
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
        try:
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
        except Exception as e:
            return create_response('fail', 'Threw an Exception', 401)
    else:
        return create_response('fail', 'Invalid Token', 401)

def check_bar_id(bar_id, bars, current_status):
    if current_status == 'admin':
        return True
    for pair in bars:
        status = pair[0]
        id = pair[1]
        if id == bar_id and status == 'manager':
            return True
    return False

def update_status(new_status, auth_token, content, bartender = False):
    resp, success = User.decode_auth_token(auth_token)
    user = db_ops.check_user_db(resp)
    if success:
        username = content['username']
        bar_id = content['bar_id']
        user_to_change = db_ops.check_user_db(username)
        if bartender:
            if not check_bar_id(bar_id, user['bars'], user['status']):
                return create_response('fail', 'Incorrect Priveleges', 401)
        elif user['status'] != 'admin':
            return create_response('fail', 'Incorrect Priveleges', 401)
        if user_to_change:
            responseObject = {
            'status': 'success',
            'message': 'Successfully added user.'
            }
            new_bars = user_to_change['bars']
            if len(new_bars) <= 0:
                new_bars = [(new_status, bar_id)]
            else:
                new_bars.append((new_status, bar_id))
            db_ops.update_user('bars', new_bars, username)
            return make_response(jsonify(responseObject)), 200
        else:
            return create_response('fail', 'User does not exist', 401)
    else:
        return create_response('fail', 'Invalid Token', 401)

@app.route('/manager', methods = ['PUT'])
def manager():
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        try:
            return update_status('manager', auth_token, request.get_json())
        except Exception as e:
            return create_response('fail', 'Threw an Exception', 401)
    else:
        return create_response('fail', 'Invalid Token', 401)

@app.route('/bartender', methods = ['PUT'])
def bartender():
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        try:
            return update_status('bartender', auth_token, request.get_json(), bartender = True)
        except Exception as e:
            return create_response('fail', "Threw an Exception", 401)
    else:
        return create_response('fail', 'Invalid Token', 401)

def create_specials(input_specials):
    specials = []
    for special in input_specials:
        specials.append(Special(special['special_id'], special['special_name'],
            special['description'], special['bar_id'], special['object']))
    return specials

@app.route('/bar/<bar_id>/<day>', methods = ['GET'])
def get_bar(bar_id, day):
    day = int(day)
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        try:
            bar = db_ops.check_bar_db(bar_id)
            if bar:
                specials = create_specials(bar['specials'][day])
                bar = Bar(bar['bar_id'], bar['name'], bar['location'],
                    bar['phone'], bar['cover'])
                bar.specials[day] = specials
                print(bar)
                responseObject  = {
                    'status' : 'success',
                    'message' : 'Found bar.',
                    'bar': bar.to_dict(day)
                }
                return make_response(jsonify(responseObject)), 200
            else:
                create_response('fail', 'Did not find bar', 401)
        except Exception as e:
            traceback.print_exc(file=sys.stdout)
            return create_response('fail', 'Threw an Exception', 401)
    else:
        return create_response('fail', 'Invalid Token', 401)

@app.route('/specials/<day>', methods = ['GET'])
def get_specials(day):
    day = int(day)
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        try:
            responseObject = {
                'status': 'success',
                'message': 'Successfully added user.',
                'specials': db_ops.get_specials(day)
            }
            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            traceback.print_exc(file=sys.stdout)
            return create_response('fail', 'Threw an Exception', 401)
    else:
        return create_response('fail', 'Invalid Token', 401)

@app.route('/specials/update', methods = ['PUT'])
def update_specials():
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        try:
            resp, success = User.decode_auth_token(auth_token)
            user = db_ops.check_user_db(resp)
            if user == None:
                return create_response('fail', 'User does not exist', 401)
            content = request.get_json()
            bar_id = content['bar_id']
            day = content['day']
            if not check_bar_id(bar_id, user['bars'], user['status']):
                return create_response('fail', 'Incorrect priveleges.', 401)
            if content['operation'] == 'update':
                special_id = content['special_id']
                update = content['update']
                ret = db_ops.update_special(bar_id, special_id, update, day)
                if ret == None:
                    return create_response('fail', 'Special not found.', 401)
                return create_response('success', 'Updated Special', 200)
            elif content['operation'] == 'create':
                db_ops.create_special(bar_id, content['special'], day)
                return create_response('success', 'Created Special.', 200)
            elif content['operation'] == 'delete':
                special_id = content['special_id']
                ret = db_ops.delete_special(bar_id, special_id, day)
                if ret == None:
                    return create_response('fail', 'Special not found.', 401)
                return create_response('success', 'Deleted special.', 200)
        except Exception as e:
            traceback.print_exc(file=sys.stdout)
            return create_response('fail', 'Threw an Exception', 401)
    else:
        return create_response('fail', 'Invalid Token', 401)

@app.route('/user_specials/<bar_id>/<special_id>/<day>', methods = ['POST'])
def create_user_specials(bar_id, special_id, day):
    day = int(day)
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        try:
            resp, success = User.decode_auth_token(auth_token)
            user = db_ops.check_user_db(resp)
            if user == None:
                return create_response('fail', 'User does not exist', 401)
            special_object = db_ops.find_user_special(bar_id, int(special_id), day)
            obj = db_ops.create_user_special(bar_id, special_id, user, special_object)
            if obj  == None:
                return create_response('fail', 'failed to create object', 401)
            responseObject = {
                'status': 'success',
                'message': 'Successfully created object.',
                'object': obj,
                'username': user['username']
            }
            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            return create_response('fail', 'Threw an Exception', 401)
    else:
        return create_response('fail', 'Invalid Token', 401)

@app.route('/user_specials/<bar_id>/<special_id>/get', methods = ['GET'])
def get_user_special(bar_id, special_id):
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        try:
            resp, success = User.decode_auth_token(auth_token)
            user = db_ops.check_user_db(resp)
            if user == None:
                return create_response('fail', 'User does not exist', 401)
            obj = db_ops.get_user_special(bar_id, special_id, user['specials'])
            responseObject = {
                'status': 'success',
                'message': 'Successfully retreived object.',
                'object': obj,
                'username': user['username']
            }
            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            return create_response('fail', 'Threw an Exception', 401)
    else:
        return create_response('fail', 'Invalid Token', 401)

@app.route('/user_specials/<bar_id>/<special_id>/update', methods = ['PUT'])
def update_user_special(bar_id, special_id):
    auth_header = request.headers.get('Authorization')
    auth_token, valid = get_authorization(auth_header)
    if valid:
        try:
            resp, success = User.decode_auth_token(auth_token)
            user = db_ops.check_user_db(resp)
            content = request.get_json()
            if not check_bar_id(bar_id, user['bars'], user['status']):
                return create_response('fail', 'Incorrect priveleges.', 401)
            obj = db_ops.get_user_special(bar_id, special_id, user['specials'])
            if obj == None:
                return create_response('fail', 'Object was not found', 401)
            card = Card(card = obj)
            status = db_ops.update_user_special(bar_id, special_id, user, card, content['update'])
            if status == None:
                return create_response('fail', 'Update not possible', 401)
            responseObject = {
                'status': 'success',
                'message': 'Successfully retreived object.',
                'object': status,
                'username': user['username']
            }
            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            traceback.print_exc(file=sys.stdout)
            return create_response('fail', 'Threw an Exception', 401)
    else:
        return create_response('fail', 'Invalid Token', 401)

app.run(debug=True)
