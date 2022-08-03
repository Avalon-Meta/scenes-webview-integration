import 'package:flutter/cupertino.dart';
import 'package:flutter_demo/components/community.dart';
import 'package:flutter_demo/components/home.dart';

class _TabInfo {
  const _TabInfo(this.title, this.icon);

  final String title;
  final IconData icon;
}

class HomeScreen extends StatelessWidget {
  HomeScreen({Key? key}) : super(key: key);

  final tabInfo = [
    _TabInfo(
      'Home',
      CupertinoIcons.home,
    ),
    _TabInfo(
      'Community',
      CupertinoIcons.conversation_bubble,
    )
  ];

  @override
  Widget build(BuildContext context) {
    return CupertinoTabScaffold(
        tabBar: CupertinoTabBar(
          items: [
            for (final tabInfo in tabInfo)
              BottomNavigationBarItem(
                label: tabInfo.title,
                icon: Icon(tabInfo.icon),
              ),
          ],
        ),
        tabBuilder: (context, index) {
          return CupertinoTabView(
            restorationScopeId: 'cupertino_tab_view_$index',
            builder: (context) => _CupertinoDemoTab(
              title: tabInfo[index].title,
              icon: tabInfo[index].icon,
            ),
            defaultTitle: tabInfo[index].title,
          );
        });
  }
}

Widget _buildComponents(String title) {
  switch (title) {
    case "Home":
      return Home();
    case "Community":
      return Community();
  }

  return Text("hello");
}

class _CupertinoDemoTab extends StatelessWidget {
  const _CupertinoDemoTab({
    Key? key,
    required this.title,
    required this.icon,
  }) : super(key: key);

  final String title;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: CupertinoColors.systemBackground,
      child: SafeArea(child: _buildComponents(title)),
    );
  }
}
