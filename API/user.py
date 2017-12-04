#!/usr/bin/env python3
import datetime
import jwt

BCRYPT_LOG_ROUNDS = 13
SECRET_KEY = "supersecret"

class User:
    def __init__(self, username, password, name, status, age,
        gender, bc, bars = []):
        """
        Initializes the user object
        """
        self.username = username
        self.password = bc.generate_password_hash(
            password, BCRYPT_LOG_ROUNDS).decode('utf-8')
        self.name = name
        self.status = status
        self.age = age
        self.gender = gender
        self.bars = bars

    def to_dict(self):
        ret ={'username': self.username, 'name':self.name,
            'status':self.status, 'age': self.age, 'gender': self.gender,
            'bars':self.bars}
        return ret

    @staticmethod
    def encode_auth_token(user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=50, seconds=0),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                SECRET_KEY,
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes a given auth_token
        :return: string
        """
        try:
            payload = jwt.decode(auth_token, SECRET_KEY, algorithms=['HS256'])
            return (payload['sub'], True)
        except jwt.ExpiredSignatureError:
            return ('Signature expired. Please log in again.', False)
        except jwt.InvalidTokenError:
            return ('Invalid token. Please log in again.', False)

