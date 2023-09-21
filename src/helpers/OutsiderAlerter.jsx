import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 * Wrapper component that do something (or alerts by default) if you click outside of it
 * 
 * params:
 *    - outsideClickHandler -> func: function to execute when clicked outside
 *    - isDetecting -> bool: if it is true, execute outsideClickHandler() if clicked outside
 *    - children -> ReactComponent: child prop of wrapper
 */
export default class OutsideAlerter extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.outsideClickHandler = this.props.outsideClickHandler;
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (! this.props.isDetecting) return;
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        if (this.outsideClickHandler) this.outsideClickHandler();
        else alert("You clicked outside of me! Please set outsideClickHandler to do something.");
    }
  }

  render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired
};