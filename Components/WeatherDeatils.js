import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

const cloudIcon = <Icon name="cloud" color={colors.PRIMARY} size={30} />;
const windIcon = <Icon name="wind" color={colors.PRIMARY} size={30} />;
const humidityIcon = <Ionicons name="water" color={colors.PRIMARY} size={34} />;
const visibilityIcon = <Icon name="eye" color={colors.PRIMARY} size={30} />;

export default function WeatherCard({ weather }) {
    const { main: { feels_like, humidity },
        wind: { speed },
        visibility,
        clouds,
        // name
    } = weather;
    return (
        <View style={styles.Deatils}>
            <View style={{ ...styles.detailsrow, }}>
                <View style={styles.deatilsbox}>
                    <View style={styles.detailsrow}>
                        {cloudIcon}
                        <Text>Cloud</Text>
                        <Text>{clouds.all}%</Text>
                    </View>
                </View>
                <View style={{ ...styles.deatilsbox, borderLeftWidth: 1, borderColor: colors.BORDER }}>

                    <View style={styles.detailsrow}>
                        {humidityIcon}
                        <Text>Humidity</Text>
                        <Text>{humidity} %</Text>
                    </View>
                </View>
            </View>
            <View style={styles.detailsrow}>
                <View style={styles.deatilsbox}>
                    <View style={styles.detailsrow}>
                        {windIcon}
                        <Text>Wind</Text>
                        <Text>{speed} m/s</Text>
                    </View>
                </View>
                <View style={{ ...styles.deatilsbox, }}>

                    <View style={styles.detailsrow}>
                        {visibilityIcon}
                        <Text>Visibility</Text>
                        <Text>{visibility / 1000} km</Text>
                    </View>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    Deatils: {
        marginTop: 'auto',
        margin: 15,
        padding: 2,
        // backgroundColor: "red"

    },
    detailsrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    deatilsbox: {
        flex: 1,
        padding: 10,
        borderColor: colors.BORDER,
        borderRadius: 10,
        borderWidth: 1,
        margin: 4,
        height: 80, justifyContent: 'center',

    },
    primary: {
        // text: 40,
        color: colors.PRIMARY
    }
});
