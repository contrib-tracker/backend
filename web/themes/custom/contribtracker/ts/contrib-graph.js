(function ($) {
  jQuery(function () {

    // Function to extract the currentUserId from the URL.
    function getCurrentUserIdFromUrl() {
      var currentUrl = window.location.href;
      var matches = currentUrl.match(/\/user\/(\d+)/);
      
      if (matches && matches.length > 1) {
        // If you want to use Drupal.checkPlain to sanitize the result:
        return Drupal.checkPlain(matches[1]);
      }
      
      return null; // Return null if the pattern doesn't match.
    }

    // Extract the currentUserId from the URL.
    var currentUserId = getCurrentUserIdFromUrl();


    if (currentUserId !== null) {
      // Define the URL with the dynamic user ID.
      var url = '/user/' + currentUserId + '/graph';

      // Perform the GET request with the updated URL.
      $.get(url, function (data) {
        // Call the function to draw the calendar with the data.
        drawCalendar(data);
      });
    }

    /*** draw months ***/
    var month = moment();
    var outputMonth = "<ol class='month'>";
    for (i = 0; i <= 12; i++) {
        var durationMonth = moment.duration({ months: 1 });
        outputMonth += "<li>";
        outputMonth += moment(month).format("MMM");
        outputMonth += "</li>";
        month = moment(month).add(durationMonth);
    }
    outputMonth += "</ol>";

    // Function to draw the calendar with the data.
    function drawCalendar(data) {
      var output = "<ol><div class='activity-chart--wd'>";
      var day = moment();

      /* Calculate the offset for days of the week to line up correctly */
      var dayOfWeekOffset = 6 - parseInt(moment().format("d"), 10);
      for (i = 0; i < dayOfWeekOffset; i++) {
          output += "<li class='offset'></li>";
      }

      /*** draw calendar ***/
      for (i = 365; i >= 0; i--) {
          var contriDate = moment(day).format("dddd, MMMM Do YYYY");
          var activityCount = 0; // Default activityCount

          // Check if data exists for this date
          for (var j = 0; j < data.length; j++) {
            var patchDate = moment(data[j].patch_date);
            if (moment(day).isSame(patchDate, 'day')) {
              activityCount = data[j].patch_count;
              break; // Exit the loop once data is found for the date
            }
          }

          var activityCountstat = 0;

          if (activityCount === 0) {
            activityCountstat = 0;
          } else if (activityCount == 1) {
            activityCountstat = 1;
          } else if (activityCount == 2) {
            activityCountstat = 2;
          } else if (activityCount == 3) {
            activityCountstat = 3;
          } else {
            activityCountstat = 4;
          }

          output += "<li class='btn--tooltip' " + `data-title="${activityCount} contributions on ${contriDate}"` + `data-activity="${activityCountstat}"` + ">" + "</li>";

          var duration = moment.duration({ days: 1 });
          day = moment(day).subtract(duration);
      }

      output += "</div></ol>";
      document.getElementById("month").innerHTML = outputMonth;
      document.getElementById("days").innerHTML = output;
    }
  });
})(jQuery);
