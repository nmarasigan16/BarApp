import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import TextInput from 'react-native-material-textinput';
import Text from '../text/TextComponent';
import {colorScheme} from "../../../lib/styles/ColorScheme";

class ValidatedTextInput extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: props.name,
            value: props.value || '',
            initialValue : props.value || '',
            validators: props.validators || [],
            errorMessage: '',
            valid: false,
            dirty: false,
        };

        this._onChangeText = this._onChangeText.bind(this);
        this._isValid = this._isValid.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.checkDirty = this.checkDirty.bind(this);
        this.getName = this.getName.bind(this);
        this.getData = this.getData.bind(this);
    }

    validateInput(input){
        let errorMessage = '';
        let valid = true;
        for(let validator of this.state.validators) {
            let response = validator(input);
            if(!response.valid){
                valid = false;
                this.setState({errorMessage: response.errorMessage});
                break;
            }
        }
        this.setState({valid});
    }

    getName(){
        return this.state.name;
    }

    // an override for the parentComponent to make errors display if they cannot submit
    getData(){
        const {
            value,
            valid
        } = this.state;
        this.validateInput(this.state.value);
        this.setState({dirty: true});
        return {
            value,
            valid
        };
    }

    checkDirty(input){
        const { initialValue } = this.state;
        this.setState({dirty: input !== initialValue});
    }

    _isValid() {
        if(typeof(this.props.isValid) !== 'undefined'){
            this.props.isValid(this.state.valid);
        }
    }
    _onChangeText(input){
        this.setState({value: input});
        this.validateInput(input);
        this.checkDirty(input);
        if(typeof(this.props.onChange) !== 'undefined'){
            this.props.onChangeText(input)
        }
        this._isValid();
    }

    // if dirty and invalid display error message
    render() {
        const { styles } = this.props;
        const { valid, dirty, value, errorMessage } = this.state;
        const { _onChangeText } = this;

        let dupProps = JSON.parse(JSON.stringify(this.props));
        dupProps.activeColor = dupProps.activeColor || colorScheme.logoColor;
        dupProps.color = dupProps.color || colorScheme.accent;
        dupProps.labelColor = dupProps.labelColor || colorScheme.accent;

        return (
            <View style={{flexDirection: 'column'}}>
                <TextInput
                    onChangeText={_onChangeText}
                    value={value}
                    {...dupProps}
                />
                {!valid && dirty ?
                    <Text style={{color: colorScheme.warn}}>
                        {errorMessage}
                    </Text> : null }
            </View>
        )
    }


}

ValidatedTextInput.propTypes = {
    onChangeText: PropTypes.func,
    validators: PropTypes.arrayOf(PropTypes.func),
    value: PropTypes.string,
};

export default ValidatedTextInput;

