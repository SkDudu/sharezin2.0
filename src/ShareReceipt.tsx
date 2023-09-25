import { Alert, Avatar, Box, Button, Icon, Stack, Text } from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";

import * as Clipboard from 'expo-clipboard';

import Copy from "../assets/icons/Copy.svg"

export default function ShareReceipt({navigation}){
    const [copiedText, setCopiedText] = React.useState('');

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync('Code invite');
    };

    const fetchCopiedText = async () => {
        const text = await Clipboard.getStringAsync();
        setCopiedText(text);
    };

    return(
        <SafeAreaView>
            <Box bgColor={"#f5f7f9"} mx={2}>
                <Stack direction={"column"} h={"full"} justifyContent={"space-between"}>
                    <Stack direction={"column"} justifyContent={"space-between"} space={4}>
                        <Box bgColor={"#0b0c10"} mt={2} rounded={"md"} p={2}>
                            <Stack direction={"column"} space={2} p={2}>
                                <Text color={"white"} fontWeight={"normal"} fontSize={18}>Nome da conta compartilhada</Text>
                                <Stack direction={"row"} space={2} alignItems={"center"}>
                                    <Avatar size={6} source={{uri: "https://images.unsplash.com/photo-1474447976065-67d23accb1e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1285&q=80"}} />
                                    <Text color={"white"} fontWeight={"normal"} fontSize={16}>Nome do usuário</Text>
                                </Stack>
                            </Stack>
                        </Box>
                        <Box bgColor={"#ececec"} rounded={"md"} p={2}>
                            <Stack direction={"column"} space={4}>
                                <Text fontSize={16} fontWeight={'medium'} textAlign={"center"}>Código de acesso para compartilhar</Text>
                                <Text fontSize={22} fontWeight={'medium'} textAlign={"center"}>Code invite</Text>
                                <Button leftIcon={<Icon as={<Copy />}/>} bgColor={"#fff"} h={"56px"} borderRadius={6} mt={4} onPress={copyToClipboard}>
                                    <Text color={'#000'} fontWeight={"normal"} fontSize={16}>Copiar</Text>
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                    <Button bgColor={"#000"} h={"56px"} borderRadius={6} mb={4} onPress={() => navigation.goBack()}>
                        <Text color={'#fff'} fontWeight={"normal"} fontSize={16}>Voltar</Text>
                    </Button>
                </Stack>
            </Box>
        </SafeAreaView>
    )
}