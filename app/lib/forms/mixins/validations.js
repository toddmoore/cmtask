export default {
    /**
     * On change handler, sets value
     */
    onChange(el){
      this.setState({
        value: el.currentTarget.value
      }, this.valid);
    },
    componentWillMount(){
      this.setState({
        classNames: this.setClasses(),
        palette: this.setPalette()
      });
    },
    /**
     * Checks if form is pristine or not
     * Then saves the output of isValid to state
     */
    valid(){
      if(!this.state.entered) return true;
      let valid = this.isValid(this.props.type, this.state.value);
      this.setState({
        valid: valid,
        validity: valid
      });
      // callback to the form so that the parent component
      // is aware of the childs validity state
      this.props.setFieldValidity(this.props.id, valid);
    },
    /**
     * Helper function for setting not pristine
     */
    setEntered(){
      this.setState({
        entered: true
      }, this.valid)
    },
    /**
     * onBlur handler
     */
    handleBlur(){
      this.setEntered();
    },
    /**
     * Helper function to the type and check its validity
     * N.B. would expand this
     * @param  {string} type  text, email ...
     * @param  {string} value field value
     * @return {boolean}
     */
    isValid: function(type, value){
      return this[type](value);
    },
    pattern(){
      //validate pattern here
    },
    // Validators
    email: (value)=>{
      let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return re.test(value)
    },
    text: (value)=>{
      return value.length ? value.length > 2 : false;
    },
    select: (value)=>{
      // Would need to add
      return true;
    },
    checkbox: (value)=> {
      return true;
    },
    password: (value)=>{
      return value.length ? value.length > 3 : false;
    }


}
