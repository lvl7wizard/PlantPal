const fetch = require('node-fetch');

const getAllPlants = async () => {
  const response = await fetch('https://trefle.io/api/v1/plants?token=iEFaQRg5ss288Ae9S_OOodQf1qgMvQ-VChMFJx9Mat8');
  const plantsData = await response.json();
  return plantsData
};
const getPlantByIDFromAPI = async (speciesType) => {
  const response = await fetch(`https://trefle.io/api/v1/plants/${speciesType}?token=iEFaQRg5ss288Ae9S_OOodQf1qgMvQ-VChMFJx9Mat8`);
  const singlePlantData = await response.json();
  return singlePlantData
}

const getSpeciesFromAPI = async () => {
  const response = await fetch('https://trefle.io/api/v1/species/?token=iEFaQRg5ss288Ae9S_OOodQf1qgMvQ-VChMFJx9Mat8');
  const speciesData = await response.json();
  return speciesData
};
const getFamiliesFromAPI = async () => {
  const response = await fetch('https://trefle.io/api/v1/families/?token=iEFaQRg5ss288Ae9S_OOodQf1qgMvQ-VChMFJx9Mat8');
  const familyData = await response.json();
  return familyData
};
const getSpeciesByIDFromAPI = async () => {
  const response = await fetch('https://trefle.io/api/v1/species/sorbus-aucuparia/?token=iEFaQRg5ss288Ae9S_OOodQf1qgMvQ-VChMFJx9Mat8');
  const speciesById = await response.json();
  return speciesById
}
getPlantByIDFromAPI("abies-alba")
module.exports = {getAllPlants, getSpeciesFromAPI, getFamiliesFromAPI, getSpeciesByIDFromAPI, getPlantByIDFromAPI}