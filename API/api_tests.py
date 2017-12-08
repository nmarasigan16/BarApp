import json
import unittest
from api import app
import time
from unittest.mock import Mock, patch

class ApiTest(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    # def test_registered_user(self):
    #     headers = [('Content-Type', 'application/json')]
    #     data = {'username': 'test3@gmail.com', 'password':"123456", 'name': "TEST" ,
    #             'age':1, 'gender':'M'}
    #     json_data = json.dumps(data)
    #     json_data_length = len(json_data)
    #     headers.append(('Content-Length', json_data_length))
    #     response = self.app.post('/register', headers=headers, data=json_data)
    #     data = json.loads(response.data.decode())
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['message'] == 'Successfully registered.')
    #     self.assertTrue(data['auth_token'])
    #     self.assertTrue(response.content_type == 'application/json')
    #     self.assertEqual(response.status_code, 200)

    def get_login(self, data):
        headers = [('Content-Type', 'application/json')]
        json_data = json.dumps(data)
        json_data_length = len(json_data)
        headers.append(('Content-Length', json_data_length))
        response = self.app.post('/login', headers=headers, data=json_data)
        data = json.loads(response.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertTrue(data['message'] == 'Successfully logged in.')
        self.assertTrue(data['auth_token'])
        self.assertTrue(response.content_type == 'application/json')
        self.assertEqual(response.status_code, 200)
        return data['auth_token']


    def test_login_cycle(self):
        data = {'username': 'test3@gmail.com', 'password':"123456"}
        auth_token = self.get_login(data)
        headers = [('Content-Type', 'application/json')]
        headers.append(('Authorization', auth_token))
        response = self.app.get('/status', headers=headers)
        data = json.loads(response.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertTrue(data['username'] == 'test3@gmail.com')
        response = self.app.post('/logout', headers=headers)
        data = json.loads(response.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertTrue(data['message'] == 'Successfully logged out.')
        self.assertEqual(response.status_code, 200)

    # def test_adding_manager(self):
    #     data = {'username': 'aachhugani@gmail.com', 'password':"admin1"}
    #     auth_token = self.get_login(data)
    #     data = {'bar_id':'test_bar', 'username': 'test3@gmail.com'}
    #     headers = [('Content-Type', 'application/json')]
    #     headers.append(('Authorization', auth_token))
    #     json_data = json.dumps(data)
    #     json_data_length = len(json_data)
    #     headers.append(('Content-Length', json_data_length))
    #     response = self.app.put('/manager', headers=headers, data=json_data)
    #     data = json.loads(response.data.decode())
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['message'] == 'Successfully added user.')
    #     self.assertEqual(response.status_code, 200)

    # def test_add_bartender(self):
    #     data = {'username': 'test3@gmail.com', 'password':"123456"}
    #     auth_token = self.get_login(data)
    #     data = {'bar_id':'test_bar', 'username': 'test3@gmail.com'}
    #     headers = [('Content-Type', 'application/json')]
    #     headers.append(('Authorization', auth_token))
    #     json_data = json.dumps(data)
    #     json_data_length = len(json_data)
    #     headers.append(('Content-Length', json_data_length))
    #     response = self.app.put('/bartender', headers=headers, data=json_data)
    #     data = json.loads(response.data.decode())
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['message'] == 'Successfully added user.')
    #     self.assertEqual(response.status_code, 200)

    # def test_get_bar(self):
    #     data = {'username': 'aachhugani@gmail.com', 'password':"admin1"}
    #     auth_token = self.get_login(data)
    #     headers = [('Content-Type', 'application/json')]
    #     headers.append(('Authorization', auth_token))
    #     response = self.app.get('/bar/test_bar', headers=headers)
    #     data = json.loads(response.data.decode())
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['message'] == 'Found bar.')
    #     self.assertEqual(response.status_code, 200)

    # def test_get_specials(self):
    #     data = {'username': 'aachhugani@gmail.com', 'password':"admin1"}
    #     auth_token = self.get_login(data)
    #     headers = [('Content-Type', 'application/json')]
    #     headers.append(('Authorization', auth_token))
    #     response = self.app.get('/specials', headers=headers)
    #     data = json.loads(response.data.decode())
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['message'] == 'Successfully added user.')
    #     self.assertEqual(response.status_code, 200)

    # def test_delete_specials(self):
    #     data = {'username': 'aachhugani@gmail.com', 'password':"admin1"}
    #     auth_token = self.get_login(data)
    #     headers = [('Content-Type', 'application/json')]
    #     headers.append(('Authorization', auth_token))
    #     data = {'operation': 'delete', 'special_id': 1, 'bar_id':"test_bar"}
    #     json_data = json.dumps(data)
    #     json_data_length = len(json_data)
    #     response = self.app.put('/specials/update', headers=headers, data = json_data)
    #     data = json.loads(response.data.decode())
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['message'] == 'Deleted special.')
    #     self.assertEqual(response.status_code, 200)

    # def test_create_specials(self):
    #     data = {'username': 'aachhugani@gmail.com', 'password':"admin1"}
    #     auth_token = self.get_login(data)
    #     headers = [('Content-Type', 'application/json')]
    #     headers.append(('Authorization', auth_token))
    #     data = {'operation': 'create', 'bar_id':"test_bar",
    #         'special':{'bar_id':'test_bar', 'special_name': 'test',
    #         'description':'hi there', 'object':None}}
    #     json_data = json.dumps(data)
    #     json_data_length = len(json_data)
    #     response = self.app.put('/specials/update', headers=headers, data = json_data)
    #     data = json.loads(response.data.decode())
    #     print(data)
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['message'] == 'Created Special.')
    #     self.assertEqual(response.status_code, 200)

    # def test_update_specials(self):
    #     data = {'username': 'aachhugani@gmail.com', 'password':"admin1"}
    #     auth_token = self.get_login(data)
    #     headers = [('Content-Type', 'application/json')]
    #     headers.append(('Authorization', auth_token))
    #     data = {'operation': 'update', 'bar_id':"test_bar", 'special_id':1,
    #             'update': ['special_name', 'BYE']}
    #     json_data = json.dumps(data)
    #     json_data_length = len(json_data)
    #     response = self.app.put('/specials/update', headers=headers, data = json_data)
    #     data = json.loads(response.data.decode())
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['message'] == 'Updated Special')
    #     self.assertEqual(response.status_code, 200)

    def test_get_user_special(self):
        data = {'username': 'aachhugani@gmail.com', 'password':"admin1"}
        auth_token = self.get_login(data)
        headers = [('Content-Type', 'application/json')]
        headers.append(('Authorization', auth_token))
        response = self.app.get('/user_specials/test_bar/1/get', headers=headers)
        data = json.loads(response.data.decode())
        print (data)
        self.assertTrue(data['status'] == 'success')
        self.assertEqual(response.status_code, 200)

    def test_update_special(self):
        data = {'username': 'aachhugani@gmail.com', 'password':"admin1"}
        auth_token = self.get_login(data)
        headers = [('Content-Type', 'application/json')]
        headers.append(('Authorization', auth_token))
        data = {'update': [['Coors', 1] , ['Blue Moon', 2]]}
        json_data = json.dumps(data)
        json_data_length = len(json_data)
        response = self.app.put('/user_specials/test_bar/1/update', headers=headers, data= json_data)
        data = json.loads(response.data.decode())
        print (data)
        self.assertTrue(data['status'] == 'success')
        self.assertEqual(response.status_code, 200)

    def test_add_user_special(self):
        data = {'username': 'aachhugani@gmail.com', 'password':"admin1"}
        auth_token = self.get_login(data)
        headers = [('Content-Type', 'application/json')]
        headers.append(('Authorization', auth_token))
        response = self.app.post('/user_specials/test_bar/1/create', headers=headers)
        data = json.loads(response.data.decode())
        print (data)
        self.assertTrue(data['status'] == 'success')
        self.assertEqual(response.status_code, 200)

if __name__ == "__main__":
    unittest.main()
