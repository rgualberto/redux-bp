import './bp.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BpComponent extends Component {
  render() {
    const {
      headingTitle,
      subHeading
    } = this.props;

    return (
      <div className="bp">
        <h1 className="bp__heading">{headingTitle}</h1>
        <p className="bp__subheading">{subHeading}</p>
      </div>
    );
  }
}

BpComponent.propTypes = {
  headingTitle: PropTypes.string,
  subHeading: PropTypes.string
};

export default BpComponent;
