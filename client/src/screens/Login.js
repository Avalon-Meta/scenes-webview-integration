import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import ButtonBase from '../components/ui/ButtonBase';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log(email, password);
    const clientID = 'fasdlfdhsldfkdflss13jf';
    const redirectURI = 'https://edit-with-rahul-community.avalonmeta.com/oauth2/callback';
    try {
      console.log(
        `http://10.0.2.2:3000/auth/login?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code`
      );
      let res = await fetch(
        `http://10.0.2.2:3000/auth/login?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (res.status === 200) {
        const { code } = await res.json();
        console.log(code);
        await AsyncStorage.setItem('code', code);
        setUser({ name: 'dummy' });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View sytle={styles.container}>
      <View style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 12 }}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1536051424396-06f39b8fa1b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
          }}
          style={styles.image}
        />
      </View>

      <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 12 }}> Welcome Back </Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Enter your email</Text>
        <TextInput style={styles.input} onChangeText={setEmail} autoCapitalize={false} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Enter your Password</Text>
        <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry />
      </View>
      <ButtonBase
        handlePress={handleLogin}
        title="Login"
        bg={{ backgroundColor: '#1a1a1a', marginTop: 28 }}
        color={{ color: '#fff' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  formGroup: { marginTop: 8 },
  label: {
    fontSize: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  input: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#777',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});

export default Login;
