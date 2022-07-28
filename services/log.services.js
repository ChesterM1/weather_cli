import chalk from "chalk";
import dedent from "dedent-js";


export const printError = (error) => {
    console.log(chalk.bgRed("ERROR") + " " + error);
};

export const printSuccess = (msg) => {
    console.log(chalk.bgGreen("SUCCESS") + " " + msg);
};

export const printHelp = () => {
    console.log(
        dedent(`${chalk.bgCyan("HELP")}
        Без параметров вывод погоды
        -s [CITY] для установки города
        -н для вывода помощи
        -t [API_KEY] для сохранения токена`)
    );
};

export const printWeather = (data, icon) => {
    console.log(
        dedent(`${chalk.bgYellow("Weather")} Погода в городе ${data.name}
        ${icon}  ${data.weather[0].description}
        Температура ${Math.ceil(data.main.temp)} (ощущается как ${Math.ceil(data.main.feels_like)})
        Влажность: ${data.main.humidity}%
        Скорость ветра: ${Math.ceil(data.wind.speed)}`)
    );
};
