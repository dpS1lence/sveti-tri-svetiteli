import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HramImg from "../../assets/images/hram-gorna-2.png";
import { getAllPosts } from "../../lib/appwrite";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center">
              <Text className="text-2xl font-pbold text-white mr-2">
                Активни новини
              </Text>
              <TouchableOpacity onPress={fetchPosts}>
                <Icon name="refresh" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            scrollEnabled={false}
            data={posts}
            renderItem={({ item }) => (
              <View className="bg-black-100 rounded-xl p-4 mb-4 flex-row">
                <Image
                  source={{ uri: item.imageurl }}
                  className="w-20 h-20 rounded-lg"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-white font-pbold text-lg">
                    {item.title}
                  </Text>
                  <Text className="text-gray-100 font-pregular mt-1">
                    {item.description}
                  </Text>
                  <Text className="text-gray-400 font-pregular mt-1">
                    {item.$updatedAt !== item.$createdAt
                      ? `Редактирано на ${new Date(
                          item.$updatedAt
                        ).toLocaleDateString("bg-BG")}`
                      : `Създадено на ${new Date(
                          item.$createdAt
                        ).toLocaleDateString("bg-BG")}`}
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
            keyExtractor={(item) => item.$id}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={fetchPosts} />
            }
          />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
