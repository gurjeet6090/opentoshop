import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddressForm() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const isEdit = id !== "0";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [type, setType] = useState<"Home" | "Work">("Home");

  useEffect(() => {
    if (!isEdit) return;

    // Replace with API call
    const data = {
      name: "Guri Developer",
      phone: "9876543210",
      address: "221 Sector 15",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302021",
      type: "Home",
    };

    setName(data.name);
    setPhone(data.phone);
    setAddress(data.address);
    setCity(data.city);
    setState(data.state);
    setPincode(data.pincode);
    setType(data.type as "Home" | "Work");
  }, []);

  function saveAddress() {
    const payload = {
      id,
      name,
      phone,
      address,
      city,
      state,
      pincode,
      type,
    };

    console.log(payload);

    Alert.alert("Success", isEdit ? "Address Updated" : "Address Added");

    router.back();
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View
        style={{ backgroundColor: Colors.primary }}
        className="pt-5 pb-8 px-5 rounded-b-3xl flex-row gap-3 items-end justify-start"
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" color="white" size={26} />
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold mt-4">
          {isEdit ? "Edit Address" : "Add Address"}
        </Text>
      </View>

      <View className="p-8">
        <Input label="Full Name" value={name} onChangeText={setName} />
        <Input
          label="Phone Number"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={setPhone}
        />
        <Input
          label="Address"
          value={address}
          multiline
          onChangeText={setAddress}
        />
        <Input label="City" value={city} onChangeText={setCity} />
        <Input label="State" value={state} onChangeText={setState} />
        <Input
          label="Pincode"
          value={pincode}
          keyboardType="number-pad"
          onChangeText={setPincode}
        />

        <Text className="font-semibold mt-4 mb-3">Address Type</Text>

        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => setType("Home")}
            className={`flex-1 rounded-xl p-4 items-center ${
              type === "Home" ? "bg-indigo-600" : "bg-white"
            }`}
          >
            <Text
              className={
                type === "Home" ? "text-white font-bold" : "text-gray-700"
              }
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setType("Work")}
            className={`flex-1 rounded-xl p-4 items-center ${
              type === "Work" ? "bg-indigo-600" : "bg-white"
            }`}
          >
            <Text
              className={
                type === "Work" ? "text-white font-bold" : "text-gray-700"
              }
            >
              Work
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={saveAddress}
          className="mt-8 rounded-xl py-4 items-center"
          style={{ backgroundColor: Colors.primary }}
        >
          <Text className="text-white font-bold text-lg">
            {isEdit ? "Update Address" : "Save Address"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Input(props: any) {
  return (
    <View className="mb-4">
      <Text className="mb-2 font-medium">{props.label}</Text>

      <TextInput
        {...props}
        className="bg-white rounded-xl px-4 py-4"
        textAlignVertical="top"
      />
    </View>
  );
}
