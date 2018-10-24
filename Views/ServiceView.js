import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Settings from '../settings'
import Orange from '../Controllers/orange'
import { WebView, Image } from 'react-native';
import AsyncImage from './AsyncImage'
//<Text> {Settings.Orange.name} </Text>
export default class ServiceView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {  text: 'Phone number',
                        TokenID :'',
                        renderImage:false,
                        linkOnCaptcha : '',
                        messageText: 'Text message',
                        From : 'Your Name',
                        captchaValue: 'Enter captcha' };
    }

    render(){
        const data = this.props.navigation.getParam( 'name', 'Service')
        const orange = new Orange();
        
        //console.log(text)
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
          const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();' + 
          "setTimeout(function(){ window.postMessage(window.document.documentElement.outerHTML, '*'); },1000);";
          const JsCode = 'document.addEventListener("message", function(data) {' +
            'document.cookie=`cookiesName=${data.data};'+
        '})'
        return( 
            <View style={styles.mainContainer}>
                <View style={styles.container}>
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
                    
                    <View style={{display:'none'}}>
                        <WebView
                            style = {styles.browserVisibleFalse}
                            javaScriptEnabled={true}
                            source={{uri: 'https://www.orangetext.md'}}
                            injectedJavaScript={patchPostMessageJsCode}
                            //injectedJavaScript={" setTimeout(function(){ window.postMessage(window.document.documentElement.outerHTML, '*'); },1000); "} 
                            onMessage={ 
                                (event) => { 
                                    const data = orange.GetTokenID(event.nativeEvent.data)
                                    this.state.TokenID = data.token
                                    this.state.linkOnCaptcha = 'https://orangetext.md' + data.imgLink 
                                    
                                    console.log(this.state.linkOnCaptcha)
                                    this.forceUpdate()
                                    
                                    
                                } //console.log(event.nativeEvent.data)
                            }
                            onReceivedError = { 
                                error => {console.log(error)
                                }
                            } 
                        />
                    </View>
                    <Text> Captcha value </Text>
                    <TextInput
                        style={{fontSize:20, 
                            textAlign:'center',
                            backgroundColor:'#ddd',
                            marginTop:-20}}
                        onChangeText={(captchaValue) => this.setState({captchaValue})}
                        value={this.state.captchaValue}
                    />
                    <Button     
                        onPress={ () => {
                            orange.SendMessage(this.state)
                            console.log(this.state)
                        }}
                        title="Send Message"
                    />
                </View>
                
                <WebView
                        javaScriptEnabled={true}
                        style={[{ borderRadius: 50,
                            height: 100,
                            width: 400,
                             }]}
                        scrollEnabled={false}
                        source={{ uri: this.state.linkOnCaptcha }}
                    />
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
    },
    browserVisibleFalse:{
        height:0,
        width:0,
        display: 'none'
    }

    
}
