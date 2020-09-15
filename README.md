## MyNexway
### Table of contents
  - #### *[Quick Start](#quick-start)*
  - #### *[Available Scripts](#available-scripts)*
  - #### *[Project Structure](#project-structure)*
  - #### *[Common Conventions](#common-conventions)*
---
## Quick Start

Quick run with terminal:

>`git clone git@github.com:NexwayGroup/MyNexway.git && cd MyNexway`  
>`npm i && npm run dev`

The application should be running on your http://localhost:8080  
(port might be different if 8080 is busy)

---
## Available Scripts

In the project directory, you can run:

> ### **npm run dev**

Runs the app in the development mode.  
The page will reload if you make edits.

> ### **npm run prod**

Builds the app for production to the ***dist*** folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

> ### **npm run lint**

Project use [eslint](https://eslint.org/) to check code style consistency and/or fix problems with JavaScript code.  
You can run the above command to check if any linting errors exist on the project.

---
## Project Structure

The root folder contains a readme, configuration files, public and src folders.  
The project is bundled using [webpack](https://webpack.js.org/), due to configuration webpack loader looks for `index.jsx` file inside of the `src` folder, as an entry point.  
After reaching the starting point the structure looks next:  

- index.jsx
  - redux -> store -> reducers -> actions -> constants
  - App
    - localization -> localizations -> translations (en, fr, etc.)
    - ThemeProvider -> theme -> colors/shadows/typography/etc.
    - RootComponent
      - CssBaseline
      - Routes
        - Screens Components
          - ...Child Components
      - HttpNotifications


---
## Common Conventions

### Code Quality 
The project has all configurations to share common coding rules.  
You would see eslint errors if you do something wrong, please make sure to fix any you see.  
Once you finish the work on some feature and are about to push updates, run the `npm run lint` command, to ensure you haven't missed any error.

### Structuring
Keep the following structuring rules:
  - `./src/api/index.js` - place for keeping the api calls. It should just return the *axiosInstance* with api method and url.  
  All request headers and apiBase configurations are handled with axios interceptor (`./src/axios/index.js`)

  - any new component should be created in `./src/components/{ComponentName}` folder
  - helper component should be created in `./src/components/utils/{ComponentName}` folder
  - `./src/services/` should be used for some additional common logic methods
  - use `./src/redux/{actions/constants/reducers}` for adding new redux actions/reducers/action-constants accordingly
  - all the other folders and files usage should be quite straightforward

### Theming & texts

We use [Material-UI](https://material-ui.com/) framework for the UI components.  
Normally all the components theming should be the same for all alike and handled with the theme configuration object (`./src/theme/index.js`).  
Some unique styles used just for a particular component should be made in `.scss` file, created in the same folder as the component.

We use [i18n](https://www.npmjs.com/package/i18n-js) for localizing texts.  
So, all texts should be written as a localization variable instead of a plain text.  
You should use it like this `localization.t('{section}.{item}')` (e.g. `localization.t('general.welcome')`).

### Branching & commits

Please follow next naming conventions for branching:

- `feature/{jiraTicketKey}` (e.g. *`feature/MN-1`*) -> for adding a feature described in the jira ticket
- `bug/{jiraTicketKey}` (e.g. *`bug/MN-1`*) -> for solving a bug described in the jira ticket
- `hotfix/{fixShortName}` (e.g. *`hotfix/changeThemeVariables`*) -> for solving issues **NOT** described in a jira ticket
- `refactoring/{what}` (e.g. *`refactoring/reorginiseStoreComponent`*) -> for refactoring changes
 
For commits messages please follow next:

git commit -am '`{branchName};{short description}`' (e.g. '`bug/MN-1; fix unpredicted header behaviour`').