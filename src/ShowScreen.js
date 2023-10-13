import React from 'react';
import { View, Text, Image } from 'react-native';

const ShowScreen = ({ route }) => {
  const { blog } = route.params;

  return (
    <View>
      <Text>Blog Details</Text>
      <Text>Title: {blog.title}</Text>
      <Text>Description: {blog.description}</Text>
      <Image
        source={{ uri: blog.imageUri }}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

export default ShowScreen;
