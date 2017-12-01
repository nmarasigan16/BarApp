API Endpoints
=====================

This describes the endpoints and requirements for each endpoint.  |WIP| indicates that the endpoint is a work in progress.


---------------------

+ Register

  + [POST] /register
  + Registering a User requires the following in json format:

    + {'username': string, 'password': string, 'name': string, 'age': integer, 'gender': string}

+ Login

  + [POST] /login
  + Logging in for both bar and the user requries the following in json format:

    + {'username': string, 'password': string, 'bar' : boolean}

+ Logout

  + [POST] /logout
  + 'Authorization' header to be included with access token

+ Facebook Login

  + [POST] /fblogin
  + Requires {'code' : string } in json format to be sent with POST request

+ User Status

  + [GET] /status
  + 'Authorization' header to be included with access token

.. |check| unicode:: U+2713
.. |WIP| unicode:: U+1F680
.. |x| unicode:: U+2717
