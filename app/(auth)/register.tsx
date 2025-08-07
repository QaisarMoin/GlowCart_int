import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.header}>Join The Glow!</Text>
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#a97c6c"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#a97c6c"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createBtnText}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already a Member? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}> 
            <Text style={styles.loginNow}>Log In</Text>
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
  createBtn: {
    backgroundColor: "#C97B6A",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 18
  },
  createBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center"
  },
  footerText: {
    color: "#a97c6c",
    fontSize: 13
  },
  loginNow: {
    color: "#C97B6A",
    fontWeight: "bold",
    fontSize: 13
  }
});