export default {
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
    valid(){
      if(!this.state.entered) return true;
      let valid = this.isValid(this.props.type, this.state.value);
      this.setState({
        valid: valid,
        validity: valid
      });
      this.props.setFieldValidity(this.props.id, valid);
    },
    setEntered(){
      this.setState({
        entered: true
      }, this.valid)
    },
    handleBlur(){
      this.setEntered();
    },
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
    isValid: function(type, value){
      return this[type](value);
    },
    pattern(){
      //validate pattern here
    },
    password: (value)=>{
      return value.length ? value.length > 3 : false;
    }


}
