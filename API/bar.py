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
