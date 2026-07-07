// help-support.tsx
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Linking,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const faq = [
  { q: "How do I track my order?", a: "Go to My Orders and open your order." },
  {
    q: "How can I cancel my order?",
    a: "Orders can be cancelled before shipment.",
  },
  { q: "How do I change my password?", a: "Settings > Change Password." },
  { q: "How do I update my address?", a: "Profile > Manage Address." },
  { q: "How do I update my address?", a: "Profile > Manage Address." },
];

export default function HelpSupport() {
  const router = useRouter();
  const [open, setOpen] = useState<number | null>(null);
  const [contactVisible, setContactVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function submit() {
    console.log({ name, email, subject, message });
    setContactVisible(false);
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View
        className="pt-16 pb-8 px-5 rounded-b-[30px]"
        style={{ backgroundColor: Colors.primary }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" color="white" size={26} />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold mt-4">
          Help & Support
        </Text>
        <Text className="text-indigo-100 mt-1">{"We're here to help."}</Text>
      </View>

      <ScrollView className="px-4 mt-5">
        <Text className="text-gray-500 font-semibold mb-3">Quick Actions</Text>

        <View className="flex-row justify-between mb-6">
          <ActionButton
            icon="call-outline"
            title="Call"
            onPress={() => Linking.openURL("tel:+919876543210")}
          />
          <ActionButton
            icon="mail-outline"
            title="Email"
            onPress={() =>
              Linking.openURL("mailto:support@bookstore.com?subject=Support")
            }
          />
          <ActionButton
            icon="document-text-outline"
            title="Contact"
            onPress={() => setContactVisible(true)}
          />
        </View>

        <Text className="text-gray-500 font-semibold mb-3">
          Frequently Asked Questions
        </Text>

        {faq.map((f, i) => (
          <TouchableOpacity
            key={i}
            className="bg-white rounded-2xl p-4 mb-3"
            onPress={() => setOpen(open === i ? null : i)}
          >
            <View className="flex-row justify-between items-center">
              <Text className="font-semibold flex-1 pr-3 text-gray-600">
                {f.q}
              </Text>
              <Ionicons
                name={open === i ? "chevron-up" : "chevron-down"}
                size={20}
              />
            </View>
            {open === i && (
              <Text className="mt-3 text-gray-400 leading-6">{f.a}</Text>
            )}
          </TouchableOpacity>
        ))}

        <View className="bg-white rounded-3xl p-5 mb-10">
          <Text className="text-xl font-bold">Need more help?</Text>
          <Text className="text-gray-500 mt-2">
            Our support team usually replies within 24 hours.
          </Text>
          <TouchableOpacity
            onPress={() => setContactVisible(true)}
            className="rounded-2xl py-4 items-center mt-5"
            style={{ backgroundColor: Colors.primary }}
          >
            <Text className="text-white font-bold">Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal transparent visible={contactVisible} animationType="slide">
        <Pressable
          className="flex-1 bg-black/40 justify-end"
          onPress={() => setContactVisible(false)}
        >
          <Pressable className="bg-white rounded-t-[30px] p-6">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-2xl font-bold">Contact Support</Text>

              <TouchableOpacity
                onPress={() => setContactVisible(false)}
                className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                activeOpacity={0.8}
              >
                <Ionicons name="close" size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Form */}

            <Input
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />

            <Input
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Input
              placeholder="Subject"
              value={subject}
              onChangeText={setSubject}
            />

            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Describe your issue..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              className="bg-gray-100 rounded-2xl px-4 py-4 mt-4 h-36"
            />

            <TouchableOpacity
              onPress={submit}
              className="rounded-2xl py-4 items-center mt-6"
              style={{ backgroundColor: Colors.primary }}
            >
              <Text className="text-white font-bold">Submit Ticket</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function ActionButton({ icon, title, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl py-5 flex-1 mx-1 items-center"
    >
      <Ionicons name={icon} size={28} color={Colors.primary} />
      <Text className="mt-2 font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}

function Input(props: any) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#9CA3AF"
      className="bg-gray-100 rounded-2xl px-4 py-4 mt-4"
    />
  );
}
