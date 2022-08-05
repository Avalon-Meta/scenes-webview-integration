import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter_demo/constants.dart';
import 'package:flutter_demo/storage.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:webview_cookie_manager/webview_cookie_manager.dart';
import 'package:webview_flutter/webview_flutter.dart';

class Community extends StatefulWidget {
  Community({Key? key}) : super(key: key);

  @override
  State<Community> createState() => _Community();
}

class _Community extends State<Community> {
  // late Future<WebViewCookie> scenesCookie;
  late Future<String?> url;
  // final cookieManager = WebviewCookieManager();
  //
  // Future<WebViewCookie> constructScenesCookie() async {
  //   String? token = await SecureStorage.readData("token");
  //   String? refreshToken = await SecureStorage.readData("refreshToken");
  //   String? userId = await SecureStorage.readData("userId");
  //
  //   final String cookieString = '{"token":"$token","refreshToken":"$refreshToken","userId":"$userId"}';
  //   print(cookieString);
  //   return WebViewCookie(
  //     name: 'custom-login-auth',
  //     value: cookieString,
  //     domain: 'edit-with-rahul-community.avalonmeta.com',
  //   );
  // }

  Future<String?> setUrl() async {
    return await SecureStorage.readData("url");
  }

  void getCookies() async {
    final wcm = WebviewCookieManager();
    var cookies = await wcm.getCookies(Constants().communityDomain);
    print(cookies);
  }

  void getPermissions() async {
    await Permission.camera.request();
    await Permission.microphone.request();
  }

  @override
  void initState() {
    super.initState();
    // scenesCookie = constructScenesCookie();
    // setScenesCookie();
    url = setUrl();
    getPermissions();
  }

  @override
  Widget build(BuildContext context) {
    return InAppWebView(
      initialUrlRequest: URLRequest(
          url: Uri.parse("https://edit-with-rahul-community.avalonmeta.com")),
    );
    // return FutureBuilder<String?>(
    //     future: url,
    //     builder: (context, snapshot) {
    //       if (snapshot.hasData) {
    //         return InAppWebView(
    //           initialUrlRequest: URLRequest(url: Uri.parse(snapshot.data!)),
    //         );
    //       } else if (snapshot.hasError) {
    //         return Text("Error Loading Community");
    //       }

    //       return CupertinoActivityIndicator();
    //     });
  }
}
