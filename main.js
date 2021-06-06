document.querySelector("#form").addEventListener("submit", loadWeather);

let unit;
let radio = document.querySelectorAll("input[type=radio]");

for(let i = 0; i < radio.length; i++){
    radio[i].addEventListener("change", function(){
        unit = this.value;
    })
};

function loadWeather(e){
    e.preventDefault();
    let getWeather = async ()=> {
        let city = document.querySelector("#city").value;
        let h2 = document.querySelector(".header h2");
        h2.innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
        console.log(unit);
        let newUnit;
        if(unit === "c"){
            newUnit = "metric";
        }else if(unit === "f"){
            newUnit = "imperial";
        }
        let key = "6501b9a4381a4e7eb6901f6addc12612";
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${newUnit}&appid=${key}`);
        if(response.status !== 200){
            throw new Error("couldn't fetch weather");
        };
        let data = response.json();
        return data;
    };
    getWeather().then(data => {
        document.querySelector(".column-1 h1").innerHTML = data.main.temp + `<sup>o</sup><span>${unit}</span>`;
        document.querySelector(".column-2 .feels").innerHTML = data.main.feels_like + `<sup>o</sup><span>${unit}</span>`;
        document.querySelector(".column-2 .wind").innerHTML = data.wind.speed + "%";

    })
}