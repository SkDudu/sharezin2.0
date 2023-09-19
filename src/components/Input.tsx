import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";

import tw from 'twrnc'

import At from '../../assets/icons/At.svg'

export default function Input ({ placeholder,leftIcon, rightIcon, numLines, onChangeHandler, secure, validate, errorMessage, ...props}){
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(props.secureTextEntry);

    const handleTextChange = (text: React.SetStateAction<string>) => {
        setText(text);
        if (onChangeHandler) {
            onChangeHandler(text);
        }
    }

    const handleFocus = () => {
        setIsFocused(true);
    };

    return(
        <>
            <View style={[tw `flex-row h-[48px] bg-white items-center gap-2 px-2 border-[1px] rounded-md border-[#EAEAEA]`, errorMessage && {borderColor: 'red'}]}>
                <View>{leftIcon}</View>
                    <TextInput
                        secureTextEntry={showPassword}
                        placeholder={placeholder || ''}
                        onFocus={handleFocus}
                        value={text}
                        onChangeText={handleTextChange}
                        onEndEditing={validate}
                        multiline={numLines > 1}
                        numberOfLines={numLines}
                        style={{width: '80%'}}
                    />
                <TouchableOpacity style={tw `pl-2`}>
                    {rightIcon}
                </TouchableOpacity>
            </View>
            <Text>{errorMessage}</Text>
        </>
    )
}