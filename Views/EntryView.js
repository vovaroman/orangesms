import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {NavigatorIOS}  from 'react-navigation'



export default class EntryView extends React.Component{
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <TouchableOpacity 
                        style={ButtonStyle('orange')}
                        onPress={ () => {navigate('Service', { name: 'Orange' })} }
                    >
                        <Text style={styles.textStyle}> Orange </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ButtonStyle('#652d86')}
                    onPress={ () => {navigate('Service', { name: 'Moldcell' })} }
                    >
                        <Text style={styles.textStyle}> Moldcell </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={ButtonStyle('red')}
                    onPress={ () => {navigate('Service', { name: 'Unite' })} }>
                        <Text style={styles.textStyle}> Unite </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    
    }
}
const styles = {
    mainContainer:{
        backgroundColor: '#333',
        height: 605,
        justifyContent:'center'
    },
    container: {
       flexDirection: 'column',
       justifyContent: 'space-around',
       alignItems: 'center',
       backgroundColor: '#ffffff',
       height: 400
    },
    textStyle:{
        textAlign:'center',
        textAlignVertical:'auto',
        color:'#fff',
        fontSize:25
    }
    
}
const ButtonStyle = (color) =>{
    return{
        height:50,
        width: 150,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center'
    }
}