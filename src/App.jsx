
function showLocation(position){
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    getWeather(lat, long)
}

function getWeather(lat, long){
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + "&appid=72284372a6f3de7af08cb15a9da51d0f"


    let req = new XMLHttpRequest();
    req.open('GET',url,true);
    req.send();
    req.onload = function(){
        const json = JSON.parse(req.responseText);
        console.log(json);
        mainApp(json);
    }
}

function getLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showLocation, showError);
    } else document.getElementById('App').innerHTML = 'Geolocation is not supported by this browser.'
}



function mainApp(data){
    const json = data;
    var temperatureC = (json.main.temp - 273).toFixed(1);
    var temperatureF = (temperatureC * 1.8 + 32).toFixed(1);
    var iconUrl = 'http://openweathermap.org/img/wn/' + json.weather[0]['icon'] + '@2x.png'
    var text = json.weather[0]['description'];
    var description = text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    //---------------Main App---------------------//
    class App extends React.Component{
        constructor(props){
            
            super(props);
            this.state = {
               unit: 'C'
            }
        }
    unitSwitch(){
        if (this.state.unit == "C"){
            this.setState({unit: "F"})
        } else this.setState({unit: 'C'})
    }
        
        render(){
            
            return(
                <div id='container'> 
                    <div id='title'>Local Weather</div>
                    <img src={iconUrl}/>
                    <div id='description'>{description}</div>
                    <div id='temperature'>
                        
                        <div onClick = {this.unitSwitch.bind(this)} id='temp'>
                            {this.state.unit == 'C' ? temperatureC : temperatureF}°
                            {this.state.unit} <br/>
                            
                            
                        </div>
                    </div>
                    
                    <p id='info'>Code and design by <a href='https://github.com/Kyokatarz' target='_blank'> Kyo Tran </a></p>
                </div>
            )
        }
    }

    
    ReactDOM.render(<App/>, document.querySelector('#App'))
}

getLocation();


function showError(error){
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.")
      break;
  }

}