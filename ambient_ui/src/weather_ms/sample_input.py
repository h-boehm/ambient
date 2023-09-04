import time

a = "Seattle,WA,US,Imperial"

file = open("weather_request.txt", "w")
file.write(a)
file.close()

time.sleep(1)

file = open("weather_response.txt", "r")
output = file.readline()
print(output)
