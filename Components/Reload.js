import { Button, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Reload({ load, showCity, loadCity, city }) {
    const reload = () => {
        if (city) {
            loadCity(city);
        }
        else {
            load()
        }
    }
    return (
        <View style={styles.Deatils}>
            {< Icon name="refresh" size={30} color={colors.PRIMARY} onPress={reload} />}
        </View >
    )
}

const styles = StyleSheet.create({
    Deatils: {
        marginTop: 'auto',
        marginLeft: 15,
        padding: 2
    },
});
