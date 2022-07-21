/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable no-return-assign */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  PermissionsAndroid,
  Linking,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { WebView } from "react-native-webview";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import { URL } from "react-native-url-polyfill";
import Colors from "../constants/Colors";
import { FLOW, REDIRECT_URI } from "../constants/Config";

const WebApp = ({ flow }) => {
  const [url, setUrl] = useState();

  const activeCommunity = {
    customSSO: {
      callbackURL: REDIRECT_URI
    }
  };

  const [allowWebView, setAllowWebView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isWebViewLoading, setIsWebViewLoading] = useState(true);

  const WebViewRef = useRef(null);

  useEffect(() => {
    checkForPermissions();
  }, []);

  useEffect(() => {
    if (flow === FLOW.WEBVIEW) {
      const newUrl = new URL(REDIRECT_URI);
      setUrl(newUrl.hostname);
    } else {
      let newURL;
      const getCode = async () => {
        newURL = await AsyncStorage.getItem("url");
        if (activeCommunity?.customSSO?.callbackURL) {
          setUrl(newURL);
        }

        console.log("Native Flow triggered", "url", newURL);
      };

      getCode();
    }
  }, [activeCommunity?.custom_sso]);

  const checkForPermissions = async () => {
    const toRenderWebView = await canOpenWebView();
    if (toRenderWebView) {
      setAllowWebView(true);
    }
    setLoading(false);
  };

  const canOpenWebView = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        ]);
        if (
          granted["android.permission.RECORD_AUDIO"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.CAMERA"] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          return true;
        }

        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  };

  const reloadWebView = () => {
    if (WebViewRef?.current?.reload) {
      WebViewRef.current.reload();
    }
  };

  const goToSettings = () => {
    Linking.openSettings();
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size="large" color="#5bc388" />
      </View>
    );
  }

  if (!allowWebView) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{ textAlign: "center", fontSize: 18, paddingHorizontal: 10 }}
        >
          Grant microphone and camera permission to app to access community
          webview
        </Text>
        <Pressable
          onPress={goToSettings}
          style={{
            backgroundColor: "#585ada",
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 12,
            marginTop: 8
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Go To Settings</Text>
        </Pressable>
      </View>
    );
  }

  if (url) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ alignItems: "flex-end", backgroundColor: Colors.white }}>
          <Pressable onPress={reloadWebView} style={{ width: 38, padding: 5 }}>
            <MaterialIcons name="refresh" size={24} color={Colors.dark2} />
          </Pressable>
        </View>
        <WebView
          ref={WebViewRef}
          style={{ flex: 1 }}
          source={{
            uri: url
          }}
          onLoad={() => setIsWebViewLoading(false)}
        />
        {isWebViewLoading && (
          <ActivityIndicator
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }}
            size="large"
            color="#5bc388"
          />
        )}
      </SafeAreaView>
    );
  }

  return null;
};

export default WebApp;
