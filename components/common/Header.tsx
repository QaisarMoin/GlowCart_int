import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ArrowLeft, Search, Menu } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showMenu?: boolean;
  onBack?: () => void;
  onSearch?: () => void;
  onMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showSearch = false,
  showMenu = false,
  onBack,
  onSearch,
  onMenu,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity style={styles.iconButton} onPress={onBack}>
              <ArrowLeft size={24} color={Colors.text} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerSection}>
          {title && <Text style={styles.title}>{title}</Text>}
        </View>

        <View style={styles.rightSection}>
          {showSearch && (
            <TouchableOpacity style={styles.iconButton} onPress={onSearch}>
              <Search size={24} color={Colors.text} />
            </TouchableOpacity>
          )}
          {showMenu && (
            <TouchableOpacity style={styles.iconButton} onPress={onMenu}>
              <Menu size={24} color={Colors.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
});