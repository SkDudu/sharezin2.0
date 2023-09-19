import { Box, Button, Icon, Input, ScrollView, Stack, Text } from "native-base";
import React, {useState} from "react";
import { SafeAreaView } from "react-native";

import At from '../../assets/icons/At.svg'
import Password from '../../assets/icons/Password.svg'
import Eye from '../../assets/icons/eye.svg'
import EyeSlash from '../../assets/icons/eyeSlash.svg'
import User from '../../assets/icons/User.svg'

export default function Register({navigation}){
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return(
        <SafeAreaView>
            <ScrollView>
                <Box bgColor={"#f5f7f9"}>
                    <Stack direction={"column"} mx={2}>
                        <Text color={'#0b0c10'} fontWeight={"semibold"} fontSize={22} mb={2}>Vamos começar!</Text>
                        <Text color={'#8c8c8c'} fontWeight={"normal"} fontSize={16} mb={2}>Nos informe seus dados pessoais</Text>
                        <Box>
                            <Box bgColor={"#b2b2b2"} w={"120px"} h={"120px"} rounded={100} alignSelf={"center"} mb={2}></Box>
                            <Button w={"3/5"} bgColor={"#b2b2b2"} h={"56px"} borderRadius={6} alignSelf={"center"}>
                                <Text color={'#0b0c10'} fontWeight={"normal"} fontSize={16}>Adicionar imagem de perfil</Text>
                            </Button>
                        </Box>
                        <Input InputLeftElement={<Icon as={<User />} ml="2"/>} placeholder="Nome" w="100%" borderColor={"#eaeaea"} bgColor={"white"} mt={4}/>
                        <Input InputLeftElement={<Icon as={<At />} ml="2"/>} placeholder="E-mail" w="100%" borderColor={"#eaeaea"} bgColor={"white"} mt={2}/>
                        <Input 
                            mt={2}
                            type={show ? "text" : "password"}
                            InputLeftElement={<Icon as={<Password />} ml="2"/>} 
                            placeholder="Senha" 
                            w="100%" 
                            borderColor={"#eaeaea"} 
                            bgColor={"white"} 
                            InputRightElement={
                                <Button bgColor={"white"}
                                    onPress={handleClick}>{show ? <Icon as={<EyeSlash />}/> : <Icon as={<Eye />}/>}
                                </Button>}
                        />
                        <Box bgColor={"#ececec"} p={2} rounded={"md"} mt={2}>
                            <Text fontWeight={"light"} fontSize={14}>A senha precisa ter 1 letra maiúscula.</Text>
                            <Text fontWeight={"light"} fontSize={14}>A senha precisa ter 1 caractere especial.</Text>
                            <Text fontWeight={"light"} fontSize={14}>A senha precisa ter pelo menos 8 caracteres.</Text>
                        </Box>
                        <Input 
                            mt={2}
                            type={show ? "text" : "password"}
                            InputLeftElement={<Icon as={<Password />} ml="2"/>} 
                            placeholder="Confirme a senha" 
                            w="100%" 
                            borderColor={"#eaeaea"} 
                            bgColor={"white"} 
                            InputRightElement={
                                <Button bgColor={"white"}
                                    onPress={handleClick}>{show ? <Icon as={<EyeSlash />}/> : <Icon as={<Eye />}/>}
                                </Button>}
                        />
                        <Button bgColor={"#0b0c10"} h={"56px"} borderRadius={6} mt={4} onPress={() => navigation.navigate('')}>
                            <Text color={'white'} fontWeight={"normal"} fontSize={16}>Cadastrar</Text>
                        </Button>
                        <Button bgColor={"#fff"} h={"56px"} borderRadius={6} mt={4} mb={4} onPress={() => navigation.navigate('Login')}>
                            <Text color={'#000'} fontWeight={"normal"} fontSize={16}>Cancelar</Text>
                        </Button>
                    </Stack>
                </Box>
            </ScrollView>
        </SafeAreaView>
    )
}