import { useEffect, useState } from "react";
import { Avatar, Box, Button, FlatList, Icon, Image, ScrollView, Stack, Text, useDisclose } from "native-base"
import { SafeAreaView } from "react-native"

import Percent from "../assets/icons/Percent.svg"
import Mic from "../assets/icons/Mic.svg"
import Clock from "../assets/icons/Clock.svg"
import Dots from "../assets/icons/Dots.svg"
import { supabase } from "../lib/supabse"

export default function ReceiptDetailsClosed({route, navigation}){
    const {isOpen, onOpen, onClose} = useDisclose()
    const [receiptId, setReceiptId] = useState()
    const [costTotal, setCostTotal] = useState<any[]>([])
    const [response, setResponse] = useState<any[]>([])
    const [historictData, setHistoricData] = useState<any[]>([])

    async function getReceiptIdFromParams(){
      const R_id = route.params.receiptId || null
      setReceiptId(R_id)
      //console.log('id receita:', route.params.receiptId)
      //console.log('id receita:', R_id)
    }

    async function getParticipantOwner(){
      const user = route.params.userId
      const { data, error } = await supabase
      .from('participant')
      .select() 
      .eq('user', user)

      if(data[0]?.user == user && data[0].is_owner == true){
        return user
      }
    }

    async function getReceiptById(){  
      const RID = receiptId ? receiptId : null
      if(RID !== null && RID !== undefined){
        const { data, error } = await supabase
        .from('receipt')
        .select('*')
        .eq('id', receiptId)

        if(data == null){
          console.log('ta vindo nulo esta merda')
        }

        if(data || null){
            setResponse(data)
        }
      }
    }

    async function gethistoricsByReceiptId(){
      const RID = receiptId ? receiptId : null
      if( RID !== null && RID !== undefined){
        const { data, error } = await supabase
        .from('historic')
        .select('*')
        .eq('receipt_id', receiptId)

        if(data == null){
          console.log('vindo nulo o histórico', data)
        }

        if(data || null){
          setHistoricData(data)
        }
      }
    }

    async function gethistoricsCostParcialByReceiptId(){
        const RID = receiptId ? receiptId : null
        if( RID !== null && RID !== undefined){
          const { data, error } = await supabase
          .from('historic')
          .select(
            `
              cost_parcial
            `
          )
          .eq('receipt_id', receiptId)
  
          if(error){
            console.log(error)
          }
  
          if(data == null){
            console.log('vindo nulo o custo', data)
          }
  
          if(data || null){
            let values = data?.map(a => a.cost_parcial);
            let sum = 0
            for(let i=0; i<values?.length; i++){
              sum = sum+values[i]
            }
  
            const formatter = new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            });
            
            setCostTotal(formatter.format(sum)); /* $2,500.00 */
          }
        }
      }

    useEffect(()=>{
      getReceiptIdFromParams()
      getReceiptById()
      getParticipantOwner()
      gethistoricsByReceiptId()
      gethistoricsCostParcialByReceiptId()
    }, [receiptId])

    const name_receipt = response[0]?.name_receipt
    const owner_receipt = response[0]?.owner_receipt
    const const_total = response[0]?.const_total
    const tax_cover = response[0]?.tax_cover 
    const tax_garcom = response[0]?.tax_garcom 

    return(
        <SafeAreaView>
            <ScrollView>
                <Box bgColor={"#f5f7f9"}>
                    <Box m={2} p={2} bgColor={"#0b0c10"} rounded={"md"}>
                        <Stack direction={"column"}>
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <Stack direction={"column"}>
                                    <Text color={"white"} fontWeight={"medium"} fontSize={22}>{name_receipt}</Text>
                                    <Text color={"white"} fontWeight={"normal"} fontSize={14}>{owner_receipt}</Text>
                                </Stack>
                            </Stack>
                            <Stack direction={"column"} alignItems={"center"} mt={6}>
                                <Text color={"white"} fontWeight={"normal"} fontSize={14}>Custo todal da conta compartilhada</Text>
                                <Text color={"white"} fontWeight={"medium"} fontSize={30}>{costTotal}</Text>
                            </Stack>
                        </Stack>
                    </Box>

                    <Box mt={6} mx={2}>
                        <Stack direction={"column"}>
                            <Text color={"black"} fontWeight={"medium"} fontSize={22}>Informação geral da conta</Text>
                            <Box bg={"white"} px={2} py={4} rounded={"md"} mt={1} alignItems={"center"}>
                                <Text color={"black"} fontWeight={"normal"} fontSize={14}>Seu consumo total</Text>
                                <Text color={"black"} fontWeight={"medium"} fontSize={30}>R$ 423,00</Text>
                            </Box>
                        </Stack>
                        <Stack direction={"row"} space={1} justifyContent={"space-between"}>
                            <Box w={"49%"} bg={"white"} px={2} py={4} rounded={"md"} mt={1} alignItems={"flex-start"}>
                                <Stack direction={"row"} alignItems={"center"} space={1}>
                                    <Percent />
                                    <Text color={"black"} fontWeight={"normal"} fontSize={14}>Taxa garçom</Text>
                                </Stack>
                                <Stack direction={"row"} alignItems={"center"} mt={2}>
                                    <Text color={"black"} fontWeight={"normal"} fontSize={16}>{tax_garcom}</Text>
                                    <Percent />
                                </Stack>
                            </Box>

                            <Box w={"49%"} bg={"white"} px={2} py={4} rounded={"md"} mt={1} alignItems={"flex-start"}>
                                <Stack direction={"row"} alignItems={"center"} space={1}>
                                    <Mic />
                                    <Text color={"black"} fontWeight={"normal"} fontSize={14}>Cover</Text>
                                </Stack>
                                <Text color={"black"} fontWeight={"normal"} fontSize={16} mt={2}>R${tax_cover}</Text>
                            </Box>
                        </Stack>
                    </Box>

                    <Box mt={6} mx={2}>
                        <Stack direction={"column"}>
                            <Text color={"black"} fontWeight={"medium"} fontSize={22}>Histórico da conta</Text>
                            <FlatList horizontal={false} data={historictData} keyExtractor={(item) => item?.id} renderItem={({item})=>
                                <Box bg={"white"} px={2} py={2} rounded={"md"} mt={1} mb={2}>
                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Stack direction={"row"} alignItems={"center"} space={2}>
                                        <Avatar size={8} source={{uri: "https://images.unsplash.com/photo-1474447976065-67d23accb1e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1285&q=80"}} />
                                        <Text color={"black"} fontWeight={"medium"} fontSize={18}>Nome do usuário</Text>
                                    </Stack>
                                    <Stack direction={"row"} alignItems={"center"} space={1}>
                                        <Clock size={8} />
                                        <Text color={"black"} fontWeight={"normal"} fontSize={14}>22:34</Text>
                                    </Stack>
                                </Stack>

                                <Stack direction={"row"} alignItems={"center"} space={2} mt={2} justifyContent={"space-between"}>
                                    <Text color={"black"} fontWeight={"normal"} fontSize={16}>{item.product_name}</Text>
                                    <Text color={"black"} fontWeight={"normal"} fontSize={16}>R$ {item.cost_parcial}</Text>
                                </Stack>
                                </Box>}
                            />
                        </Stack>
                    </Box>
                </Box>
            </ScrollView>
        </SafeAreaView>
    )
}