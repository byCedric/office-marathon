<div align="center">
  <br/>
  <img src="https://raw.githubusercontent.com/byCedric/office-marathon/main/assets/icon.png" alt="vscode-expo" width="200">
  <br />
  <h1>Office Marathon</h1>
  <p></p>
  <p>An example app for <a href="https://docs.expo.io/versions/latest/sdk/location/#background-location-methods">background location</a> tracking in Expo</p>
  <sup>
    <a href="https://github.com/bycedric/office-marathon/blob/master/LICENSE.md">
      <img src="https://img.shields.io/github/license/byCedric/office-marathon?style=flat-square" alt="license" />
    </a>
    <a href="https://expo.io/@bycedric/projects/office-marathon">
      <img src="https://img.shields.io/badge/demo-expo.io-lightgrey.svg?style=flat-square" alt="demo" />
    </a>
  </sup>
  <br />
  <br />
  <br />
</div>

With this app, you can measure your total distance traveled within the office or your home. It's a simple app with the following structure.

- **[app](./src/app.tsx)** - is our entrypoint for the app, combining all providers.

### Providers

- **[providers/asset](./src/providers/asset.tsx)** - loads the custom font, using [Expo Google Fonts](https://github.com/expo/google-fonts).
- **[providers/navigation](./src/providers/navigation.tsx)** - sets up our app screens and navigational strucutre, using [React Navigation](https://reactnavigation.org/).
- **[providers/theme](./src/providers/theme.tsx)** - handles some slightly styled components for us, using [Dripsy](https://github.com/nandorojo/dripsy).

### Screens

- **[screens/onboarding](./src/screens/onboarding.tsx)** - this is where the app asks the user for background location permissions.
- **[screens/distance](./src/screens/onboarding.tsx)** - after the permissions are granted, the user can start/stop/reset location tracking and see their distance.

### Services

- **[services/location](./src/services/location/index.ts)** - calculates distance between points and wraps the functionality in hooks for easy access.
- **[services/location/storage](./src/services/location/storage.ts)** - simple helpers to store location data in local storage, using [Async Storage](https://github.com/react-native-async-storage/async-storage).
- **[services/location/track](./src/services/location/track.ts)** - simple helpers to manage background location tracking, and the background task itself.

<div align="center">
  <br />
  with :heart:&nbsp;&nbsp;<strong>byCedric</strong>
  <br />
</div>
