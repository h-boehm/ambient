import React from "react";

class WeatherData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
	}

	componentDidMount() {
		this.readWeather(this.props.txt);
	}

	readWeather = file => {
		var ms_output = new XMLHttpRequest();
		ms_output.open("GET", file, false);
		ms_output.onreadystatechange = () => {
			if (ms_output.readyState === 4) {
				if (ms_output.status === 200 || ms_output.status === 0) {
					var weather_data = ms_output.responseText;
					this.setState({
						text: weather_data
					});
				}
			}
		};
		ms_output.send(null);
	};

	render() {
		return (
			<div>
				{this.state.text.split("\n").map((item, key) => {
					return <span key={key}>{item}<br /></span>;
				})}
			</div>
		);
	}
}

export default WeatherData;