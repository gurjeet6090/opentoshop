import {
    BackHandler,
    Modal,
    Pressable,
    Text,
    View,
} from "react-native";

import Animated, {
    FadeIn,
    FadeOut,
} from "react-native-reanimated";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function ExitAlert({
  visible,
  onClose,
}: Props) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <Pressable
        className="flex-1 bg-black/40 justify-center items-center"
        onPress={onClose}
      >
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className="bg-white w-[85%] rounded-2xl p-6"
        >
          {/* Title */}
          <Text className="text-xl font-bold text-center">
            Exit App?
          </Text>

          {/* Message */}
          <Text className="text-gray-500 text-center mt-2">
            Do you really want to close the app?
          </Text>

          {/* Buttons */}
          <View className="flex-row mt-6 space-x-3">

            {/* Cancel */}
            <Pressable
              onPress={onClose}
              className="flex-1 py-3 rounded-xl bg-gray-200 me-4"
            >
              <Text className="text-center font-semibold">
                Cancel
              </Text>
            </Pressable>

            {/* Exit */}
            <Pressable
              onPress={() => BackHandler.exitApp()}
              className="flex-1 py-3 rounded-xl bg-red-500"
            >
              <Text className="text-center font-semibold text-white">
                Exit
              </Text>
            </Pressable>

          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}