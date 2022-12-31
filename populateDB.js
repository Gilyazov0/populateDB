import axios from "axios";
import jsonData from "./PetsDataSet.json" assert { type: "json" };

async function getCatImg() {
  const url = "https://cataas.com/cat?json=true";
  const response = await axios.get(url);
  return `https://cataas.com/${response.data.url}`;
}

async function getDogImg() {
  const url = "https://dog.ceo/api/breeds/image/random";
  const response = await axios.get(url);
  return `${response.data.message}`;
}

async function getOtherImg() {
  const url = "https://randomfox.ca/floof/";
  const response = await axios.get(url);
  return `${response.data.image}`;
}

async function getImg(type) {
  switch (type) {
    case "Dog":
      return await getDogImg();
    case "Cat":
      return await getCatImg();
    default:
      return await getOtherImg();
  }
}

async function getPetObg(rawData) {
  const picture = await getImg(rawData.type);
  const data = {
    ...rawData,
    picture,
    hypoallergenic: rawData.hypoallergnic,
    dietary: "",
  };
  delete data.hypoallergnic;
  return data;
}

async function getData() {
  const promises = [];
  for (let i = 0; i < jsonData.length; i++) {
    promises.push(getPetObg(jsonData[i]));
  }
  return await Promise.all(promises);
}

async function postData(data) {
  for (let i = 0; i < data.length; i++) {
    const url = "http://localhost:8080/pet";
    axios.post(url, data[i]);
  }
}

const data = await getData();
postData(data);
