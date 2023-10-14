import { Alert, Avatar, Box, Button, Icon, Stack, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

import * as Clipboard from 'expo-clipboard';

import Copy from "../assets/icons/Copy.svg"

export default function ShareReceipt({route, navigation}){
    const [copiedText, setCopiedText] = React.useState('');

    const copyToClipboard = async () => {
        const code = route.params.code
        await Clipboard.setString(code);
    };

    return(
        <SafeAreaView>
            <Box bgColor={"#f5f7f9"} mx={2}>
                <Stack direction={"column"} h={"full"} justifyContent={"space-between"}>
                    <Stack direction={"column"} justifyContent={"space-between"} space={4}>
                        <Box bgColor={"#0b0c10"} mt={2} rounded={"md"} p={2}>
                            <Stack direction={"column"} space={2} p={2}>
                                <Text color={"white"} fontWeight={"normal"} fontSize={18}>{route.params.nameReceipt}</Text>
                            </Stack>
                        </Box>
                        <Box bgColor={"#ececec"} rounded={"md"} p={2}>
                            <Stack direction={"column"} space={4}>
                                <Text fontSize={16} fontWeight={'medium'} textAlign={"center"}>Código de acesso para compartilhar com os seus amigos e família!</Text>
                                <Text fontSize={22} fontWeight={'medium'} textAlign={"center"}>{route.params.code}</Text>
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