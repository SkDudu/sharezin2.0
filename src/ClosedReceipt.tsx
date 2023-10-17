import { Alert, SafeAreaView } from 'react-native';
import { Box, FlatList, Link, Stack, Text } from 'native-base';

import { supabase } from '../lib/supabse';
import { useEffect, useState } from 'react';

import Receipt from "./../assets/icons/ReceiptOutline.svg"
import Pin from "./../assets/icons/MapPin.svg"
import ReceiptGray from "./../assets/icons/ReceiptGray.svg"

export default function App({navigation}) {
  const [userId, setUserId] = useState()
  const [response, setResponse] = useState<any[]>([])

  async function getSession(){ 
    const { data: { user } } = await supabase.auth.getUser()
    setUserId(user?.id)
    //console.log('seesion user id: ', user?.id)
  }

  const EmptyReceipt = () => {
    return (
      <Box bgColor={"#ececec"} mt={4} rounded={'md'} px={2} py={2}>
        <Stack direction={'column'} alignItems={"center"}>
          <ReceiptGray />
          <Text color="#717171" fontSize={14} fontWeight={"regular"} pl={2}>Você não possui nenhum recibo.</Text>
        </Stack>
      </Box>
    )
  }

  useEffect(()=>{
    const user = userId ? userId : null
    if(user !== null){
      async function getReceiptsByUserId(){
        const { data, error } = await supabase
        .from('receipt')
        .select('*')
        .eq('user', user)
        .neq('status_receipt', true)

        if(error){
          Alert.alert(error.message)
        }
    
        if(data !== null){
          setResponse(data)
        }
      }

      getReceiptsByUserId()
    }

    getSession()
  }, [userId])

  return (
    <SafeAreaView>
      <Box bgColor={"#f5f7f9"} h={'full'}>
        <Stack direction={"column"} h={'full'} mx={2}>
          <Text fontWeight={"medium"} fontSize={24} mt={10}>Conta fechada</Text>
          <FlatList ListEmptyComponent={EmptyReceipt} data={response} keyExtractor={(item) => item?.id} renderItem={({item})=>
            <Box bgColor={"#ececec"} mt={4} rounded={'md'} px={2} py={2}>
              <Link onPress={() => navigation.navigate('ReceiptDetailsClosed', {receiptId: item.id, userId: userId})}>
                <Stack direction={"column"} w={"full"}>
                  <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} mb={1}>
                    <Stack direction={'row'} alignItems={"center"}>
                      <Receipt />
                      <Text color={"#000"} fontSize={16} fontWeight={"medium"} pl={2}>{item.name_receipt}</Text>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}mb={2}>
                    <Stack direction={'row'} alignItems={"center"}>
                      <Pin />
                      <Text color={"#575960"} fontSize={14} fontWeight={"normal"} pl={1}>{item.restaurant_name}</Text>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"}>
                    <Box w={"200px"} bgColor={'#575960'} px={3} py={1} rounded={'2xl'} alignItems={"center"}>
                      <Text color={'white'}>{item.closed_at}</Text>
                    </Box>
                  </Stack>
                </Stack>
              </Link>
            </Box>
            }
          />
        </Stack>
      </Box>
    </SafeAreaView>
  );
}