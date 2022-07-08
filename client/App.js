import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ButtonBase from './src/components/ui/ButtonBase';
import WebApp from './src/components/WebApp';
import Home from './src/screens/Home';
import Login from './src/screens/Login';

const App = () => {
  const [user, setUser] = useState(null);
  if (user) {
    return <WebApp />;
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Login setUser={setUser} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default App;
