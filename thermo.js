/*
Assignment #1 for Connected Devices
Author: Morgan Mueller
Date: February 4, 2019
*/

//four line server example created by Tom Igoe
var express = require('express');
var server = express();
server.use('/',express.static('public'));
server.get('/temperature',temperature);
server.get('/temperature/:changeTemp',modifyTemp);
server.get('/state',checkState);
server.get('/state/:newState',changeThermState);
server.listen(8080);

//inital state of the Serverstat
var thermostatState = 'off';
var thermTemp = 64;

/*
CheckState is responsible for checking the current state of the Serverstat(either heat/off/cold) and the current
temperature in Farenheit
*/
function checkState(request, response){
  response.send('the current state is: ' + thermostatState + ', at a temperature of ' + thermTemp + ' degrees Farenheit');
  response.end;
}

/*
changeThermState allows the user to manually change the state of the thermostat when they enter
one of the three preset states
*/
function changeThermState(request, response){
  var newThermState = request.params.newState;
  if(newThermState == 'off' || newThermState == 'cold' || newThermState == 'heat'){
    thermostatState = newThermState;
    response.send('the state has been set to ' + thermostatState);
    }
    else{
      response.send('please only input "off/cold/heat"');
    }
    response.end;
}
/*
temperature sets a random temperature value to the output when the state is changed.
*/
function temperature(request, response){
  if(thermostatState == 'heat'){
    var temp =  Math.floor(Math.random()*(80-70+1)+70);
    if(temp <= 69){
      temp = 73;
    }
  }

  if(thermostatState == 'cold'){
    var temp =  Math.floor(Math.random()*(65-55+1)+55);
  }

  else{var temp =  64;}
  thermTemp = temp;
  response.send('the current temperature inside the apartment is: ' + temp + ' degrees Farenheit');
  response.end;

}
/*
modifytemp allows the user to either increase or decreaase the temperature depending
on their preferences
*/
function modifyTemp(request, response){
  var tempChange = request.params.changeTemp;;

    if(tempChange == 'increase'){
    thermTemp++;
    response.send('the temperature has been increased to ' + thermTemp);
    }

    else if(tempChange == 'decrease'){
      thermTemp--;
      response.send('the temperature has been decreased to ' + thermTemp);
    }
    else{
      response.send('Please input either "increase/decrease"');

    }
    response.end;

}
