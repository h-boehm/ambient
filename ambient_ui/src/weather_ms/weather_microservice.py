
import requests

# read key from text file and store as a variable
file = open("weather_api_key.txt", "r")
api_key = file.readline()


def extract_request_contents():
    """
    Extracts and stores contents of .txt file
    """
    file = open("weather_request.txt", "r")
    location = file.readline()
    open("weather_request.txt", "w").close()       # erases contents of .txt file
    return location


def call_api(location):
    """
    Formats input and makes a GET request to the weather API
    """
    city, state, country_code, unit = location.split(",")

    # removes leading and trailing spaces
    city, state, cCode, unit = city.strip(), state.strip(), country_code.strip(), unit.strip()
    city = city.replace(" ", "+")       # formats city name for API call
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + str(city) + "," + str(state) + "," + \
          str(country_code) + "&appid=" + str(api_key) + "&units=" + str(unit)

    response = requests.get(url)
    list_data = response.json()  # store response data as a variable

    return list_data, state


def extract_weather_data(list_data, state):
    """
    Creates a list containing only relevant weather data
    """

    data = [
        str(list_data['name']),                 # city name
        str(state),
        str(list_data['main']['temp']),         # temperatures
        str(list_data['weather'][0]['main']),   # weather conditions
    ]
    return data


def write_weather_data(weather_data):
    """
    Writes each element in the data list to the .txt file
    """
    file = open("weather_response.txt", "w")
    for ele in weather_data:
        if ele == weather_data[1]:
            file.write(ele)
            file.write(": ")
        elif ele == weather_data[3]:
            file.write(ele)
            break
        else:
            file.write(ele)
            file.write(", ")
    file.close()

    return


while True:                                         # runs continuously waiting for reqeust
    file = open("weather_request.txt", "r")
    check = file.readline()
    if check:                                       # runs if request found in .txt request file
        location = extract_request_contents()
        api_response = call_api(location)
        if api_response[0]['cod'] != 200:              # checks if request was valid
            print('Error: Invalid Search Request')
        else:
            weather_data = extract_weather_data(api_response[0], api_response[1])
            write_weather_data(weather_data)
