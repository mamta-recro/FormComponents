import React, { Component } from "react";
import styles from "./modal.css";

export default class Modal extends Component {
  closeModal(event) {
    event.stopPropagation();
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    this.props.onClose();
  }

  close_back_drop = event => {
    if (this.props.backDropClose) {
      this.props.onClose();
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }
  };

  render(props) {
    const body = document.getElementsByTagName("body");

    const style = {
      width: this.props.width,
      height: this.props.height,
      position: this.props.position
    };
    if (!this.props.isOpen) return null;

    return (
      <div
        className={styles.modalbody}
        onClick={this.close_back_drop.bind(this)}
      >
        <div
          className={styles.modal}
          style={style}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <h2>{this.props.header}</h2>
          <div>{this.props.children}</div>
          {this.props.crossBtn ? (
            <span
              className={styles.crossBtn}
              onClick={this.closeModal.bind(this)}
            >
              x
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}
