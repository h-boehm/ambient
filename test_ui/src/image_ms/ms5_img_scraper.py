"""
Citation for Avi Thour
Date obtained: 4/29/2022
Adapted from the following URL
https://stackoverflow.com/questions/55787165/getting-a-url-of-some-picture-from-google-search

Citation for ThePavoIC
Date obtained: 4/30/2022
Adapted from the following URL
https://stackoverflow.com/questions/30595918/is-there-any-api-to-get-image-from-wiki-page

Citation for abf
Date obtained: 5/1/2022
Adapted from the following URL
https://stackoverflow.com/questions/7138686/how-to-write-a-list-to-a-file-with-newlines-in-python3

The following microservice is developed for learning purposes with no intent
for redistribution. Further, there is no attempt to violate copyright and
no claim of ownership is made on the results.
"""
"""
How to use:
This microservice operates with an infinite while loop that reads a text file
until a recognized 15 character string is found. These characters are
assumed to be introduced by another process / program that will open and write 
to the shared text file. Thus, this create a text file pipeline for 
communication. Originally, the shared text file is named ms5.txt and it looks
for 'runTheFollowing'. When found, the microservice then identifies the option
selected in string index position 15. A 1 is used to select google search 
results while a 2 is used to select all the images on a wikipedia page. 
The remainder of the text file is used to pass the search term to the 
microservice. The result of the microservice is written to the shared
text file. Using time module to have the client process sleep is
recommended for expected behavior. To make a follow-up request, simply write
to the shared text file again with the expected 15 character string, 
numerical option and query.

Required modules include requests, bs4 and wikipedia. Additionally, an html-
parser is required. Currently, the microservice uses html-parser which will
also need to be installed locally.

Each result is printed to a new line of the shared text file, ms5.txt and 
can individually be used with <img src={{result[i]}}> to load through template.
"""
import requests
from bs4 import BeautifulSoup
import wikipedia


def get_google_images(keyword):
    """
    This performs the work for the microservice by obtaining a list of google
    image locations based on the keyword

    :param keyword: String - The term to search for google images
    :return: list of locations that work as img sources
    """
    url = 'https://www.google.com/search?q={0}&tbm=isch'.format(keyword)
    content = requests.get(url).content
    soup = BeautifulSoup(content, 'html.parser')
    images = soup.findAll('img')
    img_results = []
    for image in images:
        img_results = img_results + [image.get('src')]
    return img_results[1:]


def get_wiki_images(wiki_page):
    """
    This performs the work for the microservice by obtaining all image sources
     from a particular wiki_page and returning as a list

    :param wiki_page: String - The term to search for google images
    :return: list of locations that work as img sources
    """
    try:
        wikipage = wikipedia.page(wiki_page)
        return wikipage.images
    except:
        return 'Try a different input'


while True:
    """
    This is the background process that reads a file until a request is made.
    Once a request is made, the service is provided and results overwrite
    the request. This then loops until another request is identified
    """
    # Can add input / output set up by changing file names
    with open('ms5.txt', 'r') as f:
        read_text = f.read()

    # Test to determine if a service is requested
    if len(read_text) > 0 and read_text[0:15] == "runTheFollowing":
        if len(read_text) > 16:

            # Determine whether to run google image search or wiki search
            service, request = read_text[15], read_text[16:]
            if service == '1':
                payload = get_google_images(request)
            elif service == '2':
                payload = get_wiki_images(request)
            else:
                payload = ['Check the request inputs']

            # Return the results
            file = open("ms5.txt", "w")
            file.write("\"")
            file.write(payload[0])
            file.write("\"")
            file.close()
