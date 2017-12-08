import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import TextInput from 'react-native-material-textinput';
import Text from '../text/TextComponent';
import {colorScheme} from "../../../lib/styles/ColorScheme";


class ValidatedForm extends Component {
    constructor(props) {
        super(props);
        this.children = [];

        this.getData = this.getData.bind(this);
        this.addChild = this.addChild.bind(this);
    }

    getData() {
        console.log(this.children);
        let data = {};
        let valid = true;
        this.children.forEach((child) => {
            const name = child.getName();
            const status = child.getData();
            data[name] = status;
            if(!status.valid){
                valid = false;
            }
        });
        data.valid = valid;
        return data;
    }

    addChild(child) {
        if(child){
            this.children.push(child);
        }
    }

    render() {
        this.children = [];
        const wrapped = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
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

ValidatedForm.propTypes = {
    children: PropTypes.array
};


export default ValidatedForm