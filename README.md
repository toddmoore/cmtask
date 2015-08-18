Campaign Monitor Test
===

### Approach

- Progressively enhanced
- Modular SCSS
  - Component variations are within an `@at-root`
  - Elements that are children of the component are delineated with `__`
- ReactJS for the form / validation
  - NB. It could have been simpler for the form / validation. But, I wanted to demonstrate my JS ability. The component I've designed could be expanded upon to be a general purpose form builder with i18n support.

### Next Step Considerations
- The translations could be hooked up to a service to allow for content entry.
- I considered adding a password strength calculator but decided against it.
- After I finished the form component I wondered whether the array of form items was a good idea. Perhaps, in next steps, I would probably way up the benefit of making these JSX so that you'd add `<TextInput ...props />`.
- I'd refactor the validation process to accept patterns and other edge cases, at the moment it's fine but it's bit tightly coupled to input type and that would cause issues for scalability.
- I would comment the SCSS a lil more so that a styleguide could be generated. As per [SassDoc](http://sassdoc.com/)

### Running local server

- Install `docker` and `docker-compose` and have the VM running
- Run `docker-compose build`
- Run `docker-compose up`

### Browser support

#### Functional (level 2)

- iOS 6
- Android 4.1

#### Full Support (level 1)

- iOS7+
- Android 4.3+
- IE9+
- Chrome 42+
- Firefox 37+
- Safari 7+
- Opera (latest, tested)
