



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBd_sqjFX-pmLCmOW7bbBg07WFxpAF95Go",
    authDomain: "train-time-f178b.firebaseapp.com",
    databaseURL: "https://train-time-f178b.firebaseio.com",
    projectId: "train-time-f178b",
    storageBucket: "",
    messagingSenderId: "831333731167"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train").on("click", function(event){
      event.preventDefault();
      
    var trainName = $("#name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();

    var newTrain = {
        name:trainName,
        dest:trainDest,
        time:trainTime,
        freq:trainFreq,
    }

    console.log(newTrain);

    database.ref().push(newTrain);

    alert("New Train Added!");

    $("#name-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");

  })

  database.ref().on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;

    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    var timeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(timeConverted);

    var diffTime = moment().diff(moment(timeConverted, "minutes"));
    console.log(diffTime);

    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");
  });
  


