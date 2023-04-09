import React, { useState, useEffect } from "react"
import 'react-native-get-random-values';
import {
    View, 
    Text,
    StyleSheet,
    TextInput, 
    ScrollView,
    FlatList
} from 'react-native';
// import "../backend/server"

let cityObj = 'Lalsot'

const API_KEY = process.env.REACT_APP_API_KEY

const url_weather = `http://api.openweathermap.org/data/2.5/weather?q=${cityObj}&appid=${API_KEY}`
function WeatherApp(){

    // A) Brain of the app
    const [feed, setFeed] = useState([])
    const [cities, setCities] = useState([])

    const get_city = (name) => {
        return fetch(`http://100.83.89.50:3000/api/getAll`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                return json.name
            })
            .catch(err => {
                console.error(err)
            })
    }

    let currCityList = []
    const filter_location = (input, cities) => {
        currCityList = cities.filter(city => city.startsWith(input))
        setCities(currCityList)
    }

    // assume after this point we have gotten the city document

    // 2) apply the given location to get weather
    let cityJSON
    const get_weather = async() => {
        const resp = await fetch(url_weather)
        cityJSON = resp.json()
    }
 
    // 3 after getting city name and its weather information, display
    const buttonPressed = (cityJSON) => {
        feed.push(
            <View style = {styles.weatherBoard}>
                <Text key = {cityJSON.id} style = {styles.date}>{dates[i]}</Text>
                <Text key = {cityJSON.coord.lat} style = {styles.temperature}>{cityJSON.temp}</Text>
                <Text key = {cityJSON.name} style = {styles.cityName}>{cityJSON.name}</Text>
            </View>
        )
    }
 
    useEffect(() => {
        get_city(`Noida`)
        // console.log()
    }, [])
 
    // B) body of the app 
    return(
        <View style = {styles.appBackground}>
 
            <View style = {styles.searchBar}>
                <TextInput style = {styles.searchText} placeholder = "Search City"></TextInput>
            </View>
                 
            {/* ScrollView can only have one view in it */}
            <ScrollView style = {styles.weatherPanel}>
                <View>
                    {cities}
                </View>
            </ScrollView>
     
        </View>
        )
}
  
const styles = StyleSheet.create({
    appBackground:{
        flex: 1,
        backgroundColor: 'black', 
        flexDirection: 'column'
    },
 
    searchBar:{
        flex: 0.1,
        flexDirection: 'column',
        backgroundColor: 'white', 
        fontSize: 25
    },
    searchText:{
        flex: 1,
        borderWidth: 1
    },
    // Place where all cities' weather are shown
    weatherPanel:{
        flex: 0.9,
        flexDirection: 'column',
        padding: 15
    },
  
    // Style for each city 
    weatherBoard:{
        flex: 9, 
        backgroundColor: 'blue',
        borderRadius: 10,
        marginTop: 12
    },
  
    // Temorary styles - 
    date: {
        fontSize: 20,
        color: 'white'
    },
    temperature:{
        fontSize: 30
    },
    cityName:{
        fontSize: 30
    },
    flatlist:{
        flex: 7,
        paddingLeft: 15,
        marginTop: 15,
        paddingBottom: 15,
        fontSize: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }
    
})
  
export default WeatherApp;
