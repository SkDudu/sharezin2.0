import { Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from "./src/Home"
import ClosedReceipt from "./src/ClosedReceipt"
import SearchReceipt from './src/SearchReceipt';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

function TabNavigator(){
  return(
    <Tab.Navigator initialRouteName='HomeScreen'>
      <Tab.Screen name='HomeScreen' component={Home} 
        options={{ headerShown: false, tabBarIcon: ({ color }) => <Image source={require('./assets/icons/HomeFill.svg')} style={{width: 24, height: 24}} tintColor={color}/> }}
      />
      <Tab.Screen name='ClosedReceipt' component={ClosedReceipt} 
        options={{ headerShown: false, tabBarIcon: ({ color }) => <Image source={require('./assets/icons/ReceiptFill.svg')} style={{width: 24, height: 24}} tintColor={color}/> }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={TabNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name='SearchReceipt' component={SearchReceipt} options={{ title: 'Pesquise pelo código' }}/>
      </Stack.Navigator> 
    </NavigationContainer>
  )
}
