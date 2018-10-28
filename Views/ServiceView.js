import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import Settings from '../settings'
import Orange from '../Controllers/orange'
import { WebView, Image, ScrollView } from 'react-native';
import AsyncImage from './AsyncImage'
//<Text> {Settings.Orange.name} </Text>
export default class ServiceView extends React.Component{

    constructor(props) {
        super(props);
        this.state = { linkReady: false,
                        };
        this.webview = null;
        this.captchaWebView = null;
    }

    getLinkOnCaptcha() {
        const data =     
        //"$(document).ready(function(){" +
        //'( window ).on( "load", function() {' +
        '$(function() {'+
            "var parent = document.getElementsByClassName('form-group form-inline');" +
            "var link = parent[0].children[1].getAttribute('src');" +
            "postMessage(link); " +
        "});" 
        this.webview.injectJavaScript(data)
        this.state.linkReady = true
    }

    render(){
        const data = this.props.navigation.getParam( 'name', 'Service')
        const patchPostMessageFunction = function() {
            var originalPostMessage = window.postMessage;
            var patchedPostMessage = function(message, targetOrigin, transfer) {
              originalPostMessage(message, targetOrigin, transfer);
            };
            patchedPostMessage.toString = function() {
              return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };
            window.postMessage = patchedPostMessage;
          };
        const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();' 
        return( 
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={{display:'none'}}>
                        <WebView
                            style={{width:0,height:0}}
                            javaScriptEnabled={true}
                            injectedJavaScript={
                                patchPostMessageJsCode
                            }
                            source={{uri: 'https://www.orangetext.md'}}
                            ref={( WebView ) => this.webview = WebView}
                            onLoad={ () => this.getLinkOnCaptcha()}
                            onMessage={(event) => {
                                    if(this.state.linkReady == true){
                                    const captchaLink = 'document.location = "https://www.orangetext.md'+ event.nativeEvent.data + '";'
                                    this.captchaWebView.injectJavaScript(captchaLink)
                                    console.log('https://www.orangetext.md'+event.nativeEvent.data)
                                    }
                                }                          
                            } 
                        />
                    </View>
                    <Text style={{fontSize: 20}}>Captcha Image: </Text>
                    <View style={{height:50,width:400}}>
                    <WebView
                        automaticallyAdjustContentInsets={true}
                        javaScriptEnabled={true}
                        ref={( WebView ) => this.captchaWebView = WebView}
                    />
                    </View>
                    <Text style={{fontSize: 20}}> Phone number </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width:200}}
                        onChangeText={(To) => this.setState({To})}
                        value={this.state.To}
                    />
                    <Text style={{fontSize: 20}}> From </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width:200}}
                        onChangeText={(from) => this.setState({from})}
                        value={this.state.from}
                    />
                    <Text style={{fontSize: 20}}> Message </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width:200}}
                        onChangeText={(mess) => this.setState({mess})}
                        value={this.state.mess}
                    />
                    <Text style={{fontSize: 20}}> Captcha Value </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width:200}}
                        onChangeText={(captchaVal) => this.setState({captchaVal})}
                        value={this.state.captchaVal}
                    />
                    

                    <Button     
                        onPress={ () => {
                            console.log(this.state)
                            this.webview.injectJavaScript(
                                'document.getElementById("From").value = "'+ this.state.from+ '";'+
                                'document.getElementById("Msisdn").value = "'+ this.state.To+ '";'+
                                'document.getElementById("Message").value = "'+ this.state.mess + '";' +
                                'document.getElementById("Captcha").value = "' + this.state.captchaVal + '";' +
                                'document.getElementById("btnOK").click();'
                            )
                        }}
                        title="Send Message"
                    />
                </View>
                
                
            </View>
        );
    }
}
const styles = {
    mainContainer:{
        backgroundColor: '#333',
        height: 605
    },
    container: {
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#ffffff',
       height: 600
    },
    textStyle:{
        textAlign:'center',
        textAlignVertical:'auto',
        color:'#fff',
        fontSize:25
    },
    browserVisibleFalse:{
        height:0,
        width:0,
        display: 'none'
    }

    
}
/*
<Text style={{fontSize:25, textAlign:'center'}}> Phone Number {data}  </Text>
                    <TextInput
                        style={{fontSize:20, 
                                textAlign:'center',
                                backgroundColor:'#ddd',
                                marginTop:-20}}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />
                    <Text>
                        From
                    </Text>
                    <TextInput
                        style={{fontSize:20, 
                            textAlign:'center',
                            backgroundColor:'#ddd',
                            marginTop:-20}}
                        onChangeText={(From) => this.setState({From})}
                        value={this.state.From}
                    />

                    <Text style={{fontSize:25, textAlign:'center'}}>
                            Input Message
                    </Text>
                    <TextInput
                        style={{fontSize:20, 
                            textAlign:'center',
                            backgroundColor:'#ddd',
                            marginTop:-20}}
                        onChangeText={(messageText) => this.setState({
                            messageText
                        })}
                        value={this.state.messageText}
                    />


                    <TextInput
                        style={{fontSize:20, 
                            textAlign:'center',
                            backgroundColor:'#ddd',
                            marginTop:-20}}
                        onChangeText={(captchaValue) => this.setState({captchaValue})}
                        value={this.state.captchaValue}
                    />
                    <WebView
                        javaScriptEnabled={true}
                        style={[{ borderRadius: 50,
                            height: 100,
                            width: 400,
                             }]}
                        scrollEnabled={false}
                        source={{ uri: this.state.linkOnCaptcha }}
                    />
*/