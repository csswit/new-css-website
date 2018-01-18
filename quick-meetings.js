  function start() {
    // 2. Initialize the JavaScript client library.
    gapi.client.init({
      'apiKey': 'AIzaSyDX1NIXf8-dc7ZC4XXcipbrZgow59MsAfQ',
      // Your API key will be automatically added to the Discovery Document URLs.
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      // clientId and scope are optional if auth is not required.
      'clientId': '208833000673-qkfrncgkctrhfp0tbvbb0lefbv1ibt2n.apps.googleusercontent.com',
      'scope': 'profile',
    }).then(function() {
      // 3. Initialize and make the API request.
      return gapi.client.calendar.events.list({
        'calendarId': 'wentworthcsa@wit.edu',
        'orderBy': "startTime",
        'singleEvents': true
      });
    }).then(function(response) {
      var eventTitle2 = JSON.stringify(response.result.items[0].summary).replace(/["]+/g, '');
      console.log(eventTitle2)
      var eventTitle = JSON.stringify(response.result.items[0].summary);
      //var description = JSON.stringify(response.result.items[0].description).replace(/["]+/g, '');
      var description = JSON.stringify(response.result.items[0].description);
      var time = JSON.stringify(response.result.items[0].start.dateTime);

      console.log(JSON.stringify(response.result))
      
      document.getElementById('event').innerHTML = eventTitle;
      document.getElementById('description').innerHTML = description;
      document.getElementById('time').innerHTML = extractTime(time);
    }).catch((err) => {
      console.log(err);
      console.log(JSON.stringify(err));
    })
  };

  function extractTime(time) {
    var year = time.slice(1, 5);
    var month = time.slice(6, 8);
    var day = time.slice(9, 11);
    return month + '/' + day + '/' + year;
  }
  // 1. Load the JavaScript client library.
  gapi.load('client', start);
