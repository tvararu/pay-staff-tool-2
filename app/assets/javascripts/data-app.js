;(function($, window) {

  function init_app() {
    nunjucks.configure('/public/templates');
    $.getScript("https://apis.google.com/js/client.js?onload=checkAuth");
  }

  function formatDate( date ) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var mins = ('0' + date.getMinutes()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    // 2 Jul 2016 – 12:45
    return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " - " + hours + ":" + mins;
  }

  /**
   * Map all the cells from a row in the spreadsheet
   * into a data object that the templates can use
   */
  function mapRowToObject(row, rowNo) {
    var obj = {
      "row": rowNo,
      "reference": row[0],
      "firstName": row[1],
      "lastName": row[2],
      "email": row[3],
      "amount": row[4],
      "status": row[5],
      "subStatus": row[6],
      "card": row[7],
      "provider": row[8],
      "gatewayId": row[9],
      "payId": row[10],
      "startDate": formatDate(new Date ( Date.parse(row[11]) ) ),
      "startEnter": formatDate(new Date ( Date.parse(row[12]) ) ),
      "authSubmit": formatDate(new Date ( Date.parse(row[13]) ) ),
      "authSucceed": formatDate(new Date ( Date.parse(row[14]) ) ),
      "paySubmit": formatDate(new Date ( Date.parse(row[15]) ) ),
      "paySucceed": formatDate(new Date ( Date.parse(row[16]) ) ),
      "failed": formatDate(new Date ( Date.parse(row[17]) ) )
    };
    return obj;
  }

  /**
  * Fetch sheets data and then render using given callback
  *
  * @param {func} a function to render data item
  */
  function fetchSheetsData( start, end, renderFunc ) {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1KThLEWTiXyl4j7AueDXq3FOKr_rkoZ57Db6kKChe0LA',
      range: 'Dataset0.1!A'+start+':R'+end,
    }).then(function(response) {
      $("body").addClass("gs-data-loaded");
      var range = response.result;
      if (range.values.length > 0) {

        for (i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          var item = mapRowToObject(row, i+1);

          // call render function passed
          // to function
          renderFunc( item );
        }
      } else {
        console.log('No data found.');
      }
    }, function(response) {
      console.log('Error: ' + response.result.error.message);
    });
  }

  /**
  * Navigate to provided url
  */
  function navigateTo(evt) {
    window.document.location = $(this).data("href");
  }

  // on DOM ready, kick it all off
  $(function() {
    init_app();

    /**
    * add right listener for google sheets api loading
    * On load fetch data and render it
    *
    * replace {func} with rendering function you need
    */
    if ($("body").hasClass("transaction-list-view")) {
      // LIST VIEW
      var $table = $('#transaction-table').find("tbody");

      // make rows of table clickable
      $("#transaction-table").on('click', '.clickable-row', navigateTo);

      $(document).on("googlesheets.loaded", function(evt) {
        fetchSheetsData( 2, 101, function( data ) {
          $table.append( jQuery.parseHTML( nunjucks.render('list-item.html', data) ) );
        });
      });

    } else if ($("body").hasClass("transaction-detail-view")) {
      // DETAIL VIEW
      var $details_container = $('#detail-item'),
          $transHeading = $(".trans-evs-heading"),
          rowNo = parseInt(location.hash.substring(1))+1 || 2;

      $(document).on("googlesheets.loaded", function(evt) {
        fetchSheetsData( rowNo, rowNo, function( data ) {
          $details_container.append( jQuery.parseHTML( nunjucks.render('details-item.html', data) ) );
          $transHeading.after( jQuery.parseHTML( nunjucks.render('transaction-events.html', data) ) );
        });
      });

    }

  });

}).call(this, jQuery, window);
