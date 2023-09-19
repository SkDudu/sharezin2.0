import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeIcon from './assets/icons/HomeFill.svg'
import Receipt from './assets/icons/ReceiptFill.svg'
import UserFIll from './assets/icons/UserFill.svg'

import Home from "./src/Home"
import ClosedReceipt from "./src/ClosedReceipt"
import SearchReceipt from './src/SearchReceipt';
import Login from './src/Auth/Login';
import ForgotPass from "./src/Auth/ForgotPass";
import Register from "./src/Auth/Register";
import Profile from "./src/Profile";
import ReceiptDetails from "./src/ReceiptDetails";
import CostParcial from "./src/CostParcial";
import ReceiptDetailsClosed from "./src/ReceiptDetailsClosed";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()
const auth = createNativeStackNavigator();

function AuthNavigator(){
  return(
    <auth.Navigator>
      <auth.Screen name='Login' component={Login} options={{ headerShown: false }}/>
      <auth.Screen 
        name='ForgotPass' 
        component={ForgotPass} 
        options={{ 
          title: "Esqueci a senha", 
          headerShadowVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#f5f7f9',
          },
        }}
      />

      <auth.Screen 
        name='register' 
        component={Register} 
        options={{ 
          title: "Cadastro", 
          headerShadowVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#f5f7f9',
          },
        }}
      />
    </auth.Navigator> 
  )
}

function TabNavigator(){
  return(
    <Tab.Navigator initialRouteName='HomeScreen'>
      <Tab.Screen name='HomeScreen' component={Home} 
        options={{ headerShown: false, headerShadowVisible: false, tabBarIcon: ({ color }) => <HomeIcon width={24} height= {24} fill={color}/> }}
      />
      <Tab.Screen name='ClosedReceipt' component={ClosedReceipt} 
        options={{ headerShown: false, headerShadowVisible: false, tabBarIcon: ({ color }) => <Receipt width={24} height= {24} fill={color}/> }}
      />
      <Tab.Screen name='Profile' component={Profile} 
        options={{ headerShown: false, headerShadowVisible: false, tabBarIcon: ({ color }) => <UserFIll width={24} height= {24} fill={color}/> }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='LoginScreen' component={AuthNavigator} options={{ headerShown: false }}/>
          <Stack.Screen name='Home' component={TabNavigator} options={{ headerShown: false }}/>
          <Stack.Screen name='SearchReceipt' component={SearchReceipt} options={{ title: 'Pesquise pelo código', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f7f9'} }}/>
          <Stack.Screen name='ReceiptDetails' component={ReceiptDetails} options={{ title: 'Conta geral', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f7f9'} }}/>
          <Stack.Screen name='CostParcial' component={CostParcial} options={{ title: 'Valor do pedido', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f7f9'} }}/>
          <Stack.Screen name='ReceiptDetailsClosed' component={ReceiptDetailsClosed} options={{ title: 'Valor do pedido', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f7f9'} }}/>
        </Stack.Navigator> 
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
