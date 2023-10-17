import { useEffect, useState } from "react";
import { Alert, SafeAreaView, Pressable, View } from 'react-native';
import { Box, Fab, FlatList, HStack, Icon, Link, Skeleton, Stack, Text, VStack } from 'native-base';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";

import { supabase } from '../lib/supabse';

import tw from 'twrnc';

import Lupe from './../assets/icons/Lupe.svg'
import Receipt from "./../assets/icons/ReceiptOutline.svg"
import ReceiptGray from "./../assets/icons/ReceiptGray.svg"
import Pin from '../assets/icons/MapPin.svg'
import PlusWhite from './../assets/icons/PlusWhite.svg'

export default function Home({navigation}){
  const [userId, setUserId] = useState()
  const [response, setResponse] = useState<any[]>([])
  const [responseParticipant, setResponseParticipant] = useState()

  async function getSession(){ 
    const { data: { user } } = await supabase.auth.getUser()
    setUserId(user?.id)
    //console.log('seesion user: ', user)
  }

  const EmptyReceipt = () => {
    return (
      <Box bgColor={"#ececec"} mt={4} rounded={'md'} px={2} py={2}>
        <Stack direction={'column'} alignItems={"center"}>
          <ReceiptGray />
          <Text color="#717171" fontSize={14} fontWeight={"regular"} pl={2}>Você não possui nenhuma conta em aberto.</Text>
        </Stack>
      </Box>
    )
  }

  const Loading = () => {
    return (
      <VStack>
        <Skeleton h="24" rounded={'md'} borderColor="coolGray.100" endColor="warmGray.100"/>
        <HStack>
          <Skeleton borderColor="coolGray.200" endColor="warmGray.300" size="8" rounded="md" mt="-85px" ml={2} />
          <Skeleton.Text endColor="warmGray.300" lines={1} alignItems="center"  px="16" mt="-80px" ml="-50px"/>
        </HStack>
        <HStack space={2} mt="-40px">
          <Skeleton endColor="warmGray.300" w={"24"} h={8} ml={2} rounded="full" />
          <Skeleton endColor="warmGray.300" w={"24"} h={8} ml={2} rounded="full" />
        </HStack>
      </VStack>
    )
  }

  useEffect(()=>{
    const user = userId ? userId : null
        if(user !== null){
          async function getReceiptsByUserId(){
            const { data, error } = await supabase
            .from('receipt')
            .select()
            .eq('user', user)
            .neq('status_receipt', false)
        
            if(data !== null){
              setResponse(data)
              console.log(response)
            }
          }

          async function getReceiptsByUserIdParticipant(){
            const { data, error } = await supabase
            .from('participant')
            .select()
            .eq('user', user)
            .neq('is_owner', true)
        
            if(data !== null){
              const response = await supabase
              .from('receipt')
              .select()
              .eq('id', data[0].receipt_id)

              setResponseParticipant(response.data)
              //console.log('reponseConvidado', response.data[0]?.created_at)
            }
          }

          async function subsReceipt(){
            supabase
            .channel('receipt')
            .on(
              'postgres_changes',
              {event: '*', schema: 'public'},
              (payload) => {
                getReceiptsByUserId()
                getReceiptsByUserIdParticipant()
              }
            )
            .subscribe()
          }
          
          subsReceipt()
          getReceiptsByUserId()
          getReceiptsByUserIdParticipant()
        }

    getSession()
  }, [userId])

  return (
    <SafeAreaView style={tw `h-full`}>
      <View style={tw`flex w-full h-full mt-10 px-2 gap-3`}>
        <Fab renderInPortal={false} size={"md"} bottom={60} bgColor={"#000"} icon={<Icon color={"white"} as={<PlusWhite />}/>} onPress={() => navigation.navigate('NewReceipt', {userId: userId})}/>
        <Text style={tw `text-[#0b0c10] font-semibold text-2xl`}>Encontre a conta que seu amigo fez para a saideira!</Text>
        <Pressable 
          style={tw `flex-row bg-[#0b0c10] h-13 rounded justify-center items-center gap-2`}
          onPress={() => navigation.navigate('SearchReceipt', { userId: userId})}
        >
          <Lupe width={20} height={20} fill="#fff"/>
          <Text style={tw `text-[#fff]`}>Procure a conta pelo código</Text>
        </Pressable>
        <View style={tw `pt-2`}>
          <Text style={tw `text-[#0b0c10] font-medium text-xl`}>Minhas contas</Text>
          { response == null && responseParticipant == null ? (
            <EmptyReceipt />
          ) : (
            <>
            <FlatList data={response} keyExtractor={(item) => item?.id} renderItem={({ item }) => <Box bgColor={"#ececec"} mt={4} rounded={'md'} px={2} py={2}>
                <Link onPress={() => navigation.navigate('ReceiptDetails', { receiptId: item.id, userId: userId })}>
                  <Stack direction={"column"} w={"full"}>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} mb={1}>
                      <Stack direction={'row'} alignItems={"center"}>
                        <Receipt />
                        <Text color={"#000"} fontSize={16} fontWeight={"medium"} pl={2}>{item.name_receipt}</Text>
                      </Stack>
                      <Text color={"#000"}>{item.created_at}</Text>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
                      <Stack direction={'row'} alignItems={"center"}>
                        <Pin />
                        <Text color={"#575960"} fontSize={14} fontWeight={"normal"} pl={1}>{item.restaurant_name}</Text>
                      </Stack>
                    </Stack>
                    <Stack direction={"row"}>
                      <Box bgColor={"green.600"} px={3} rounded={'xl'} mr={2}>
                        <Text>{item.status_receipt ? <Text color={"green.200"}>Aberta</Text> : <Text color={"green.200"}>Aberta</Text>}</Text>
                      </Box>
                      <Box bgColor={'coolGray.700'} px={3} rounded={'xl'}>
                        <Text color={'coolGray.200'}>Dono</Text>
                      </Box>
                    </Stack>
                  </Stack>
                </Link>
              </Box>} /><FlatList data={responseParticipant} keyExtractor={(item) => item?.id} renderItem={({ item }) => <Box bgColor={"#ececec"} mt={4} rounded={'md'} px={2} py={2}>
                <Link onPress={() => navigation.navigate('ReceiptDetailsParticipant', { receiptId: item.id, userId: userId })}>
                  <Stack direction={"column"} w={"full"}>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} mb={1}>
                      <Stack direction={'row'} alignItems={"center"}>
                        <Receipt />
                        <Text color={"#000"} fontSize={16} fontWeight={"medium"} pl={2}>{item.name_receipt}</Text>
                      </Stack>
                      <Text color={"#000"}>{item.created_at}</Text>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
                      <Stack direction={'row'} alignItems={"center"}>
                        <Pin />
                        <Text color={"#575960"} fontSize={14} fontWeight={"normal"} pl={1}>{item.restaurant_name}</Text>
                      </Stack>
                    </Stack>
                    <Stack direction={"row"}>
                      <Box bgColor={"green.600"} px={3} rounded={'xl'} mr={2}>
                        <Text>{item.status_receipt ? <Text color={"green.200"}>Aberta</Text> : <Text color={"green.200"}>Aberta</Text>}</Text>
                      </Box>
                      <Box bgColor={'coolGray.200'} px={3} rounded={'xl'}>
                        <Text color={"coolGray.700"}>Convidado</Text>
                      </Box>
                    </Stack>
                  </Stack>
                </Link>
              </Box>} />
              </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}