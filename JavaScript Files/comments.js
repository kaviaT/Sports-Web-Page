function submission()  {

        var name = document.getElementById("fname").value;
        var feedback = document.getElementById("comment").value;
        var rating=document.commentForm.rate.value;

        if (name == "") {					
            alert("Please Enter Your Name")  //This will Show when User did not Enter the Name
        }
        if (rating==""){
            alert ("Please be kind to Rate us by giving stars!")  	//This will Show when User did Rate By clicking Radio Buttons
        }
        alert ("Dear "+ name + " Thank you very much for your feedback. You have rated our site as "+ rating + " and your comment was "+feedback );
		//final Alert box which shows the Summery of data entered
    }