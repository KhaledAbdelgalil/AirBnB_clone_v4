$(document).ready(main);
const HOST = "localhost";
const amenityObj = {};
function main() {
    $(".amenities .popover input").change(function () {
      if ($(this).is(":checked")) {
        amenityObj[$(this).attr("data-name")] = $(this).attr("data-id");
      } else if ($(this).is(":not(:checked)")) {
        delete amenityObj[$(this).attr("data-name")];
      }
      const names = Object.keys(amenityObj);
      $(".amenities h4").text(names.sort().join(", "));
      
    });
    const full_url = `http://${HOST}:5001/api/v1/status/`
    $.get(full_url, function (data) {
        $('header #api_status').addClass("available");
    });
    getPlaces();
    $("button").click(getPlaces);
  }

  function getPlaces() {
    const places_url = `http://${HOST}:5001/api/v1/places_search/`;
    $.ajax({
      url: places_url,
      type: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({amenities: Object.values(amenityObj)}),
      success: function (response) {
        $("SECTION.places").empty();
        for (const articleData of response) {
          const article = [
            "<article>",
            '<div class="title_box">',
            `<h2>${articleData.name}</h2>`,
            `<div class="price_by_night">$${articleData.price_by_night}</div>`,
            "</div>",
            '<div class="information">',
            `<div class="max_guest">${articleData.max_guest} Guest(s)</div>`,
            `<div class="number_rooms">${articleData.number_rooms} Bedroom(s)</div>`,
            `<div class="number_bathrooms">${articleData.number_bathrooms} Bathroom(s)</div>`,
            "</div>",
            '<div class="description">',
            `${articleData.description}`,
            "</div>",
            "</article>",
          ];
          $("SECTION.places").append(article.join(""));
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  }