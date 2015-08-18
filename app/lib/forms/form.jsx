import React from 'react';
import stampit from 'react-stampit';

import textInput from './textInput.jsx!';
import selectInput from './selectInput.jsx!';
import checkboxInput from './checkboxInput.jsx!';
import button from './button.jsx!';

/**
 * Mixin that includes most of the validation
 * functions
 */
import validations from './mixins/validations';

/**
 * A few utility type functions that generate variables
 * from the translation and also creates a few classes.
 */
import inputDefaults from './mixins/inputDefaults.jsx!';

/**
 * Factories that generate the various input types required by form.
 * `.compose()` is adding that object's prototype to the prototype chain.
 * See the documentation on Eric Elliot's stampit library.
 */
const TextInput = textInput(React).compose(inputDefaults, validations);
const SelectInput = selectInput(React).compose(inputDefaults, validations);
const CheckboxInput = checkboxInput(React).compose(inputDefaults, validations);
const Button = button(React).compose(inputDefaults);

export default React => {
  return stampit(React,{
    propTypes: {
      fields: React.PropTypes.array
    },
    state: {
      fieldTypes: {
        // I html `type` key reference
        // to return the expected input
        text: TextInput,
        email: TextInput,
        password: TextInput,
        select: SelectInput,
        checkbox: CheckboxInput,
        button: Button
      },
      // stores a reference to the fields
      // not really used other then to trigger a render
      fields: null,
      // used to check that all fields are valid
      // for the form
      fieldsValidDict: {},
      // can be set with a ReactComponent to
      // display a message
      message: null,
      // used for signalling the loader
      submitting: false
    },
    /**
     * Produces fields components. Requires type text, email ...
     * @param  {string} type  email, text, select, checkbox ...
     * @param  {obj} field    obj must have id and layout
     * @return {<Field />}    Field to be added to the form
     */
    createField(type, field){
      let Field = this.state.fieldTypes[type];
      let options = field.options ? field.options : null;
      let translation = this.props.translation ? this.props.translation : {};
      if(field.required) this.setFieldValidity(field.id, false);
      return <Field
        type={type}
        id={field.id}
        options={options}
        translation={translation[field.id]}
        layout={field.layout}
        palette={this.props.palette}
        setFieldValidity={this.setFieldValidity.bind(this)}
        variation={field.variation}
        required={field.required}
        />;
    },
    /**
     * Updates the validity dict
     * @param {string} id        field id
     * @param {boolean} validity valid=true, invalid=false
     */
    setFieldValidity(id,validity){
      let fieldsDict = this.state.fieldsValidDict;
      fieldsDict[id] = validity;
      this.setState({
        fieldsValidDict: fieldsDict
      });
    },
    /**
     * See React Docs
     * @return {undefined}
     */
    componentWillMount(){
      let fields = this.props.fields.map((field)=>{
        return this.createField(field.type, field)
      });
      this.setState({
        fields: fields
      });
    },
    /**
     * Updates state with a message to display
     * @param {string} type    success,validationError
     * @param {string} message
     */
    setMessage(type, message){
      return <div className={"js-message-"+type}>{message}</div>
    },

    /**
     * Handler for the form submit
     */
    onSubmit(e){
      e.preventDefault();
      this.resetMessage();
      let type;
      let message;
      let invalid;
      for (let key of Object.keys(this.state.fieldsValidDict)) {
          if(!invalid){
            let val = this.state.fieldsValidDict[key];
            type = val ? 'success':'validationError';
            message = this.props.translation[this.props.name][type];
            if(type === 'validationError') invalid = true;
          }
      }
      return this.submit(type, message);
    },
    /**
     * Submit simulation
     */
    submit(type, message){
      // Submission simulation
      setTimeout(()=>{
        this.setState({
          action: 'js-form-'+type,
          message: this.setMessage(type,message),
          submitting: false
        }, this.removeMessageTimeout);
      }, type == 'success' ? 3000 : 0);
    },
    /**
     * Used to clear the message
     */
    resetMessage(){
      clearTimeout(this.removeTimeout);
      this.setState({
        submitting: true,
        message: null
      });
    },
    /**
     * removes the message timeout
     */
    removeMessageTimeout(){
      this.removeTimeout = setTimeout(()=>{
        this.setState({
          message: null
        })
      }, 10000)
    },
    /**
     * React Render function
     */
    render(){
      return (
        <form
          data-result={this.state.action}
          noValidate
          className={this.props.formClasses.join(' ') + ' ' + (this.state.submitting ? 'js-loading' : null)}
          onSubmit={this.onSubmit.bind(this)}
          action={this.props.actionUrl}
          method={this.props.method}>
          {this.state.message}
          <ul className="ul--stripped">
            {this.state.fields}
          </ul>
        </form>
      )
    }
  })
}
