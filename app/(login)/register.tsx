import AuthInput from "@/components/AuthInput/AuthInput";
import { getColors } from "@/constants/theme";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Register() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const [loading, setLoading] = useState(false);
  const colors = getColors(isDark);
 

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }} className="justify-center px-6">

      <Text style={{ color: colors.text }} className="text-4xl font-bold">
        Create Account ✨
      </Text>

      <Text style={{ color: colors.sub }} className="mt-2">
        Sign up to get started
      </Text>

      <View
        style={{ backgroundColor: colors.card }}
        className="mt-8 p-6 rounded-3xl shadow-xl"
      >
        <AuthInput icon="person" placeholder="Full Name" colors={colors} />
        <AuthInput icon="mail" placeholder="Email" colors={colors} />
        <AuthInput icon="lock-closed" placeholder="Password" secure colors={colors} />
        <AuthInput icon="shield-checkmark" placeholder="Confirm Password" secure colors={colors} />

        <TouchableOpacity
          onPress={handleRegister}
          className="py-4 rounded-xl mt-6 items-center"
          style={{ backgroundColor: colors.btn }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Register</Text>
          )}
        </TouchableOpacity>
      </View>

      <Link href="/(login)" asChild>
        <TouchableOpacity className="mt-6 items-center">
          <Text style={{ color: colors.sub }}>
            Already have an account?
            <Text style={{ color: colors.btn }} className="font-bold">
              {" "}Login
            </Text>
          </Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}
