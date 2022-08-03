
import 'package:flutter/cupertino.dart';

class User with ChangeNotifier {
  String _firstName = "";
  String _lastName = "";
  String _userId = "";

  User(firstName, lastName, userId) {
    _firstName = firstName;
    _lastName = lastName;
    _userId = userId;
  }

  String get firstName => _firstName;
  String get lastName => _lastName;
  String get userId => _userId;
}