import React, { useState, useEffect } from "react";
// import data from "./data";
import List from "./List";
import axios from "axios";
function App() {
  // const [people, setPeople] = useState(data); In case you want to use a static List
  // const dayOfMonth = new Date().getDate(); In case you want to check for a specific Day instead of the whole month
  const [peopleAPI, setPeopleAPI] = useState([]);
  const monthIndex = new Date().getMonth();
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthArray[monthIndex];

  const getBirthDays = () => {
    const options = {
      method: "GET",
      url: "https://dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com/",
      params: {
        format: "json",
        gender: "b",
        cc: "all",
        email: "gmail.com,yahoo.com",
        pwlen: "12",
        ip: "a",
        phone: "l,t,o",
        seed: "helloworld",
        count: "100",
        maxage: "90",
        minage: "30",
        uuid: "1",
        color: "1",
        lic: "1",
        images: "1",
      },
      headers: {
        "X-RapidAPI-Key": "28d3b9948emsh3c0dbd57a970318p1a03cfjsncfacf70482fa",
        "X-RapidAPI-Host":
          "dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        const birthDays = response.data.filter((person) => {
          return (
            Number(person.birthday.split(".")[0]) === monthIndex + 1
            // && person.birthday.split(".")[1] == dayOfMonth
          );
        });
        const newPeopleArray = birthDays.map((person, i) => {
          return {
            id: i,
            name: person.firstname + " " + person.lastname,
            age: person.age,
            image: person.image,
          };
        });
        setPeopleAPI(newPeopleArray);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getBirthDays();
  }, []);

  return (
    <main>
      <section className="container">
        <h3>{peopleAPI.length} birthdays this month ({currentMonth})</h3>
        <List people={peopleAPI} />
        <button onClick={() => setPeopleAPI([])}>clear all</button>
      </section>
    </main>
  );
}

export default App;
