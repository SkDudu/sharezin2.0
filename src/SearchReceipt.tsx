import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';

import tw from 'twrnc';

export default function App() {
  return (
    <SafeAreaView style={tw `h-full`}>
      <ScrollView style={tw `h-full`}>
        <View style={tw`flex-1 w-full h-full bg-[#f5f7f9] px-2 gap-3`}>
          <Text style={tw `text-[#575960] text-medium text-base`}>Para encontrar alguma conta de seus amigos, insira o código que um de seus amigos compartilhou!</Text>
          <TextInput style={tw `w-full h-[48px]`} placeholder='Pesquisar'></TextInput>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}