import { useEffect, useState } from "react";
import { Actionsheet, Avatar, Box, Button, Icon, Image, ScrollView, Stack, Text, useDisclose } from "native-base"
import { SafeAreaView } from "react-native"

import { supabase } from "../lib/supabse"

import Plus from "../assets/icons/Plus.svg"
import Percent from "../assets/icons/Percent.svg"
import Mic from "../assets/icons/Mic.svg"
import Clock from "../assets/icons/Clock.svg"
import Dots from "../assets/icons/Dots.svg"
import PencilEdit from "../assets/icons/PencilEdit.svg"
import Close from "../assets/icons/Close.svg"
import Share from "../assets/icons/Share.svg"
import ResumeReceipt from "../assets/icons/ResumeReceipt.svg"

export default function ReceiptDetails({ route, navigation }){
    //console.log('Id da receita vindo pela rota', route)
    const {isOpen, onOpen, onClose} = useDisclose()
    const [receiptId, setReceiptId] = useState()
    const [response, setResponse] = useState<any[]>([])

    async function getReceiptIdFromParams(){
      const R_id = route.params.receiptId || null
      setReceiptId(R_id)
      console.log('id receita:', route.params.receiptId)
      //console.log('id receita:', R_id)
    }

    async function getReceiptById(){  
      const { data, error } = await supabase
      .from('receipt')
      .select('*')
      .eq('id', receiptId)

      if(data == null){
        console.log('ta vindo nulo esta merda')
    }

      if(data !== null && data !== undefined){
          //n estou conseguindo passar a resposta para a contante 'response'
          setResponse(data)
          console.log(data)
      }
    }

    useEffect(()=>{

      getReceiptById()
      getReceiptIdFromParams()
    }, [])

    return(
        <SafeAreaView>
            <ScrollView>
                <Box bgColor={"#f5f7f9"}>
                    <Box m={2} p={2} bgColor={"#0b0c10"} rounded={"md"}>
                        <Stack direction={"column"}>
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <Stack direction={"column"}>
                                    <Text color={"white"} fontWeight={"medium"} fontSize={22}>name_receipt</Text>
                                    <Text color={"white"} fontWeight={"normal"} fontSize={14}>Responsável: owner_receipt</Text>
                                </Stack>
                                <Button bgColor={"#0b0c109-"} onPress={onOpen}>
                                    <Dots />
                                </Button>
                            </Stack>
                            <Stack direction={"column"} alignItems={"center"} mt={6}>
                                <Text color={"white"} fontWeight={"normal"} fontSize={14}>Custo todal da conta compartilhada</Text>
                                <Text color={"white"} fontWeight={"medium"} fontSize={30}>R$ R$ </Text>
                            </Stack>
                            <Button leftIcon={<Icon as={<Plus />}/>} bgColor={"#fff"} h={"56px"} borderRadius={6} mt={4} onPress={() => navigation.navigate('CostParcial')}>
                                <Text color={'#000'} fontWeight={"normal"} fontSize={16}>Adicionar valor</Text>
                            </Button>
                        </Stack>
                    </Box>

                    <Box mt={6} mx={2}>
                        <Stack direction={"column"}>
                            <Text color={"black"} fontWeight={"medium"} fontSize={22}>Informação geral da conta</Text>
                            <Box bg={"white"} px={2} py={4} rounded={"md"} my={1} alignItems={"center"}>
                                <Text color={"black"} fontWeight={"normal"} fontSize={14}>Seu consumo total</Text>
                                <Text color={"black"} fontWeight={"medium"} fontSize={30}>R$423,00</Text>
                            </Box>
                        </Stack>
                        <Stack direction={"row"} space={1} justifyContent={"space-between"}>
                            <Box w={"49%"} bg={"white"} px={2} py={4} rounded={"md"} mt={1} alignItems={"flex-start"}>
                                <Stack direction={"row"} alignItems={"center"} space={1}>
                                    <Percent />
                                    <Text color={"black"} fontWeight={"normal"} fontSize={14}>Taxa garçom</Text>
                                </Stack>
                                <Stack direction={"row"} alignItems={"center"} mt={2}>
                                    <Text color={"black"} fontWeight={"normal"} fontSize={16}>R$ </Text>
                                    <Percent />
                                </Stack>
                            </Box>

                            <Box w={"49%"} bg={"white"} px={2} py={4} rounded={"md"} mt={1} alignItems={"flex-start"}>
                                <Stack direction={"row"} alignItems={"center"} space={1}>
                                    <Mic />
                                    <Text color={"black"} fontWeight={"normal"} fontSize={14}>Cover</Text>
                                </Stack>
                                <Text color={"black"} fontWeight={"normal"} fontSize={16} mt={2}>R$ </Text>
                            </Box>
                        </Stack>
                    </Box>

                    <Box mt={6} mx={2}>
                        <Stack direction={"column"}>
                            <Text color={"black"} fontWeight={"medium"} fontSize={22}>Histórico da conta</Text>
                            <Box bg={"white"} px={2} py={2} rounded={"md"} mt={1}>
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
                                    <Text color={"black"} fontWeight={"normal"} fontSize={16}>Nome do produto</Text>
                                    <Text color={"black"} fontWeight={"normal"} fontSize={16}>preço</Text>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                    <Actionsheet isOpen={isOpen} onClose={onClose}>
                        <Actionsheet.Content>
                            <Box w="100%" h={60} px={2} justifyContent={"center"}>
                                <Text fontWeight={"medium"} fontSize={20} color={"#0b0c10"}>Opções da conta</Text>
                            </Box>
                            <Actionsheet.Item onPress={() => navigation.navigate('EditReceipt')}>
                                <Stack direction={"row"} alignItems={"center"} space={2}>
                                    <PencilEdit />
                                    <Text fontWeight={"normal"} fontSize={16}>Editar informações da conta</Text>
                                </Stack>
                            </Actionsheet.Item>
                            <Actionsheet.Item onPress={() => navigation.navigate('ShareReceipt')}>
                                <Stack direction={"row"} alignItems={"center"} space={2}>
                                    <Share />
                                    <Text fontWeight={"normal"} fontSize={16}>Compartilhar conta</Text>
                                </Stack>
                            </Actionsheet.Item>
                            <Actionsheet.Item onPress={() => navigation.navigate('ResumeReceipt')}>
                                <Stack direction={"row"} alignItems={"center"} space={2}>
                                    <ResumeReceipt />
                                    <Text fontWeight={"normal"} fontSize={16}>Resumo da sua conta</Text>
                                </Stack>
                            </Actionsheet.Item>
                            <Actionsheet.Item onPress={() => navigation.navigate('')}>
                                <Stack direction={"row"} alignItems={"center"} space={2}>
                                    <Close />
                                    <Text fontWeight={"normal"} fontSize={16} color={"#f72222"}>Encerrar a conta compartilhada</Text>
                                </Stack>
                            </Actionsheet.Item>
                        </Actionsheet.Content>
                    </Actionsheet>
                </Box>
            </ScrollView>
        </SafeAreaView>
    )
}