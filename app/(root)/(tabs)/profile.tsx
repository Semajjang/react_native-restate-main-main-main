import {
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
                        icon,
                        title,
                        onPress,
                        textStyle,
                        showArrow = true,
                      }: SettingsItemProp) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex flex-row items-center justify-between py-3"
    >
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-6" />
        <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
          {title}
        </Text>
      </View>

      {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  const handleItemPress = (screen?: string) => {
    if (screen) {
      router.push(`/settingsApps/${screen}`);
    }
  };

  return (
      <SafeAreaView className="h-full bg-white">
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-32 px-7"
        >
          <View className="flex flex-row items-center justify-between mt-5">
            <Text className="text-xl font-rubik-bold">Profile</Text>
            <Image source={icons.bell} className="size-5" />
          </View>

          <View className="flex flex-row justify-center mt-5">
            <View className="flex flex-col items-center relative mt-5">
              <Image
                  source={{ uri: user?.avatar }}
                  className="size-44 relative rounded-full"
              />
              <TouchableOpacity className="absolute bottom-11 right-2">
                <Image source={icons.edit} className="size-9" />
              </TouchableOpacity>

              <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
            </View>
          </View>

          <View className="flex flex-col mt-10">
            <SettingsItem icon={icons.calendar} title="My Pets" />
            <SettingsItem icon={icons.wallet} title="Payments" />
          </View>

          {/* Settings List with Navigation */}
          <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
            {settings.map((item, index) => (
                <SettingsItem
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    onPress={() => handleItemPress(item.screen)}
                />
            ))}
          </View>

          <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
            <SettingsItem
                icon={icons.logout}
                title="Logout"
                textStyle="text-danger"
                showArrow={false}
                onPress={handleLogout}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

export default Profile;
