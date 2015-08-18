Campaign Monitor Test
===

### Approach

- Progressively enhanced
- Modular SCSS
  - Component variations are within an `@at-root`
  - Elements that are children of the component are delineated with `__`
- ReactJS for the form / validation
  - NB. It could have been simpler for the form / validation. But, I wanted to demonstrate my JS ability. The component I've designed could be expanded upon to be a general purpose form builder with i18n support.

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
