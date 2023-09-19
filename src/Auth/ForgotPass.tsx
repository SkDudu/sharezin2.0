import { Box, Button, Icon, Input, Stack, Text } from "native-base";
import React, {useState} from "react";
import { SafeAreaView } from "react-native";

import At from '../../assets/icons/At.svg'

export default function ForgotPass({navigation}){
    return(
        <SafeAreaView>
            <Stack direction={"column"} h={"full"}>
                <Box bgColor={"#f5f7f9"} h={"full"} justifyContent={"space-between"}>
                    <Box mt={6} mx={2}>
                        <Text color={"#575960"} fontSize={16} fontWeight={"normal"} mb={4}>Para receber o link para redefinir a senha, insira seu email cadastrado abaixo.</Text>
                        <Input InputLeftElement={<Icon as={<At />} ml="2"/>} placeholder="E-mail" w="100%" mb={2} borderColor={"#eaeaea"} bgColor={"white"} />
                    </Box>
                    <Button bgColor={"#0b0c10"} h={"56px"} borderRadius={6} mb={10} mx={2}>
                        <Text color={'white'} fontWeight={"normal"} fontSize={16}>Enviar</Text>
                    </Button>
                </Box>
            </Stack>
        </SafeAreaView>
    )
}