import MainLayout from '@/components/Mainlayout/MainLayout';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screen/Home';
import Premission from '../screen/Premission';

export type RootStackParamList = {
    Home: undefined;
    Premission: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const AllScreen = () => {
    return (
        <MainLayout>
            <Stack.Navigator initialRouteName='Premission' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Premission" component={Premission} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </MainLayout>
    
  )
}

export default AllScreen