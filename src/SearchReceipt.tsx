import { Alert, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { AlertDialog, Box, Button, FlatList, Icon, Input, Link, Stack, Text } from 'native-base';

import Lupe from '../assets/icons/LupeBlack.svg'
import Receipt from '../assets/icons/ReceiptOutline.svg'
import Pin from '../assets/icons/MapPin.svg'
import { supabase } from '../lib/supabse';

export default function SearchReceipt({route, navigation}) {
  const [receiptId, setReceiptId] = useState('')
  const [codeReceipt, setCodeReceipt] = useState('')
  const [receiptResponse, setReceiptResponse] = useState('')
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  async function getReceiptByCodeInvite(){
    const {data, error} = await supabase
    .from('receipt')
    .select('*')
    .eq('codeInvite', codeReceipt)

    if(data == null){
      //console.log('vindo nulo o histórico', data)
      Alert.alert('Não existe essa conta registrada.')
    }

    if(data || null){
      setReceiptResponse(data)
    }
  }

  async function getParticipant({receiptId}){
    const user = route.params.userId
    setReceiptId(receiptId)
    const { data, error } = await supabase
    .from('participant')
    .select() 
    .eq('user', user)

    if(data[0]?.is_owner == true && data[0].receipt_id == receiptId){
      Alert.alert('Você já é dono. Volte para o início para entrar na sua conta.')
      //console.log(data)
    } else{
      setIsOpen(!isOpen)
    }
  }

  async function setParticipant(){
    const { error } = await supabase
      .from('participant')
      .insert({
        user: route.params.userId,
        cost: 0,
        receipt_id: receiptId,
        is_closed: false,
        is_owner: false
      })

      if(error){
        Alert.alert('Cadastro na conta deu erro. Tente novamente entrar.')
        console.log(error)
      }else{
        navigation.navigate('Home')
      }
  }

  return (
    <SafeAreaView>
      <Box bgColor={"#f5f7f9"}>
        <Stack direction={"column"} mt={2} mx={2}>
          <Text color={"#575960"} fontWeight={"normal"} fontSize={16}>Para encontrar alguma conta de seus amigos, Insira o código que um de seus amigos compartilhou!</Text>
          <Input 
            value={codeReceipt} 
            onChangeText={(text) => setCodeReceipt(text)}
            InputLeftElement={<Icon as={<Lupe />} 
            ml="2"/>} 
            placeholder="Pesquisar" 
            w="100%" 
            borderColor={"#eaeaea"} 
            bgColor={"white"} 
            mt={4}
          />
          <Button bgColor={"#0b0c10"} h={"56px"} borderRadius={6} mt={4} onPress={()=>getReceiptByCodeInvite()}>
            <Text color={'white'} fontWeight={"normal"} fontSize={16}>Pesquisar</Text>
          </Button>
        </Stack>
        <FlatList data={receiptResponse} keyExtractor={(item) => item?.id} renderItem={({item}) =>
            <Box bgColor={"#ececec"} mt={4} mx={2} rounded={'md'} px={2} py={2}>
              <Link onPress={() => getParticipant({receiptId: item.id})}>
                <Stack direction={"column"} w={'full'}>
                  <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={1}>
                    <Stack direction={'row'} alignItems={"center"}>
                      <Receipt />
                      <Text color={"#000"} fontSize={16} fontWeight={"medium"} pl={2}>{item.name_receipt}</Text>
                    </Stack>
                    <Text>{item.created_at}</Text>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}mb={2}>
                    <Stack direction={'row'} alignItems={"center"}>
                      <Pin />
                      <Text color={"#575960"} fontSize={14} fontWeight={"normal"} pl={1}>{item.restaurant_name}</Text>
                    </Stack>
                    <Text>{item.status_receipt ? <Text color={"green.600"}>Aberta</Text> : <Text color={"red.600"}>Fechada</Text>}</Text>
                  </Stack>
                  <Text color={"#575960"} fontSize={14} fontWeight={"normal"}>Responsável: {item.owner_receipt}</Text>
                </Stack>
              </Link>
            </Box>
          }
        />
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>
                <Text fontSize={18} fontWeight={"medium"}>Entrar no recibo</Text>
            </AlertDialog.Header>
            <AlertDialog.Body>
                <Text fontSize={16} fontWeight={"normal"}>Tem certeza que deseja{' '}<Text fontWeight={"medium"}>entrar</Text> nesse recibo compartilhado?</Text>
            </AlertDialog.Body>
            <AlertDialog.Footer>
                <Button w={"80px"} h={"55px"} bgColor={"#fff"} borderRadius={6} onPress={() => navigation.goBack()}>
                    <Text fontSize={16} fontWeight={"normal"}>Não</Text>
                </Button>
                <Button w={"80px"} h={"55px"} ml={2} bgColor={"#0b0c10"} borderRadius={6} onPress={()=>{setParticipant()}}>
                    <Text color={"white"} fontSize={16} fontWeight={"normal"}>Sim</Text>
                </Button>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Box>
    </SafeAreaView>
  );
}