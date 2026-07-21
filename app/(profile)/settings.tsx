import { Colors } from "@/constants/theme";
import { getPushToken } from "@/services/NotificationService";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LANGUAGES = [
  "English",
  "हिन्दी",
  "ਪੰਜਾਬੀ",
  "ગુજરાતી",
  "বাংলা",
  "தமிழ்",
  "తెలుగు",
  "മലയാളം",
  "ಕನ್ನಡ",
];

export default function SettingsScreen() {
  const router = useRouter();

  const [pushNotification, setPushNotification] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [language, setLanguage] = useState("English");
  const [languageVisible, setLanguageVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [token, settoken] = useState("");

  useEffect(() => {
    async function getdata() {
      const data = await getPushToken();

      settoken(data);
    }
    getdata();
  }, []);

  return (
    <View className="flex-1 bg-gray-100">
      <View
        style={{ backgroundColor: Colors.primary }}
        className="pt-16 pb-8 px-5 rounded-b-[30px]"
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold mt-4">Settings</Text>
        <Text className="text-indigo-100 mt-1">Customize your experience</Text>
      </View>

      <ScrollView className="px-4 mt-5">
        <Section title="Account">
          <MenuItem
            icon="person-outline"
            title="Edit Profile"
            onPress={() => {
              router.push("/editprofile");
            }}
          />

          <MenuItem
            icon="lock-closed-outline"
            title="Change Password"
            onPress={() => {
              router.push("/changepassword");
            }}
          />
        </Section>

        <Section title="Notifications">
          <SwitchItem
            icon="notifications-outline"
            title="Push Notifications"
            value={pushNotification}
            onValueChange={setPushNotification}
          />
        </Section>

        <Section title="Appearance">
          <SwitchItem
            icon="moon-outline"
            title="Dark Mode"
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <MenuItem
            icon="language-outline"
            title="Language"
            value={language}
            onPress={() => setLanguageVisible(true)}
          />
        </Section>

        <Section title="Privacy">
          <MenuItem icon="shield-checkmark-outline" title="Privacy Policy" />
          <MenuItem icon="document-text-outline" title="Terms & Conditions" />
        </Section>

        <Section title="About">
          <MenuItem
            icon="information-circle-outline"
            title="About App"
            onPress={() => setAboutVisible(true)}
          />
        </Section>

        <TouchableOpacity className="bg-red-500 rounded-2xl py-4 items-center my-8">
          <Text className="text-white font-bold text-lg">Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={languageVisible} transparent animationType="slide">
        <Pressable
          className="flex-1 bg-black/40 justify-end"
          onPress={() => setLanguageVisible(false)}
        >
          <Pressable className="bg-white rounded-t-3xl p-6">
            <Text className="text-xl font-bold mb-5">Select Language</Text>
            {LANGUAGES.map((item) => (
              <TouchableOpacity
                key={item}
                className="flex-row justify-between py-4 border-b border-gray-100"
                onPress={() => {
                  setLanguage(item);
                  setLanguageVisible(false);
                }}
              >
                <Text className="text-base">{item}</Text>
                {language === item && (
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color={Colors.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={aboutVisible} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/40 justify-center items-center"
          onPress={() => setAboutVisible(false)}
        >
          <Pressable className="bg-white w-[90%] rounded-3xl p-6">
            <Ionicons
              name="book"
              size={60}
              color={Colors.primary}
              style={{ alignSelf: "center" }}
            />
            <Text className="text-center text-2xl font-bold mt-3">
              OpenToShop
            </Text>

            <Text className="text-center text-gray-500 mt-4">
              Discover, purchase and read your favourite products anytime.
            </Text>

            <Text>{token}</Text>

            <AboutRow
              icon="phone-portrait-outline"
              title="Version"
              value="1.0.0"
            />
            <AboutRow
              icon="globe-outline"
              title="Website"
              value="www.bookstore.com"
            />
            <AboutRow icon="star-outline" title="Rate App" value="5.0" />

            <TouchableOpacity
              onPress={() => setAboutVisible(false)}
              className="rounded-xl py-4 mt-5 items-center"
              style={{ backgroundColor: Colors.primary }}
            >
              <Text className="text-white font-bold">Close</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-6">
      <Text className="text-gray-500 font-semibold mb-3 ml-2">{title}</Text>
      <View className="bg-white rounded-3xl overflow-hidden">{children}</View>
    </View>
  );
}

function MenuItem({ icon, title, value, onPress, hideArrow = false }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100"
    >
      <View className="flex-row items-center flex-1">
        <Ionicons name={icon} size={22} color={Colors.primary} />
        <Text className="ml-4 text-base font-medium">{title}</Text>
      </View>
      <View className="flex-row items-center">
        {value && <Text className="text-gray-400 mr-2">{value}</Text>}
        {!hideArrow && (
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        )}
      </View>
    </TouchableOpacity>
  );
}

function SwitchItem({ icon, title, value, onValueChange }: any) {
  return (
    <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
      <View className="flex-row items-center">
        <Ionicons name={icon} size={22} color={Colors.primary} />
        <Text className="ml-4 text-base font-medium">{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D1D5DB", true: Colors.primary }}
      />
    </View>
  );
}

function AboutRow({ icon, title, value }: any) {
  return (
    <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100">
      <Ionicons name={icon} size={20} color={Colors.primary} />
      <Text className="ml-4 text-base">{title}:</Text>
      {value && <Text className="ml-2 text-gray-400 ">{value}</Text>}
    </TouchableOpacity>
  );
}
