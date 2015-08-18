import React from 'react';
import stampit from 'react-stampit';

export default React => {
  return stampit(React, {
    state: {
      value: "",
      entered: false,
      valid: true,
      classNames: [],
      palette: ""
    },
    render(){
      let t = this.props.translation;
      if(!t){
         return this.generateError();
      }
      let {label, ph, error, errorEl} = this.generateTranslations(t);
      let options = this.props.options.map((item)=>{
        return <option>{item}</option>;
      })
      return (
        <li className={this.state.classNames.join(' ')+' component-form__field--select'}>
          <label htmlFor={this.props.id}>
            {label}
          </label>
          <div className={"select select--"+this.props.palette}>
            <select
              noValidate
              placeholder={ph}
              id={this.props.id}
              className={this.state.palette}
              name={this.props.id}
              value={this.state.value}
              onBlur={()=>{this.handleBlur() }}
              onChange={(el)=>{this.onChange(el)}}
              >
              {options}
            </select>
          </div>
        </li>
      );
    }
  })
}
