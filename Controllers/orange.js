import React from 'react';
import HTMLParser from 'fast-html-parser';
import { WebView, Alert } from 'react-native';
import FormData from 'FormData';

function getRawAttrs(rawString,attrName){
    var indexOfAttr = Number(rawString.indexOf(attrName)) + attrName.length + 2;
    var endIndex = Number( rawString.indexOf('"',indexOfAttr) );
    var res = rawString.slice(indexOfAttr, endIndex);
    return res
}


export default class Orange{
   constructor(props){}

   GetTokenID(htmlCode){
    var root = HTMLParser.parse(htmlCode)
    const tokenID = getRawAttrs( root.querySelector('#TokenId').rawAttrs, "value" )
    //const linkImage = getRawAttrs( root.querySelector('captcha'))
    const img = root.querySelectorAll('img')
    const imgCaptch =  getRawAttrs(img[12].rawAttrs,"src")
    const returnData = {token : tokenID, imgLink : imgCaptch }
    return returnData
    //console.log(getRawAttrs(tokenID.rawAttrs, "value"))
    
   }

   SendMessage(state){
    var serializeJSON = function(data) {
        return Object.keys(data).map(function (keyName) {
          return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
        }).join('&');
      }
      
      var response = fetch('https://www.orangetext.md/ro', {
        method: 'POST',
        body: serializeJSON({
            'MIME Type': 'application/x-www-form-urlencoded',
            'TokenId' : String(state.TokenID),
            'rest' : String(137 - state.messageText.length),
            'From' : String(state.From),
            'Msisdn' : String(state.text),
            'Message' : String(state.messageText),
            'Captcha' : String(state.captchaValue),
            'btnOK' : 'Trimite+SMS'
        }),
        headers: {
            'Cookie': 'ASP.NET_SessionId=ebyem22qlcnmwzdknrbsojhi; TS014af75e=010a2e6969d48eb36ab6f13f789e6414097b96c94e9bb58993421030e11edc3063be6f1141cafc021bd3bcc42940baa4209668d38e2564f86b88438e6c32a9fedd09c69060; TS014af75e_28=011062b09aeedc4e46789dd596393853e5ffcdb1582253655c8ed0e88877aa108869a1649c57127bd02c69c57a9f53b7ad414db0c7; TSPD_101=087d27407dab28004144394e26e86fdf0dc56d9c090a4ab1a04aac052488fb87e22e31e195bb1eaf0a4026ff2872c7c3:; _ga=GA1.2.1965664608.1538721097; _gcl_au=1.1.1152406163.1538721096',
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Origin': 'https://www.orangetext.md',
            'Content-Length': 99,
            'Accept-Language': 'en-us',
            'Host': 'www.orangetext.md',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.1 Safari/605.1.15',
            'Referer': 'https://www.orangetext.md/',
            'Accept-Encoding': 'br, gzip, deflate',
            'Connection': 'keep-alive'
        }

      }).then(response => console.log(response));
      return response
   }

   SendMessage3(state){

    let formData = new FormData();
    formData.append('MIME Type','application/x-www-form-urlencoded');
    formData.append('TokenId', String(state.TokenID));
    formData.append('rest' , String(137 - state.messageText.length));
    formData.append('From', String(state.From));
    formData.append('Msisdn',String(state.text));
    formData.append('Message',String(state.messageText));
    formData.append('Captcha', String(state.captchaValue));
    formData.append('btnOK', 'Trimite+SMS');
    let data = {
        method: 'POST',
        headers: {
            'Cookie': 'ASP.NET_SessionId=ebyem22qlcnmwzdknrbsojhi; TS014af75e=010a2e6969d48eb36ab6f13f789e6414097b96c94e9bb58993421030e11edc3063be6f1141cafc021bd3bcc42940baa4209668d38e2564f86b88438e6c32a9fedd09c69060; TS014af75e_28=011062b09aeedc4e46789dd596393853e5ffcdb1582253655c8ed0e88877aa108869a1649c57127bd02c69c57a9f53b7ad414db0c7; TSPD_101=087d27407dab28004144394e26e86fdf0dc56d9c090a4ab1a04aac052488fb87e22e31e195bb1eaf0a4026ff2872c7c3:; _ga=GA1.2.1965664608.1538721097; _gcl_au=1.1.1152406163.1538721096',
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Origin': 'https://www.orangetext.md',
            'Content-Length': 99,
            'Accept-Language': 'en-us',
            'Host': 'www.orangetext.md',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.1 Safari/605.1.15',
            'Referer': 'https://www.orangetext.md/',
            'Accept-Encoding': 'br, gzip, deflate',
            'Connection': 'keep-alive'
        },
        body: formData
    }
    
    return fetch('https://www.orangetext.md/ro', data)
              .then(response => {
                  console.log(response)
                  console.log(response.text())
              }).catch((err) => { console.log(err); })
    
   }

   SendMessage2(state){
       
    let data = {
        method: 'POST',
        body: JSON.stringify({
            'MIME Type': 'application/x-www-form-urlencoded',
            'TokenId' : String(state.TokenID),
            'rest' : String(137 - state.messageText.length),
            'From' : String(state.From),
            'Msisdn' : String(state.text),
            'Message' : String(state.messageText),
            'Captcha' : String(state.captchaValue),
            'btnOK' : 'Trimite+SMS'
        }),
        headers: {
            'Cookie': 'ASP.NET_SessionId=ebyem22qlcnmwzdknrbsojhi; TS014af75e=010a2e6969d48eb36ab6f13f789e6414097b96c94e9bb58993421030e11edc3063be6f1141cafc021bd3bcc42940baa4209668d38e2564f86b88438e6c32a9fedd09c69060; TS014af75e_28=011062b09aeedc4e46789dd596393853e5ffcdb1582253655c8ed0e88877aa108869a1649c57127bd02c69c57a9f53b7ad414db0c7; TSPD_101=087d27407dab28004144394e26e86fdf0dc56d9c090a4ab1a04aac052488fb87e22e31e195bb1eaf0a4026ff2872c7c3:; _ga=GA1.2.1965664608.1538721097; _gcl_au=1.1.1152406163.1538721096',
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Origin': 'https://www.orangetext.md',
            'Content-Length': 99,
            'Accept-Language': 'en-us',
            'Host': 'www.orangetext.md',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.1 Safari/605.1.15',
            'Referer': 'https://www.orangetext.md/',
            'Accept-Encoding': 'br, gzip, deflate',
            'Connection': 'keep-alive'
        }
      }
      return fetch('https://www.orangetext.md/ro', data)
              .then(response => {
                  console.log(response)
              }).catch((err) => { console.log(err); })
    } 
    SendMessage1(state){
       bodyLast = JSON.stringify({
        'MIME Type': 'application/x-www-form-urlencoded',
        'TokenId' : String(state.TokenID),
        'rest' : String(137 - state.messageText.length),
        'From' : String(state.From),
        'Msisdn' : String(state.text),
        'Message' : String(state.messageText),
        'Captcha' : String(state.captchaValue),
        'btnOK' : 'Trimite+SMS',
        
        
    })
    fetch('https://www.orangetext.md/ro', {
        method: 'post',
        headers: {
            'Cookie': 'ASP.NET_SessionId=ebyem22qlcnmwzdknrbsojhi; TS014af75e=010a2e6969d48eb36ab6f13f789e6414097b96c94e9bb58993421030e11edc3063be6f1141cafc021bd3bcc42940baa4209668d38e2564f86b88438e6c32a9fedd09c69060; TS014af75e_28=011062b09aeedc4e46789dd596393853e5ffcdb1582253655c8ed0e88877aa108869a1649c57127bd02c69c57a9f53b7ad414db0c7; TSPD_101=087d27407dab28004144394e26e86fdf0dc56d9c090a4ab1a04aac052488fb87e22e31e195bb1eaf0a4026ff2872c7c3:; _ga=GA1.2.1965664608.1538721097; _gcl_au=1.1.1152406163.1538721096',
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Origin': 'https://www.orangetext.md',
            'Content-Length': 99,
            'Accept-Language': 'en-us',
            'Host': 'www.orangetext.md',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.1 Safari/605.1.15',
            'Referer': 'https://www.orangetext.md/',
            'Accept-Encoding': 'br, gzip, deflate',
            'Connection': 'keep-alive'
        },
        body: unescape(bodyLast)
    }).then(res => {
        console.log('BODY', bodyLast)
        console.log(res)
        Alert.alert(
            'Message sent',
            bodyLast,
            [
              {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
    })
   }

  

   
}


