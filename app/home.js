import { Stack } from "expo-router"
import { SafeAreaView, Text, View } from "react-native"

const HomePage = () => {
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{ 
          headerShown: false
         }}
      />
      <View>
        <Text>Home Page</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomePage