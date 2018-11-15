import React from 'react';

export default class Refocus extends React.Component {

  componentDidUpdate() {
    if (this.node) {
      this.node.focus();
    }
  }

  render() {
    return <div aria-live="polite" ref={n => this.node = n} tabIndex={-1}>{this.props.children}</div>;
  }
}