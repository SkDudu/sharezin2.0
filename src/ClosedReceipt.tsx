import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import tw from 'twrnc';

export default function App() {
  return (
    <View style={tw `flex-1 px-2 mt-4`}>
      <Text style={tw `text-[#0b0c10] font-medium text-xl`}>Contas fechadas</Text>
      <View style={tw `flex bg-[#eaeaea] w-full mt-2 px-2 py-2 rounded gap-1`}> 
        <View style={tw `flex-row bg-[#eaeaea] justify-between`}>
            <View style={tw `flex-row bg-[#eaeaea] gap-2 items-center`}>
                <Image 
                    source={require('./../assets/icons/ReceiptOutline.svg')}
                    style={{width: 24, height: 24}}
                />
                <Text>Conta do praiow</Text>
            </View>
        </View>
        <View style={tw `flex-row bg-[#eaeaea] justify-between`}>
          <View style={tw `flex-row bg-[#eaeaea] items-center justify-between gap-1`}>
            <Image source={require('./../assets/icons/mapPin.svg')}/>
            <Text style={tw `font-sm text-[#717171]`}>Nome do restaurante</Text>
          </View>
        </View>
        <View style={tw `flex-row bg-[#eaeaea] gap-2 mt-2`}>
          <View style={tw `flex bg-[#fff] h-[25px] justify-center items-center rounded-full`}>
            <Text style={tw `text-black px-3`}>Fechada: --------</Text>
          </View>
        </View>
      </View>
    </View>
  );
}