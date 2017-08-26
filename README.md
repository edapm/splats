# Setup
To develop, fire up a mocked version of the cloud functions and host the static folder using `yarn start`. Set up live rebuilds of the frontend with `yarn run watch`.

Then open a browser and go to <http://localhost:5000>.

To update the list of leaders, download a CSV from the Google doc and put it in `dump/leaders.csv`, and put the corresponding images in `dump/img`. Then run `yarn run assets`. This creates a json file with the leaders info and compresses the images for the web. Grab the images from `dump/out/img` and upload them to Firebase storage. Likewise, upload the leaders JSON to `/leaders` in the Firebase database.

Bear in mind there are two instances of Firebase - a test environment and a live environment.
