

$(document).ready(function () {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAhcJl-F2r8-sIMr-fUaDQoLHv7fPLbcuA",
        authDomain: "coding-bootcamp-demo-1fbf4.firebaseapp.com",
        databaseURL: "https://coding-bootcamp-demo-1fbf4.firebaseio.com",
        projectId: "coding-bootcamp-demo-1fbf4",
        storageBucket: "coding-bootcamp-demo-1fbf4.appspot.com",
        messagingSenderId: "9340671717"
    };
    firebase.initializeApp(config);

    database = firebase.database().ref("/trainschedule");

    database.on("child_added", function (snapshot) {

        console.log(snapshot.val().trainname);
        var trainName = snapshot.val().trainname;
        var destinationName = snapshot.val().destinationname;
        var firstTrainTime = snapshot.val().firsttraintime;
        var frequencyMin = snapshot.val().frequencymin;
        var currentDate = new Date();
        //var monthsWorked = Math.floor((Date.parse(currentDate) - Date.parse(employeeDate)) / 1000 / 60 / 60 / 24 / 30);
        //var totalBilled = employeeRate * monthsWorked;
            var timeArray = firstTrainTime.split(":");
            var firstTrainMoment = moment().hours(timeArray[0]).minutes(timeArray[1]);
            console.log(firstTrainMoment);
           
            //determine if train has come for the day
            var maxMoment = moment.max(firstTrainMoment, moment());
            if (maxMoment === firstTrainMoment) {
                console.log("Train has not arrived yet!");
                var minutesAway = firstTrainMoment.diff(moment(), "minutes")
                var nextArrival = firstTrainMoment.format("hh:mm a")
            } else {
                
                console.log("Train has come at least one time!");
                //differenceTimes is how long it's been since the first train of the day in minutes
               
                var differenceTimes = moment().diff(firstTrainMoment, "minutes");
                     //timeRemainder is the left over from taking the differncesTimes and 
                     //then modulus frequency.
                     var tRemainder = differenceTimes % frequencyMin;
                     var minutesAway = frequencyMin - tRemainder;
                     var nextArrival = moment().add(minutesAway, "m").format("hh:mm a")
                     
            }


        var newString = "<tr><td>" + trainName + "</td>"
            + "<td>" + destinationName + "</td>"
            + "<td>" + firstTrainTime + "</td>"
            + "<td>" + frequencyMin + "</td>"
            + "<td>" + nextArrival + "</td>"
            + "<td>" + minutesAway + "</td>"
        "</tr>"
        $("#train-list").append(newString);


    });

    $("#submit-one").on("click", function (event) {
        // prevent page from refreshing when form tries to submit itself
        event.preventDefault();

        // Capture user inputs and store them into variables
        var trainName = $("#train-name").val().trim();
        var destinationName = $("#destination-name").val().trim();
        var firstTrainTime = $("#first-train-time").val().trim();
        var frequencyMin = $("#frequency-min").val().trim();



        // Console log each of the user inputs to confirm we are receiving them
        console.log(trainName);
        console.log(destinationName);
        console.log(firstTrainTime);
        console.log(frequencyMin);
       // console.log(monthsWorked);
        console.log(frequencyMin);

        database.push(
            {
                trainname: trainName,
                destinationname: destinationName,
                firsttraintime: firstTrainTime,
                frequencymin: frequencyMin,
            }
        )

        // Replaces the content in the "recent-member" div with the new info
    });

});