/* eslint-disable react/jsx-filename-extension */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";
import { View } from "react-native";
import { URLSearchParams } from "react-native-url-polyfill";

import WebView from "react-native-webview";
import axios from "axios";

const WebViewFlow = ({ route, setUser }) => {
  // const [loading, setLoading] = useState(true);
  // generate a code and send this code to scenes server as code
  const { params } = route;
  const { uri, redirectUrl, communityId } = params;

  const handleCustomSsoLogin = async (loginCode) => {
    try {
      const response = await axios.post(
        `https://scenes-ruby-dev.avalonmeta.com/api/v4/users/oauth/custom_login_app?community_id=${communityId}`,
        {
          access_code: loginCode,
        }
      );

      const { data } = response;
      const { user } = data;

      if (user) {
        console.log("user", user);
        setUser(user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const processWebviewEvent = (event) => {
    if (event.url?.startsWith(redirectUrl)) {
      console.log(event.url);
      // setLoading(true);
      let urlArr = event?.url?.split("callback?");
      if (urlArr?.length < 2) {
        urlArr = event?.url?.split("callback#");
      }

      console.log(urlArr);

      const searchParams = new URLSearchParams(urlArr[1]);

      const code = searchParams.get("code");
      const access_token = searchParams.get("access_token");
      console.log("code", code);

      handleCustomSsoLogin(code || access_token);
      return false;
    }

    return true;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <WebView
        androidHardwareAccelerationDisabled
        source={{ uri }}
        onShouldStartLoadWithRequest={processWebviewEvent}
        // onLoadEnd={() => setLoading(false)}
        // onLoadStart={() => setLoading(true)}
      />
    </View>
  );
};

export default WebViewFlow;
