const { test, expect } = require('@playwright/test');
const petstore = require('../services/petstore');

test.describe('Swagger Petstore API', () => {
  test('GET request to JSONPlaceholder returns user data', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
    expect(data).toHaveProperty('username');
    expect(data).toHaveProperty('email');
  });

  test('GET /pet/findByStatus returns pets', async ({ request }) => {
    const response = await petstore.findPetsByStatus(request, 'available');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  test('POST /pet creates a new pet', async ({ request }) => {
    const newPet = {
      id: 12345,
      name: 'TestPet',
      photoUrls: [],
      status: 'available',
      category: { id: 1, name: 'Dogs' }
    };
    const response = await petstore.createPet(request, newPet);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data.name).toBe('TestPet');
  });

  test('GET /pet/{petId} returns the pet', async ({ request }) => {
    const createRes = await petstore.createPet(request, { id: 987654321, name: 'PetToGet', photoUrls: [], status: 'available' });
    const pet = await createRes.json();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Increase wait time for backend to process
    const response = await petstore.getPetById(request, pet.id);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.id).toBe(pet.id);
    expect(data.name).toBe('PetToGet');
  });

  test('PUT /pet updates a pet', async ({ request }) => {
    const createRes = await petstore.createPet(request, { id: 123456, name: 'PetToUpdate', photoUrls: [], status: 'available' });
    const pet = await createRes.json();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for backend to process
    const updatedPet = { ...pet, name: 'UpdatedPet' };
    const response = await petstore.updatePet(request, updatedPet);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.name).toBe('UpdatedPet');
  });

  test('DELETE /pet/{petId} deletes a pet', async ({ request }) => {
    const createRes = await petstore.createPet(request, { id: 54321, name: 'PetToDelete', photoUrls: [], status: 'available' });
    const pet = await createRes.json();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for backend to process
    const response = await petstore.deletePet(request, pet.id, 'special-key');
    expect(response.ok()).toBeTruthy();
  });
});