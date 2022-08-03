class ScenesResponse {
  final String token;
  final String refreshToken;
  final String userId;

  ScenesResponse(
      {required this.token, required this.refreshToken, required this.userId});

  factory ScenesResponse.fromJson(Map<String, dynamic> json) {
    return ScenesResponse(
        token: json['token'],
        refreshToken: json['refresh_token']['crypted_token'],
        userId: json['user']['data']['id']);
  }
}
