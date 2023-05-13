import React, { useState, useEffect, useCallback } from "react"
import 'react-native-get-random-values';
import {
    View, 
    Text,
    StyleSheet,
    TextInput, 
    ScrollView,
    FlatList,
    Touchable,
    TouchableOpacity
} from 'react-native';

let cityObj = 'Lalsot'

const API_KEY = process.env.REACT_APP_API_KEY

const url_weather = `http://api.openweathermap.org/data/2.5/weather?q=${cityObj}&appid=${API_KEY}`

function WeatherApp(){

    // A) Brain of the app
    const [feed, setFeed] = useState([])
    const [city, setCity] = useState()
    const [list, setList] = useState([])
    const [clicked, setClicked] = useState(false)

    const get_city = useCallback((input) => {
        let cityName = eval('`' + input + '`')
        return fetch(`http://100.83.63.26:3000/api/getCity/${cityName}`)
        .then(resp => resp.json())
        .then(json => {

        let filteredData = json.map(docs => {
            return Object.values(docs)
        })

        setList(filteredData)
        console.log(list)
        })
        .catch(e => {
            console.log(e)
        }
    )}, [])

    useEffect(()=>{   
        get_city()     
    }, [])
    

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

 
    // B) body of the app 
    return(
        <View style = {styles.appBackground}>
            <View >
                <TextInput style = {styles.searchBar} placeholder = "Search City" 
                onPressIn = {() => {
                    setClicked(!clicked)
                }} 
                onSubmitEditing={i => {
                    get_city(i.nativeEvent.text)
                    console.log(clicked)}}>
                </TextInput>
                
                {clicked ? (
                    <FlatList
                      data = {list}
                      renderItem = {(item, index) => {
                        return(
                            <TouchableOpacity
                            style = {styles.listContents}
                            onPress={() => {
                                setCity(item.city)
                                setClicked(!clicked)
                            }}>
                            {/* {console.log("City: " + city)} */}
                            </TouchableOpacity>
                        )
                      }}>

                    </FlatList>
                ) : null}
                

            </View>
            {/* <ScrollView style = {styles.weatherPanel}>
                <View>
                    {city}
                </View>
            </ScrollView> */}
     
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
    },
    textColor:{
        color: 'white',
    },
    
})

export default WeatherApp;
