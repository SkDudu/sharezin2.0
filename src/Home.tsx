import { Image, SafeAreaView, ScrollView, Pressable, View } from 'react-native';
import { Box, FlatList, Link, Stack, Text } from 'native-base';

import tw from 'twrnc';

import Lupe from './../assets/icons/Lupe.svg'
import Receipt from "./../assets/icons/ReceiptOutline.svg"
import Pin from '../assets/icons/MapPin.svg'


export default function App({navigation}) {
  const data = [
    {
      id: "1",
      nameReceipt: "Niver no Praiow",
      nameRestaurant: "Praiow",
      ownerReceipt: "Eduardo Santos",
      createdAt: "12/04",
      isOpen: true
    },
    {
      id: "2",
      nameReceipt: "Saideira",
      nameRestaurant: "Noite a fora",
      ownerReceipt: "Burugudulio Trucio",
      createdAt: "11/01",
      isOpen: true
    }
  ]

  return (
    <SafeAreaView style={tw `h-full`}>
      <View style={tw`flex w-full h-full mt-10 px-2 gap-3`}>
        <Text style={tw `text-[#0b0c10] font-semibold text-2xl`}>Encontre a conta que seu amigo fez para a saideira!</Text>
        <Pressable 
          style={tw `flex-row bg-[#0b0c10] h-13 rounded justify-center items-center gap-2`}
          onPress={() => navigation.navigate('SearchReceipt')}
        >
          <Lupe width={20} height={20} fill="#fff"/>
          <Text style={tw `text-[#fff]`}>Procure a conta pelo código</Text>
        </Pressable>
        <View style={tw `pt-2`}>
          <Text style={tw `text-[#0b0c10] font-medium text-xl`}>Minhas contas</Text>

          <FlatList data={data} renderItem={({item}) =>
            <Box bgColor={"#ececec"} mt={4} rounded={'md'} px={2} py={2}>
              <Link onPress={() => navigation.navigate('ReceiptDetails')}>
                <Stack direction={"column"} w={"full"}>
                  <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} mb={1}>
                    <Stack direction={'row'} alignItems={"center"}>
                      <Receipt />
                      <Text color={"#000"} fontSize={16} fontWeight={"medium"} pl={2}>{item.nameReceipt}</Text>
                    </Stack>
                    <Text>{item.createdAt}</Text>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}mb={2}>
                    <Stack direction={'row'} alignItems={"center"}>
                      <Pin />
                      <Text color={"#575960"} fontSize={14} fontWeight={"normal"} pl={1}>{item.nameRestaurant}</Text>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"}>
                    <Box bgColor={"green.600"} px={3} rounded={'xl'} mr={2}>
                      <Text>{item.isOpen ? <Text color={"green.200"}>Aberta</Text> : <Text color={"green.200"}>Aberta</Text>}</Text>
                    </Box>
                    <Box bgColor={'coolGray.700'} px={3} rounded={'xl'}>
                      <Text>{item.isOpen ? <Text color={'coolGray.200'}>Dono</Text> : <Text color={"green.200"}>Dono</Text>}</Text>
                    </Box>
                  </Stack>
                </Stack>
              </Link>
            </Box>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}