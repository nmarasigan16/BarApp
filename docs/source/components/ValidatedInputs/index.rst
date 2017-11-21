================
Validated Inputs
================

This is the documentation for the validated inputs that are used throughout the project. These inputs are styled in Google's `Material Design`_.
Currently supported inputs include:

+ `ValidatedForm`_
+ `TextInput`_

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
    ...
    handlePress(e) {
        const data = this.input.data;
    }
    ...
    <View>
        <ValidatedTextInput
            ref={(input) => {this.input = input;}}
            name={'username'}
            label={'Username'}
        />
        <Button onPress={this.handlePress}/>
    </View>

.. _Material Design: https://material.io/guidelines/
.. _react-native-md-textinput: https://github.com/evblurbs/react-native-md-textinput
.. _native TextInput: https://facebook.github.io/react-native/docs/textinput.html
