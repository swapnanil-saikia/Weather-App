import { StyleSheet, Text, View, Button, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../utils/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Search({ city, setCity, loadCity }) {
    return (
        <View style={styles.container} >
            <TextInput
                placeholder="Enter city"
                value={city}
                onChangeText={(text) => { setCity(text) }}
            />
            {<Icon name="search" size={24} color={colors.PRIMARY} onPress={() => { loadCity(city) }} />}
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 70,
        borderWidth: 1.5,
        borderColor: colors.BORDER,
        width: 270,
        borderRadius: 25,
        marginHorizontal: 18,
        paddingHorizontal: 12,
        height: 40
        // backgroundColor: 'lightgrey'

    },
});
