//Display the current date in the header 
$(function () {
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));  // Set the text of the element with the id "currentDay" to the current date in the format "Day, Month Day, Year."


   // Function to update time block colors
   function updateTimeBlockColors() { 
    $(".time-block").each(function () {
      const blockHour = parseInt($(this).attr("id").split("-")[1]); // Extract the hour from the element's id attribute.

      const currentHour = dayjs().format("H"); // Get the current hour in 24-hour format.

      // Compare the blockHour with the currentHour to determine if the time block is in the past, present, or future.
      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour == currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  // Call the updateTimeBlockColors function to update the time block colors based on the current time.
  updateTimeBlockColors();

  // Function to load saved events from local storage
    function loadEvents() {
      $(".time-block").each(function () {
        const eventId = $(this).attr("id");
        const eventDescription = localStorage.getItem(eventId);
        $(this).find("textarea").val(eventDescription);
      });
    }
  
    // Call the loadEvents function to load previously saved events from local storage.
    loadEvents();

  // Add a click event listener to save events to local storage
  $(".saveBtn").on("click", function () {
    const eventId = $(this).closest(".time-block").attr("id");
    const eventDescription = $(this).siblings(".description").val();
    localStorage.setItem(eventId, eventDescription);
  });
});

