function MenuChoice()
{
    if (document.getElementById("menu").value == "newcust")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "upshipadd")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "deletecustomer")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
    }
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
}
function CreateCustomer()
{ 
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    //Collect Customer data from web page
    var customerid = document.getElementById("custid").value;
    var customername = document.getElementById("custname").value;
    var customercity = document.getElementById("custcity").value;
    
    //Create the parameter string
    var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername + '","City":"' + customercity + '"}';
    
    // Checking for AJAX operation Return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);  
        }     
    };
    
    //Start AJAX Request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
    
    }
    function OperationResult(output)
    {
        if (output.WasSuccessful == 1)
        {
            document.getElementById("result1").innerHTML = "The operation was successful!";
        }
        else
        {
            document.getElementById("result1").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
        }
}

function UpdateAddress()
{ 
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    //Collect Customer data from web page
    var ordernumber = document.getElementById("ordernum").value;
    var shiptoname = document.getElementById("shipname").value;
    var shiptoaddress = document.getElementById("shipaddress").value;
    var shiptocity = document.getElementById("shipcity").value;
    var postalcode = document.getElementById("postcode").value;
    
    //Create the parameter string
    var upaddy = '{"OrderID":"' + ordernumber + '","ShipName":"' + shiptoname + '","ShipAddress":"' + shiptoaddress + '","ShipCity":"' + shiptocity + '","ShipPostCode":"' + postalcode + '"}';
    
    // Checking for AJAX operation Return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            UpdateResult(result);  
        }     
    };
    
    //Start AJAX Request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(upaddy);
    
    }
    function UpdateResult(output)
    {
        if (output == 1)
        {
            document.getElementById("result2").innerHTML = "The Operation was successful!";
        }
        if(output == -2)
        {
            document.getElementById("result2").innerHTML = "The Operation failed because the data string supplied could not be deserialized into the service object.";
        }
        if (output == -3)
        {
            document.getElementById("result2").innerHTML = "The Operation was successful!";
        }
        else
        {
            document.getElementById("result2").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
        }
        
}

function DeleteCustomer()
{
       
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    
    customerID = document.getElementById("customernum").value;
    
    url+= customerID;
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            DeleteCustomerID(output);
        }
    };
    
    objRequest.open("GET", url, true);
    objRequest.send();
    
}
function DeleteCustomerID(output)
{
    output = output.DeleteCustomerResult.WasSuccessful;
    
    if (output == 1)
    {
        document.getElementById("section3").innerHTML = "Customer Deleted";
    }
    else
    {
        document.getElementById("section3").innerHTML = "output unsuccessful" + "<br>" + output.Exception;
    }
}