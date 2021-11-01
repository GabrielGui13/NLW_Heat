import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

import LogoSvg from '../../assets/logo.svg'; //parou de dar erro devido a config do svg

export function Header(){
  return (
    <View style={styles.container}>
        <LogoSvg />
        <Text>Sair</Text>
    </View>
  );
}