import React, { useState, useEffect } from "react"
import 'react-native-get-random-values';
import {
    View, 
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity
} from 'react-native';

import * as Sentry from '@sentry/react-native';

Sentry.init({
    dsn: "https://797c698b17fe405d9a1b59268d7ee028@o4505224647999488.ingest.sentry.io/4505224858304512",
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
  });



const API_KEY = process.env.REACT_APP_API_KEY

let cityObj
const url_weather = `http://api.openweathermap.org/data/2.5/weather?q=${cityObj}&appid=${API_KEY}`

function WeatherApp(){

    // A) Brain of the app
    const [city, setCity] = useState("")
    const [clicked, setClicked] = useState(false)
    const [input, setInput] = useState(' ')

    let filteredData
    const get_city = (input) => {
        let cityName = eval('`' + input + '`')
        return fetch(`http://100.83.61.11:3000/api/getCity/${cityName}`)
        .then((resp) => resp.json())
        .then((json) => {
            
            if (Array.isArray(json)) {
                filteredData = json.map(docs => {
                    return Object.values(docs)
                })
            }

            // console.log(filteredData)
        })
        .catch(e => {
            console.log(e)
        }
    )}
    
    const handleChange = (value) => {
        // setInput(value)
        get_city(value)
    }

    // assume after this point we have gotten the city document

    // 2) apply the given location to get weather
    let cityJSON
    const get_weather = async(jsonC) => {
        cityObj = eval('`' + city + '`')
        return fetch(url_weather)
        .then((resp) => resp.json())
        .then((json) => {
            jsonC = json
            // if (Array.isArray(json)) {
            //     filteredData = json.map(docs => {
            //         return Object.values(docs)
            //     })
            // }
        })
        .catch(e => {
            console.log(e)
        }
    )}
 
    useEffect(() => {
        get_weather()
    }, [])
 
    // B) body of the app 
    return(
        <View style = {styles.appBackground}>
            <View >
                <TextInput style = {styles.searchBar} 
                placeholder = "Search City" 
                onPressIn = {() => {
                    setClicked(!clicked)
                }}
                onChangeText={(i) => {
                    setInput(i)
                    console.log("Input = " + i)
                    handleChange(input)
                    console.log("Clicked: " + clicked)}}>
                </TextInput>
                
                {clicked ? (
                    <View style = {styles.dropDownView}>
                        <FlatList
                        data = {filteredData}
                        renderItem = {({item}) => {
                            return(
                                <TouchableOpacity
                                style = {styles.listContents}
                                onPress={() => {
                                    setCity(item.name)
                                    setClicked(false)
                                    get_weather(cityJSON)
                                    feed.push(
                                        <View style = {styles.weatherBoard}>
                                            <Text key = {cityJSON.id} style = {styles.date}>{dates[i]}</Text>
                                            <Text key = {cityJSON.coord.lat} style = {styles.temperature}>{cityJSON.temp}</Text>
                                            <Text key = {cityJSON.name} style = {styles.cityName}>{cityJSON.name}</Text>
                                        </View>
                                    )
                                }}>
                                </TouchableOpacity>
                            )
                        }}>
                        </FlatList>
                    </View>
                ) : null}
            </View>
        </View>
        )
}
  
const styles = StyleSheet.create({
    appBackground:{
        flex: 1,
        backgroundColor: 'blue', 
        flexDirection: 'column'
    },
 
    searchBar:{
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        paddingLeft:10,
        paddingRight:10,
        marginTop:2,
        alignSelf: "stretch",
        borderRadius: 5,
        justifyContent: "space-between"
    },
    listContents:{
        width:'85%',
        alignSelf:'center',
        height: 50,
        justifyContent:'center',
        borderBottomWidth: '0.5',
        borderColor: '#8e8e8e'

    },
    dropDownView :{
        width: '85%',
        height: 300,
        borderRadius:10,
        backgroundColor: '#fff',
        elevation: 5,
        alignSelf: 'center'
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
        backgroundColor: 'white',
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
    },
    textColor:{
        color: 'white',
    },
    
})

export default WeatherApp;
