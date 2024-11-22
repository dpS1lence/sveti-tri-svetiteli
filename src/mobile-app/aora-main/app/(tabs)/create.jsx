import { useState } from "react";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import { icons } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { createPost } from "../../lib/appwrite";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  const openPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });

      setForm({ ...form, image: result.assets[0] });
      console.log(form.image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePost = async () => {
    try {
      const post = await createPost({
        title: form.title,
        description: form.description,
        imageFile: form.image,
      });
      console.log("Post created successfully:", post);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Създай новина
        </Text>

        <FormField
          title="Заглавие"
          value={form.title}
          placeholder="Въведете заглавие на новината..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <FormField
          title="Описание"
          value={form.description}
          placeholder="Въведете описание на новината..."
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-7"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Снимка</Text>

          <TouchableOpacity
            onPress={openPicker}
            className="w-full h-64 rounded-2xl border-2 border-dashed border-gray-400 flex items-center justify-center"
          >
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                resizeMode="cover"
                className="w-full h-full rounded-2xl"
              />
            ) : (
              <Text className="text-gray-400 font-pmedium text-lg">
                Натиснете тук, за да качите снимка
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Създай новина"
          handlePress={handleCreatePost}
          containerStyles="mt-7"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
