function MenuChoice()
{
    if (document.getElementById("menu").value == "selcatlist")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "selnewcat")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "selupcatdes")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "seldelcat")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "visible";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "selboutme")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "visible";
    }
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
}
function GetCategoryList()
{
    var objRequest = new XMLHttpRequest();
    
    //Create URL
    url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";

    
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
            var displaytext ="<table><tr> <th> Customer ID </th> <th> Category Name </th> <th> Category Description </tr> </th>";
            //Loop to extract data from the response object
            for (count = 0; count < result.GetAllCategoriesResult.length; count++)
            {
                displaytext += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>" +
                result.GetAllCategoriesResult[count].CDescription + "</td></tr>";
            }
            
            document.getElementById("result1").innerHTML = displaytext;
            }
            
function CreateCategory()
{ 
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    //Collect Customer data from web page
    var categoryname = document.getElementById("catname").value;
    var categorydescription = document.getElementById("catdes").value;
    
    //Create the parameter string
    var newcategory = '{"CName":"' + categoryname + '","CDescription":"' + categorydescription + '"}';
    
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
    objRequest.send(newcategory);
    
    }
    function OperationResult(output)
    {
        if (output.WasSuccessful == 1)
        {
            document.getElementById("result2").innerHTML = "The operation was successful!";
        }
        else
        {
            document.getElementById("result2").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
        }
}

function UpdateCategoryDescription()
{ 
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    //Collect Customer data from web page
    var customerid = document.getElementById("custid").value;
    var categorydescription = document.getElementById("catdescription").value;

    
    //Create the parameter string
    var upcatdescr = '{"CID":"' + customerid + '","CDescription":"' + categorydescription + '"}';
    
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
    objRequest.send(upcatdescr);
    
    }
    function UpdateResult(output)
    {
        if (output == 1)
        {
            document.getElementById("result3").innerHTML = "Category description updated succesfully!";
        }
        if(output == -2)
        {
            document.getElementById("result3").innerHTML = "Operation Failed: Data string supplied could not be deserialized into the service object.";
        }
        if (output == -3)
        {
            document.getElementById("result3").innerHTML = "Operation Failed: A record with the supplied customer ID could not be found.";
        }
        else
        {
            document.getElementById("result3").innerHTML = "Operation failed: Unspecified error :( ." + "<br>" + output.Exception;
        }
        
}
function DeleteCategory()
{
       
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    
    customerID = document.getElementById("customernum").value;
    
    url+= customerID;
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            DeleteCategoryy(output);
        }
    };
    
    objRequest.open("GET", url, true);
    objRequest.send();
    
}
function DeleteCategoryy(output)
{
    output = output.DeleteCategoryResult.WasSuccessful;
    
    if (output == 1)
    {
        document.getElementById("result4").innerHTML = "Category Deleted";
    }
    else
    {
        document.getElementById("result4").innerHTML = "Operation failed: " + "<br>" + output.Exception;
    }
}