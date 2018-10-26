import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import Settings from '../settings'
import Orange from '../Controllers/orange'
import { WebView, Image } from 'react-native';
import AsyncImage from './AsyncImage'
//<Text> {Settings.Orange.name} </Text>
export default class ServiceView extends React.Component{

    constructor(props) {
        super(props);
        this.state = { htmlReady: false };
        this.webview = null;
    }

    getHTMLCode() {
        //const captcha = /src="(\/captcha\/[a-zA-Z0-9&_.-[a-zA-Z0-9&;_.-]*)"/.exec(document.documentElement.outerHTML)[1]
        
        const data = 
        "var parent = document.getElementsByClassName('form-group form-inline');" +
        "var link = parent[0].children[1].getAttribute('src');" +
        'document.location = link;'//"https://google.md/" + link;' 
        //'let captcha = /src="(\/captcha\/[a-zA-Z0-9&_.-[a-zA-Z0-9&;_.-]*)"/;' + 
        //'console.log(captcha);' +
        
        //'let link = captcha.exec(document.documentElement.outerHTML)[1];' +
        
        //'document.getElementById("Message").value = captcha.exec(document.documentElement.outerHTML)[1];'
        //'document.location = "https://orangetext.md/" + captcha' 
        
        console.log(data)
        
        this.webview.injectJavaScript(data)
        
        this.state.htmlReady = true
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
                    
                    <WebView
                        //style = {styles.browserVisibleFalse}
                        style= {{width:400,height:50}}
                        javaScriptEnabled={true}
                        injectedJavaScript={
                            patchPostMessageJsCode
                        }
                        source={{uri: 'https://www.orangetext.md'}}
                        ref={( WebView ) => this.webview = WebView}
                        onMessage={
                            (event) => {
                                console.log(event.nativeEvent.data)
                                if(this.state.htmlReady)
                                {
                                    console.log(event.nativeEvent.data)
                                }    
                            }
                        }
                    />
                    
                    <Button     
                        onPress={ () => {
                            this.getHTMLCode()
                            }
                        }   
                        title='get html code'
                    /> 


                    <Button     
                        onPress={ () => {
                            this.webview.injectJavaScript(
                                'document.getElementById("From").value = "My value";'+
                                'document.getElementById("Msisdn").value = "069646676";'+
                                'document.getElementById("Message").value = "message";' +
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
       justifyContent: 'space-around',
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