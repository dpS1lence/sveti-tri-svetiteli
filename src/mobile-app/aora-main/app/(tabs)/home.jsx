import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HramImg from "../../assets/images/hram-gorna-2.png";

const Home = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary flex-1">
        <ScrollView className="p-4">
          <Text className="text-2xl font-pbold text-white mb-4 text-center mt-4">
            Храм Свети Три Светители
          </Text>
          <Image
            source={HramImg}
            className="w-full h-80 rounded-xl mb-4"
            resizeMode="cover"
          />
          <Text className="text-2xl font-pbold text-white mb-6">
            Активни новини
          </Text>

          <FlatList
            scrollEnabled={false}
            data={[
              {
                id: "1",
                title: "Breaking News 1",
                description: "Short description of the first news item...",
                image: "https://picsum.photos/200/300",
              },
              {
                id: "2",
                title: "Important Update",
                description: "Brief overview of an important update...",
                image: "https://picsum.photos/200/300",
              },
              {
                id: "3",
                title: "Latest Development",
                description: "Quick summary of recent developments...",
                image: "https://picsum.photos/200/300",
              },
              {
                id: "4",
                title: "New Announcement",
                description: "Details about a new announcement...",
                image: "https://picsum.photos/200/300",
              },
              {
                id: "5",
                title: "Featured Story",
                description: "Highlights from our featured story...",
                image: "https://picsum.photos/200/300",
              },
            ]}
            renderItem={({ item }) => (
              <View className="bg-black-100 rounded-xl p-4 mb-4 flex-row">
                <Image
                  source={{ uri: item.image }}
                  className="w-20 h-20 rounded-lg"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-white font-pbold text-lg">
                    {item.title}
                  </Text>
                  <Text className="text-gray-100 font-pregular mt-1">
                    {item.description}
                  </Text>
                  <View className="flex-row mt-3 space-x-3">
                    <TouchableOpacity className="bg-secondary px-4 py-2 rounded-lg">
                      <Text className="text-white font-pmedium">
                        Редактирай
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-lg">
                      <Text className="text-white font-pmedium">Изтрий</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
