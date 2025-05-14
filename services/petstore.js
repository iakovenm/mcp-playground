
/**
 * Service functions for interacting with the Swagger Petstore API.
 */

const BASE_URL = 'https://petstore3.swagger.io/api/v3';

async function findPetsByStatus(request, status = 'available') {
  const response = await request.get(`${BASE_URL}/pet/findByStatus?status=${status}`);
  return response;
}

async function createPet(request, petData) {
  const response = await request.post(`${BASE_URL}/pet`, { data: petData });
  return response;
}

async function getPetById(request, petId) {
  const response = await request.get(`${BASE_URL}/pet/${petId}`);
  return response;
}

async function updatePet(request, petData) {
  const response = await request.put(`${BASE_URL}/pet`, { data: petData });
  return response;
}

async function deletePet(request, petId, apiKey = undefined) {
  const options = {};
  if (apiKey) {
    options.headers = { 'api_key': apiKey };
  }
  const response = await request.delete(`${BASE_URL}/pet/${petId}`, options);
  return response;
}

module.exports = {
  findPetsByStatus,
  createPet,
  getPetById,
  updatePet,
  deletePet,
};
