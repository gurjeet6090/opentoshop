import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function AuthInput({
  icon,
  placeholder,
  secure,
  colors,
}: {
  icon: any;
  placeholder: string;
  secure?: boolean;
  colors: any;
}) {
  const [hide, setHide] = useState(true);

  return (
    <View
      style={{ backgroundColor: colors.input }}
      className="flex-row items-center rounded-xl px-3 mt-4"
    >
      <Ionicons name={icon} size={20} color={colors.sub} />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.sub}
        secureTextEntry={secure && hide}
        className="flex-1 py-4 px-2"
        style={{ color: colors.text }}
      />

      {secure && (
        <TouchableOpacity onPress={() => setHide(!hide)}>
          <Ionicons
            name={hide ? "eye-off" : "eye"}
            size={20}
            color={colors.sub}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
