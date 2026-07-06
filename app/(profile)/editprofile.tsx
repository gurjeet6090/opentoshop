import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfile() {
  const router = useRouter();

  const [name, setName] = useState("Guri Developer");
  const [email, setEmail] = useState("guridev@gmail.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [city, setCity] = useState("Jaipur");
  const [bio, setBio] = useState("Full Stack Developer");

  function saveProfile() {
    console.log({
      name,
      email,
      phone,
      city,
      bio,
    });

    router.back();
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View
        className="pt-16 pb-12 rounded-b-3xl"
        style={{ backgroundColor: Colors.primary }}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-5 top-16"
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        {/* Profile */}
        <View className="items-center">
          <View className="relative">
            <Image
              source={{
                uri: "https://i.imgur.com/0y8Ftya.png",
              }}
              className="w-28 h-28 rounded-full border-4 border-white"
            />

            <TouchableOpacity className="absolute bottom-0 right-0 bg-white p-2 rounded-full">
              <Ionicons name="camera" size={18} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <Text className="text-white text-2xl font-bold mt-4">
            Edit Profile
          </Text>

          <Text className="text-indigo-100">
            Update your personal information
          </Text>
        </View>
      </View>

      {/* Form */}
      <View className="bg-white mx-4 -mt-8 rounded-2xl p-5 shadow">
        <InputField
          icon="person-outline"
          label="Full Name"
          value={name}
          onChangeText={setName}
        />

        <InputField
          icon="mail-outline"
          label="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          icon="call-outline"
          label="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <InputField
          icon="location-outline"
          label="City"
          value={city}
          onChangeText={setCity}
        />

        <InputField
          icon="document-text-outline"
          label="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={4}
        />

        {/* Save Button */}
        <TouchableOpacity
          onPress={saveProfile}
          className="mt-6 rounded-xl py-4 items-center"
          style={{ backgroundColor: Colors.primary }}
        >
          <Text className="text-white font-bold text-lg">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function InputField({
  icon,
  label,
  value,
  onChangeText,
  multiline = false,
  numberOfLines = 1,
  keyboardType = "default",
}: any) {
  return (
    <View className="mb-5">
      <Text className="text-gray-700 mb-2 font-semibold">{label}</Text>

      <View className="flex-row items-center bg-gray-100 rounded-xl px-4">
        <Ionicons name={icon} size={20} color={Colors.primary} />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          className="flex-1 ml-3 py-4 text-gray-800"
          placeholder={label}
          textAlignVertical={multiline ? "top" : "center"}
        />
      </View>
    </View>
  );
}
