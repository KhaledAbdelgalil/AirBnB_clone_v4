$(document).ready(main);
function main() {
    const amenityObj = {};
    $(".amenities .popover input").change(function () {
      if ($(this).is(":checked")) {
        amenityObj[$(this).attr("data-name")] = $(this).attr("data-id");
      } else if ($(this).is(":not(:checked)")) {
        delete amenityObj[$(this).attr("data-name")];
      }
      const names = Object.keys(amenityObj);
      $(".amenities h4").text(names.sort().join(", "));
      
    });
    const full_url = "http://localhost:5001/api/v1/status/"
      $.get(full_url, function (data) {
        
        $('header #api_status').addClass("available");
    
      });
  }