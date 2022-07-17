# The Aim of the Project

This project will help you integrate your white-labeled `Scenes` community inside your mobile app.

# The components of this project explained

- ## auth-server
  The authentication server or custom SSO or OAuth provider.
- ## auth-client
  The Login UI or frontend client for the authentication server.
- ## client
  The mobile app demonstrating the integration of community inside the app. The example shows Native flow (more on this below).

## Integrating Custom SSO

Currently, there are two ways to integrate your custom SSO.

- 1. ### With Webview

  With Webview here means that the login page will open in a Webview and is not as a native UI.

  ![Login](https://user-images.githubusercontent.com/58210877/178427901-de181d63-7bb8-44ea-a150-03aad304fa8f.png)

  Upon clicking sign in with X or Y as shown in the above image. A Webview will open with the login UI page of X or Y.

  To initiate an OAuth 2.0 login workflow when a user clicks on `Sign in with X`  
  you need to open the login URL with parameters like `redirect_uri`, `response_type`, and `client_id` in a Webview (hit the authorize endpoint with required parameters). \
  example URL: `https://signin.x.com/?client_id=4203u4fw30r23&response_type=code&redirect_uri=https://scenes.your-community.community/oauth2/callback`

  Now the user logs in and a token (let's say X token) is stored to keep the user logged in.

  The user has logged in automatically when opening the community tab as we already have the X token so the user doesn't need to signin again.

- 2. ### Native

  By Native we mean that the login UI is the part of the app and a new Webview is not opened.

  - Configuring Authentication API logic (Code Flow)

    - While calling the login API here as well you have to pass parameters to start OAuth flow in server

      - response_type (here response_type will be `code`)
      - client_id (The authentication server assigns a client_id which you fill in the SSO tab in your `community` settings)
      - redirect_uri (the callback URI to your community)

    - The server will send a redirect_uri which has a `code` as a parameter in it or the server can send just the `code`. Currently, our project sends URL, it can be done either way.

    - The callback URL with code looks like https://scenes.your-community.community/oauth2/callback&code=fS3LfSd8.

  This redirect_uri or code needs to be stored somewhere. Some options are Redux, local storage, etc. But this data is sensitive and shouldn't be freely available. So it is recommended to not use Redux or any store library instead use local storage (for that we use `@react-native-community/async-storage` package)

  ```js
  const res = await fetch(
    "https://signin.x.com/?response_type=code&redirect_uri=https://scenes.your-community.community/oauth2/callback&client_id=4203u4fw30r23"
  );
  if (res.status === 200) {
    const { uri } = res.json();
    await AsyncStorage.setItem("redirect_uri", uri);
  }
  ```

  Now when the user taps the community tab inside the app, open a Webview with the URL stored in the async storage.

## Integrating community inside your app using Webview

- ### Setting up Webview

  See [documentation](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md) for the detailed official webview guide.

  - #### Installing Webview

    ```bash
     $ yarn add react-native-webview
    ```

    (or)

    For npm use

    ```bash
      $ npm install react-native-webview
    ```

  See the `client/src/components/WebApp.js` to see how the community page is integrated using Webview.

  Note: Camera permission and microphone permissions are important for the stage feature to function well. We have to ensure these two permissions before launching webview. Once Webview is launched we don't have access to the permission handler object and cannot request permissions inside a webview. Not ensuring this step can result in app crashes.

  below function in `WebApp.js` line 64 checks for camera and microphone permissions.

  ```js
  const canOpenWebView = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        if (
          granted["android.permission.RECORD_AUDIO"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.CAMERA"] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          return true;
        }

        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  };
  ```

  In the below example, `uri` denotes the URL of the website to open.

  ```js
  <WebView
    ref={WebViewRef}
    source={{
      uri: url,
    }}
    onLoad={() => setIsWebViewLoading(false)}
  />
  ```

  Handling `uri` for webview

  - In the case of webview workflow:

    - In this case, the flow is simple. you need to set the `uri` to the authorize or login endpoint of your authentication server or custom SSO. For this project, the `uri` would be `http://localhost:3000/auth/oauth2/authorize`
    - Suppose a user clicks on the `Sign in with x` button and completes the authentication process. After success user comes to the app homepage.
    - Now when the user clicks on the community tab camera, mic permission is asked but login again is not required again `site x` has already set a token. This simplifies the login process and the user only needs to log in once to access the community.

  - In case of token workflow:
    - The user fills login details in the native UI.
    - The server authenticates the user, generates a code and sends `url` string with code or code in response.
    - the code or `url` is stored in local storage for later use.
    - The user comes to the home page of the app on success. On clicking the community tab the `code` or `url` is fetched from the local storage.
    - Camera and microphone permissions are asked before opening webview.
    - In the case of `url`
      - `uri` parameter can be directly set to `url`
    - In the case of `code`
    - `uri` needs to be set to a formatted string `${REDIRECT_URI}?code=${code}` (e.g. https://scenes.your-community.community/oauth2/callback&code=fS3LfSd8)

## Useful Resources for OAuth 2.0 and SSO

https://www.youtube.com/watch?v=996OiexHze0&t=1968s \
https://codeburst.io/what-on-earth-is-oauth-f8fab64e897f
