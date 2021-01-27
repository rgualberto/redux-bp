import './bp.scss';
import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {toggleText} from './bpReducer';
import {request} from '../../helpers/loader/loader';

const BpComponent = props => {
  const {
    buttonText,
    headingTitle,
    subHeading,
    titleToggleText
  } = props;

  const dispatch = useDispatch();
  const toggle = useCallback(
    () => dispatch(toggleText()),
    [dispatch]
  );
  const toggleState = useSelector(state => state.bpReducer.toggleState);
  const title = toggleState ? headingTitle : titleToggleText;

  // fetch data
  useEffect(() => {
    request({
      url: "url goes here",
      postLoad: (results) => {

        if (results.isAxiosError) { // can be an error but not this
          console.log(results.message);
        }
      }
    })
  }, []);

  return (
    <div className="bp">
      <h1 className="bp__heading">{title}</h1>
      <p className="bp__subheading">{subHeading}</p>
      <button
        className="bp__text-toggle"
        onClick={toggle}
      >
        {buttonText}
      </button>
    </div>
  );
}

BpComponent.propTypes = {
  buttonText: PropTypes.string,
  headingTitle: PropTypes.string,
  subHeading: PropTypes.string,
  titleToggleText: PropTypes.string,
  toggleState: PropTypes.bool,
  toggleText: PropTypes.func
};

export default BpComponent;
