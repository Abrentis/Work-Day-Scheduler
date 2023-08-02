$(function () {
  // Declared variables to target the family of time blocks and the family of save buttons.
  var timeBlock = $(".time-block");
  var saveButton = $(".saveBtn");

  // On-click function that stores entered text of each individual time block to local storage.
  $(saveButton).click(function() {
    var divContainer = $(this).parent();
    var divContainerId = divContainer.attr("id");
    localStorage.setItem(divContainerId, divContainerId);

    var textareaValue = divContainer.find("textarea").val().trim();
    localStorage.setItem("text-" + divContainerId, JSON.stringify(textareaValue));
  })

  /*
    Declared 'i' outside of the function scheduleColor to allow the value of 'i' to dynamically update so that
    the timeblock.each(function()) correctly applies the appropriate class that changes the background color of each time block.
    This function is called every time the page is opened or refreshed so that each time block has the correct background color.
  */
  var i = 8;
  function scheduleColor() {
    timeBlock.each(function() {
      var singleTimeBlock = $(this);
      var currentHour = dayjs().format("H");
      i++;
      if (currentHour > i) {
        singleTimeBlock.addClass("past");
      }
      else if (currentHour == i) {
        singleTimeBlock.addClass("present");
      }
      else if (currentHour < i) {
        singleTimeBlock.addClass("future");
      }
    })
  }
  scheduleColor();

  /*
    When the page is opened or refreshed, the function renderStorage() gets the values stored in local storage and applies
    them to their corresponding text areas that were saved within their respective time blocks.
  */
  function renderStorage() {
    timeBlock.each(function() {
      var timeBlockId = $(this).attr("id");
      var timeBlockText = $(this).find("textarea");
      for (var i = 9; i < 18; i++) {
        var hourIndex = "hour-" + i;
        if (hourIndex == timeBlockId) {
          var textareaText = JSON.parse(localStorage.getItem("text-" + timeBlockId));
          if (textareaText !== null) {
            timeBlockText.val(textareaText);
          }
        }
      }
    })
  }
  renderStorage();

  // Shows the day of the week, date, and current time that is dynamically updated.
  function currentTime() {
    var today = dayjs();
    $('#currentDay').text(today.format('dddd, MMM D, YYYY h:mm:ss'));
  }
  currentTime();
  setInterval(currentTime, 1000);
});