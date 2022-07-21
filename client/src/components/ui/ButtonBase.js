/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const ButtonBase = ({ title, handlePress, bg, color }) => (
  <TouchableOpacity style={[styles.btn, bg]} onPress={handlePress}>
    <Text style={[styles.title, color]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4
  },
  title: {
    textAlign: "center"
  }
});

export default ButtonBase;
