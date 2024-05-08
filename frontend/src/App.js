import React from 'react';
import './App.css'; // Import CSS file for styling

function App() {
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
        <section className="about">
          <h2>About Us</h2>
          <p>We are dedicated to helping pets find loving homes.</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Pet Adoption Marketplace</p>
      </footer>
    </div>
  );
}

export default App;
