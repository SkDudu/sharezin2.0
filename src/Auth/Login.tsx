import React, {useState} from "react";
import { ImageBackground, SafeAreaView } from "react-native";
import { Text, Box, Stack, Input, Icon, Button } from "native-base";

//import Input from "../components/Input";

import bgIcons from './../../assets/bg_icon2.png'
import Logo from '../../assets/icons/Logo.svg'
import At from '../../assets/icons/At.svg'
import Password from '../../assets/icons/Password.svg'
import Eye from '../../assets/icons/eye.svg'
import EyeSlash from '../../assets/icons/eyeSlash.svg'


export default function Login({navigation}){
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return(
        <SafeAreaView>
            <Box bgColor={"#0b0c10"} w={"full"} h={"full"}>
                <ImageBackground source={bgIcons}>
                    <Stack direction={"column"} justifyContent={"space-between"} w={"full"} h={"full"}>
                        <Box mt={10} p={2}>
                            <Logo />
                            <Text color={'white'} fontWeight={"medium"} fontSize={32} mt={5}>Controle a conta da saideira!</Text>
                        </Box>
                        <Box bgColor={"#fff"} p={2} borderTopRightRadius={10} borderTopLeftRadius={10}>
                            <Text color={'#575960'} fontWeight={"normal"} fontSize={32} mb={8}>Login</Text>
                            <Stack direction={"column"}>
                                <Input InputLeftElement={<Icon as={<At />} ml="2"/>} placeholder="E-mail" w="100%" borderColor={"#eaeaea"} bgColor={"white"} mb={2}/>
                                <Input 
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
                            </Stack>
                            <Button bgColor={"#0b0c10"} h={"56px"} borderRadius={6} mt={4} onPress={() => navigation.navigate('Home')}>
                                <Text color={'white'} fontWeight={"normal"} fontSize={16}>Entrar</Text>
                            </Button>
                            <Box mt={5}>
                                <Text color={'black'} fontWeight={"normal"} fontSize={16} alignSelf={"flex-end"} onPress={() => navigation.navigate('ForgotPass')}>Esqueci a senha</Text>
                                <Text color={'black'} fontWeight={"normal"} fontSize={16} alignSelf={"center"} my={10} onPress={() => navigation.navigate('register')}>Não tem conta? Cadastre-se aqui</Text>
                            </Box>
                        </Box>
                    </Stack>
                </ImageBackground>
            </Box>
        </SafeAreaView>
    )
}