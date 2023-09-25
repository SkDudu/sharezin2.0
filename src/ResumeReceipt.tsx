import react from "react"
import { Actionsheet, Avatar, Box, Button, Icon, Image, ScrollView, Stack, Text, useDisclose } from "native-base"
import { SafeAreaView } from "react-native"

import Percent from "../assets/icons/Percent.svg"
import Mic from "../assets/icons/Mic.svg"
import ClockGray from "../assets/icons/ClockGray.svg"

export default function ResumeReceipt({navigation}){
    return(
        <SafeAreaView>
            <ScrollView>
                <Box bgColor={"#f5f7f9"} mx={2} h={"full"} justifyContent={"space-between"}>
                    <Stack direction={"column"}>
                        <Box mt={4}>
                            <Stack direction={"row"} space={2} alignItems={"center"}>
                                <Avatar size={12} source={{uri: "https://images.unsplash.com/photo-1474447976065-67d23accb1e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1285&q=80"}} />
                                <Stack direction={"column"}>
                                    <Text fontSize={22} fontWeight={"medium"}>Nome da receita</Text>
                                    <Text fontSize={14} fontWeight={"normal"}>Responsável: Fulano</Text>
                                </Stack>
                            </Stack>
                            <Box bgColor={"#0b0c10"} rounded={"md"} p={4} mt={4}>
                                <Stack direction={"column"} alignItems={"center"}>
                                    <Text fontSize={14} fontWeight={"normal"} color={"white"}>Seu custo</Text>
                                    <Text fontSize={24} fontWeight={"medium"} color={"white"}>R$ 14,00</Text>
                                </Stack>
                            </Box>
                            <Box bgColor={"white"} mt={2} p={2} rounded={"md"} borderColor={"#eaeaea"}>
                                <Stack direction={"row"} justifyContent={"space-between"}>
                                    <Stack direction={"row"} space={1} alignItems={"center"}>
                                        <Percent />
                                        <Text fontSize={16} fontWeight={"normal"}>Taxa garçom</Text>
                                    </Stack>
                                    <Text fontSize={16} fontWeight={"normal"}>10%</Text>
                                </Stack>
                            </Box>
                            <Box bgColor={"white"} mt={2} p={2} rounded={"md"} borderColor={"#eaeaea"}>
                                <Stack direction={"row"} justifyContent={"space-between"}>
                                    <Stack direction={"row"} space={1} alignItems={"center"}>
                                        <Mic />
                                        <Text fontSize={16} fontWeight={"normal"}>Cover</Text>
                                    </Stack>
                                    <Text fontSize={16} fontWeight={"normal"}>R$15,00</Text>
                                </Stack>
                            </Box>
                            <Box mt={4}>
                                <Stack direction={"column"}>
                                    <Text fontSize={22} fontWeight={"normal"}>Histórico</Text>
                                    <Box bgColor={"white"} mt={2} p={2} rounded={"md"} borderColor={"#eaeaea"}>
                                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                            <Stack direction={"row"} alignItems={"center"} space={4}>
                                                <Stack direction={"column"}>
                                                    <Stack direction={"row"} alignItems={"center"} space={1}>
                                                        <ClockGray />
                                                        <Text fontSize={14} fontWeight={"normal"} color={"#727272"}>22:30</Text>
                                                    </Stack>
                                                    <Text fontSize={14} fontWeight={"normal"}>Nome do produto</Text>
                                                </Stack>
                                            </Stack>
                                            <Text fontSize={16} fontWeight={"normal"}>R$52,85</Text>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>
                    </Stack>
                    <Button bgColor={"#eb5757"} h={"56px"} borderRadius={6} mt={4} onPress={() => navigation.navigate('')}>
                        <Text color={'#fff'} fontWeight={"normal"} fontSize={16}>Finalizar minha conta</Text>
                    </Button>
                </Box>
            </ScrollView>
        </SafeAreaView>
    )
}