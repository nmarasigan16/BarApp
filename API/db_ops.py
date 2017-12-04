import datetime
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from special import Special

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
        obj = {'username': user.username, 'password':user.password, 'name':user.name, 'status':user.status,
            'age': user.age, 'gender': user.gender, 'bars':user.bars}
        self.mongo.db.Users.insert_one(obj)

    def add_bar_to_db(self, bar):
        """
        Adds a bar to the database
        :return: Nothing
        """
        obj = {'bar_id': bar.bar_id, 'name':bar.name,
            'location': bar.location, 'phone': bar.phone,
            'specials':bar.specials}
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
        update = self.mongo.db.Users.update_one({'username': username},
            {'$set': {member: value}})
        if update.acknowledged:
            return
        else:
            raise Exception('Failed to update')

    def get_specials(self):
        cursor = self.mongo.db.Bars.find({})
        specials = []
        for bar in cursor:
            for spec in bar['specials']:
                to_add = Special(spec['special_id'], spec['name'],
                    spec['description'], spec['bar_id'],
                    object = spec['object'])
                specials.append(to_add.serialize())
        return specials

    def delete_special(self, bar_id, special_id):
        bar = self.mongo.db.Bars.find_one({'bar_id': bar_id})
        specials = bar['specials']
        to_remove = {}
        for special in specials:
            if special['special_id'] == special_id:
                specials.remove(special)
        update = self.mongo.db.Bars.update_one({'bar_id': bar_id},
                    {'$set': {'specials': specials}})

    def create_special(self, bar_id, special):
        bar = self.mongo.db.Bars.find_one({'bar_id': bar_id})
        specials = bar['specials']
        if len(specials)<=0:
            special['special_id'] = 1
        else:
            special['special_id'] = max(specials, key=lambda x:x['special_id'])['special_id'] + 1
        to_add = Special(special['special_id'], special['name'],
                    special['description'], special['bar_id'],
                    object = special['object'])
        specials.append(to_add.serialize())
        update = self.mongo.db.Bars.update_one({'bar_id': bar_id},
                    {'$set': {'specials': specials}})

    def update_special(self, bar_id, special_id, update):
        bar = self.mongo.db.Bars.find_one({'bar_id': bar_id})
        specials = bar['specials']
        for special in specials:
            if special['special_id'] == special_id:
                special[update[0]] = update[1]
        update = self.mongo.db.Bars.update_one({'bar_id': bar_id},
                    {'$set': {'specials': specials}})


