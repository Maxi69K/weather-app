// API links from https://openweathermap.org/api

class APIcall {
  static getData = (city, units, lang) => {
    const key = 'f9d448bb154a9b7e15154dd665449194';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}&lang=${lang}`;
    return fetch(url).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 404) {
        return false;
      }
    });
  };

  //   static getData = (city) => {
  //   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}&lang=${language}`;
  //   return new Promise((resolve, reject) => {
  //     let xml = new XMLHttpRequest();
  //     xml.open('GET', url);
  //     xml.onreadystatechange = () => {
  //       if (xml.readyState === 4 && xml.status === 200) {
  //         resolve(JSON.parse(xml.responseText));
  //       } else if (!city) {
  //         reject('You must input city name!');
  //       } else if (xml.status === 404) {
  //         reject('Wrong city name!');
  //       }
  //     };
  //     xml.send();
  //   });
  // };
}
