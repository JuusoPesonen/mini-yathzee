import { View, Text } from 'react-native';
import styles from '../Style/style';

export default function Header() {
    return(
        <View style={styles.header}>
            <Text style={styles.title}>Mini-Yahtzee</Text>
        </View>
    )
}