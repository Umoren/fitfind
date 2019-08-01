## FitFinder

A fitness center locator.

### Description
This app aims to locate fitness centres with their facilities around you.
For now, it determines your location from your browser and randomly generates 10 dummy fitness centres 10 miles (16000 meters) around you.

### Tech
I used the following in building the app:
* React
* Google Map JavaScript API
* `google-maps-react` library by [Ari Lerner](https://twitter.com/auser). May not be the best (I saw another with a ton more weekly dowloads), but it was the easiest to understand and use under the time.
* A small util function [**geo.js**](https://gist.github.com/mkhatib/5641004) by [Mkhatib](https://twitter.com/mkhatib7) to generate random coordinates around a specific location.

### Hosting
The app is deployed [here](https://fitfinder.johnotu.com/). You are welcome to leave feedback as issues on this repo. Thanks :).