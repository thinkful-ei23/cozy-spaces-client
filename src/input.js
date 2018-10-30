import  React from 'react';

export default class Input extends React.Component {
  componentDidUpdate(prevProps) {
      if (!prevProps.meta.active && this.props.meta.active) {
          this.input.focus();
      }
  }
  render() {
    const Element = this.props.element || 'input';

    let error;
    if (this.props.meta.touched && this.props.meta.error) {
        error = <div className="form-error">{this.props.meta.error}</div>;
    }

    let warning;
    if (this.props.meta.touched && this.props.meta.warning) {
        warning = (
            <div className="form-warning">{this.props.meta.warning}</div>
        );
    }
    if (this.props.rows ) {
      return (
        <div className="form-input">
            <label htmlFor={this.props.input.name}>
                {this.props.label}
                {error}
                {warning}
            </label>
            <textarea
                {...this.props.input}
                id={this.props.input.name}
                ref={input => (this.input = input)}
                placeholder={this.props.placeholder}
                rows={this.props.rows}
                columns={this.props.columns}
            >
                {this.props.children}
            </textarea>
        </div>
      );
    } else {
      if (this.props.type === 'date') {
        return (
          <div className="form-input">
            <label htmlFor={this.props.input.name}>
                {this.props.label}
                {error}
                {warning}
            </label>
              <Element
                {...this.props.input}
                id={this.props.input.name}
                type={this.props.type}
                ref={input => (this.input = input)}
                placeholder={this.props.placeholder}
                min={this.props.min}
                columns={this.props.columns}
                value={this.props.currentDeliveryDate}
              >
                {this.props.children}
              </Element>
          </div>
        );
      } else {
        return (
          <div className="form-input">
            <label htmlFor={this.props.input.name}>
              {this.props.label}
              {error}
              {warning}
            </label>
            <Element
              {...this.props.input}
              id={this.props.input.name}
              type={this.props.type}
              ref={input => (this.input = input)}
              placeholder={this.props.placeholder}
              rows={this.props.rows}
              columns={this.props.columns}
              autoComplete={this.props.autocomplete}
              >
              {this.props.children}
            </Element>
          </div>
        );
      }
    }
  }
}