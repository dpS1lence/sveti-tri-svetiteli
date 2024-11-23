import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import { CustomButton, FormField } from "../../components";
import { updatePost } from "../../lib/appwrite";

const Edit = () => {
  const params = useLocalSearchParams();
  const [form, setForm] = useState({
    title: params.title || "",
    description: params.description || "",
    image: params.imageurl ? { uri: params.imageurl } : null,
  });

  useEffect(() => {
    if (params.postId) {
      setForm({
        title: params.title || "",
        description: params.description || "",
        image: params.imageurl ? { uri: params.imageurl } : null,
      });
    }
  }, [params.postId]); // Only re-run if ID changes

  const openPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });

      if (result.type === "success") {
        setForm({ ...form, image: result });
      }
    } catch (error) {
      console.log("Error picking image:", error);
    }
  };

  const handleUpdatePost = async () => {
    try {
      console.log(params);

      const imageFile =
        form.image && !form.image.uri.startsWith("http") ? form.image : null;

      await updatePost(params.postId, {
        title: form.title,
        description: form.description,
        imageFile: imageFile,
      });
      console.log("Post updated successfully");
      router.back();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Редакция на новина
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
          title="Редактирай новина"
          handlePress={handleUpdatePost}
          containerStyles="mt-7"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Edit;
