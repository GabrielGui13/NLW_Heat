import React from 'react'; //sempre precisa importar
import { View } from 'react-native'
import { styles } from './styles';

import { Header } from '../../components/Header'

//View seria como uma div

export const Home = () => {
    return (
        <View style={styles.container}>
            <Header />
        </View>
    )
}