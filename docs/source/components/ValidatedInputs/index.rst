================
Validated Inputs
================

This is the documentation for the validated inputs that are used throughout the project. These inputs are styled in Google's `Material Design`_.
Currently supported inputs include:

+ `ValidatedForm`_
+ `TextInput`_

This document also includes a few helpful how tos, such as:

+ `Writing your own validators`_

.. _Form:

ValidatedForm
=============

The form component is mostly a wrapper for the other validated components.  The form collects data from its child components and gives the valid status of the form along with the values in the form.

    **Props**
        *Required*
            - children
                The inputs of the form

    **Functions**
        *getData*
            Returns the data from all inputs in the form and the valid status

Example
-------

Usage
+++++

.. code-block:: javascript

    ...
    import Form from 'path/to/ValidatedForm';
    ...
    onLogin() {
        const data = this.form.getData();
        //Do something with data here
    }
    ...
    <View>
        <Form ref={(form) => {this.form = form;}}>
            <ValidatedTextInput
                name={'username'}
                ...
            />
            <ValidatedTextInput
                name={'password'}
                ...
            />
        </Form>
        <TouchableOpacity onPress={this.onLogin}>
            <TextComponent>
                login
            </TextComponent>
        </TouchableOpacity>
    </View>
   




.. _TextInput:

TextInput
=========

Utilizes `react-native-md-textinput`_ to provide a styled TextInput that validates its status.  Can be used within a form or by itself.

    **Props**
        *Required*
            - name
                The name for the field.  This will be used when it returns data
        *Optional/Other*
            - `Validators`_ (functions that will validate your input)
            - All props accepted by the `native TextInput`_
            - All props accepted by `react-native-md-textinput`_

    **Functions**
        *getData*
            Returns the value of the field and its valid status

Example
-------

Usage
+++++

.. code-block:: javascript

    ...
    import ValidatedTextInput from 'path/to/ValidatedTextInput';
    import { validators } from 'path/to/validators';
    ...
    handlePress(e) {
        const data = this.input.data;
    }
    ...
    <View>
        <ValidatedTextInput
            ref={(input) => {this.input = input;}}
            name={'username'}
            validators=[validators.maxNumber(5)]
            label={'Username'}
        />
        <Button onPress={this.handlePress}/>
    </View>

.. _Validators:

Validators
==========

There are several built in validators included.  They are:

+ numberRange(low, high)
+ minNumber(low)
+ maxNumber(high)
+ maxCharacters(high)
+ minCharacters(low)
+ email
+ pattern(pattern, errorMessage)
+ isRequired

They are supported by all the validated inputs.


.. _Writing your own validators:

Writing Your Own Validators
---------------------------

Writing your own validators is fairly simple process.  In order to make a validator, your validator must take in one argument (the input) and must output a response in the form of:

.. code-block:: javascript

   {
      valid: <boolean>
      errorMessage: <string>
   }

It's good to keep in mind that if you want your validator to take arguments you can curry your validators like so (ES6):

.. code-block:: javascript

   const myValidator = (arg1, arg2) => (input) => {
        return {
            valid: true
            errorMessage: 'This is never invalid. How did you manage this?'
        }

In addition, most validators can be achieved with the built-in pattern validator which takes in a regular expression and errorMessage to create a validator.

.. _Material Design: https://material.io/guidelines/
.. _react-native-md-textinput: https://github.com/perushevandkhmelev-agency/react-native-material-textinput
.. _native TextInput: https://facebook.github.io/react-native/docs/textinput.html
