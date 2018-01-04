# dev-sec.io

## Installation

1. Install Hugo [here](https://gohugo.io/getting-started/installing/)
2. Install NodeJS, NPM, and Yarn [here](https://yarnpkg.com/lang/en/docs/install/)
3. Build
    ```
    yarn
    ```
4. Develop via:
    ```
    gulp serve
    ```

**Startup takes a while**, but only the first time, because hugo needs to register all the things in node_modules (need to get that fixed...).


## Development

* Custom elements can be developed in `themes/devsec/static/elements`
* SASS styling is developed in `sass` and will automatically be built by `gulp serve` into `themes/devsec/static/css` and `themes/devsec/static/elements/shared-styles.html`
