import MainLayout from '@/components/Mainlayout/MainLayout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, Linking, Platform, StyleSheet, Text, View, } from 'react-native';
import { RootStackParamList } from '../navigation/AllScreen';

// npm i expo-image-picker (help to access the device's image library and camera)
// npm install expo-av (help to play audio and video files in your app)
// npm install expo-location

type PropsType = NativeStackScreenProps<RootStackParamList, "Premission">;

const Premission = ({ navigation }: PropsType) => {
    const [image, setImage] = useState<string | null>(null);
    const [video, setVideo] = useState<string | null>(null);
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

    useEffect(() => {
        const requestUserLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Loaction permission is required',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Open Setings',
                            onPress: () => {
                                if (Platform.OS === 'android') {
                                    Linking.openSettings();
                                }
                            }
                        }
                    ]
                );
            }else{
                let user_location = await Location.getCurrentPositionAsync();
                setLocation(user_location.coords)
                console.log(user_location);
            }
        }
        requestUserLocation();
    }, [])
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
            const assets = result.assets[0];
            if (assets.type === 'video') {
                setVideo(assets.uri);
            }
            if (assets.type === 'image') {
                setImage(assets.uri);
            }
        }
    };

    const openCamera = async () => {
        // No permissions request is necessary for launching the image library
        const permissions = await ImagePicker.requestCameraPermissionsAsync();
        console.log({ Premission });
        if (permissions.status! == "granted") {
            Alert.alert(
                'Premission Required',
                'Camera access is required to taken. please enable it in settings.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Open Setings',
                        onPress: () => {
                            if (Platform.OS === 'android') {
                                Linking.openSettings();
                            }
                        }
                    }
                ]
            )
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            // check the condition picker is image or video
            const assets = result.assets[0];
            setImage(assets.uri);

        }
    };

    function onSubmit(){
        console.log(location);
    }


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
                <View style={styles.btn}>
                    <Button title='Open camera of your mobile' onPress={openCamera} />
                </View>
                <View style={styles.btn}>
                    <Button title='Open Location picker' onPress={onSubmit} />
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
    btn: {
        paddingTop: 15,
    }
});