import react from "react"
import { Box, Button, Input, Stack, Text } from "native-base"
import { SafeAreaView } from "react-native"

export default function CostParcial({navigation}){
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
                            <Input placeholder="" w="100%" borderColor={"#eaeaea"} bgColor={"white"} mb={3}/>
                        </Stack>

                        <Stack direction={"column"} alignItems={"start"} space={1}>
                            <Text color={"#575960"} fontWeight={"normal"} fontSize={14}>Custo do produto</Text>
                            <Input placeholder="" w="100%" borderColor={"#eaeaea"} bgColor={"white"}/>
                        </Stack>
                    </Box>
                </Stack>
                <Button mx={2} bgColor={"#0b0c10"} h={"56px"} borderRadius={6} mb={6} onPress={() => navigation.navigate('Home')}>
                    <Text color={'white'} fontWeight={"normal"} fontSize={16}>Adicionar valor</Text>
                </Button>
            </Box>
        </SafeAreaView>
    )
}