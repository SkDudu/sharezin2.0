import react, { useEffect, useState } from "react"
import { Box, Button, Input, Stack, Text } from "native-base"
import { SafeAreaView } from "react-native"
import { supabase } from "../lib/supabse"

export default function CostParcial({route, navigation}){
    //console.log('Id da receita vindo pela rota', route)
    const [productName, setProductName] = useState('')
    const [costProduct, setCostProducte] = useState('')

    async function addCostInReceipt(){
        const {error} = await supabase
        .from('historic')
        .insert({
            user: route.params.userId,
            receipt_id: route.params.receiptId,
            cost_parcial: costProduct,
            product_name: productName
        })

        if(error){
            console.log(error)
        }

        if(!error){
            navigation.navigate('ReceiptDetails', {receiptId: route.params.receiptId, userId: route.params.userId})
        }
    }

    return(
        <SafeAreaView>
            <Box bgColor={"#f5f7f9"} h={"full"} justifyContent={"space-between"}>
                <Stack direction={"column"}>
                    <Box bgColor={"#0b0c10"} mx={2} mt={2} rounded={"md"} p={2}>
                        <Stack direction={"column"} alignItems={"center"}>
                            <Text color={"white"} fontWeight={"normal"} fontSize={14}>Sua parte da conta compartilhada até agora</Text>
                            <Text color={"white"} fontWeight={"medium"} fontSize={22}>R$ 14,00</Text>
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