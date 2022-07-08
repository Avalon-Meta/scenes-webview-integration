import React from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native';
import ButtonBase from '../components/ui/ButtonBase';
import WebApp from '../components/WebApp';

const Home = ({ user, setUser }) => {
  return <WebApp />;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});

export default Home;
