import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, Image } from 'react-native';

const HomeScreen = ({ navigation, route }) => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    if (route.params && route.params.newBlog) {
      setBlogData((prevBlogData) => [...prevBlogData, route.params.newBlog]);
    }
  }, [route.params]);

  const handleAddBlog = (newBlog) => {
    setBlogData((prevBlogData) => [...prevBlogData, newBlog]);
  };

  return (
    <View>
      <Text>Blog List</Text>
      <Button
        title="Add Blog"
        onPress={() => navigation.navigate('Add', { handleAddBlog })}
      />
      <FlatList
        data={blogData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Show', { blog: item })}>
            <Text>{item.title}</Text>
            {item.imageUri && <Image source={{ uri: item.imageUri }} style={{ width: 200, height: 200 }} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
