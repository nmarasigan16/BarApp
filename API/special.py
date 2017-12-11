
class Special:
    def __init__(self, id, name, description, bar_id, object = None):
        self.special_id = id
        self.name = name
        self.description = description
        self.bar_id = bar_id
        self.object = object

    def serialize(self):
        special = {'special_id': self.special_id, 'special_name': self.name,
                'description': self.description, 'bar_id': self.bar_id,
                'object': self.object}
        if self.object != None and not isinstance(self.object, dict):
            special['object']  = self.object.serialize()
        return special