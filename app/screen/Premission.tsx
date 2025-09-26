import MainLayout from '@/components/Mainlayout/MainLayout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View, } from 'react-native';
import { RootStackParamList } from '../navigation/AllScreen';

// npm i expo-image-picker (help to access the device's image library and camera)
// npm install expo-av (help to play audio and video files in your app)

type PropsType = NativeStackScreenProps<RootStackParamList, "Premission">;

const Premission = ({ navigation }: PropsType) => {
    const [image, setImage] = useState<string | null>(null);
    const [video, setVideo]= useState<string | null>(null);


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
            // check the condition picker is image or video
            const assets= result.assets[0];
            if(assets.type === 'video'){
                setVideo(assets.uri);
            }
            if(assets.type === 'image'){
                setImage(assets.uri);
            }
        }
    };
    return (
        <MainLayout>
            <View style={styles.container}>
                <Text>Premission Screen</Text>
                <View>

                </View>
                <View>
                    {/*for image selector*/}
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                    {/* for video selector */}
                    {video && <Video useNativeControls source={{ uri: video }} style={styles.image}></Video>}
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