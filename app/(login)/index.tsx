import AuthInput from "@/components/AuthInput/AuthInput";
import { getColors } from "@/constants/theme";
import { Link, router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  BackHandler,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
import ExitAlert from "../../components/ExitAlert";

export default function Login() {

    const { t } = useTranslation();

  const scheme = useColorScheme();
  const [showExit, setShowExit] = useState(false);
useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      setShowExit(true);
      return true;
    };

    const sub = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => sub.remove();
  }, [])
);
  const isDark = scheme === "dark";
  const [loading, setLoading] = useState(false);

  const colors = getColors(isDark);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
    // Navigate to the main app after login
    router.replace("/(main)/home");
    //router.push("/(main)/home")
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }} className="justify-center px-6">
      {/* ===== Exit Modal ===== */}
<ExitAlert
  visible={showExit}
  onClose={() => setShowExit(false)}
/>
      <Text style={{ color: colors.text }} className="text-4xl font-bold">
       {t("welcome")} Techbeeps
      </Text>
      <Text style={{ color: colors.sub }} className="mt-2 mb-12 text-lg">
        Login to continue shopping
      </Text>


      <View
        style={{ backgroundColor: colors.card }}
        className="mt-8 p-6 rounded-3xl shadow-xl"
      >
        <AuthInput icon="mail" placeholder="Email" colors={colors} />
        <AuthInput icon="lock-closed" placeholder="Password" secure colors={colors} />

        <TouchableOpacity
          onPress={handleLogin}
          className="py-4 rounded-xl mt-6 items-center"
          style={{ backgroundColor: colors.btn }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Login</Text>
          )}
        </TouchableOpacity>
      </View>

      <Link href="/register" asChild>
        <TouchableOpacity className="mt-6 items-center mb-20">
          <Text style={{ color: colors.sub }}>
            Don’t have an account?
            <Text style={{ color: colors.btn }} className="font-bold">
              {" "}Register
            </Text>
          </Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}
