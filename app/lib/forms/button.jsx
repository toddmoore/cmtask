import React from 'react';
import stampit from 'react-stampit';

export default React => {
  return stampit(React, {
    state: {
      classNames: [],
      palette: ""
    },
    // Am not include the validations
    // So rather than creating a separate mixin
    // I decided to just add one here.
    componentWillMount(){
      this.setState({
        classNames: this.setClasses()
      });
    },
    render(){
      // ref to translation(not necessary)
      let t = this.props.translation;
      if(!t){
          //outputs error if no translation for user feedback
         return this.generateError();
      }
      // otherwise generate the bits and bobs we need for a field
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
