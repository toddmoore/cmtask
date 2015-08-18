import React from 'react';
import stampit from 'react-stampit';
import Fromsy from 'formsy-react';
import formComponent from './forms/form.jsx!';
import i18n from './i18n';

const translation = i18n(navigator.language ? navigator.language : navigator.browserLanguage);
const SignUpFormReference = document.getElementById('SignUp');
const FormComponent = formComponent(React)

React.render(<FormComponent
  fields={[
    { id:'name',   type:'text', layout: 'half', required: true  },
    { id: 'email', type:'email', layout: 'half', required: true },
    { id: 'password', type: 'password', layout: 'half', required: true },
    { id: 'source', type: 'select', layout: 'half', options: ['Twitter','Facebook','Google']},
    { id: 'confirm', type: 'checkbox', layout: 'full' },
    { id: 'signupSubmit', type: 'button', layout: 'full', variation: 'square' }
  ]}
  name="signupForm"
  formClasses={['component-form','component-form--sign-up']}
  actionUrl="index.html"
  method="post"
  translation={translation}
  palette="reversed"
/>, SignUpFormReference);
