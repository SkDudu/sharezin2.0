import { Image, SafeAreaView, ScrollView, Text, Pressable, View } from 'react-native';

import tw from 'twrnc';

export default function App({navigation}) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={tw`flex w-full h-full bg-[#f5f7f9] px-2 gap-3`}>
          <Text style={tw `text-[#0b0c10] font-semibold text-2xl`}>Encontre a conta que seu amigo fez para a saideira!</Text>
          <Pressable 
            style={tw `flex-row bg-[#0b0c10] h-13 rounded justify-center items-center gap-2`}
            onPress={() => navigation.navigate('SearchReceipt')}
          >
            <Image 
              source={require('./../assets/icons/Lupe.svg')}
              style={{width: 20, height: 20}}
            />
            <Text style={tw `text-[#fff]`}>Procure a conta pelo código</Text>
          </Pressable>
          <View style={tw `pt-2`}>
            <Text style={tw `text-[#0b0c10] font-medium text-xl`}>Minhas contas</Text>

            <View style={tw `flex bg-[#eaeaea] w-full mt-2 px-2 py-2 rounded gap-1`}> 
              <View style={tw `flex-row bg-[#eaeaea] justify-between`}>
                  <View style={tw `flex-row bg-[#eaeaea] gap-2 items-center`}>
                      <Image 
                          source={require('./../assets/icons/ReceiptOutline.svg')}
                          style={{width: 24, height: 24}}
                      />
                      <Text>Conta do praiow</Text>
                  </View>
                  <Text>12.04</Text>
              </View>
              <View style={tw `flex-row bg-[#eaeaea] justify-between`}>
                <View style={tw `flex-row bg-[#eaeaea] items-center justify-between gap-1`}>
                  <Image source={require('./../assets/icons/MapPin.svg')}/>
                  <Text style={tw `font-sm text-[#717171]`}>Nome do restaurante</Text>
                </View>
              </View>
              <View style={tw `flex-row bg-[#eaeaea] gap-2 mt-2`}>
                <View style={tw `flex bg-[#9FC991] w-[70px] h-[25px] justify-center items-center rounded-full`}>
                  <Text style={tw `text-white`}>Dono</Text>
                </View>
                <View style={tw `flex bg-[#7BA098] w-[70px] h-[25px] justify-center items-center rounded-full`}>
                  <Text style={tw `text-white`}>Aberta</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}