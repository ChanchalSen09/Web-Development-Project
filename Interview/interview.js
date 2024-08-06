function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "CHanchal", last: "Sen" };
      resolve(data);
    }, 1000);
  });
}

fetchData()
  .then((Data) => {
    console.log(Data);
  })
  .catch((error) => console.log(error));
