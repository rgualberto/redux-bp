import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BpComponent extends Component {
  render() {
    const {
      headingTitle
    } = this.props;

    return (
      <div className="container">
        <h1>{headingTitle}</h1>
      </div>
    );
  }
}

BpComponent.propTypes = {
  headingTitle: PropTypes.string
};

export default BpComponent;
