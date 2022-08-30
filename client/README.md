## Running the Project

- Make sure you have properly setup environment for react native. See the official [React Native guide](https://reactnative.dev/docs/environment-setup)

- Install packages

```
yarn
```

See `package.json` file for list of commands

- Running For Android

```
yarn android
```

- Running for ios

  - cd in to `/ios` folder and run

    ```
    pod install
    ```

  - then run on ios emulator usning

    ```
    yarn android

    ```

- Configurations
  - Config file path `src/constants/Config.js`
  - Some configuration constants like `REDIRECT_URI`, `CLIENT_ID`, `AUTH_SERVER_URI` are set here.
  - Make sure these variables are set properly and match with settings SSO settings panel.
