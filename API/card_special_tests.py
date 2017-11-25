import unittest
from card_special import Card

class CardTest(unittest.TestCase):
    def test_constructor(self):
        data = {"coffee": [0, 4], 'drink':[0,3]}
        card = Card(card = data)
        self.assertTrue(len(card.card) == 2)
        card = Card()
        self.assertTrue(len(card.card) == 0)

    def test_add_remove(self):
        data = {"coffee": [0, 4], 'drink':[0,3]}
        card = Card(card = data)
        card.add_drink("drank", 4)
        self.assertTrue(len(card.card) == 3)
        card.remove_drink("drink")
        self.assertTrue(len(card.card) == 2)

    def test_update(self):
        data = {"coffee": [0, 4], 'drink':[0,3]}
        card = Card(card = data)
        card.update_drink("coffee", 2)
        self.assertTrue(card.card['coffee'][0]==2)

    def test_check_complete(self):
        data = {"coffee": [0, 4], 'drink':[0,3]}
        card = Card(card = data)
        self.assertFalse(card.check_completed())
        data = {"coffee": [4, 4], 'drink':[3,3]}
        card = Card(card = data)
        self.assertTrue(card.check_completed())

if __name__ == "__main__":
    unittest.main()