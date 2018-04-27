function NextDate()

{
    var startdate = new Date(document.getElementById("firstdate").value); // Get start date from user
    var daystonext = Number(document.getElementById("btmeet").value); // number of days to next meeting
    
    var calcdate;
    
    calcdate = startdate.toDateString(startdate.setDate(startdate.getDate() + daystonext)); // Next date calculation
    
    document.getElementById("nextevent").innerHTML = calcdate; // Display the date in a label
    
}

function CalculateNumbers()

{    
    var numberstocalc = Number(document.getElementById("desiredmeetings").value); // Collect the number of meetings to be calculated
    var startdate = new Date(document.getElementById("firstdate").value); //
    var daystonext = Number(document.getElementById("btmeet").value);

    
    var count = 0;
    var result = "<table><tr><th>Number of Meetings</th><th>Date</th></tr>"; // Create a table header
    for (count= 0; count < numberstocalc; count++)
    
    {
        var calcudate;
        
        calcudate = startdate.toDateString(startdate.setDate(startdate.getDate() + daystonext )); // Creating the next meeting date
        result+="<tr><td>" + (count + 1) + "</td><td>" + startdate + "</td></tr>"; // Create Table Rows
    
    }
    result+="</table>";
    document.getElementById("numberdisplay").innerHTML = result;
    
}