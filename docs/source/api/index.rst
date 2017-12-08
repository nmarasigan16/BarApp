API Endpoints
=====================

This describes the endpoints and requirements for each endpoint.  |WIP| indicates that the endpoint is a work in progress.


---------------------

+ Register

  + [POST] /register
  + Registering a User requires the following in json format:

    + {'username': string, 'password': string, 'name': string, 'age': integer, 'gender': string}
    + Upon success returns in json {'status' : string, 'message' : string,'user':{ 'username':string, 'name': string, 'age':integer, 'gender':string} }, 200
    + Upon failure returns in json {'status' : string, 'message' : string}, 401

+ Login

  + [POST] /login
  + Logging in for both bar and the user requries the following in json format:

    + {'username': string, 'password': string, 'bar' : boolean}
    + Upon success returns in json {'status' : string, 'message' : string,'user':{ 'username':string, 'name': string, 'age':integer, 'gender':string} }, 200
    + Upon failure returns in json {'status' : string, 'message' : string}, 401

+ Logout

  + [POST] /logout
  + 'Authorization' header to be included with access token
  + Upon success returns in json {'status' : string, 'message' : string}, 200

+ Facebook Login

  + [POST] /fblogin
  + Requires {'code' : string } in json format to be sent with POST request

+ User Status

  + [GET] /status
  + 'Authorization' header to be included with access token
  + Upon success returns in json {'status' : string, 'message' : string, 'username':username}, 200

+ Manager

  + [PUT] /status
  + 'Authorization' header to be included with access token
  + Upon success returns in json {'status' : string, 'message' : string}, 200

+ Bartender

  + [PUT] /status
  + 'Authorization' header to be included with access token
  + Upon success returns in json {'status' : string, 'message' : string}, 200

+ User

  + [GET] /user
  + 'Authorization' header to be included with access token
  + Upon success returns in json {'status' : string, 'message' : string,'user':{ 'username':string, 'name': string, 'age':integer, 'gender':string, 'bars':[], 'specials':{'bar_id':{spcecial:object}}} }, 200

+ Bar

  + [GET] /user
  + 'Authorization' header to be included with access token
  + Upon success returns in json {'status' : string, 'message' : string,'bar':{ 'bar_id':string, 'name': string, 'location':string, 'phone':string, 'cover':string, 'specials':[{'special_id':integer, 'special_name':string, 'description':string, 'bar_id':string, 'object':null or {drinks:quantity}}] } }, 200

+ Create Rail Card

  + [POST] /user_specials/<bar_id>/<special_id>/create
  + 'Authorization' header to be included with access token
  +  Upon success will return an {'status' : string, 'message' : string, 'username':string, 'object': {drink:[quantity, max]}}

+ Update Rail Card

  + [PUT] /user_specials/<bar_id>/<special_id>/update
  + as json needs {'update':[[drink(string), quantity(integer)]]}
  + 'Authorization' header to be included with access token
  +  Upon success will return an {'status' : string, 'message' : string, 'username':string, 'object': {drink:[quantity, max]}}

+ Get Rail Card

  + [GET] /user_specials/<bar_id>/<special_id>/get
  + 'Authorization' header to be included with access token
  +  Upon success will return an {'status' : string, 'message' : string, 'username':string, 'object': {drink:[quantity, max]}}



.. |check| unicode:: U+2713
.. |WIP| unicode:: U+1F680
.. |x| unicode:: U+2717
