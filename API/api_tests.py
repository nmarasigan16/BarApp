import json
import unittest
from api import app
from unittest.mock import Mock, patch

class ApiTest(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    # def test_registered_user(self):
    #     headers = [('Content-Type', 'application/json')]
    #     data = {'username': 'test@gmail.com', 'password':"123456", 'name': "TEST" ,
    #             'age':1, 'gender':'M', 'bar':False}
    #     json_data = json.dumps(data)
    #     json_data_length = len(json_data)
    #     headers.append(('Content-Length', json_data_length))
    #     response = self.app.post('/register', headers=headers, data=json_data)
    #     data = json.loads(response.data.decode())
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['message'] == 'Successfully registered.')
    #     self.assertTrue(data['auth_token'])
    #     self.assertTrue(response.content_type == 'application/json')
    #     self.assertEqual(response.status_code, 201)

    # def test_registered_bar(self):
    #     headers = [('Content-Type', 'application/json')]
    #     data = {'username': 'bar@gmail.com', 'password':"123456", 'name': "TEST" ,
    #             'location':"1", 'phone':'1233453453', 'bar':True}
    #     json_data = json.dumps(data)
    #     json_data_length = len(json_data)
    #     headers.append(('Content-Length', json_data_length))
    #     response = self.app.post('/register', headers=headers, data=json_data)
    #     data = json.loads(response.data.decode())
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['message'] == 'Successfully registered.')
    #     self.assertTrue(data['auth_token'])
    #     self.assertTrue(response.content_type == 'application/json')
    #     self.assertEqual(response.status_code, 201)

    # def get_login(self, data):
    #     headers = [('Content-Type', 'application/json')]
    #     json_data = json.dumps(data)
    #     json_data_length = len(json_data)
    #     headers.append(('Content-Length', json_data_length))
    #     response = self.app.post('/login', headers=headers, data=json_data)
    #     data = json.loads(response.data.decode())
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['message'] == 'Successfully logged in.')
    #     self.assertTrue(data['auth_token'])
    #     self.assertTrue(response.content_type == 'application/json')
    #     self.assertEqual(response.status_code, 200)
    #     return data['auth_token']

    # def test_login_logout_user(self):
    #     data = {'username': 'test_person', 'password':"123456", 'bar':False}
    #     auth_token = self.get_login(data)
    #     headers = [('Content-Type', 'application/json')]
    #     headers.append(('Authorization', auth_token))
    #     response = self.app.post('/logout', headers=headers)
    #     data = json.loads(response.data.decode())
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['message'] == 'Successfully logged out.')
    #     self.assertEqual(response.status_code, 200)

    # def test_login_logout_bar(self):
    #     data = {'username': 'test_bar', 'password':"123456", 'bar':True}
    #     auth_token = self.get_login(data)
    #     headers = [('Content-Type', 'application/json')]
    #     headers.append(('Authorization', auth_token))
    #     response = self.app.post('/logout', headers=headers)
    #     data = json.loads(response.data.decode())
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['message'] == 'Successfully logged out.')
    #     self.assertEqual(response.status_code, 200)

    # def test_user_status(self):
    #     data = {'username': 'test_person', 'password':"123456", 'bar':False}
    #     auth_token = self.get_login(data)
    #     headers = [('Content-Type', 'application/json')]
    #     headers.append(('Authorization', auth_token))
    #     response = self.app.get('/status', headers=headers)
    #     data = json.loads(response.data.decode())
    #     self.assertTrue(data['status'] == 'success')
    #     self.assertTrue(data['username'] == 'test_person')
    #     self.assertTrue(data['bar'] == False)
    #     response = self.app.post('/logout', headers=headers)

    @patch('api.requests.get')
    def test_fb_login(self, mock_get):
        first_resp = {'access_token': '190qrknefa109u4naskdf'}
        second_resp = {'email':'testfb@gmail.com', 'first_name':'testing', 'age':21, 'gender':'M'}
        responses = [json.dumps(first_resp), json.dumps(second_resp)]
        mock_get.side_effect = responses
        headers = [('Content-Type', 'application/json')]
        data = {'code':'secret_code'}
        json_data = json.dumps(data)
        json_data_length = len(json_data)
        headers.append(('Content-Length', json_data_length))
        response = self.app.post('/fblogin', headers=headers, data=json_data)
        print (response)

if __name__ == "__main__":
    unittest.main()
