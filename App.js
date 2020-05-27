import React from 'react';
import{Alert} from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';

export default class extends React.Component {
  getLocation = async()=>{
    try{
      await Location.requestPermissionsAsync();
      const{
        coords:{latitude, longitude}
      } = await Location.getCurrentPositionAsync();     
      this.setState({isLoading: false}); 
    }catch(error){
      Alert.alert("can't find you.", "so Sad");

    }
  }
  componentDidMount(){
    this.getLocation();
  }
  render(){
    return<Loading/>
  }
}

