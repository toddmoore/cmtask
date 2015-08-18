const translations = {
  "en-us": {
    "name": {
      "label": "Full Name",
      "placeholder": "e.g. Paul Irish",
      "error": "Please enter your name"
    },
    "email": {
      "label": "Email Address",
      "placeholder": "email@example.com",
      "error": "Please enter a valid email"
    },
    "password": {
      "label": "Password",
      "placeholder": "Strong like coffee",
      "error": "Password must be at 4 characters"
    },
    "source" :{
      "label": "How did you hear about this?",
      "placeholder": "Twitter",
      "error": "Please tell us how you know us"
    },
    "confirm": {
      "label": "I want to be added to the email list (we send monthly).",
      "placeholder": "",
      "error": ""
    },
    "signupSubmit": {
      "label": "Create my account"
    },
    "signupForm": {
      "success": "Thank you for your feedback",
      "validationError": "Sorry, but please complete the required fields"
    }
  }
}

export default (language)=> {
  // Could return translations via fetch
  // instead of hardcoding
  return translations[language.toLowerCase()];
}