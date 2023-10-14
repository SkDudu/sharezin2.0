import React, { useEffect, useState } from "react"
import { AlertDialog, Avatar, Box, Button, FlatList, ScrollView, Stack, Text } from "native-base"
import { Alert, SafeAreaView } from "react-native"

import { supabase } from "../lib/supabse"

import Percent from "../assets/icons/Percent.svg"
import Mic from "../assets/icons/Mic.svg"
import ClockGray from "../assets/icons/ClockGray.svg"

export default function ResumeReceipt({route, navigation}){
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    console.log(route)
    const [receiptId, setReceiptId] = useState()
    const [userId, setuserId] = useState()
    const [totalCostNumber, setCostTotalNumber] = useState()
    const [totalCost, setCostTotal] = useState()
    const [totalCostFormat, setCostFormat] = useState()
    const [response, setResponse] = useState<any[]>([])
    const [historicData, setHistoricData] = useState<any[]>([])

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    
    async function getReceiptIdFromParams(){
        const R_id = route.params.receiptId || null
        const userId = route.params.userId
        setReceiptId(R_id)
        setuserId(userId)
    }

    async function calcCostTotalWithTaxes(){
        const costParcial = route.params.costTotal

        if(costParcial == 0){
            setCostTotal(formatter.format(costParcial));
        } else {
            let taxCover = route.params.taxCover
            let taxGarcom = route.params.taxGarcom / 100

            let totalCost = costParcial + (costParcial * taxGarcom) + taxCover
            
            setCostTotal(formatter.format(totalCost)); /* $2,500.00 */
            setCostFormat(formatter.format(costParcial));
            setCostTotalNumber(totalCost)
        }
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
          }
        }
      }

      async function setParticipantStatus(){ 
        const user = userId || null 
        const RID = receiptId || null
        if(RID !== null && RID !== undefined && user !== null && user !== undefined){
          const { data, error } = await supabase
          .from('participant')
          .update({ is_closed: true, cost: totalCostNumber })
          .eq('receipt_id', receiptId)
          .eq('user', userId)
          .select('*')
  
          if(data == null){
            console.log('ta vindo nulo esta merda')
          }

          if(error){
            Alert.alert(error)
          }
  
          if(data || null){
            navigation.navigate('DetailsResumeClosed', {receiptId: receiptId, userId: route.params.userId})
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
        calcCostTotalWithTaxes()
    }, [receiptId])

    const name_receipt = response[0]?.name_receipt
    const tax_cover = formatter.format(response[0]?.tax_cover)
    const tax_garcom = response[0]?.tax_garcom

    return(
        <SafeAreaView>
            <ScrollView>
                <Box bgColor={"#f5f7f9"} mx={2} h={"full"} justifyContent={"space-between"}>
                    <Stack direction={"column"}>
                        <Box mt={4}>
                            <Stack direction={"row"} space={2} alignItems={"center"}>
                                <Avatar size={12} source={{uri: "https://images.unsplash.com/photo-1474447976065-67d23accb1e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1285&q=80"}} />
                                <Stack direction={"column"}>
                                    <Text fontSize={22} fontWeight={"medium"}>{name_receipt}</Text>
                                    <Text fontSize={14} fontWeight={"normal"}>Responsável: Fulano</Text>
                                </Stack>
                            </Stack>
                            <Box bgColor={"coolGray.600"} rounded={"md"} p={4} mt={4}>
                                <Stack direction={"column"} alignItems={"center"}>
                                    <Text fontSize={14} fontWeight={"normal"} color={"white"}>Seu custo</Text>
                                    <Text fontSize={24} fontWeight={"medium"} color={"white"}>{totalCostFormat}</Text>
                                </Stack>
                            </Box>
                            <Box bgColor={"white"} mt={2} p={2} rounded={"md"} borderColor={"#eaeaea"}>
                                <Stack direction={"row"} justifyContent={"space-between"}>
                                    <Stack direction={"row"} space={1} alignItems={"center"}>
                                        <Percent />
                                        <Text fontSize={16} fontWeight={"normal"}>Taxa garçom</Text>
                                    </Stack>
                                    <Text fontSize={16} fontWeight={"normal"}>{tax_garcom}%</Text>
                                </Stack>
                            </Box>
                            <Box bgColor={"white"} mt={2} p={2} rounded={"md"} borderColor={"#eaeaea"}>
                                <Stack direction={"row"} justifyContent={"space-between"}>
                                    <Stack direction={"row"} space={1} alignItems={"center"}>
                                        <Mic />
                                        <Text fontSize={16} fontWeight={"normal"}>Cover</Text>
                                    </Stack>
                                    <Text fontSize={16} fontWeight={"normal"}>{tax_cover}</Text>
                                </Stack>
                            </Box>
                            <Box bgColor={'#0b0c10'} mt={2} p={2} rounded={"md"} borderColor={"#eaeaea"}>
                                <Stack direction={"row"} justifyContent={"space-between"}>
                                    <Stack direction={"row"} space={1} alignItems={"center"}>
                                        <Text color={"white"} fontSize={16} fontWeight={"normal"}>Custo final</Text>
                                    </Stack>
                                    <Text color={"white"} fontSize={16} fontWeight={"normal"}>{totalCost}</Text>
                                </Stack>
                            </Box>
                            <Box mt={4}>
                                <Stack direction={"column"}>
                                    <Text fontSize={22} fontWeight={"normal"}>Histórico</Text>
                                    <FlatList horizontal={false} data={historicData} keyExtractor={(item) => item?.id} renderItem={({item})=> 
                                        <Box bgColor={"white"} mt={2} p={2} rounded={"md"} borderColor={"#eaeaea"}>
                                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                            <Stack direction={"row"} alignItems={"center"} space={4}>
                                                <Stack direction={"column"}>
                                                    <Stack direction={"row"} alignItems={"center"} space={1}>
                                                        <ClockGray />
                                                        <Text fontSize={14} fontWeight={"normal"} color={"#727272"}>{item.created_at}</Text>
                                                    </Stack>
                                                    <Text fontSize={14} fontWeight={"normal"}>{item.product_name}</Text>
                                                </Stack>
                                            </Stack>
                                            <Text fontSize={16} fontWeight={"normal"}>{formatter.format(item.cost_parcial)}</Text>
                                        </Stack>
                                    </Box>
                                    }/>
                                </Stack>
                            </Box>
                        </Box>
                    </Stack>
                    <Button bgColor={"#eb5757"} h={"56px"} borderRadius={6} mt={4} mb={10} onPress={() => setIsOpen(!isOpen)}>
                        <Text color={'#fff'} fontWeight={"normal"} fontSize={16}>Finalizar minha conta</Text>
                    </Button>
                </Box>
            </ScrollView>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>
                        <Text fontSize={18} fontWeight={"medium"}>Finalizar sua conta</Text>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                        <Text fontSize={16} fontWeight={"normal"}>Tem certeza que deseja{' '}<Text fontWeight={"medium"}>finalizar</Text> sua conta?</Text>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button w={"80px"} h={"55px"} bgColor={"#fff"} borderRadius={6} onPress={() => navigation.goBack()}>
                            <Text fontSize={16} fontWeight={"normal"}>Não</Text>
                        </Button>
                        <Button w={"80px"} h={"55px"} ml={2} bgColor={"#0b0c10"} borderRadius={6} onPressOut={()=>setParticipantStatus()}>
                            <Text color={"white"} fontSize={16} fontWeight={"normal"}>Sim</Text>
                        </Button>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </SafeAreaView>
    )
}