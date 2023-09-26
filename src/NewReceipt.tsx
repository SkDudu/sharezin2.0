import React, { useEffect, useState } from "react"
import { AlertDialog, Box, Button, Icon, Input, Stack, Text } from "native-base"
import { SafeAreaView } from "react-native"

import ReceiptOutlineSmall from "../assets/icons/ReceiptOutlineSmall.svg"
import Fork from "../assets/icons/Fork.svg"
import Percent from "../assets/icons/Percent.svg"
import Mic from "../assets/icons/Mic.svg"
import Qrcode from "../assets/icons/Qrcode.svg"
import { supabase } from "../lib/supabse"

export default function NewReceipt({route, navigation}){
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    const [userId, setUserId] = useState()
    const [userName, setUserName] = useState()

    const [receiptName, setReceiptName] = useState('')
    const [restaurenteName, setRestaurenteName] = useState('')
    const [taxGarcom, setTaxGarcom] = useState('')
    const [taxCover, setTaxCover] = useState('')
    const [CodeInvite, setCodeInvite] = useState('')

    async function getSession(){ 
    const { data: { user } } = await supabase.auth.getUser()
    setUserId(user?.id)
    //console.log('seesion user id: ', user?.id)
    }

    async function addReceipt(){ 
        const { data, error } = await supabase
        .from('receipt')
        .insert({
            name_receipt: receiptName,
            restaurant_name: restaurenteName,
            tax_garcom: taxGarcom,
            tax_cover: taxCover,
            codeInvite: CodeInvite,
            const_total: 0,
            status_receipt: true,
            user: userId,
        })
        .select()
        
        if(data){
            await supabase
            .from('participant')
            .insert({
                user: route.params.userId,
                cost: 0,
                receipt_id: data[0].id,
                is_closed: false,
                is_owner: true
            })
        }

        if(error){
            console.log(error)
        }

        navigation.navigate('Home')
    }

    useEffect(()=>{
        getSession()
    })

    return(
        <SafeAreaView>
            <Box bgColor={"#f5f7f9"} p={2}>
                <Stack direction={"column"} justifyContent={"space-between"} h={"full"}>
                    <Stack direction={"column"} space={2}>
                        <Text fontSize={16} fontWeight={"normal"} mb={2}>Insira as informações para criar um recibo compartilhado!</Text>
                        <Input 
                            value={receiptName} 
                            onChangeText={(text) => setReceiptName(text)}
                            InputLeftElement={<Icon as={<ReceiptOutlineSmall />} ml="2"/>} 
                            placeholder="Nome da conta" 
                            w="100%" 
                            borderColor={"#eaeaea"} 
                            bgColor={"white"}
                        />
                        <Input 
                            value={restaurenteName} 
                            onChangeText={(text) => setRestaurenteName(text)}
                            InputLeftElement={<Icon as={<Fork />} ml="2"/>} 
                            placeholder="Nome do restaurante" 
                            w="100%" 
                            borderColor={"#eaeaea"} 
                            bgColor={"white"}
                        />
                        <Input 
                            value={taxGarcom} 
                            onChangeText={(text) => setTaxGarcom(text)}
                            InputLeftElement={<Icon as={<Percent />} ml="2"/>} 
                            placeholder="Taxa do garçom" 
                            w="100%" 
                            borderColor={"#eaeaea"} 
                            bgColor={"white"}
                        />
                        <Input 
                            value={taxCover} 
                            onChangeText={(text) => setTaxCover(text)}
                            InputLeftElement={<Icon as={<Mic />} ml="2"/>} 
                            placeholder="Taxa do cover" 
                            w="100%" 
                            borderColor={"#eaeaea"} 
                            bgColor={"white"}
                        />
                        <Input 
                            value={CodeInvite} 
                            onChangeText={(text) => setCodeInvite(text)}
                            InputLeftElement={<Icon as={<Qrcode />} ml="2"/>} 
                            placeholder="Código de compartilhamento" 
                            w="100%" 
                            borderColor={"#eaeaea"} 
                            bgColor={"white"}
                        />
                    </Stack>
                    <Stack direction={"column"} space={2}>
                        <Button bgColor={"#0b0c10"} h={"56px"} borderRadius={6} onPress={() => setIsOpen(!isOpen)}>
                            <Text color={'white'} fontWeight={"normal"} fontSize={16}>Criar recibo</Text>
                        </Button>
                        <Button bgColor={"#fff"} h={"56px"} borderRadius={6} mb={6} onPress={() => navigation.navigate('Home')}>
                            <Text color={'black'} fontWeight={"normal"} fontSize={16}>Cancelar</Text>
                        </Button>
                    </Stack>
                </Stack>
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                    <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>
                            <Text fontSize={18} fontWeight={"medium"}>Criar conta compartilhada</Text>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <Text fontSize={16} fontWeight={"normal"}>Tem certeza que deseja{' '}<Text fontWeight={"medium"}>criar</Text> conta compartilhada?</Text>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button w={"80px"} h={"55px"} bgColor={"#fff"} borderRadius={6} onPress={() => navigation.navigate('Home')}>
                                <Text fontSize={16} fontWeight={"normal"}>Não</Text>
                            </Button>
                            <Button w={"80px"} h={"55px"} ml={2} bgColor={"#0b0c10"} borderRadius={6} onPress={() => addReceipt()}>
                                <Text color={"white"} fontSize={16} fontWeight={"normal"}>Sim</Text>
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
            </Box>
        </SafeAreaView>
    )
}