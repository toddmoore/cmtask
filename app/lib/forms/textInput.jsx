import React from 'react';
import stampit from 'react-stampit';

export default React => {
  return stampit(React, {
    state: {
      value: "",
      entered: false,
      valid: true,
      classNames: [],
      palette: "",
      validity: false
    },
    render(){
      let t = this.props.translation;
      if(!t){
         return this.generateError();
      }
      let {label, ph, error, errorEl} = this.generateTranslations(t);

      // again could be a mixin function as this could be used across all fields
      // but for the test have just hardcoded it for now.
      let validity = this.props.required ? this.state.validity : null;

      return (
        <li className={this.state.classNames.join(' ')} data-valid={validity}>
          <label>
            {label}
            <input placeholder={ph}
              noValidate
              autoComplete="off"
              className={this.state.palette}
              onBlur={()=>{this.handleBlur() }}
              onChange={(el)=>{this.onChange(el)}}
              type={this.props.type}
              name={this.props.id}
              value={this.state.value}
              />
            {errorEl}
          </label>
        </li>
      );
    }
  })
}
