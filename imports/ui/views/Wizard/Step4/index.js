import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from "prop-types";


class Step4 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { issues } = this.props;
        return (
            <React.Fragment>
                <span>Step 4</span>
            </React.Fragment>
        );
    }
}

Step4.propTypes = {
    issues: PropTypes.array.isRequired,
};

export default withTracker(() => {return {
            issues: cfgIssues.find({}).fetch(),
        }})(Step4);
