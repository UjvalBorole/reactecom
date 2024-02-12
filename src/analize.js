var dateString = "Oct 17, 2023";

// Parse the initial date string
var initialDate = new Date(dateString);

// Check if the initialDate is valid
if (!isNaN(initialDate)) {
    // Add 5 days to the initial date
    var resultDate = new Date(initialDate);
    resultDate.setDate(initialDate.getDate() + 5);

    // Format the resultDate as a string (e.g., "Oct 22, 2023")
    var resultDateString = resultDate.toDateString(); // You can use toLocaleDateString() for a more localized format

    console.log(resultDateString);
} else {
    console.log("Invalid date string");
}





