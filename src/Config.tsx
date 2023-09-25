import { AlertDialog, Avatar, Box, Button, Link, Stack, Text } from "native-base";
import React from "react";
import { Alert, SafeAreaView } from "react-native";
import { supabase } from "../lib/supabse";

export default function Config({navigation}){
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    async function logOut(){ 
        const { error } = await supabase.auth.signOut()

        if (error) {
            Alert.alert(error.message)
        }else{
            navigation.navigate('Login')
        }
    }

    return(
        <SafeAreaView>
            <Box bgColor={"#f5f7f9"} mx={2} h={"full"}>
                <Stack direction={"column"} space={2}>
                    <Button h={"48px"} bgColor={"#fff"} mb={4} borderRadius={6} justifyContent={"flex-start"} onPress={() => setIsOpen(!isOpen)}>
                        <Text color={"#eb5757"} fontWeight={"normal"} fontSize={16}>Sair</Text>
                    </Button>
                </Stack>
            </Box>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>
                        <Text fontSize={18} fontWeight={"medium"}>Sair da conta</Text>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                        <Text fontSize={16} fontWeight={"normal"}>Tem certeza que deseja{' '}<Text fontWeight={"medium"}>sair</Text> da sua sessão?</Text>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button w={"80px"} h={"55px"} bgColor={"#fff"} borderRadius={6} onPress={() => navigation.goBack()}>
                            <Text fontSize={16} fontWeight={"normal"}>Não</Text>
                        </Button>
                        <Button w={"80px"} h={"55px"} ml={2} bgColor={"#eb5757"} borderRadius={6} onPress={logOut}>
                            <Text color={"white"} fontSize={16} fontWeight={"normal"}>Sim</Text>
                        </Button>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </SafeAreaView>
    )
}