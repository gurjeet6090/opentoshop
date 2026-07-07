import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ChangePasswordScreen() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const rules = useMemo(
    () => ({
      min: newPassword.length >= 8,
      upper: /[A-Z]/.test(newPassword),
      lower: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    }),
    [newPassword],
  );

  const score = Object.values(rules).filter(Boolean).length;

  const strength = score <= 2 ? "Weak" : score <= 4 ? "Medium" : "Strong";
  const strengthColor =
    score <= 2 ? "#EF4444" : score <= 4 ? "#F59E0B" : "#22C55E";

  const matched = confirmPassword.length > 0 && newPassword === confirmPassword;

  function updatePassword() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (score < 5) {
      alert("Password doesn't meet all requirements.");
      return;
    }

    if (!matched) {
      alert("Passwords do not match.");
      return;
    }

    alert("Password updated successfully.");
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View
        className="pt-16 pb-8 px-5 rounded-b-[30px]"
        style={{ backgroundColor: Colors.primary }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold mt-4">
          Change Password
        </Text>
        <Text className="text-indigo-100 mt-1">Keep your account secure</Text>
      </View>

      <ScrollView className="px-4 mt-5">
        <PasswordField
          label="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          visible={showCurrent}
          toggle={() => setShowCurrent(!showCurrent)}
        />

        <PasswordField
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          visible={showNew}
          toggle={() => setShowNew(!showNew)}
        />

        <PasswordField
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          visible={showConfirm}
          toggle={() => setShowConfirm(!showConfirm)}
        />

        <View className="bg-white rounded-2xl p-4 mb-5">
          <View className="flex-row justify-between mb-3">
            <Text className="font-semibold">Password Strength</Text>
            <Text style={{ color: strengthColor, fontWeight: "700" }}>
              {strength}
            </Text>
          </View>

          <View className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <View
              style={{
                width: `${score * 20}%`,
                backgroundColor: strengthColor,
                height: "100%",
              }}
            />
          </View>

          <Rule ok={rules.min} text="Minimum 8 characters" />
          <Rule ok={rules.upper} text="One uppercase letter" />
          <Rule ok={rules.lower} text="One lowercase letter" />
          <Rule ok={rules.number} text="One number" />
          <Rule ok={rules.special} text="One special character" />
        </View>
        {confirmPassword.length > 0 && (
          <View className="flex-row items-center mb-5">
            <Ionicons
              name={matched ? "checkmark-circle" : "close-circle"}
              size={18}
              color={matched ? "#22C55E" : "#EF4444"}
            />
            <Text
              className="ml-2"
              style={{ color: matched ? "#16A34A" : "#EF4444" }}
            >
              {matched ? "Passwords match" : "Passwords don't match"}
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={updatePassword}
          className="rounded-2xl py-4 mb-10 items-center"
          style={{ backgroundColor: Colors.primary }}
        >
          <Text className="text-white text-lg font-bold">Update Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function PasswordField({ label, value, onChangeText, visible, toggle }: any) {
  return (
    <View className="bg-white rounded-2xl px-4 mb-5">
      <Text className="mt-4 mb-2 text-gray-700 font-semibold">{label}</Text>

      <View className="flex-row items-center">
        <Ionicons name="lock-closed-outline" size={20} color={Colors.primary} />

        <TextInput
          className="flex-1 ml-3 py-4 text-base text-black"
          placeholder={label}
          placeholderTextColor="#9CA3AF"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={!visible}
          value={value}
          onChangeText={onChangeText}
        />

        <TouchableOpacity onPress={toggle}>
          <Ionicons
            name={visible ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Rule({ ok, text }: { ok: boolean; text: string }) {
  return (
    <View className="flex-row items-center mb-3">
      <Ionicons
        name={ok ? "checkmark-circle" : "ellipse-outline"}
        size={18}
        color={ok ? "#22C55E" : "#9CA3AF"}
      />
      <Text className="ml-3" style={{ color: ok ? "#16A34A" : "#6B7280" }}>
        {text}
      </Text>
    </View>
  );
}
