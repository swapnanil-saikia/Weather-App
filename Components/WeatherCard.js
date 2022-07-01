import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { colors } from '../utils/Colors'


export default function WeatherCard({ weather }) {
    const { main: { temp },
        weather: [details],
        name
    } = weather;
    const { icon, description } = details
    const url = `https://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style={styles.weatherInfo}>
            <Text style={styles.name}>{name}, {new Date().toDateString()}</Text>
            <Image style={styles.icon} source={{ uri: url }} />
            <Text style={styles.primary}>{temp} C</Text>
            <Text style={styles.description}>{description}</Text>
        </View >
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
    },
    main: {
        justifyContent: 'center',
        flex: 1,
    },
    icon: {
        width: 100,
        height: 100,
    },
    primary: {
        fontSize: 40,
        color: colors.PRIMARY
    },
    name: {
        fontSize: 30,
    },
    description: {
        fontSize: 20,
        textTransform: 'capitalize'
    }
});
