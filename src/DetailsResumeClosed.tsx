import react, { useEffect, useState } from "react"
import { Avatar, Box, Button, Divider, FlatList, ScrollView, Stack, Text } from "native-base"
import { Alert, SafeAreaView } from "react-native"

import { supabase } from "../lib/supabse"

import Percent from "../assets/icons/Percent.svg"
import Mic from "../assets/icons/Mic.svg"
import ClockGray from "../assets/icons/ClockGray.svg"

export default function DetailsResumeClosed({route, navigation}){
    //console.log(route)
    const [receiptId, setReceiptId] = useState()
    const [totalCost, setCostTotal] = useState()
    const [totalCostFormat, setCostFormat] = useState()
    const [response, setResponse] = useState<any[]>([])
    const [historicData, setHistoricData] = useState<any[]>([])
    
    async function getReceiptIdFromParams(){
        const R_id = route.params.receiptId || null
        setReceiptId(R_id)
        //console.log('id receita:', route.params.receiptId)
        //console.log('id receita:', R_id)
    }
    
    async function getReceiptById(){  
        const RID = receiptId || null
        if(RID !== null && RID !== undefined){
          const { data, error } = await supabase
          .from('receipt')
          .select('*')
          .eq('id', receiptId)
  
          if(data == null){
            console.log('ta vindo nulo esta merda')
          }

          if(error){
            Alert.alert(error)
          }
  
          if(data || null){
            setResponse(data)
            //console.log('Dados da receita:', data)
          }
        }
      }

      async function gethistoricsCostParcialByUserId(){
        const RID = receiptId ? receiptId : null
        if( RID !== null && RID !== undefined){
          const { data, error } = await supabase
          .from('historic')
          .select('*')
          .eq('receipt_id', RID)
          .eq('user', route.params.userId)
  
          if(error){
            console.log(error)
          }
  
          if(data == null){
            console.log('vindo nulo o custo')
          }

          setHistoricData(data)
        }
      }

    useEffect(()=>{
        getReceiptIdFromParams()
        getReceiptById()
        gethistoricsCostParcialByUserId()
    }, [receiptId])

    const name_receipt = response[0]?.name_receipt

    return(
        <SafeAreaView>
            <ScrollView>
                <Box bgColor={"#f5f7f9"} mx={2} h={"full"} justifyContent={"space-between"}>
                    <Stack direction={"column"} space={2}>
                        <Box mt={4}>
                            <Stack direction={"row"} space={2} alignItems={"center"}>
                                <Avatar size={12} source={{uri: "https://images.unsplash.com/photo-1474447976065-67d23accb1e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1285&q=80"}} />
                                <Stack direction={"column"}>
                                    <Text fontSize={22} fontWeight={"medium"}>{name_receipt}</Text>
                                    <Text fontSize={14} fontWeight={"normal"}>Responsável: Fulano</Text>
                                </Stack>
                            </Stack>
                        </Box>
                        <Box bgColor={'#ececec'} rounded={"sm"} p={2}>
                            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                <Text fontSize={14} color={'#787e8a'}>Data de emissão:</Text>
                                <Text fontSize={14} color={'#787e8a'}>00/00/0000</Text>
                            </Stack>
                            <Divider my={2}/>
                            <Stack direction={"column"}>
                                <Text fontSize={16} color={'black'}>Itens</Text>
                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Text color={'#575960'}>Product_name</Text>
                                    <Text color={'#575960'}>price</Text>
                                </Stack>
                            </Stack>
                            <Divider my={2}/>
                            <Stack direction={"column"}>
                                <Text fontSize={16} color={'black'}>Detalhes do pagamento</Text>
                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Text color={'#575960'}>Subtotal</Text>
                                    <Text color={'#575960'}>price</Text>
                                </Stack>
                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Text color={'#575960'}>Taxa</Text>
                                    <Text color={'#575960'}>price</Text>
                                </Stack>
                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Text color={'#575960'}>Cover</Text>
                                    <Text color={'#575960'}>price</Text>
                                </Stack>
                                <Box bgColor={"#0b0c10"} rounded={"md"} px={2} mt={4}>
                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Text fontSize={18} fontWeight={"normal"} color={"white"}>Total</Text>
                                    <Text fontSize={20} fontWeight={"medium"} color={"white"}>R$ 124.34</Text>
                                </Stack>
                            </Box>
                            </Stack>
                        </Box>
                    </Stack>
                    <Button bgColor={"coolGray.600"} h={"56px"} borderRadius={6} mt={4} mb={10} onPress={() => navigation.navigate('Home')}>
                        <Text color={'#fff'} fontWeight={"normal"} fontSize={16}>Voltar para o início</Text>
                    </Button>
                </Box>
            </ScrollView>
        </SafeAreaView>
    )
}