import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling
import PetList from './PetList'; // Import the PetList component
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'; // Import Material UI components

function App() {
  // Define state for the selected filter options
  const [breed, setBreed] = useState('all');
  const [age, setAge] = useState('all');
  const [gender, setGender] = useState('all');
  const [weight, setWeight] = useState('all');

  return (
    <div className="app-container">
      <header>
        <h1>Pet Adoption Marketplace</h1>
      </header>
      <main>
        <section className="hero">
          <h2>Welcome to the world of pet adoption!</h2>
          <p>Find your perfect pet companion today.</p>
        </section>
        <section className="filters">
          {/* Breed filter */}
          <FormControl variant="outlined" className="filter">
            <InputLabel id="breed-label">Breed:</InputLabel>
            <Select
              labelId="breed-label"
              id="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              label="Breed"
            >
              {/* Dropdown options for breeds */}
              <MenuItem value="all">All Breeds</MenuItem>
              <MenuItem value="labrador">Labrador</MenuItem>
              <MenuItem value="golden_retriever">Golden Retriever</MenuItem>
              {/* Add more breed options as needed */}
            </Select>
          </FormControl>

          {/* Age filter */}
          <FormControl variant="outlined" className="filter">
            <InputLabel id="age-label">Age:</InputLabel>
            <Select
              labelId="age-label"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              label="Age"
            >
              {/* Dropdown options for age */}
              <MenuItem value="all">All Ages</MenuItem>
              <MenuItem value="puppy">Puppy</MenuItem>
              <MenuItem value="adult">Adult</MenuItem>
              <MenuItem value="senior">Senior</MenuItem>
              {/* Add more age options as needed */}
            </Select>
          </FormControl>

          {/* Gender filter */}
          <FormControl variant="outlined" className="filter">
            <InputLabel id="gender-label">Gender:</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
            >
              {/* Dropdown options for gender */}
              <MenuItem value="all">All Genders</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              {/* Add more gender options as needed */}
            </Select>
          </FormControl>

          {/* Weight filter */}
          <FormControl variant="outlined" className="filter">
            <InputLabel id="weight-label">Weight:</InputLabel>
            <Select
              labelId="weight-label"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              label="Weight"
            >
              {/* Dropdown options for weight */}
              <MenuItem value="all">All Weights</MenuItem>
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
              {/* Add more weight options as needed */}
            </Select>
          </FormControl>
        </section>
        <section className="about">
          <h2>About Us</h2>
          <p>Help pets find loving homes.</p>
        </section>
        {/* Render the PetList component with the selected filter options */}
        <PetList breed={breed} age={age} gender={gender} weight={weight} />
      </main>
      <footer>
        <p>&copy; 2024 Pet Adoption Marketplace</p>
      </footer>
    </div>
  );
}

export default App;
