# Components of this project explained

- ## auth-server
  The authentication server.
- ## auth-client
  The Login UI for authentication.
- ## client
  React Native application to demo use of Webview to log the user in the community with custom SSO (auth-server handling the authentication).

# What is SSO

Single Sign-On (SSO) is a feature through which a user can sign in to all subdomains of an organization through one account. Suppose an organization has services like a digital game store (games.x.com), an OTT platform video.x.com, and a game streaming platform like Stadia play.x.com. Instead of maintaining separate accounts for all services a central account can be maintained to help users get access to all the services. Big tech giants like Google, Microsoft, Amazon, etc. already use SSO.

## Benefits of SSO

- login process gets simplified, a user no longer needs to log in for every service
- as the authentication server is decoupled from other services, scalability increases.

# What is OAuth 2.0

Before understanding OAuth 2.0 let's go back in time and understand how things worked before OAuth 2.0

Suppose Netflix wants to access some info in your IMDB account to understand your taste and improve the recommendation engine. Earlier the way to do this was: you would share your email and password of IMDB to Netflix so that it can access data on your behalf. But that's insecure and no one would like to do it even if it is a trusted organization.

OAuth tried to solve this problem of delegated access so that some service can access data on your behalf from another service with your consent.


## Integrating Custom SSO

- ### With Webview

  With Webview here means that the login page will open in a Webview and is not as a native UI.
  
  ![Login](https://user-images.githubusercontent.com/58210877/178427901-de181d63-7bb8-44ea-a150-03aad304fa8f.png)

  Upon clicking sign in with X or Y as shown in the above image. A Webview will open with the login UI page of X or Y.

  To initiate an OAuth 2.0 login workflow when a user clicks on `Sign in with X`  
  you need to open the login URL with parameters like `redirect_uri`, `response_type`, and `client_id` in a Webview. \
  example URL: `https://signin.x.com/?client_id=4203u4fw30r23&response_type=code&redirect_uri=https://scenes.your-community.community/oauth2/callback`

  Now the user logs in and a token (let's say X token) is stored to keep the user logged in.

  The user has logged in automatically when opening the community tab as we already have the X token.

- ### Native

  A login UI without webview. While calling the login API here as well you have to pass parameters like response_type, client_id, and redirect_uri. The server will send a redirect_uri which has a `code` as a parameter in it.

  You need to store this redirect_uri in the async storage which will be used to log in the user later.

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

  See [documentation](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md) for detailed official webview guide.

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
  Note: Camera permission and microphone permissions are important.

  below function in WebApp.js line 64 checks for camera and microphone permissions.

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

  In webview and native case a url needs to be provided.

  ```js
  <WebView
    ref={WebViewRef}
    source={{
      uri: url,
    }}
    onLoad={() => setIsWebViewLoading(false)}
  />
  ```

  In the case of native the `url` needs to be fetched from async storage. This is currently implemented in the demo `client` app.

## Useful Resources for OAuth 2.0 and SSO

https://www.youtube.com/watch?v=996OiexHze0&t=1968s \
https://codeburst.io/what-on-earth-is-oauth-f8fab64e897f
