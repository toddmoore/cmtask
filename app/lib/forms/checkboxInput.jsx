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
      additionalClases: [
        'input--checkbox',
        'component-section--sign-up__confirm'
        // would probably make this and 'extra classes property,
        // but for the test I'll just hard code it
      ]
    },
    render(){
      let t = this.props.translation;
      if(!t){
         return this.generateError();
      }
      let {label, ph, error, errorEl} = this.generateTranslations(t);
      let extraClasses = ' ' + this.state.palette + ' ' + this.state.additionalClases.join(' ')
      return (
        <li className={this.state.classNames.join(' ') + extraClasses }>
            <input placeholder={ph}
              noValidate
              id={this.props.id}
              onBlur={()=>{this.handleBlur() }}
              onChange={(el)=>{this.onChange(el)}}
              type={this.props.type}
              name={this.props.id}
              value={this.state.value}
              />
            <label htmlFor={this.props.id}>
              {label}
            </label>
            {errorEl}
        </li>
      );
    }
  })
}
