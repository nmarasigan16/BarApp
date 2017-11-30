import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import {colorScheme} from "../../../lib/styles/ColorScheme";
import { Dropdown } from 'react-native-material-dropdown';

class ValidatedDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            value: props.value || {value: ''},
            initialValue : props.value || {value: ''},
            validators: props.validators || [],
            errorMessage: '',
            valid: false,
            dirty: false,
        };

        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getName = this.getName.bind(this);
        this.getData = this.getData.bind(this);
    }

    getData() {
        this.validate();
        return {
            value: this.state.value,
            valid: this.state.valid
        }
    }

    getName() {
        return this.state.name;
    }

    validate() {
        const { value, validators } = this.state;
        let valid = true;
        for(let validator of validators) {
            const response = validator(value.value);
            if(!response.valid) {
                valid = false;
                this.setState({errorMessage: response.errorMessage});
                break;
            }
        }
        this.setState({valid});
    }

    handleChange() {
        this.setState({
            value: this.dropdown.selectedItem()
        });
        console.log(this.state.value);
        this.validate();
    }

    render() {
        const {
            errorMessage,
            value,
        } = this.state;
        let dupProps = JSON.parse(JSON.stringify(this.props));
        dupProps.baseColor = dupProps.baseColor || colorScheme.accent;
        dupProps.textColor = dupProps.textColor || colorScheme.accent;

        const {
            data
        } = this.props;

        return (
            <Dropdown
                ref={(dropdown) => {this.dropdown = dropdown}}
                {...dupProps}
                error={errorMessage}
                onChangeText={this.handleChange}
            />
        )
    }
}

export default ValidatedDropdown;
