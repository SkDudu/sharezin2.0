import React from "react"
import { AlertDialog, Box, Button, Icon, Input, Stack, Text } from "native-base"
import { SafeAreaView } from "react-native"

import ReceiptOutlineSmall from "../assets/icons/ReceiptOutlineSmall.svg"
import Fork from "../assets/icons/Fork.svg"
import Percent from "../assets/icons/Percent.svg"
import Mic from "../assets/icons/Mic.svg"
import Qrcode from "../assets/icons/Qrcode.svg"

export default function EditReceipt({navigation}){
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    return(
        <SafeAreaView>
            <Box bgColor={"#f5f7f9"} p={2}>
                <Stack direction={"column"} justifyContent={"space-between"} h={"full"}>
                    <Stack direction={"column"} space={2}>
                        <Text fontSize={16} fontWeight={"normal"} mb={2}>Insira as informações para criar um recibo compartilhado!</Text>
                        <Input InputLeftElement={<Icon as={<ReceiptOutlineSmall />} ml="2"/>} placeholder="Nome da conta" w="100%" borderColor={"#eaeaea"} bgColor={"white"}/>
                        <Input InputLeftElement={<Icon as={<Fork />} ml="2"/>} placeholder="Nome do restaurante" w="100%" borderColor={"#eaeaea"} bgColor={"white"}/>
                        <Input InputLeftElement={<Icon as={<Percent />} ml="2"/>} placeholder="Taxa do garçom" w="100%" borderColor={"#eaeaea"} bgColor={"white"}/>
                        <Input InputLeftElement={<Icon as={<Mic />} ml="2"/>} placeholder="Taxa do cover" w="100%" borderColor={"#eaeaea"} bgColor={"white"}/>
                        <Input InputLeftElement={<Icon as={<Qrcode />} ml="2"/>} placeholder="Código de compartilhamento" w="100%" borderColor={"#eaeaea"} bgColor={"white"}/>
                    </Stack>
                    <Stack direction={"column"} space={2}>
                        <Button bgColor={"#0b0c10"} h={"56px"} borderRadius={6} onPress={() => setIsOpen(!isOpen)}>
                            <Text color={'white'} fontWeight={"normal"} fontSize={16}>Editar recibo</Text>
                        </Button>
                        <Button bgColor={"#fff"} h={"56px"} borderRadius={6} mb={6} onPress={() => navigation.goBack()}>
                            <Text color={'black'} fontWeight={"normal"} fontSize={16}>Cancelar</Text>
                        </Button>
                    </Stack>
                </Stack>
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                    <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>
                            <Text fontSize={18} fontWeight={"medium"}>Editar conta compartilhada</Text>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <Text fontSize={16} fontWeight={"normal"}>Tem certeza que deseja{' '}<Text fontWeight={"medium"}>editar</Text> essa conta compartilhada?</Text>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button w={"80px"} h={"55px"} bgColor={"#fff"} borderRadius={6} onPress={() => navigation.navigate('')}>
                                <Text fontSize={16} fontWeight={"normal"}>Não</Text>
                            </Button>
                            <Button w={"80px"} h={"55px"} ml={2} bgColor={"#0b0c10"} borderRadius={6} onPress={() => navigation.goBack()}>
                                <Text color={"white"} fontSize={16} fontWeight={"normal"}>Sim</Text>
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
            </Box>
        </SafeAreaView>
    )
}