import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      router.replace("/"); // or "/tabs" if that's your home
    } else {
      alert("Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.header}>Hello Again!</Text>
        <Text style={styles.subheader}>Welcome back you’ve been missed.</Text>
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email Id"
          placeholderTextColor="#a97c6c"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#a97c6c"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or Continue With</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}><Text style={styles.socialIcon}>G</Text></TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}><Text style={styles.socialIcon}></Text></TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}><Text style={styles.socialIcon}>f</Text></TouchableOpacity>
        </View>
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Not a Member? </Text>
          <TouchableOpacity onPress={() => router.push("/register")}> 
            <Text style={styles.registerNow}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F6",
    justifyContent: "center",
    alignItems: "center"
  },
  headerBox: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#a97c6c",
    marginBottom: 4
  },
  subheader: {
    color: "#a97c6c",
    fontSize: 15
  },
  inputBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1
  },
  input: {
    backgroundColor: "#f3d6cf",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    color: "#3d2320",
    fontSize: 15
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 18
  },
  forgotPasswordText: {
    color: "#a97c6c",
    fontSize: 13
  },
  loginBtn: {
    backgroundColor: "#C97B6A",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 18
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#f3d6cf"
  },
  orText: {
    marginHorizontal: 8,
    color: "#a97c6c",
    fontSize: 13
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 18
  },
  socialBtn: {
    backgroundColor: "#f3d6cf",
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 8
  },
  socialIcon: {
    fontSize: 18,
    color: "#a97c6c",
    fontWeight: "bold"
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center"
  },
  footerText: {
    color: "#a97c6c",
    fontSize: 13
  },
  registerNow: {
    color: "#C97B6A",
    fontWeight: "bold",
    fontSize: 13
  }
});