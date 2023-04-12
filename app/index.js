import { Stack, useRouter } from "expo-router"
import icons from "../constants/icons"
import { Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { useState } from "react"
import axios from "axios"

const LoginPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [data, setData] = useState({})
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false)

  const signIn = async () => {
    setIsLoading(true)
    console.log(email, password)
    try {
      const response = await axios.post('https://dev-api.capacitor.software/v1/auth/login', {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      setData(response.data.data)
      router.push('/home')
    } catch(e) {
      setMessage(e.response.data.message)
    }
    setIsLoading(false)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen 
        options={{
          headerShown: false
         }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View 
          style={{
            flex: 1, 
            paddingTop: 34, 
            backgroundColor: '#FFF8EF', 
            paddingBottom: 40
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 }}>
            <Image 
              source={icons.logo} 
              style={{ width: 60, height: 34, resizeMode: 'center' }} 
            />
            <Text
              style={{ fontSize: 24, fontWeight: '600', fontFamily: 'SpartanSemiBold' }}
              textBreakStrategy="balanced"
            >CAPACITOR</Text>
          </View>
          <Image 
            source={icons.login} 
            style={{ width: 200, height: 150, resizeMode: 'contain', alignSelf: 'center', marginTop: 16 }} 
          />
          <Text style={{ paddingHorizontal: 14, textAlign: 'center', marginTop: 14, lineHeight: 18 }}>
            <Text style={{ fontWeight: 600 }}>ATech Capacitor (Capacitor){' '}</Text>
            <Text>stores all the information about the capacity of a business into a single platform. The platform is designed to add and fully utilize all capacity from existing resources within a business. </Text>
          </Text>
        </View>
        <View 
          style={{ 
            marginHorizontal: 14, 
            marginTop: -20, 
            marginBottom: 14,
            backgroundColor: '#FFF', 
            padding: 14, 
            shadowColor: '#333333',
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 0,
              height: 2
            },
            borderRadius: 2
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 32, fontWeight: '700' }}>Welcome</Text>
          <Text>Company Email</Text>
          <TextInput
            placeholder="Company Email"
            style={{ 
              padding: 8,
              paddingHorizontal: 14,
              borderWidth: 1, 
              borderColor: '#F0F5FC', 
              borderRadius: 8,
              marginTop: 8
            }}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <Text style={{ marginTop: 28 }}>Password</Text>
          <TextInput
            placeholder="Password"
            style={{ 
              padding: 8,
              paddingHorizontal: 14,
              borderWidth: 1, 
              borderColor: '#F0F5FC', 
              borderRadius: 8,
              marginTop: 8
            }}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <View style={{ 
            flex: 1, 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginTop: 14, 
            columnGap: 14
          }}>
            <BouncyCheckbox 
              disableText={true}
              size={20}
              textStyle={{ fontSize: 14, color: '#000' }}
              innerIconStyle={{ borderRadius: 4 }}
              iconStyle={{ borderRadius: 4 }}
              fillColor="#007CEE"
            />
            <Text style={{ fontWeight: '400' }}>Remember Me</Text>
          </View>
          <Text>{message}</Text>
          <TouchableOpacity 
            style={{ 
                shadowColor: '#333333', 
                shadowRadius: 9,
                shadowOffset: {
                  width: 2,
                  height: 2
                },
                marginTop: 24,
                padding: 14, 
                backgroundColor: '#FFD369', 
                borderRadius: 8
              }}
              onPress={() => {
                signIn()
              }}
            >
              <Text 
                style={{ 
                  textAlign: 'center', 
                  fontSize: 16, 
                  fontWeight: '600' 
                }}
              >
                {isLoading ? 'Please Wait' : 'Login'}
              </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setForgotPasswordModal(true)}>
            <Text style={{ textAlign: 'right', marginTop: 14, textDecorationLine: 'underline' }}>Forgot Password?</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: 'right', marginTop: 14, textDecorationLine: 'underline' }}>Contact Us</Text>

          <Modal 
            visible={forgotPasswordModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => {
              setForgotPasswordModal(false)
            }}
          >
              <Pressable style={styles.androidBackdrop} onPress={() => setForgotPasswordModal(false)} />
              <View style={styles.androidAlertBox}>
                <Text>Hello</Text>
              </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.4
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  alertBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  androidAlertBox: {
    maxWidth: 280,
    width: '100%',
    margin: 48,
    elevation: 24,
    borderRadius: 2,
  },
  androidTitle: {
    margin: 24,
  },
  androidMessage: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
  },
  androidButtonGroup: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 8,
    marginLeft: 24,
  },
  androidButton: {
    marginTop: 12,
    marginRight: 8,    
  },
  androidButtonInner: {
    padding: 10,

  }
});

export default LoginPage