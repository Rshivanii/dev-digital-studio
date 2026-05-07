console.log("Dev Studio Website Loaded 🚀");

// Example interaction
document.querySelector(".btn").addEventListener("click", () => {
    alert("Thank you for contacting Dev Studio!");
});
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  fetch("http://localhost:5000/booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, phone })
  })
  .then(res => res.json())
  .then(data => {
    alert("Booking Successful 🎉");
    console.log(data);
  })
  .catch(err => console.log(err));
});