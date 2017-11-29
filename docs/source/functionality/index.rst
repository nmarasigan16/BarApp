BarCode Functionality
=====================

This describes the current state of functionality of the application.  |WIP| indicates that the functionality is a work in progress.

Application Front-End
---------------------

+ Login Screen

  - Styled |check|
  - Linked with BarCode API |WIP|
  - Linked with Facebook API |WIP|

+ Specials Screen

  + Specials Page

    + Styled |check|

  + Specials Row

    + Styled |WIP|

  + Linked with BarCode API |x|

+ Bar Profile

  + Styled |WIP|
  + Linked with BarCode API |x|
  + Management Tools

    + Update cover |x|
    + Create Specials |x|

API
---

+ Registration Endpoint

  + Registers a new user into database |check|

+ Login Endpoint

  + Logs in a user |check|

+ Logout Endpoint

  + Logs out a user makes token invalid |check|

+ Facebook Login Endpoint

  + Handles Facebook login and ensures user information |WIP|

+ User status Endpoint

  + Checks if the user is logged in or not |check|

.. |check| unicode:: U+2713
.. |WIP| unicode:: U+1F680
.. |x| unicode:: U+2717
