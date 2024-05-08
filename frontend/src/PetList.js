import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Function to fetch pets from the backend
    const fetchPets = async () => {
      try {
        const response = await axios.get('/pets');
        setPets(response.data.pets);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    // Call the fetchPets function
    fetchPets();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div className="pet-list">
      <h2>Available Pets</h2>
      {/* Render the list of pets */}
      <ul>
        {pets.map(pet => (
          <li key={pet.id}>
            <h3>{pet.name}</h3>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age}</p>
            <p>Description: {pet.description}</p>
            <img src={pet.photo_url} alt={pet.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PetList;
