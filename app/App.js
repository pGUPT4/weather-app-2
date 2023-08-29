import React, { useState, useEffect } from "react"
import {
    View, 
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {REACT_NATIVE_API_KEY} from 'react-native-dotenv'
import * as Sentry from '@sentry/react-native';

Sentry.init({
    dsn: "https://1cc1e9fd85755dfcc69b7364f81af245@o4505785451610112.ingest.sentry.io/4505785452134400",
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
  });


const API_KEY = process.env.REACT_APP_API_KEY


function WeatherApp(){

    // A) Brain of the app
    const [city, setCity] = useState("")
    const [clicked, setClicked] = useState(false)
    const [weather, setWeather] = useState([])
    const [data, setData] = useState([])

    const url_weather = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c64c29c4847423f80020b260c377943`


    var list = []
    const get_city = (input) => {

        let cityName = eval('`' + input + '`')

        return fetch(`http://100.83.34.119:3000/api/getCity/${cityName}`)
        .then((resp) => {

            if (!resp.ok) {
                throw new Error('Request failed with status:', resp.status);
            }
            return resp.json(); // Parsing not needed if response is already JSON

        })
        .then((json) => {

            if (Array.isArray(json)) {
                let filteredData = json.map(docs => {
                    return Object.values(docs)
                })

                filteredData.forEach((item, index) => {
                    list.push({
                        id: index,
                        city: item[3],
                        country: item[5],
                    })
                })
                setData(list)
            }
        })
        .catch(e => {
            console.error("***ERROR*** " + e)
        }
    )
}
    
    const handleChange = (value) => {
        // setInput(value)
        get_city(value)
        //setInput(value)
    }

    // assume after this point we have gotten the city document

    // 2) apply the given location to get weather
    let feed = []
    const get_weather = async() => {
        if(city != ""){
            return fetch(url_weather)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json)
                feed.push(
                    <View style ={styles.weatherBoard}>
                        <Text style = {styles.cityName}>{city}</Text>
                        <Text style = {styles.temperature}>{json.timezone}</Text>
                        <Text style = {styles.temperature}>{json.timezone}</Text>
                    </View>
                )
                setWeather(feed)
                
            })
            .catch(e => {
                console.log(e)
            })
        }
    }
 
    useEffect(() => {
        // get_city()
        get_weather()
    }, [city])

 
    // B) body of the app 
    return(
        <View style = {styles.appBackground}>
            <View >
                <TextInput 
                    style = {styles.searchBar} 
                    placeholder = "Search City" 
                    placeholderTextColor= "lime"
                    onSubmitEditing={(i) => {
                        handleChange(i.nativeEvent.text)
                        setClicked(!clicked)}}>
                </TextInput>
                
                {clicked ? (
                    <View style = {styles.dropDownView}>
                        <FlatList
                            data = {data}
                            renderItem = {({item}) => {
                                return(
                                    <Text 
                                        style = {styles.searchBarContent}
                                        onPress ={() => {
                                            setCity(item.city)
                                            setClicked(false)
                                            get_weather()                            
                                        }}>
                                        {item.city + ", " + item.country}
                                    </Text>
                                )}}>
                        </FlatList>
                    </View>
                ) : null}
            </View>
            <ScrollView>
                <View>
                    {weather}
                </View>
            </ScrollView>
        </View>
    )
}
  
const styles = StyleSheet.create({
    appBackground:{
        flex: 1,
        backgroundColor: 'midnightblue', 
        flexDirection: 'column'
    },
    searchBarContent:{
        flexDirection: 'row',
        backgroundColor: 'black',
        padding: 10,
        paddingLeft:20,
        paddingRight:10,
        marginTop:2,
        alignSelf: "stretch",
        borderRadius: 5,
        justifyContent: "space-between",
        fontSize: 15,
        color: 'lime'
    },
    searchBar:{
        flexDirection: 'row',
        backgroundColor: 'black',
        padding: 10,
        paddingLeft:15,
        paddingRight:10,
        marginTop:2,
        alignSelf: "stretch",
        borderRadius: 5,
        justifyContent: "space-between",
        opacity: 0.7,
        fontSize:15, 
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
        backgroundColor: 'black',
        borderRadius: 10,
        marginTop: 12
    },
  
    // Temorary styles - 
    temperature:{
        fontSize: 30,
        margin: 15,
        color: 'white'
    },
    cityName:{
        fontSize: 20,
        color: 'white',
        margin: 15
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
