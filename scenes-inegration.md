# The Aim of the Project

This project will help you integrate your white-labeled `Scenes` community inside your mobile app.

# The components of this project explained

- ## auth-server
  Synonamous to `custom sso`, `authentication server`
- ## auth-client
  The Login UI or frontend client for the `authentication server`.
- ## client
  The existing mobile app. Where we are trying to integrate your community, say `x` (your whitelabeled scenes community).

## Integrating Custom SSO

Currently, there are two ways to integrate your custom SSO.

- 1. Webview Flow
  - Named `Webview flow` because the login ui opens in a `Webview` component.
  - Fun fact: The `Webview` component's `uri`/`url` hits the `auth-server` which redirects you to `auth-client` to show the login ui form.
- 2. Native Flow
  - Named `Native flow` because the login ui is embedded in to the app.

### When to use?

- Webview flow

  - When you wish to use your existing hosted login UI to be shown to user.

- Native Flow

  - When you don't have a hosted login UI.
  - Or you just want native app UI to be the login page.

### Integration Guide

- **WebView Flow**

  Login Screen

  1. When user arrives at login screen. The first screen visible to the user. The UI has `continue with X` button.
  2. Upon clicking on the `continue with X` a `WebView` component opens up with the `uri` of your `auth-client`'s hosted domain. This click will hit the `${BASE_URL}/auth/oauth2/authorize` or `authorize` endpoint of the `auth-server` which redirects the user to hosted `auth-client` or login UI. - So you have to create a `WebViewFlowHandler` component which opens here and set the `uri`.

  ```
    // psuedo code
    <WebViewHandler>

      return (
        <WebView
          pass uri
          pass onshouldstartloadwithrequest method with processWebViewEvent function
        />
      )

    </WebViewHandler>
  ```

  3. Now let's have a look at processWebViewEvent function

  ```
    function processWebViewEvent

      step 1: after succesful login when user is redirected to a uri like
      `https://x.scenes.social/oauth2/callback?code=FUN123XYZ`
      do parse the uri and extract the code value (FUN123XYZ here).
      Here access_token can also be provided instead of code.

      step 2:
      Send an POST API request to `https://scenes-ruby-api.avalonmeta.com/api/v4/users/oauth/custom_login_app?community_id=${communityId}`
      pass code or token in a access_code as body, replace communityId with your communityId.

      Below is a sample request using curl.

      curl --location --request POST 'https://scenes-ruby-staging.avalonmeta.com/api/v4/users/oauth/custom_login_app?community_id=61' \
      --header 'Content-Type: application/x-www-form-urlencoded' \
      --data-urlencode 'access_code=mxppegfKwy'

      step 3:
      After a succesful response from previous API you can direct the user inside the app.
      Handle setting token for native app (for keeping user logged in).
      Perform necessary state managment to show the home page to the user.


    end function

    return (
      <WebView
    ///
    ///
    Rest of the code
  ```

  See `client/src/components/WebViewFlow.js` for code implementation.

  Inside App

  4. Inside the community tab create a `WebView` component.

  - Ensure you have microphone and camera access before opening `WebView` component. The stage part of the scenes app requires mic and camera permissions. Not doing this step will result in `WebView` crashing.
  - Open a webview with `uri` of your community, say `https://x.scenes.social`

  ```
    allowOpenWebView = false

    function canOpenWebView
      if have camera and microphone access:
        allowOpenWebView = true
      end if
    end function

    if allowOpenWebView
      return (
        <WebView
        pass uri
      />)
  ```

  See `client/src/components/WebApp.js` for code implementation.

- **Native Flow**

  Login Screen

  1. The user fills up the login details like email and password. Now the `auth-server` needs to ensure some things.

  - Check if the credentials are correct.
  - If credentials are correct generate a `code`
  - Return this code from the server as a response.

  2. Now after getting the code, store the code in a secure location. You can use local storage. Storing code in easily visible places like Redux store is discouraged. After storing code we can log the user inside the app.

  ```
    function handleSignIn
      step 1: authenticate user and send code as response.

      a sample curl request
      curl --location --request POST 'https://custom-sso.herokuapp.com/auth/login?client_id=88wVls9hfLrOo72v&response_type=code&redirect_uri=https://x.scenes.social/oauth2/callback' \
      --header 'Content-Type: application/x-www-form-urlencoded' \
      --data-urlencode 'email=aabhas@gmail.com' \
      --data-urlencode 'password=pass1234'

      step 2: store code from auth-server response in local storage
      step 3: handle setting token for native app (for keeping user logged in) and direct user to homepage
    end function

    return (
      <Login>
        <InputEmail>
        <InputPassword>
        <SignInButton
          onclick -> handleSignIn
        >
      </Login>)
  ```

  Inside App

  3. Now when the user clicks on the community tab. Open a `WebView` component.

  - Similar to `webview flow` check for camera and microphone permissions here as well.
  - Pass the callback `uri` of community with code as uri to the `WebView` components `uri` param. (e.g. `https://x.scenes.social/oauth2/callback/?code=FUN123XYZ`)
  - Here the rest of the OAuth flow is executed, Note that you have to take care about the expiry time you set for the `code`. Suppose a user logs in the app code is generated and let's say its expiry time is `1 day`. Now when the user clicks on the community tab `2 days` later he will not be able to login into the community. So to avoid this error set an expiry time of the code higher than the native app's token's expiry time.

  To understand Native flow better a good understanding of Oauth 2.0 is helpful.

  <!-- Note that directly pushing screen to navigator might not work, it is advised to show screens based on state change, say user state. -->
