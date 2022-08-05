import 'dart:convert';
import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter_demo/constants.dart';
import 'package:flutter_demo/models/login_response.dart';
import 'package:flutter_demo/models/scenes_response.dart';
import 'package:http/http.dart' as http;
import 'package:webview_cookie_manager/webview_cookie_manager.dart';
import 'package:webview_flutter/platform_interface.dart';
import 'package:webview_flutter/webview_flutter.dart';
import '../storage.dart';

class Login extends StatelessWidget {
  Login({Key? key}) : super(key: key);

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final clientId = "IQkCIOqm55bljU5c";
  final redirectUri =
      "https://edit-with-rahul-community.avalonmeta.com/oauth2/callback";
  final communityId = "61";

  // final cookieManager = WebviewCookieManager();

  Future<ScenesResponse> getScenesToken(String code) async {
    const String v4 =
        'https://scenes-ruby-staging.avalonmeta.com/api/v4/users/oauth/custom_login_app?community_id=61';
    final response = await http.post(
      Uri.parse(v4),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'access_code': code,
      }),
    );

    if (response.statusCode == 201) {
      // If the server did return a 200 CREATED response,
      // then parse the JSON.

      return ScenesResponse.fromJson(jsonDecode(response.body));
    } else {
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
      throw Exception('Failed to login.');
    }
  }

  Future<LoginResponse> getUrlAfterLogin() async {
    final String url =
        'https://custom-sso.herokuapp.com/auth/login?client_id=$clientId&redirect_uri=$redirectUri&response_type=code';

    print(url);

    final response = await http.post(
      Uri.parse(url),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': _emailController.text,
        'password': _passwordController.text
      }),
    );

    if (response.statusCode == 200) {
      // If the server did return a 200 CREATED response,
      // then parse the JSON.
      return LoginResponse.fromJson(jsonDecode(response.body));
    } else {
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
      throw Exception('Failed to login.');
    }
  }

  void handleLogin(context) async {
    print(_emailController.text);
    print(_passwordController.text);
    // get your app token from api call and store it for user persistence
    LoginResponse loginResponse = await getUrlAfterLogin();
    print(loginResponse.code);
    // ScenesResponse scenesResponse = await getScenesToken(loginResponse.code);
    // List<Cookie> cookies;
    // final String cookieString =
    //     '{%22token%22:%22${scenesResponse.token}%22%2C%22refreshToken%22:%22${scenesResponse.refreshToken}%22%2C%22userId%22:%22${scenesResponse.userId}%22}';

    // final _cookieManager = CookieManager();
    // final _wkWebViewCookieManager = WKWebViewCookieManager();

    // WebViewCookie cookie = WebViewCookie(
    //     name: 'custom-login-auth',
    //     value: cookieString,
    //     domain: Constants().communityDomain,
    //     path: '/');

    // await _cookieManager.setCookie(cookie);
    // await _wkWebViewCookieManager.setCookie(cookie);
    // final webViewCookieManager = WebviewCookieManager();
    //
    // await webViewCookieManager.setCookies([
    //   Cookie('custom-login-auth', cookieString)
    //     ..path = '/'
    //     ..domain = Constants().communityDomain
    // ]);

    // await SecureStorage.saveData("token", scenesResponse.token);
    // await SecureStorage.saveData("refreshToken", scenesResponse.refreshToken);
    // await SecureStorage.saveData("userId", scenesResponse.userId);
    await SecureStorage.saveData("url", loginResponse.url);

    Navigator.pushNamed(context, '/');
  }

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    _emailController.dispose();
    _passwordController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(
        automaticallyImplyLeading: false,
        middle: Text("login"),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(6),
          child: Column(
            children: [
              const Text('email'),
              Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  child: CupertinoTextField(
                    keyboardType: TextInputType.emailAddress,
                    controller: _emailController,
                  )),
              const Text('password'),
              Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  child: CupertinoTextField(
                    obscureText: true,
                    controller: _passwordController,
                  )),
              CupertinoButton(
                  onPressed: () => handleLogin(context),
                  child: const Text("Login"))
            ],
          ),
        ),
      ),
    );
  }
}
