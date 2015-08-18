import React from 'react';

export default {
  /**
   * Sets a palette
   * currently just 'reveresed' but could be more
   */
  setPalette(){
    return `input--${this.props.palette}`;
  },

  /**
   * Helper to return field default classes
   */
  setClasses(){
    let layout = this.props.layout ? this.props.layout : 'full';
    return [
      'component-form__field',
      `component-form__field--${layout}-width`
    ]
  },
  /**
   * Helper for generating element for when the id
   * isn't found in the translation
   * @return {<p>}
   */
  generateError(){
    return <p className="js-rtError">No translation for {this.props.id}</p>;
  },
  /**
   * Returns a object that includes:
   * - label: label text
   * - ph: placeholder text
   * - error: validation error text
   * - errorEl: the element for the error
   * @param  {obj} t    from translation
   * @return {string,obj}
   */
  generateTranslations(t){
    let label = t.label ? t.label : `<label:${this.props.id}>`;
    let ph = t.placeholder ? t.placeholder : `<placeholder:${this.props.id}>`;
    let error = t.error ? t.error : "Please complete the field";
    let errorEl = this.state.valid ? null : <span className="js-error">{error}</span>
    return {label, ph, error, errorEl}
  }
}
