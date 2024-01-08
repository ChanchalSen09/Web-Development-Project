const form = document.querySelector(`form`);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const height = parseFloat(document.querySelector("#Height").value) / 100;
  const weight = parseFloat(document.querySelector("#weight").value);
  const result = document.querySelector(`.result`);
  if (height === `` || height < 0 || isNaN(height)) {
    result.innerHTML = `Please Enter the vaild data ${height}`;
  } else if (weight === `` || weight < 0 || isNaN(weight)) {
    result.innerHTML = `Please Enter the vaild data ${weight}`;
  } else {
    const BMI = (weight / (height * height)).toFixed(2);
    // result.innerHTML = `Your BMI is <span>${BMI}</span>`;
    if (BMI >= 18.6 && BMI < 24.9) {
      result.innerHTML = `Your BMI is  <span>${BMI}</span> This is Normal Condition`;
    } else if (BMI >= 30) {
      result.innerHTML = `Your BMI is  <span>${BMI}</span> This is Overweight Condition`;
    } else {
      result.innerHTML = `Your BMI is  <span>${BMI}</span> This is Underweight Condition`;
    }
  }
});
