import React from 'react';
import{Alert, TabBarIOSItem} from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import Weather from './Weather';
import axios from 'axios';

const API_KEY = 'd7fa29ae59f62386a60bdfcb7fda6ca5';

export default class extends React.Component {
  state={
    isLoading:true
  }
  getWeather = async(latitude, longitude) => {
    const{ data }= await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&long=${longitude}&&APPID=${API_KEY}`
    )
    this.setState({isLoading:false, temp:data.main.temp})
    console.log(data);
  }
  getLocation = async()=>{
    try{
      await Location.requestPermissionsAsync();
      const{
        coords:{latitude, longitude}
      } = await Location.getCurrentPositionAsync();  
      this.getWeather(latitude,longitude);   
      this.setState({isLoading: false}); 
    }catch(error){
      Alert.alert("can't find you.", "so Sad");
    }
  }
  componentDidMount(){
    this.getLocation();
  }
  render(){
    const { isLoading, temp } = this.state;
    return isLoading ? <Loading/> : <Weather temp={Math.round(temp)}/>;
  }
}

