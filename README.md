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

- **Native Flow**

- Cookie Method

  1. User sees the login UI, and enters credentials.

  2. Inside your login handler.

  - Send a POST request to your auth-server and authenticate the user. On success return code. Pass params like `response_code`, `redirect_uri`, and `client_id`
    Set your application token for persistence here.

    a sample curl request
    curl --location --request POST 'https://custom-sso.herokuapp.com/auth/login?client_id=88wVls9hfLrOo72v&response_type=code&redirect_uri=https://x.scenes.social/oauth2/callback' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'email=aabhas@gmail.com' \
    --data-urlencode 'password=pass1234'

    the response might look like

    ```json
    {
      "code": "dFDH34LS",
      "token": "ey.fsdhalfhdsahglsahglehadaslhdsg.afdhsfdsajkds",
      "refreshToken": "ey.fdashlfhdskahsf.fdskafhdslk"
    }
    ```

  - Send an POST API request to `https://scenes-ruby-api.avalonmeta.com/api/v4/users/oauth/custom_login_app?community_id=${communityId}`
    pass code or token in a access_code as body, replace communityId with your communityId.

    Below is a sample request using curl.

    curl --location --request POST 'https://scenes-ruby-staging.avalonmeta.com/api/v4/users/oauth/custom_login_app?community_id=61' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'access_code=mxppegfKwy'

    Note: This API call completes the SSO flow. The Scenes server exchanges token from your auth-server by giving code.

  - Extract `token`, `refreshToken` and `userId` from response of above request.
  - Set a cookie
    final String cookieString = `'{"token":"${token}","refreshToken":"${refreshToken}","userId":"${userId}"}'`;
    URL Encode this string to replace unsafe characters with their code if it is not handled by your cookie manager library. `"` would be replaced by `%22`, `,` would be replaced by `%2C`

  - Now navigate the user to show homepage.

  - Ensure you have microphone and camera access before opening `WebView` component in Community tab. The stage part of the scenes app requires mic and camera permissions. Not doing this step will result in `WebView` showing abnormal behaviour.

  - Now the user should auto login as the cookie was already set for the community url.

- Url Method

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
