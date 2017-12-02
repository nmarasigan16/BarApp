import datetime
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

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
        print (user.bars)
        obj = {'username': user.username, 'password':user.password, 'name':user.name, 'status':user.status,
            'age': user.age, 'gender': user.gender, 'bars':user.bars}
        print("HERE")
        self.mongo.db.Users.insert_one(obj)

    def add_bar_to_db(self, bar):
        """
        Adds a bar to the database
        :return: Nothing
        """
        obj = {'bar_id': bar.bar_id, 'name':bar.name,
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

    def check_user_db(self, username):
        user = self.mongo.db.Users.find_one({'username': username})
        if user:
            return user
        else:
            return None

    def check_bar_db(self, bar_id):
        bar = self.mongo.db.Bars.find_one({'bar_id': bar_id})
        if bar:
            return bar
        else:
            return None

    def update_user(self, member, value, username):
        update = self.mongo.db.Users.update_one({'username': username}, {'$set': {member: value}})
        if update.acknowledged:
            return
        else:
            raise Exception('Failed to update')

    def get_specials(self):
        cursor = mongo.Bars.findMany({})
        specials = []
        for bar in cursor:
            for spec in bar['specials']:
                specials.append(spec)
        return specials

