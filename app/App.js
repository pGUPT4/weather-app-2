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
    dsn: "https://1cc1e9fd85755dfcc69b7364f81af245@o4505785451610112.ingest.sentry.io/4505785452134400",
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
    const [list, setList] = useState([])

    const data = [{id: 1, name: "Parth"}, {id: 2, name: "Gupta"}, {id: 3, name: "USA"}]

    let filteredData
    let tempArray = []
    const get_city = (input) => {
        let cityName = eval('`' + input + '`')
        const url = `http://100.83.34.119:3000/api/getCity/${cityName}`
        console.log(url)
        return fetch(`http://100.83.34.119:3000/api/getCity/${cityName}`
        // ,{
        //     headers:{
        //         'Content-type': 'application/json'
        //     }
        // }
        )
        .then((resp) => {
            // console.log("Response.ok = " + resp.ok)
            // console.log(resp)
            if (!resp.ok) {
                throw new Error('Request failed with status:', resp.status);
            }
            return resp.json(); // Parsing not needed if response is already JSON
        })
        .then((json) => {

            if (Array.isArray(json)) {
                filteredData = json.map(docs => {
                    return Object.values(docs)

                })

                filteredData.forEach((item, index) => {
                    tempArray.push({id: index, name: item[3], country: item[5] })
                })
                setList(tempArray)
            }
            //filteredData = JSON.parse(json)
            // console.log("JSON Data = " + filteredData)
        })
        .catch(e => {
            console.error("***ERROR*** " + e)
        }
    )
    
    
}
    
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
                placeholderTextColor= "lime"
                onSubmitEditing={(i) => {
                    const city = i.nativeEvent.text
                    setInput(city)
                    handleChange(city)
                    setClicked(!clicked)}}>
                </TextInput>
                
                {clicked ? (
                    <View style = {styles.dropDownView}>
                        <FlatList
                        data = {list}
                        renderItem = {({item}) => 
                            
                            <TouchableOpacity
                                style = {styles.listContents}
                                onPress={() => {
                                    setCity(item.name)
                                    setClicked(false)
                                    get_weather(cityJSON)
                                    feed.push(
                                        <View style ={styles.weatherBoard}>
                                            <Text key = {cityJSON.id} style = {styles.date}>{dates[i]}</Text>
                                            <Text key = {cityJSON.coord.lat} style = {styles.temperature}>{cityJSON.temp}</Text>
                                            <Text key = {cityJSON.name} style = {styles.cityName}>{cityJSON.name}</Text>
                                        </View>
                                    )

                                    console.log("City: " + city)
                                }}>

                                <Text style = {styles.searchBar}>{item.name + ", " + item.country}</Text>

                            </TouchableOpacity>
                                
                
                        }>
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
        backgroundColor: 'midnightblue', 
        flexDirection: 'column'
    },
 
    searchBar:{
        flexDirection: 'row',
        backgroundColor: 'black',
        padding: 10,
        paddingLeft:10,
        paddingRight:10,
        marginTop:2,
        alignSelf: "stretch",
        borderRadius: 5,
        justifyContent: "space-between",
        opacity: 0.7,
        color: 'lime'
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
        width: '100%',
        height: 300,
        borderRadius:10,
        backgroundColor: 'black',
        elevation: 5,
        alignSelf: 'center',
        margin: 5,
        opacity: 0.7
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
