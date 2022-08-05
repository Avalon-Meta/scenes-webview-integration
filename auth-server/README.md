# Project: App In App

## End-point: home

### Method: GET

> ```
> localhost:3000
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: login

### Method: POST

> ```
> localhost:3000/auth/login?client_id=IQkCIOqm55bljU5c&response_type=code&redirect_uri=https://edit-with-rahul-community.avalonmeta.com/oauth2/callback
> ```

### Query Params

| Param         | value                                                            |
| ------------- | ---------------------------------------------------------------- |
| client_id     | IQkCIOqm55bljU5c                                                 |
| response_type | code                                                             |
| redirect_uri  | https://edit-with-rahul-community.avalonmeta.com/oauth2/callback |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: register

### Method: POST

> ```
> localhost:3000/auth/register
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: authorize

### Method: GET

> ```
> localhost:3000/auth/oauth2/authorize?redirect_uri=http://localhost:3001&client_id=fasdlfdhsldfkdflss13jf&response_type=code
> ```

### Headers

| Content-Type | Value |
| ------------ | ----- |
|              |       |

### Query Params

| Param         | value                  |
| ------------- | ---------------------- |
| redirect_uri  | http://localhost:3001  |
| client_id     | fasdlfdhsldfkdflss13jf |
| response_type | code                   |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: token

### Method: POST

> ```
> http://localhost:3000/auth/oauth2/token
> ```

### 🔑 Authentication basic

| Param | value | Type |
| ----- | ----- | ---- |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: userinfo

### Method: GET

> ```
> http://localhost:3000/user/userinfo
> ```

### 🔑 Authentication bearer

| Param | value                                                                                                                                                                            | Type   |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmJkNzFhNzIxMTk3YWNlZmQ4ZTI2ZjYiLCJpYXQiOjE2NTcxOTE1OTEsImV4cCI6MTY1NzE5ODc5MX0.XkWMkP3Detqhq8FMmhhoMYtahQeGxjU4qHfHDlPj_gA | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---

Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
