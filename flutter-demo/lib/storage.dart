import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
  // Create an instance and enable secure encryption:
  static final SecureStorage _secureStorage = SecureStorage._internal();

  factory SecureStorage() {
    return _secureStorage;
  }

  SecureStorage._internal();

  static const _storage = FlutterSecureStorage(
      aOptions: AndroidOptions(encryptedSharedPreferences: true));

  static Future<void> saveData(String key, String value) async {
    await _storage.write(key: key, value: value);
  }

  static Future<String?> readData(String key) async {
    return await _storage.read(key: key);
  }

  static Future<Map<String, String>> readAllData(String key) async {
    return await _storage.readAll();
  }

  static Future<bool> containsData(String key) async {
    return await _storage.containsKey(key: key);
  }

  static Future<void> deleteData(String key) async {
    await _storage.delete(key: key);
  }

  static Future<void> deleteAllData() async {
    await _storage.deleteAll();
  }
}
