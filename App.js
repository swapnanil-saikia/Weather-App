import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator, TouchableWithoutFeedback, Keyboard, processColor } from 'react-native';
import * as Location from 'expo-location'
import { useEffect, useState } from 'react';
import WeatherCard from './Components/WeatherCard'
import WeatherDetails from './Components/WeatherDeatils'
import Search from './Components/Search'
import Reload from './Components/Reload'
import { colors } from './utils/Colors'

const showButtobn = null;
import { REACT_APP_API_KEY } from '@env';
const API_KEY = REACT_APP_API_KEY;
export default function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [weather, setWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [city, setCity] = useState(null);
  const [loaded, setLoaded] = useState(true);
  const [grant, setGrant] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    load();
  }, [])

  const load = async () => {
    try {
      setLoaded(false);
      setGrant(false)
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted') {
        setGrant(false);
      }
      else {
        setGrant(true)
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords
        const API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${API_KEY}`;
        const response = await fetch(API);
        const res = await response.json();
        if (response.ok) {
          // console.log(lat)
          setWeather(res);
        }
        else {
          setErrorMessage(res.error)
        }
        setLoaded(true)
        setCity(null)
        setShowButton(false)
      }
    } catch (error) {
      setErrorMessage(res.error)
    }
  }

  const loadCity = async (city) => {
    try {
      setWeather(null)
      setLoaded(false)
      setGrant(true)
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitSystem}&appid=${API_KEY}`;
      const response = await fetch(API);
      const res = await response.json();
      if (response.ok) {
        // console.log(lat)
        setWeather(res);
      }
      else {
        setErrorMessage(res.error)
      }
      setLoaded(true)
      setShowButton(true);
    } catch (error) {
      setErrorMessage(res.error)
    }
  }

  if (weather) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.container} >
          <StatusBar style="auto" />
          <View style={{ flexDirection: 'row' }}>
            <Search city={city} setCity={setCity} loadCity={loadCity} />
            <Reload load={load} showCity={true} loadCity={loadCity} city={city} />
          </View>
          <View style={styles.main}>
            <WeatherCard weather={weather} />
            {city && showButton ?
              <View style={{ ...styles.btton, marginTop: 30 }}>
                <Button title="See On your location" color={colors.BORDER} onPress={load}></Button>
              </View> : null}
          </View>
          <WeatherDetails weather={weather} />
        </View >
      </TouchableWithoutFeedback>
    )
  }
  else if (!loaded && grant) {
    return (
      <View style={{ marginTop: 300 }}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }
  else if (!weather && grant) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={{ ...styles.container, justifyContent: 'flex-start' }} >
          <StatusBar style="auto" />
          <View style={{ flexDirection: 'row' }}>
            <Search city={city} setCity={setCity} loadCity={loadCity} />
            <Reload load={load} showCity={true} loadCity={loadCity} city={city} />
          </View>
          <Text style={styles.primary}>Please Type a Correct City</Text>
          <View style={styles.btton}>
            <Button title="See On your location" color={colors.BORDER} onPress={load}></Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )

  }
  else if (!grant) {
    return (
      <View style={styles.container}>

        <View style={{ flexDirection: 'row' }}>
          <Search city={city} setCity={setCity} loadCity={loadCity} />
          <Reload load={load} showCity={true} loadCity={loadCity} city={city} />
        </View>
        <Text style={styles.primary}> Please Allow Permission </Text>
        <View style={{ ...styles.btton, marginTop: 10 }}>
          <Button title="Grant Acess" onPress={load} color={colors.BORDER}></Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    //
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  },
  primary: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.PRIMARY,
    marginTop: 50
  },
  btton: {
    textAlign: 'center',
    marginTop: 50,
    alignItems: 'center',
    width: 200,
    marginLeft: 90,
  }
});
