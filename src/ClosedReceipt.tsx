import { SafeAreaView } from 'react-native';
import { Box, Link, Stack, Text } from 'native-base';

import Receipt from "./../assets/icons/ReceiptOutline.svg"
import Pin from "./../assets/icons/MapPin.svg"

export default function App({navigation}) {
  return (
    <SafeAreaView>
      <Box bgColor={"#f5f7f9"} mx={2}>
        <Stack direction={"column"}>
          <Text fontWeight={"medium"} fontSize={24} mt={10}>Conta fechada</Text>
          <Link onPress={() => navigation.navigate('ReceiptDetailsClosed')}>
            <Box w={"full"} bgColor={"#ececec"} mt={4} rounded={'md'} px={2} py={2}>
              <Stack direction={"column"}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} mb={1}>
                  <Stack direction={'row'} alignItems={"center"}>
                    <Receipt />
                    <Text color={"#000"} fontSize={16} fontWeight={"medium"} pl={2}>Praiow</Text>
                  </Stack>
                  <Text>12/04</Text>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}mb={2}>
                  <Stack direction={'row'} alignItems={"center"}>
                    <Pin />
                    <Text color={"#575960"} fontSize={14} fontWeight={"normal"} pl={1}>Praiow</Text>
                  </Stack>
                </Stack>
                <Box w={"200px"} bgColor={'#575960'} px={3} py={1} rounded={'2xl'} alignItems={"center"}>
                  <Text color={'white'}>Fechada: 12/04 às 00:34</Text>
                </Box>
              </Stack>
            </Box>
          </Link>
        </Stack>
      </Box>
    </SafeAreaView>
  );
}