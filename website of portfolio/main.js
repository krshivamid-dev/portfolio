
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", async function (e) {

  e.preventDefault();

  result.style.display = "block";
  result.innerHTML = "Please wait...";

  const formData = new FormData(form);

  const object = {};

  formData.forEach((value, key) => {
    object[key] = value;
  });

  const json = JSON.stringify(object);

  try {

    const response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }
    );

    const data = await response.json();

    if (response.status === 200) {

      result.innerHTML = "✅ Message Sent Successfully!";
      result.style.color = "#22c55e";

      form.reset();

    } else {

      result.innerHTML = "❌ " + data.message;
      result.style.color = "#ef4444";

    }

  } catch (error) {

    console.log(error);

    result.innerHTML = "❌ Something went wrong!";
    result.style.color = "#ef4444";

  }

  setTimeout(() => {

    result.style.display = "none";

  }, 5000);

});
