import React from 'react';
import stampit from 'react-stampit';

import textInput from './textInput.jsx!';
import selectInput from './selectInput.jsx!';
import checkboxInput from './checkboxInput.jsx!';
import button from './button.jsx!';

//mixins
import validations from './mixins/validations';
import inputDefaults from './mixins/inputDefaults.jsx!';

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
        text: TextInput,
        email: TextInput,
        password: TextInput,
        select: SelectInput,
        checkbox: CheckboxInput,
        button: Button
      },
      fields: null,
      fieldsValidDict: {},
      message: null,
      submitting: false
    },
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
    setFieldValidity(id,validity){
      let fieldsDict = this.state.fieldsValidDict;
      fieldsDict[id] = validity;
      this.setState({
        fieldsValidDict: fieldsDict
      });
    },
    componentWillMount(){
      let fields = this.props.fields.map((field)=>{
        return this.createField(field.type, field)
      });
      this.setState({
        fields: fields
      });
    },
    setMessage(type, message){
      return <div className={"js-message-"+type}>{message}</div>
    },
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
    resetMessage(){
      clearTimeout(this.removeTimeout);
      this.setState({
        submitting: true,
        message: null
      });
    },
    removeMessageTimeout(){
      this.removeTimeout = setTimeout(()=>{
        this.setState({
          message: null
        })
      }, 10000)
    },
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
