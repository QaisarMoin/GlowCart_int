import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { User2, MapPin, Clock, Globe, Bell, Phone, HelpCircle, FileText, FileCheck2, LogOut, Edit3 } from "lucide-react-native";

const user = {
  name: "Olivia",
  email: "Olivia@gmail.com",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg"
};

export default function ProfileScreen() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.profileRow}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Edit3 size={18} color="#C97B6A" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <ProfileItem icon={<MapPin size={20} color="#C97B6A" />} label="Address" subLabel="Manage your saved address" />
        <ProfileItem icon={<Clock size={20} color="#C97B6A" />} label="Order History" subLabel="View your past orders" />
        <ProfileItem icon={<Globe size={20} color="#C97B6A" />} label="Language" />
        <ProfileItem icon={<Bell size={20} color="#C97B6A" />} label="Notifications" />
      </View>
      <View style={styles.section}>
        <ProfileItem icon={<Phone size={20} color="#C97B6A" />} label="Contact Us" />
        <ProfileItem icon={<HelpCircle size={20} color="#C97B6A" />} label="Get Help" />
        <ProfileItem icon={<FileText size={20} color="#C97B6A" />} label="Privacy Policy" />
        <ProfileItem icon={<FileCheck2 size={20} color="#C97B6A" />} label="Terms and Conditions" />
      </View>
      <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
        <LogOut size={20} color="#C97B6A" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function ProfileItem({ icon, label, subLabel }: { icon: React.ReactNode; label: string; subLabel?: string }) {
  return (
    <View style={styles.itemRow}>
      {icon}
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.itemLabel}>{label}</Text>
        {subLabel && <Text style={styles.itemSubLabel}>{subLabel}</Text>}
      </View>
      <Text style={{ color: '#C97B6A', fontWeight: 'bold', fontSize: 18 }}>{'>'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#FFF8F6',
  },
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  profileCard: {
    backgroundColor: '#F5E3DF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3d2320',
  },
  email: {
    color: '#a97c6c',
    fontSize: 13,
  },
  editBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginLeft: 8,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 8,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5E3DF',
  },
  itemLabel: {
    fontSize: 16,
    color: '#3d2320',
    fontWeight: '500',
  },
  itemSubLabel: {
    fontSize: 12,
    color: '#a97c6c',
    marginTop: 2,
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#C97B6A',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});
