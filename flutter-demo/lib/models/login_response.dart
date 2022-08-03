class LoginResponse {
  final String url;
  final String code;

  LoginResponse({required this.url, required this.code});

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      url: json['url'],
      code: json['code']
    );
  }
}