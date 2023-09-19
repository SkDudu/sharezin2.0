import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Box, FlatList, Icon, Input, Stack, Text } from 'native-base';

import Lupe from '../assets/icons/LupeBlack.svg'
import Receipt from '../assets/icons/ReceiptOutline.svg'
import Pin from '../assets/icons/MapPin.svg'

export default function SearchReceipt() {
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
    <SafeAreaView>
      <Box bgColor={"#f5f7f9"}>
        <Stack direction={"column"} mt={2} mx={2}>
          <Text color={"#575960"} fontWeight={"normal"} fontSize={16}>Para encontrar alguma conta de seus amigos, Insira o código que um de seus amigos compartilhou!</Text>
          <Input InputLeftElement={<Icon as={<Lupe />} ml="2"/>} placeholder="Pesquisar" w="100%" borderColor={"#eaeaea"} bgColor={"white"} mt={4}/>
        </Stack>
        <FlatList data={data} renderItem={({item}) =>
            <Box bgColor={"#ececec"} mt={4} mx={2} rounded={'md'} px={2} py={2}>
              <Stack direction={"column"}>
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
                  <Text>{item.isOpen ? <Text color={"green.600"}>Aberta</Text> : <Text color={"red.600"}>Fechada</Text>}</Text>
                </Stack>
                <Text color={"#575960"} fontSize={14} fontWeight={"normal"}>Responsável: {item.ownerReceipt}</Text>
              </Stack>
            </Box>
          }
        />
      </Box>
    </SafeAreaView>
  );
}