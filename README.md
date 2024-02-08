# NarutoApp

This is a React Native application that provides a rich user interface with various features. The application is organized into several screens, each providing a unique functionality.

## Table of Contents

- [Features](#features)
  - [Bottom Navigation](#bottom-navigation)
  - [Blog](#blog)
  - [Animations](#animations)
  - [Quotes](#quotes)
  - [Authentication](#authentication)
- [Firebase Configure](#configure-firebase)
- [Installation & Running the App](#Installation-&-run-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

### Bottom Navigation

The application uses a bottom tab navigator for easy navigation between different screens. The tabs include Home, Explore, Blog, and Profile. Each tab has its own stack navigator for managing the screen hierarchy within that tab.

### Blog

The application has a blog feature where users can read articles. The articles are fetched from a collection and displayed on the Blog screen. Each article can have multiple sections, which are handled by the `ArticleSections` component. Users can also like articles, and this functionality is managed by the `useLikeArticle` hook.

### Animations

The application uses animations in various places to enhance the user experience. For example, there's a loading animation that's displayed while the app is fetching data. There are also animations for the first slide to make the onboarding process more engaging.

### Quotes

The application has a feature related to quotes. The `QuoteOfTheDay` component fetches a new quote every day and displays it on the Home screen. The quotes are stored in the [`quotes.js`](quotes.js) file.

### Authentication

The application has a user authentication feature. The `Authenticate` component is responsible for handling user registration and login. It uses the `useAuth` hook to manage the authentication state.

### Configure Firebase

1) Navigate yourself to the Firabase-Change-This.js file
2) Rename the file to firebase.js and add your personal configuration

### Installation & run application

To install the dependencies, run:

```
npm install
```

To run the application, use:

```
npm start
```

### Project Structure
The project is organized into several directories:

- AnimationComponents: This directory contains various animations used in the app. Each animation is defined in its own file.

- Components: This directory contains the main components of the app. Each component is defined in its own file. The components include the Blog, ExploreScreen, Profile, QuoteOfTheDay, and Slides.

- ContextProviders: This directory contains the AppStateProvider, which is the main context provider for the application. It uses the Context API for state management.

- Screens: This directory contains the different screens of the app. Each screen is defined in its own file.

- StackNavigation: This directory contains the stack navigators for the different tabs. Each stack navigator is defined in its own file.

### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
