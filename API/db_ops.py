import datetime
from flask_pymongo import PyMongo

class DBOperations:
    def __init__(self, db):
        """
        Initializes the DBOperations object
        """
        self.mongo = db

    def add_user_to_db(self, user):
        """
        Adds a user to the database
        :return: Nothing
        """
        obj = {'username': user.username, 'password':user.password, 'name':user.name,
            'age': user.age, 'gender': user.gender, 'specials':user.specials}
        self.mongo.db.Users.insert_one(obj)
    def add_bar_to_db(self, bar):
        """
        Adds a bar to the database
        :return: Nothing
        """
        obj = {'username': bar.username, 'password':bar.password, 'name':bar.name,
            'location': bar.location, 'phone': bar.phone, 'specials':bar.specials}
        self.mongo.db.Bars.insert_one(obj)

    def blacklist_token(self, token):
        """
        Blacklists a token so it cannot be used in the future
        :return: Nothing
        """
        obj = {'token':token, 'blacklisted_on': datetime.datetime.now()}
        self.mongo.db.BlackList.insert_one(obj)

    def check_if_blacklisted(self, token):
        """
        Checks if a token has been blacklisted
        :return: Boolean, True if blacklisted, False if not
        """
        token = self.mongo.db.BlackList.find_one({'token':token})
        if token is None:
            return False
        else:
            return True

    def check_bar_user_db(self, username):
        user = self.mongo.db.Users.find_one({'username': username})
        if user:
            return ('User',user)
        user = self.mongo.db.Bars.find_one({'username': username})
        if user:
            return ('Bar', user)
        return None