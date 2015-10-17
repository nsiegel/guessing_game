
$(document).ready(function() {
  var answer;
  var guesses;
  var counter;
  //function that creates a random number
  var random = function() {
    return Math.floor(Math.random() * 100 + 1);
  };

  var reset = function() {
    answer = random();
    guesses = {};
    counter = 1;
    $("#output").text("");
    $("#number").focus();
  };

  reset();

  var endGame = function() {
    $("#output").text("You're a LOSER! Reset to play again!");
  }

  var isInt = function(num) {
    if (parseFloat(num) % 1 == 0) {
      return true;
    } else {
      return false;
    }
  };

  var numCheck = function(num) {
    if (num >= 1 && num <= 100) {
      return true;
    } else {
      return false;
    }
  };

  var checkGuess = function(num) {
    if (isInt(num) == false || numCheck(num) == false) {
      return false;
    } else {
      return true;
    }
  };

  var hotOrCold = function(num) {
    counter++;
    var dist = Math.abs(num-answer);
    if (dist  <= 10 && num < answer) {
      $("#output").text("You are HOT! Guess a little higher!\n");
    } else if (dist <= 10 && num > answer) {
      $("#output").text("You are HOT! Guess a little lower!");
    } else if (dist > 10 && num < answer) {
      $("#output").text("You are cold BRRRR. Guess higher!");
    } else {
      $("#output").text("You are cold BRRRR. Guess lower!");
    }
  }

  var showOutput = function() {
    if (counter >= 5) {
      return endGame();
    }
    var num = $("#number").val();
    var status = checkGuess(num);
    if (status == true) {
      if (num == answer) {
        $("#output").text("Winner");
      } else {
        if (guesses[num] == true) {
          $("#output").text("You guessed this already. Try again.");
        } else {
          guesses[num] = true;
          hotOrCold(num);
        }
      }
    } else {
      $("#output").text("Invalid guess. Try again.");
    }
    $("#number").val("");

  }

  $("#guess-btn").click(function() {
    showOutput();
    $("#number").focus();
  });

  $("#number").keypress(function(event) {
    if (event.which == 13) {
      showOutput();
    }
  });

  $("#reset").click(function() {
    reset();
  })

});
