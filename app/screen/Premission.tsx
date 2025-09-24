import MainLayout from '@/components/Mainlayout/MainLayout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View, } from 'react-native';
import { RootStackParamList } from '../navigation/AllScreen';


type PropsType = NativeStackScreenProps<RootStackParamList, "Premission">;

const Premission = ({ navigation }: PropsType) => {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    return (
        <MainLayout>
            <View style={styles.container}>
                <Text>Premission Screen</Text>
                <View>

                </View>
                <View>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                    
                </View>
            </View>
        </MainLayout>
    )
}

export default Premission

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
});