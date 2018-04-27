function MenuChoice()
{
    if (document.getElementById("menu").value == "Show Customer List")
    {
        document.getElementById("custlist").style.visibility = "visible";
        document.getElementById("custhistory").style.visibility = "hidden";
        document.getElementById("custorders").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Show Order History")
    {
        document.getElementById("custlist").style.visibility = "hidden";
        document.getElementById("custhistory").style.visibility = "visible";
        document.getElementById("custorders").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Show Customer Orders")
    {
        document.getElementById("custlist").style.visibility = "hidden";
        document.getElementById("custhistory").style.visibility = "hidden";
        document.getElementById("custorders").style.visibility = "visible";
    }
    else
    {
        document.getElementById("custlist").style.visibility = "hidden";
        document.getElementById("custhistory").style.visibility = "hidden";
        document.getElementById("custorders").style.visibility = "hidden";
    }
}

function GetList()
{
    var objRequest = new XMLHttpRequest();
    
    //Create URL
    url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";

    
    //Checks that the object has returned data.
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var listput = JSON.parse(objRequest.responseText);
            GenOutput(listput);
        }
    };
    
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

        function GenOutput(result)
        {
            var count = 0;
            var displaytext ="<table><tr> <th> Customer ID </th> <th> Company Name </th> <th> City </tr> </th>";
            //Loop to extract data from the response object
            for (count = 0; count < result.GetAllCustomersResult.length; count++)
            {
                displaytext += "<tr><td>" + result.GetAllCustomersResult[count].CustomerID + "</td><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>" +
                result.GetAllCustomersResult[count].City + "</td></tr>";
            }
            
            document.getElementById("listdisplay").innerHTML = displaytext; }

function GetHistory()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    
    //Create URL and Query string
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += document.getElementById("idhist").value;
    
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var historyOutput = JSON.parse(objRequest.responseText);
            GenerateHistput(historyOutput);
        }
    };
        
        //Initiate the server request
        objRequest.open("GET", url, true);
        objRequest.send();
}

        function GenerateHistput(result)
        {
            var count = 0;
            var displaytext = "<table><tr> <th> Product Name </th> <th> Order Total </tr> </th>";
            for (count = 0; count < result.length; count++) //Loop to extract data from the response object
            
            {
                displaytext += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>" ; 
            }
            result+="</table>";
            document.getElementById("historydisplay").innerHTML = displaytext;
            }
            
function GetOrders()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    
    //Create URL and Query string
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += document.getElementById("custid").value;
    
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    };
        
        //Initiate the server request
        objRequest.open("GET", url, true);
        objRequest.send();
}

        function GenerateOutput(result)
        {
            var count = 0;
            var displaytext = "<table><tr> <th> Order Date </th> <th> Order ID </th> <th> Shipping Address </th> <th> City </th> <th> Name </th> <th> Postal Code </th> <th> Shipped Date </tr> </th>";
            for (count = 0; count < result.GetOrdersForCustomerResult.length; count++) //Loop to extract data from the response object
            
            {
                displaytext += "<tr><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" +
                result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName +
                "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>" ; 
            }
            result+="</table>";
            document.getElementById("orderdisplay").innerHTML = displaytext;
            }