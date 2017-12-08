
class Card:
    def __init__(self, card = None):
        """
        Initializes the Card object
        """
        if card == None:
            self.card = {}
        else:
            self.card = card

    def add_drink(self, drink, quantity):
        """
        Adds the drink to the card with the quantity needed to reach the goal
        """
        self.card[drink] = [0, quantity]

    def remove_drink(self, drink):
        """
        Removes a drink from a card
        """
        self.card.pop(drink, None)

    def update_drink(self, drink, quant):
        """
        Updates a drink by a certain quantity
        :return: string if fails
        """
        if quant + self.card[drink][0]  <= self.card[drink][1]:
            self.card[drink][0] += quant
            return True
        else:
            return False

    def check_completed(self):
        """
        Checks if the card is completed
        :return: Boolean
        """
        for drink in self.card.items():
            if drink[1][0] != drink[1][1]:
                return False
        return True

    def serialize(self):
        return self.card
