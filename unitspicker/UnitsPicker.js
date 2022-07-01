import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default function UnitsPicker() {
    []
    return (
        <View>
            <Picker selectedValue={"metric"} >
                <Picker.Item label="C" value="metric" />
                <Picker.Item label="F°" value="impeial" />
            </Picker>
        </View >
    )
}
