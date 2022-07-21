/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { View, Image, Text } from "react-native";
import ButtonBase from "./ui/ButtonBase";

// eslint-disable-next-line react/prop-types
function Home({ setUser }) {
  return (
    <View>
      <Image
        source={{
          uri: "https://cdn.dribbble.com/users/76454/screenshots/17685328/media/087dd0d6d8b7a65925785b351673752f.png?compress=1&resize=400x300"
        }}
        style={{
          width: 250,
          height: 250,
          alignSelf: "center",
          marginTop: 36
        }}
      />

      <Text style={{ fontSize: 24, textAlign: "center", marginTop: 24 }}>
        Hello There
      </Text>

      <ButtonBase
        handlePress={() => {
          setUser(null);
        }}
        title="Log out"
        bg={{
          backgroundColor: "#ff0000",
          marginTop: 28,
          width: 100,
          alignSelf: "center"
        }}
        color={{ color: "#fff" }}
      />
    </View>
  );
}

export default Home;
