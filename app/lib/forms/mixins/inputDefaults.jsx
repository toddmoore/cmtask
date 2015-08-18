import React from 'react';

export default {
  setPalette(){
    return `input--${this.props.palette}`;
  },
  setClasses(){
    let layout = this.props.layout ? this.props.layout : 'full';
    return [
      'component-form__field',
      `component-form__field--${layout}-width`
    ]
  },
  generateError(){
    return <p className="js-rtError">No translation for {this.props.id}</p>;
  },
  generateTranslations(t){
    let label = t.label ? t.label : `<label:${this.props.id}>`;
    let ph = t.placeholder ? t.placeholder : `<placeholder:${this.props.id}>`;
    let error = t.error ? t.error : "Please complete the field";
    let errorEl = this.state.valid ? null : <span className="js-error">{error}</span>
    return {label, ph, error, errorEl}
  }
}
