;(function($, window) {
  var $details_container;
  
  function init_nunjucks() {
    nunjucks.configure('/public/templates');
  }

  function init_app() {
    init_nunjucks();
    // have to make this available to the google-sheets-helpers
    window.listMajors = listMajors;
    $.getScript("https://apis.google.com/js/client.js?onload=checkAuth");
  }

  /**
   * Print the names and majors of students in a sample spreadsheet:
   * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   */
  function listMajors() {
    var rowNo = parseInt(location.hash.substring(1))+1 || 2;
    console.log("Row number: " + rowNo);
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1KThLEWTiXyl4j7AueDXq3FOKr_rkoZ57Db6kKChe0LA',
      range: 'Dataset0.1!A'+rowNo+':R'+rowNo,
    }).then(function(response) {
      $("body").addClass("gs-data-loaded");
      var range = response.result;
      if (range.values.length > 0) {
        console.log(range.values[0]);
        for (i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          var item = {
            "reference": row[0],
            "email": row[3],
            "amount": row[4],
            "card": row[7],
            "status": row[5],
            "startDate": row[11],
            "payId": row[10],
            "startEnter": row[12],
            "authSubmit": row[13],
            "authSucceed": row[14]
          };
          // Print columns A and E, which correspond to indices 0 and 4.
          appendPre(item);
        }
      } else {
        appendPre('No data found.');
      }
    }, function(response) {
      appendPre('Error: ' + response.result.error.message);
    });
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node.
   *
   * @param {string} message Text to be placed in pre element.
   */
  function appendPre(message) {
    $details_container.append( jQuery.parseHTML( nunjucks.render('details-item.html', message) ) );
    $(".trans-evs-heading").after( jQuery.parseHTML( nunjucks.render('transaction-events.html', message) ) );
  }

  $(function() {
    // on dom ready, kick it all off
    $details_container = $('#detail-item');
    init_app();
  });
  
}).call(this, jQuery, window);