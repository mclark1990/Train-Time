



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

  //click function to add input
  $("#add-train").on("click", function(event){
      event.preventDefault();
      
    var trainName = $("#name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();
    trainFreq = parseInt(trainFreq);
    
    var newTrain = {
        name:trainName,
        dest:trainDest,
        time:trainTime,
        freq:trainFreq,
    }

    console.log(newTrain);

    database.ref().push(newTrain);

    alert("New Train Added!");

    //empties input fields
    $("#name-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");

  })
//firebase event to add train data to database and then push data to table
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


 var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
 console.log(firstTimeConverted);

 // Current Time
 //var currentTime = moment();
 //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

 // Difference between the times
 var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 console.log("DIFFERENCE IN TIME: " + diffTime);

 // Time apart
 var tRemainder = diffTime % trainFreq;
 console.log(tRemainder);

 // Minutes until train
 var tMinutesTillTrain = trainFreq - tRemainder;
 console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

 // Next Train
 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

 //pushes variables data above to the schedule table
 $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
 trainFreq + "</td><td>" + nextTrain.format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td>");

});
  


