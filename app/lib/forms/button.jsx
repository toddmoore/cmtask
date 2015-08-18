import React from 'react';
import stampit from 'react-stampit';

export default React => {
  return stampit(React, {
    state: {
      classNames: [],
      palette: ""
    },
    render(){
      let t = this.props.translation;
      if(!t){
         return this.generateError();
      }
      let {label, ph, error, errorEl} = this.generateTranslations(t);


      return (
        <li className={this.state.classNames.join(' ')}>
          <button
            className={"component-button component-button--"+this.props.variation} >
            {label}
          </button>
        </li>
      );
    }
  })
}
