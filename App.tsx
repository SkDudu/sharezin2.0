import { NativeBaseProvider, INativebaseConfig } from "native-base";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabse";

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
import ResumeReceipt from "./src/ResumeReceipt";
import NewReceipt from "./src/NewReceipt";
import EditReceipt from "./src/EditReceipt";
import ShareReceipt from "./src/ShareReceipt";
import Config from "./src/Config";

const config: INativebaseConfig = {
  // rest of the config keys like dependencies can go here
  strictMode: 'off',
};

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
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name='Home' component={Home} 
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
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <NativeBaseProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator>
          {session && session.user ? (
            <Stack.Group>
              <Stack.Screen name='TabNavigator' component={TabNavigator} options={{ headerShown: false }}/>
              <Stack.Screen name='SearchReceipt' component={SearchReceipt} options={{ title: 'Pesquise pelo código', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f7f9'} }}/>
              <Stack.Screen name='ReceiptDetails' component={ReceiptDetails} options={{ title: 'Conta geral', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f7f9'} }}/>
              <Stack.Screen name='CostParcial' component={CostParcial} options={{ title: 'Valor do pedido', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f7f9'} }}/>
              <Stack.Screen name='ReceiptDetailsClosed' component={ReceiptDetailsClosed} options={{ title: 'Valor do pedido', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f7f9'} }}/>
              <Stack.Screen name='ResumeReceipt' component={ResumeReceipt} options={{ title: 'Minha parte da conta', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f7f9'} }}/>
              <Stack.Screen name='NewReceipt' component={NewReceipt} options={{ title: 'Nova conta compartilhada', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f7f9'} }}/>
              <Stack.Screen name='EditReceipt' component={EditReceipt} options={{ title: 'Editar conta compartilhada', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f7f9'} }}/>
              <Stack.Screen name='ShareReceipt' component={ShareReceipt} options={{ title: 'Código de convite', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f7f9'} }}/>
              <Stack.Screen name='Config' component={Config} options={{ title: 'Configurações', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f7f9'} }}/>
            </Stack.Group>
          ) : (
            <Stack.Screen name='LoginScreen' component={AuthNavigator} options={{ headerShown: false }}/>
          )}
        </Stack.Navigator> 
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
