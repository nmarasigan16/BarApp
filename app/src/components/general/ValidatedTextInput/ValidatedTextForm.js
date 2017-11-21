import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import TextInput from 'react-native-material-textinput';
import Text from '../text/TextComponent';
import {colorScheme} from "../../../lib/styles/ColorScheme";


class ValidatedTextForm extends Component {
    constructor(props) {
        super(props);
        this.children = [];

        this.getData = this.getData.bind(this);
        this.addChild = this.addChild.bind(this);
    }

    getData() {
        let data = {};
        let valid = true;
        for(const input of this.children){
            const name = input.getName();
            const status = input.getData();
            data[name] = status;
            if(!status.valid){
                valid = false;
            }
        }
        data.valid = valid;
        return data;
    }

    addChild(child) {
        this.children.push(child);
    }

    render() {
        const wrapped = React.Children.map(this.props.children,
            (child, i) => React.cloneElement(child, {
                ref: (child) => this.addChild(child)
            }),
            this);

        return(
            <View style={this.props.style}>
                {wrapped}
            </View>
        )
    }
}


export default ValidatedTextForm