import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import './PetList.css'; 

function PetList({ breed, age, gender, weight }) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Construct the API URL with filter parameters
    let apiUrl = '/pets';
    let params = [];
    if (breed && breed !== 'all') {
      params.push(`breed=${breed}`);
    }
    if (age && age !== 'all') {
      params.push(`age=${age}`);
    }
    if (gender && gender !== 'all') {
      params.push(`gender=${gender}`);
    }
    if (weight && weight !== 'all') {
      params.push(`weight=${weight}`);
    }
    if (params.length > 0) {
      apiUrl += `?${params.join('&')}`;
    }

    // Fetch pets from the backend API with filter parameters
    axios.get(apiUrl)
      .then(response => {
        setPets(response.data.pets);
      })
      .catch(error => {
        console.error('Error fetching pets:', error);
      });
  }, [breed, age, gender, weight]);

  return (
    <div className="pet-list">
      <h2>Available Pets</h2>
      <Grid container spacing={3}>
        {pets.map(pet => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pet.id}>
            <Card className="pet-item">
              <CardMedia
                component="img"
                height="200"
                image={pet.photo_url}
                alt={pet.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {pet.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <strong>Breed:</strong> {pet.breed}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <strong>Age:</strong> {pet.age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pet.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PetList;
