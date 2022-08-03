import 'package:flutter/cupertino.dart';
import 'package:flutter_demo/constants.dart';
import 'package:flutter_demo/storage.dart';
// import 'package:webview_cookie_manager/webview_cookie_manager.dart';
import 'package:webview_flutter/webview_flutter.dart';

class Community extends StatefulWidget {
  Community({Key? key}) : super(key: key);

  @override
  State<Community> createState() => _Community();
}

class _Community extends State<Community> {
  // late Future<WebViewCookie> scenesCookie;
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

  // void setScenesCookie() async {

  //
  //   String cookieString = '{%22token%22:%22eyJhbGciOiJSUzI1NiJ9.eyJ1dWlkIjoiOTI0YTYwZDItMGZmNS00NjJhLTlmM2QtYmY1ODJhMzc5M2NlIiwianRpIjoiYjAwYmE3Y2QwYmU1MDY1OWIzNDY0YzBkN2JhOTBjMmUyMzlmMjU4YmYzYzRkN2VmOTcwMGRhYzRmODhlNWNjMyIsImlhdCI6MTY1OTM4MjE2NiwiZXhwIjoxNjU5NDY4NTY2LCJuYmYiOjE2NTkzODIxNjYsImF1ZCI6WyJVc2VyIl0sImlzcyI6InNjZW5lcy1ydWJ5LXN0YWdpbmcuYXZhbG9ubWV0YS5jb20ifQ.KmMaGnJOTFpE_QJZSvQvIbqBYuE2341s99Lp5A5mXPCA3ci7Yw4d7s9EfElToG-KrNVFkqD5Oc5D4CYfxu2AGB5ZSRhk-RPbzvrXmNwcST5Id42k8vCICrftzpXs8xFfhdANnJwfP3KrZPTkPaJaojWPUweHCSUHp9NctYdQihr9WSncxwRqeiVTJd0tiJFKni-PLPH5tYFmhzflhUOBPI_ff6pEH2FQVicErKBFKudUAdNY2SQ7GIJm7Ayx-30vPuIR7CUrYS22ublK2VulNVJ0F_YN3GH7-c2tlFqibYVsVL-KvcYNgdWymQXElyqRFMzTVc8UFdcMB02KmlpV9A%22%2C%22refreshToken%22:%22a32a05dc1d349840116283aefbda201a994341b19c235d5b7c29890831f1d324%22%2C%22userId%22:%226448%22}';
  //
  //   print(cookieString);
  //   await cookieManager.setCookie(
  //     name: "custom-login-auth",
  //     value: cookieString,
  //     domain: 'edit-with-rahul-community.avalonmeta.com',
  //     url: Uri.parse(Constants().communityDomain),
  //   );
  //   final gotCookies = await cookieManager.getCookies(Constants().communityDomain);
  //   for (var item in gotCookies) {
  //     print(item);
  //   }

  // }

  @override
  void initState() {
    super.initState();
    // scenesCookie = constructScenesCookie();
    // setScenesCookie();
  }

  @override
  Widget build(BuildContext context) {
    return WebView(
      initialUrl: Constants().communityUrl,
      javascriptMode: JavascriptMode.unrestricted,
    );
    //   return FutureBuilder<WebViewCookie>(
    //       future: scenesCookie,
    //       builder: (context, snapshot) {
    //         if (snapshot.hasData) {
    //           print(snapshot.data);
    //           return WebView(
    //             initialUrl: Constants().communityDomain,
    //             initialCookies: [snapshot.data!],
    //             javascriptMode: JavascriptMode.unrestricted,
    //             onPageFinished: (context) {
    //               setScenesCookie();
    //             },
    //           );
    //         } else if (snapshot.hasError) {
    //           return Text("Error Loading Community");
    //         }
    //
    //         return CupertinoActivityIndicator();
    //       });
    //
  }
}
