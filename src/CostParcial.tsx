import react, { useEffect, useState } from "react"
import { Box, Button, Input, Stack, Text } from "native-base"
import { Alert, SafeAreaView } from "react-native"
import { supabase } from "../lib/supabse"

export default function CostParcial({route, navigation}){
    //console.log('Id da receita vindo pela rota', route)
    const [costParticipant, setCostParticipant] = useState('')
    const [username, setUsername] = useState('')
    const [productName, setProductName] = useState('')
    const [costProduct, setCostProducte] = useState('')

    const date = new Date()
    const hour = date.getHours();
    const minute = date.getMinutes();

    async function getUserInfo(){
        const {data, error} = await supabase
        .from('users')
        .select('name_user')
        .eq('id', route.params.userId)

        if(data == null && data == undefined){
            Alert.alert(error)
        } else {
            setUsername(data[0].name_user)
        }
    }

    async function getParticipant(){
        const { data, error } = await supabase
        .from('participant')
        .select() 
        .eq('user', route.params.userId)

        if(data == null && data == undefined){
            Alert.alert(error)
        } else {
            setCostParticipant(data)
        }
    }

    async function addCostInReceipt(){
        const {error} = await supabase
        .from('historic')
        .insert({
            user: route.params.userId,
            receipt_id: route.params.receiptId,
            cost_parcial: costProduct,
            product_name: productName,
            created_at: (`${hour}:${minute}`),
            username: username
        })

        if(error){
            console.log(error)
        }

        if(!error){
            navigation.navigate('ReceiptDetails', {receiptId: route.params.receiptId, userId: route.params.userId})
        }
    }

    useEffect(()=>{
        getUserInfo()
        getParticipant()
    }, [])

    return(
        <SafeAreaView>
            <Box bgColor={"#f5f7f9"} h={"full"} justifyContent={"space-between"}>
                <Stack direction={"column"}>
                    <Box bgColor={"#0b0c10"} mx={2} mt={2} rounded={"md"} p={2}>
                        <Stack direction={"column"} alignItems={"center"}>
                            <Text color={"white"} fontWeight={"normal"} fontSize={14}>Sua parte da conta compartilhada até agora</Text>
                            <Text color={"white"} fontWeight={"medium"} fontSize={22}>{route.params.costTotal}</Text>
                        </Stack>
                    </Box>

                    <Box bgColor={"#fff"} mx={2} mt={2} rounded={"md"} p={2}>
                        <Stack direction={"column"} alignItems={"start"} space={1}>
                            <Text color={"#575960"} fontWeight={"normal"} fontSize={14}>Nome do produto</Text>
                            <Input 
                                value={productName} 
                                onChangeText={(text) => setProductName(text)}
                                placeholder="" 
                                w="100%" 
                                borderColor={"#eaeaea"} 
                                bgColor={"white"} 
                                mb={3}
                            />
                        </Stack>

                        <Stack direction={"column"} alignItems={"start"} space={1}>
                            <Text color={"#575960"} fontWeight={"normal"} fontSize={14}>Custo do produto</Text>
                            <Input 
                                inputMode="numeric"
                                value={costProduct} 
                                onChangeText={(text) => setCostProducte(text)}
                                placeholder="" 
                                w="100%" 
                                borderColor={"#eaeaea"} 
                                bgColor={"white"}
                            />
                        </Stack>
                    </Box>
                </Stack>
                <Button mx={2} bgColor={"#0b0c10"} h={"56px"} borderRadius={6} mb={6} onPress={() => addCostInReceipt()}>
                    <Text color={'white'} fontWeight={"normal"} fontSize={16}>Adicionar valor</Text>
                </Button>
            </Box>
        </SafeAreaView>
    )
}