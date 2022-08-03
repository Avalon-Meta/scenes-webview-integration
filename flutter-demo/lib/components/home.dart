import 'package:flutter/cupertino.dart';

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Center(child: Text("Hello there")),
        CupertinoButton(child: Text("Log out"), onPressed: () {})
      ],
      mainAxisAlignment: MainAxisAlignment.center,
    );
  }
}
