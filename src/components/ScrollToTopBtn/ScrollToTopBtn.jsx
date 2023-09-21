import React from "react";
import {Button} from "react-bootstrap";
import {BiArrowToTop} from "react-icons/bi";
import "./ScrollToTopBtn.scss";

export default class ScrollToTopBtn extends React.Component {
  render() {
    return (
      <Button
        variant="light"
        size="sm"
        className="btn-svg scroll-top-btn"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <BiArrowToTop size={20} />
      </Button>
    );
  }
}
