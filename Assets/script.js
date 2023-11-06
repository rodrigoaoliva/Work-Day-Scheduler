//Display the current date in the header 
$(function () {
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

   // Function to update time block colors
   function updateTimeBlockColors() {
    $(".time-block").each(function () {
      const blockHour = parseInt($(this).attr("id").split("-")[1]);
      const currentHour = dayjs().format("H");

      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour == currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  updateTimeBlockColors();

  // Function to load saved events from local storage
    function loadEvents() {
      $(".time-block").each(function () {
        const eventId = $(this).attr("id");
        const eventDescription = localStorage.getItem(eventId);
        $(this).find("textarea").val(eventDescription);
      });
    }
  
    loadEvents();

  // Add a click event listener to save events to local storage
  $(".saveBtn").on("click", function () {
    const eventId = $(this).closest(".time-block").attr("id");
    const eventDescription = $(this).siblings(".description").val();
    localStorage.setItem(eventId, eventDescription);
  });
});

