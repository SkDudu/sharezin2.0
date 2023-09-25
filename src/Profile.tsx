import { Avatar, Box, Button, Link, Stack, Text } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import UserBlack from "./../assets/icons/UserBlack.svg"
import Settings from "./../assets/icons/Settings.svg"

export default function Profile({navigation}){
    return(
        <SafeAreaView>
            <Box bgColor={"#f5f7f9"} mx={2}>
                <Stack direction={"column"} justifyContent={"space-between"} h={"full"}>
                    <Stack direction={"column"} space={2}>
                        <Text fontWeight={"medium"} fontSize={24} mt={4}>Perfil</Text>
                        <Stack direction={"row"} space={2} mt={4}>
                            <Avatar size={10} source={{uri: "https://images.unsplash.com/photo-1474447976065-67d23accb1e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1285&q=80"}} />
                            <Text fontStyle={"normal"} fontSize={22}>Nome do usuário</Text>
                        </Stack>
                        <Stack direction={"column"} space={2}>
                            <Button h={"48px"} bgColor={"#fff"} borderRadius={6} justifyContent={"flex-start"} onPress={() => navigation.navigate('')}>
                                <Stack direction={"row"} alignItems={"center"} space={2}>
                                    <UserBlack />
                                    <Text color={"black"} fontWeight={"normal"} fontSize={16}>Meus dados</Text>
                                </Stack>
                            </Button>

                            <Button h={"48px"} bgColor={"#fff"} mb={4} borderRadius={6} justifyContent={"flex-start"} onPress={() => navigation.navigate('Config')}>
                                <Stack direction={"row"} alignItems={"center"} space={2}>
                                    <Settings />
                                    <Text color={"black"} fontWeight={"normal"} fontSize={16}>Configurações</Text>
                                </Stack>
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </SafeAreaView>
    )
}