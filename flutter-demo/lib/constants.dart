class Constants {
  final String communityDomain = 'edit-with-rahul-community.avalonmeta.com/';
  final String communityUrl = 'https://edit-with-rahul-community.avalonmeta.com/';

  static final Constants _secureStorage = Constants._internal();

  factory Constants() {
    return _secureStorage;
  }

  Constants._internal();
}