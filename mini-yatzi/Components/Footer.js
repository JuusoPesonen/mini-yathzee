import { View, Text } from 'react-native';
import styles from "../style/style";

export default function Footer() {
    return (
        <View style={styles.footer}>
            <Text style={styles.author}>Author: Juuso Pesonen</Text>
        </View>
    )
}