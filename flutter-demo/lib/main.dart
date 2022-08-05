import 'package:flutter/cupertino.dart';
import 'package:flutter_demo/providers/user_provider.dart';
import 'package:flutter_demo/screens/home_screen.dart';
import 'package:flutter_demo/screens/login.dart';
import 'package:provider/provider.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => User("", "", ""))],
      child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // context.watch<User>().userId == "" ? '/login' : '/',
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      title: 'Flutter Demo',
      initialRoute: '/login',
      routes: {
        '/': (_) => HomeScreen(),
        '/login': (_) => Login(),
      },
    );
  }
}
