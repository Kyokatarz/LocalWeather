var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function showLocation(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    getWeather(lat, long);
}

function getWeather(lat, long) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + "&appid=72284372a6f3de7af08cb15a9da51d0f";

    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.send();
    req.onload = function () {
        var json = JSON.parse(req.responseText);
        console.log(json);
        mainApp(json);
    };
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, showError);
    } else document.getElementById('App').innerHTML = 'Geolocation is not supported by this browser.';
}

function mainApp(data) {
    var json = data;
    var temperatureC = (json.main.temp - 273).toFixed(1);
    var temperatureF = (temperatureC * 1.8 + 32).toFixed(1);
    var iconUrl = 'http://openweathermap.org/img/wn/' + json.weather[0]['icon'] + '@2x.png';
    var text = json.weather[0]['description'];
    var description = text.split(' ').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
    //---------------Main App---------------------//

    var App = function (_React$Component) {
        _inherits(App, _React$Component);

        function App(props) {
            _classCallCheck(this, App);

            var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this.state = {
                unit: 'C'
            };
            return _this;
        }

        _createClass(App, [{
            key: 'unitSwitch',
            value: function unitSwitch() {
                if (this.state.unit == "C") {
                    this.setState({ unit: "F" });
                } else this.setState({ unit: 'C' });
            }
        }, {
            key: 'render',
            value: function render() {

                return React.createElement(
                    'div',
                    { id: 'container' },
                    React.createElement(
                        'div',
                        { id: 'title' },
                        'Local Weather'
                    ),
                    React.createElement('img', { src: iconUrl }),
                    React.createElement(
                        'div',
                        { id: 'description' },
                        description
                    ),
                    React.createElement(
                        'div',
                        { id: 'temperature' },
                        React.createElement(
                            'div',
                            { onClick: this.unitSwitch.bind(this), id: 'temp' },
                            this.state.unit == 'C' ? temperatureC : temperatureF,
                            '\xB0',
                            this.state.unit,
                            ' ',
                            React.createElement('br', null)
                        )
                    ),
                    React.createElement(
                        'p',
                        { id: 'info' },
                        'Code and design by ',
                        React.createElement(
                            'a',
                            { href: 'https://github.com/Kyokatarz', target: '_blank' },
                            ' Kyo Tran '
                        )
                    )
                );
            }
        }]);

        return App;
    }(React.Component);

    ReactDOM.render(React.createElement(App, null), document.querySelector('#App'));
}

getLocation();

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}