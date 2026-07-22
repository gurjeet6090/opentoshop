import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    ScrollView as ScrollViewType,
    Text,
    TextInput,
    TextInput as TextInputType,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

// Types
interface Address {
  id: number;
  label: string;
  name: string;
  phone: string;
  address: string;
}

interface Coupon {
  discount: number;
  description: string;
}

interface AppliedCoupon {
  code: string;
  discount: number;
  description: string;
}

interface NewAddress {
  label: string;
  name: string;
  phone: string;
  address: string;
}

const addresses: Address[] = [
  {
    id: 1,
    label: "Home",
    name: "John Doe",
    phone: "+91 9876543210",
    address: "221B Baker Street, London",
  },
  {
    id: 2,
    label: "Office",
    name: "John Doe",
    phone: "+91 9876500000",
    address: "Business Park, London",
  },
  {
    id: 3,
    label: "Parents",
    name: "Jane Doe",
    phone: "+91 9000000000",
    address: "Oxford Street, London",
  },
];

const availableCoupons: Record<string, Coupon> = {
  SAVE10: { discount: 10, description: "10% off on total order" },
  SAVE20: { discount: 20, description: "20% off on total order" },
  WELCOME: { discount: 15, description: "15% off for new users" },
  FLAT50: { discount: 50, description: "Flat $50 off on orders above $200" },
};

type PaymentMethod = "cod" | "card" | "upi";

export default function CheckoutScreen() {
  const [selected, setSelected] = useState<Address>(addresses[0]);
  const [show, setShow] = useState<boolean>(false);
  const [showAddAddress, setShowAddAddress] = useState<boolean>(false);
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null,
  );

  const scrollViewRef = useRef<ScrollViewType | null>(null);
  const nameInputRef = useRef<TextInputType | null>(null);
  const phoneInputRef = useRef<TextInputType | null>(null);
  const addressInputRef = useRef<TextInputType | null>(null);

  const [newAddress, setNewAddress] = useState<NewAddress>({
    label: "",
    name: "",
    phone: "",
    address: "",
  });

  const pay: [PaymentMethod, string, string][] = [
    ["cod", "Cash on Delivery", "cash-outline"],
    ["card", "Card", "card-outline"],
    ["upi", "UPI", "phone-portrait-outline"],
  ];

  const subtotal: number = 258;
  const shipping: number = 0;
  const discount: number = appliedCoupon
    ? Math.round(subtotal * (appliedCoupon.discount / 100))
    : 0;
  const total: number = subtotal + shipping - discount;

  const handleAddAddress = (): void => {
    if (
      !newAddress.label ||
      !newAddress.name ||
      !newAddress.phone ||
      !newAddress.address
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const newAddr: Address = {
      id: addresses.length + 1,
      ...newAddress,
    };
    addresses.push(newAddr);
    setSelected(newAddr);
    setShowAddAddress(false);
    setNewAddress({ label: "", name: "", phone: "", address: "" });
    Alert.alert("Success", "Address added successfully!");
  };

  const handleApplyCoupon = (): void => {
    const coupon: string = couponCode.toUpperCase().trim();
    if (!coupon) {
      Alert.alert("Error", "Please enter a coupon code");
      return;
    }
    if (availableCoupons[coupon]) {
      setAppliedCoupon({
        code: coupon,
        ...availableCoupons[coupon],
      });
      setCouponCode("");
      Alert.alert(
        "Success",
        `🎉 Coupon applied! ${availableCoupons[coupon].description}`,
      );
    } else {
      Alert.alert("Invalid Coupon", "Please enter a valid coupon code");
    }
  };

  const handleRemoveCoupon = (): void => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  // Focus handlers with scroll
  const focusNameInput = (): void => {
    nameInputRef.current?.focus();
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 200, animated: true });
    }, 100);
  };

  const focusPhoneInput = (): void => {
    phoneInputRef.current?.focus();
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 350, animated: true });
    }, 100);
  };

  const focusAddressInput = (): void => {
    addressInputRef.current?.focus();
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 500, animated: true });
    }, 100);
  };

  return (
    <View className=" bg-slate-100">
      <Text className="text-3xl font-bold p-4 text-slate-800 bg-white">
        Checkout
      </Text>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 160,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Delivery Address Section */}
        <View className="bg-white rounded-3xl p-5 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-2xl bg-indigo-100 items-center justify-center">
                <Ionicons name="location" size={22} color={Colors.primary} />
              </View>
              <Text className="ml-3 text-lg font-bold">Delivery Address</Text>
            </View>
            <TouchableOpacity
              onPress={() => setShow(true)}
              className="bg-indigo-50 px-4 py-2 rounded-full"
            >
              <Text
                className=" font-bold text-sm "
                style={{ color: Colors.primary }}
              >
                Change
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mt-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <View className="flex-row items-center">
              <View className="bg-indigo-100 px-3 py-1 rounded-full">
                <Text
                  className="font-bold text-xs"
                  style={{ color: Colors.primary }}
                >
                  {selected.label}
                </Text>
              </View>
              <Text className="font-bold ml-2">{selected.name}</Text>
            </View>
            <Text className="text-slate-500 mt-1">{selected.phone}</Text>
            <Text className="text-slate-600 mt-2 leading-5">
              {selected.address}
            </Text>
          </View>
        </View>

        {/* Items Section */}
        <View className="bg-white rounded-3xl p-5 mb-4 shadow-sm">
          <Text className="text-lg font-bold mb-4">Items</Text>
          {[1, 2].map((i: number) => (
            <View key={i} className="flex-row mb-4 last:mb-1">
              <Image
                source={{ uri: "https://dummyjson.com/image/150" }}
                className="w-[45px] h-[45spx] rounded-xl bg-slate-200"
              />
              <View className="flex-1 ml-3 justify-center">
                <Text className="font-semibold text-slate-800">
                  Premium Sneakers
                </Text>
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-slate-500 text-sm">Qty 1 </Text>
                  <Text
                    className=" font-bold mt-1"
                    style={{ color: Colors.primary }}
                  >
                    $129
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Payment Section */}
        <View className="bg-white rounded-3xl p-5 mb-4 shadow-sm">
          <Text className="text-lg font-bold mb-3">Payment Method</Text>
          {pay.map(([id, title, icon]: [PaymentMethod, string, string]) => (
            <TouchableOpacity
              key={id}
              onPress={() => setPayment(id)}
              className="flex-row justify-between items-center py-3 border-b border-slate-50 last:border-0"
            >
              <View className="flex-row items-center">
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center ${
                    payment === id ? "bg-indigo-100" : "bg-slate-100"
                  }`}
                >
                  <Ionicons
                    name={icon as any}
                    size={20}
                    color={payment === id ? Colors.primary : "#64748b"}
                  />
                </View>
                <Text
                  className={`ml-3 ${
                    payment === id
                      ? "font-semibold text-slate-800"
                      : "text-slate-600"
                  }`}
                >
                  {title}
                </Text>
              </View>
              <Ionicons
                name={payment === id ? "radio-button-on" : "radio-button-off"}
                size={22}
                color={Colors.primary}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Coupon Section */}
        <View className="bg-white rounded-3xl p-5 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <Ionicons
              name="pricetag-outline"
              size={22}
              color={Colors.primary}
            />
            <Text className="text-lg font-bold ml-2">Apply Coupon</Text>
          </View>

          {appliedCoupon ? (
            <View className="bg-green-50 rounded-2xl p-4 border border-green-200">
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#16a34a"
                    />
                    <Text className="text-green-700 font-bold ml-1">
                      {appliedCoupon.code}
                    </Text>
                  </View>
                  <Text className="text-green-600 text-sm mt-1">
                    {appliedCoupon.description} • Saved ${discount}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleRemoveCoupon}
                  className="bg-green-200 p-2 rounded-full"
                >
                  <Ionicons name="close" size={18} color="#16a34a" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className="flex-row items-center space-x-2">
              <View className="flex-1 bg-slate-50 rounded-2xl border border-slate-200">
                <TextInput
                  className="p-3 text-slate-800"
                  placeholder="Enter coupon code"
                  placeholderTextColor="#94a3b8"
                  value={couponCode}
                  onChangeText={setCouponCode}
                  autoCapitalize="characters"
                  returnKeyType="done"
                  onSubmitEditing={handleApplyCoupon}
                />
              </View>
              <TouchableOpacity
                onPress={handleApplyCoupon}
                className=" px-6 py-3 rounded-2xl"
                activeOpacity={0.8}
                style={{ backgroundColor: Colors.primary }}
              >
                <Text className="text-white font-bold">Apply</Text>
              </TouchableOpacity>
            </View>
          )}

          {!appliedCoupon && (
            <View className="mt-3">
              <Text className="text-slate-500 text-xs mb-2">
                Available coupons:
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row"
              >
                {Object.entries(availableCoupons).map(
                  ([code]: [string, Coupon]) => (
                    <TouchableOpacity
                      key={code}
                      onPress={() => setCouponCode(code)}
                      className="bg-slate-50 px-3 py-1.5 rounded-full mr-2 border border-slate-200"
                    >
                      <Text
                        className="text-xs font-semibold "
                        style={{ color: Colors.primary }}
                      >
                        {code}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Summary Section */}
        <View className="bg-white rounded-3xl p-5 shadow-sm">
          <Text className="text-lg font-bold mb-3">Order Summary</Text>
          {(
            [
              ["Subtotal", `$${subtotal}`],
              ["Shipping", shipping === 0 ? "Free" : `$${shipping}`],
              ...(appliedCoupon ? [["Discount", `-$${discount}`]] : []),
            ] as [string, string][]
          ).map(([label, value]) => (
            <View key={label} className="flex-row justify-between py-1.5">
              <Text className="text-slate-600">{label}</Text>
              <Text
                className={
                  label === "Discount" ? "text-green-600" : "text-slate-800"
                }
              >
                {value}
              </Text>
            </View>
          ))}
          <View className="border-t border-slate-200 my-3" />
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-lg text-slate-800">Total</Text>
            <Text
              className="font-bold text-2xl"
              style={{ color: Colors.primary }}
            >
              ${total}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View className="absolute bottom-[60px] left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg">
        <TouchableOpacity
          className=" rounded-2xl py-4 items-center active:bg-indigo-700"
          style={{ backgroundColor: Colors.primary }}
          activeOpacity={0.9}
        >
          <Text className="text-white font-bold text-lg">
            Place Order • ${total}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Address Selection Modal */}
      <Modal visible={show} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => setShow(false)}>
          <View className="flex-1 bg-black/35 justify-end">
            <TouchableWithoutFeedback>
              <View className="bg-white rounded-t-3xl p-5 max-h-[80%]">
                <View className="items-center mb-4">
                  <View className="w-12 h-1 bg-slate-300 rounded-full" />
                </View>
                <Text className="text-xl font-bold mb-4">Select Address</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {addresses.map((a: Address) => (
                    <TouchableOpacity
                      key={a.id}
                      onPress={() => {
                        setSelected(a);
                        setShow(false);
                      }}
                      className={`flex-row justify-between items-center py-4 border-b border-slate-100 ${
                        selected.id === a.id
                          ? "bg-indigo-50 -mx-5 px-5 rounded-xl"
                          : ""
                      }`}
                    >
                      <View className="flex-1">
                        <View className="flex-row items-center">
                          <Text className="font-bold text-slate-800">
                            {a.label}
                          </Text>
                          {selected.id === a.id && (
                            <View
                              className=" ml-2 px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: Colors.primary }}
                            >
                              <Text className="text-white text-[10px] font-bold">
                                SELECTED
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text className="text-slate-500 text-sm mt-0.5">
                          {a.address}
                        </Text>
                        <Text className="text-slate-400 text-xs">
                          {a.phone}
                        </Text>
                      </View>
                      <Ionicons
                        name={
                          selected.id === a.id
                            ? "checkmark-circle"
                            : "radio-button-off"
                        }
                        size={24}
                        color={
                          selected.id === a.id ? Colors.primary : "#cbd5e1"
                        }
                      />
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    onPress={() => {
                      setShow(false);
                      setShowAddAddress(true);
                    }}
                    className="mt-4 bg-indigo-50 rounded-2xl p-4 items-center border-2 border-indigo-200 border-dashed"
                  >
                    <View className="flex-row items-center">
                      <Ionicons
                        name="add-circle"
                        size={22}
                        color={Colors.primary}
                      />
                      <Text
                        className="font-semibold  ml-2"
                        style={{ color: Colors.primary }}
                      >
                        Add New Address
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Add Address Modal - Improved Keyboard Handling */}
      <Modal
        visible={showAddAddress}
        animationType="slide"
        transparent
        onShow={() => {
          setTimeout(() => {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
          }, 100);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -30}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-black/35 justify-end">
              <TouchableWithoutFeedback>
                <View
                  className="bg-white rounded-t-3xl p-5"
                  style={{
                    maxHeight: screenHeight * 0.94,
                    minHeight: screenHeight * 0.5,
                  }}
                >
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-bold text-slate-800">
                      Add New Address
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Keyboard.dismiss();
                        setShowAddAddress(false);
                      }}
                      className="bg-slate-100 p-2 rounded-full"
                    >
                      <Ionicons name="close" size={22} color="#64748b" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingBottom: 20 }}
                  >
                    <View className="space-y-4">
                      {/* Label Field */}
                      <View>
                        <Text className="text-sm font-semibold text-slate-700 mb-1.5">
                          Address Label <Text className="text-red-500">*</Text>
                        </Text>
                        <View className="flex-row flex-wrap gap-2">
                          {["Home", "Office", "Other"].map((label: string) => (
                            <TouchableOpacity
                              key={label}
                              onPress={() => {
                                setNewAddress({ ...newAddress, label });
                                setTimeout(() => {
                                  focusNameInput();
                                }, 200);
                              }}
                              className={`px-4 py-2 rounded-full border ${
                                newAddress.label === label
                                  ? "bg-indigo-600 border-indigo-600"
                                  : "bg-white border-slate-200"
                              }`}
                            >
                              <Text
                                className={`${
                                  newAddress.label === label
                                    ? "text-white"
                                    : "text-slate-600"
                                } font-medium`}
                              >
                                {label}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>

                      {/* Name Field */}
                      <View>
                        <Text className="text-sm font-semibold text-slate-700 mb-1.5">
                          Full Name <Text className="text-red-500">*</Text>
                        </Text>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={focusNameInput}
                        >
                          <View className="flex-row items-center bg-slate-50 rounded-2xl border border-slate-200 px-4">
                            <Ionicons
                              name="person-outline"
                              size={20}
                              color="#94a3b8"
                            />
                            <TextInput
                              ref={nameInputRef}
                              className="flex-1 p-3 text-slate-800"
                              placeholder="Enter full name"
                              placeholderTextColor="#94a3b8"
                              value={newAddress.name}
                              onChangeText={(text: string) =>
                                setNewAddress({ ...newAddress, name: text })
                              }
                              returnKeyType="next"
                              onSubmitEditing={focusPhoneInput}
                              onFocus={() => {
                                setTimeout(() => {
                                  scrollViewRef.current?.scrollTo({
                                    y: 150,
                                    animated: true,
                                  });
                                }, 200);
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>

                      {/* Phone Field */}
                      <View>
                        <Text className="text-sm font-semibold text-slate-700 mb-1.5">
                          Phone Number <Text className="text-red-500">*</Text>
                        </Text>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={focusPhoneInput}
                        >
                          <View className="flex-row items-center bg-slate-50 rounded-2xl border border-slate-200 px-4">
                            <Ionicons
                              name="call-outline"
                              size={20}
                              color="#94a3b8"
                            />
                            <TextInput
                              ref={phoneInputRef}
                              className="flex-1 p-3 text-slate-800"
                              placeholder="Enter phone number"
                              placeholderTextColor="#94a3b8"
                              keyboardType="phone-pad"
                              value={newAddress.phone}
                              onChangeText={(text: string) =>
                                setNewAddress({ ...newAddress, phone: text })
                              }
                              returnKeyType="next"
                              onSubmitEditing={focusAddressInput}
                              onFocus={() => {
                                setTimeout(() => {
                                  scrollViewRef.current?.scrollTo({
                                    y: 280,
                                    animated: true,
                                  });
                                }, 200);
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>

                      {/* Address Field */}
                      <View>
                        <Text className="text-sm font-semibold text-slate-700 mb-1.5">
                          Address <Text className="text-red-500">*</Text>
                        </Text>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={focusAddressInput}
                        >
                          <View className="bg-slate-50 rounded-2xl border border-slate-200 px-4">
                            <TextInput
                              ref={addressInputRef}
                              className="p-3 text-slate-800"
                              style={{
                                minHeight: 100,
                                textAlignVertical: "top",
                              }}
                              placeholder="Enter full address"
                              placeholderTextColor="#94a3b8"
                              multiline
                              numberOfLines={4}
                              value={newAddress.address}
                              onChangeText={(text: string) =>
                                setNewAddress({ ...newAddress, address: text })
                              }
                              returnKeyType="done"
                              onSubmitEditing={Keyboard.dismiss}
                              onFocus={() => {
                                setTimeout(() => {
                                  scrollViewRef.current?.scrollTo({
                                    y: 400,
                                    animated: true,
                                  });
                                }, 200);
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>

                      {/* Buttons */}
                      <View className="flex-row space-x-3 mt-4">
                        <TouchableOpacity
                          onPress={() => {
                            Keyboard.dismiss();
                            setShowAddAddress(false);
                          }}
                          className="flex-1 bg-slate-100 rounded-2xl py-4 items-center"
                        >
                          <Text className="font-semibold text-slate-600">
                            Cancel
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={handleAddAddress}
                          className="flex-1 rounded-2xl py-4 items-center shadow-lg shadow-indigo-200"
                          style={{ backgroundColor: Colors.primary }}
                        >
                          <Text className="text-white font-bold">
                            Save Address
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
