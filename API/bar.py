#!/usr/bin/env python3
import datetime
import jwt

class Bar:
    def __init__(self, id, name, location, phone, cover, specials = []):
        """
        Initializes the user object
        """
        self.bar_id = id
        self.name = name
        self.location = location
        self.cover = cover
        self.phone = phone
        self.specials = specials

    def to_dict(self):
        obj = {'bar_id': self.bar_id, 'name':self.name,
            'location': self.location, 'phone': self.phone,
            'specials': []}
        for special in self.specials:
            obj['specials'].append(special.serialize())