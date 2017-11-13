import json
import unittest
from api import app

class ApiTest(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_registered_user(self):
        headers = [('Content-Type', 'application/json')]
        data = {'username': 'test_person', 'password':"123456", 'age':1, 'gender':'M'}
        json_data = json.dumps(data)
        json_data_length = len(json_data)
        headers.append(('Content-Length', json_data_length))
        response = self.app.post('/register', headers=headers, data=json_data)
        data = json.loads(response.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertTrue(data['message'] == 'Successfully registered.')
        self.assertTrue(data['auth_token'])
        self.assertTrue(response.content_type == 'application/json')
        self.assertEqual(response.status_code, 201)

    def test_login_logout_user(self):
        headers = [('Content-Type', 'application/json')]
        data = {'username': 'test_person', 'password':"123456"}
        json_data = json.dumps(data)
        json_data_length = len(json_data)
        headers.append(('Content-Length', json_data_length))
        response = self.app.post('/login', headers=headers, data=json_data)
        data = json.loads(response.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertTrue(data['message'] == 'Successfully logged in.')
        self.assertTrue(data['auth_token'])
        headers = [('Content-Type', 'application/json')]
        headers.append(('Authorization', data['auth_token']))
        self.assertTrue(response.content_type == 'application/json')
        self.assertEqual(response.status_code, 200)
        response = self.app.post('/logout', headers=headers, data=json_data)
        data = json.loads(response.data.decode())
        print(data)
        self.assertTrue(data['status'] == 'success')
        self.assertTrue(data['message'] == 'Successfully logged out.')
        self.assertEqual(response.status_code, 200)

if __name__ == "__main__":
    unittest.main()
