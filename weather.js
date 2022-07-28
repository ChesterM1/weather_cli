#!/usr/bin/env node
import  getArgs  from "./args.js";
import { printError, printSuccess, printHelp, printWeather } from "./services/log.services.js";
import {saveKeyValue, getKeyValue, TOKEN_DICTIONARY} from './services/storage.service.js';
import {getWeather, getIcon} from './services/api.service.js';



const saveToken = async (token)=>{
    if(!token.length ){
        printError('Не передан токен');
        return
    }
    try{
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранен')
    }catch(e){
        printError(e.message);
    }
};

const getForcast = async ()=>{
   try{
    const city = await getKeyValue(TOKEN_DICTIONARY.city);
    const weatherData = await getWeather(city);
    printWeather(weatherData, getIcon(weatherData.weather[0].icon))
   }catch(e){
    throw new Error(e);
   }
}

const saveCity = async (city) => {
    if(!city.length){
        printError('Город не передан, воспользуйтесь командой -s [CITY_NAME]')
        return
    }
    try{
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('Город сохранен')
    }catch(e){
        printError(e.message);
    }
}

const initCLI = ()=>{
    const args = getArgs(process.argv);
    if(args.h){
      return  printHelp()
    }
    if(args.s){
        return saveCity(args.s)
    }
    if(args.t){
        return saveToken(args.t);

    }else{

        getForcast();
    }
    
}

initCLI();