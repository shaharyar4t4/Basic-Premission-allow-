import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/AllScreen';

type PropsType = NativeStackScreenProps<RootStackParamList, "Premission">;

const Premission = ({navigation}: PropsType) => {
  return (
   <View>
    <Text>Premission Screen</Text>
   </View>
  )
}

export default Premission