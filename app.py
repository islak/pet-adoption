from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

app = Flask(__name__)

# Configure the database URI with the "postgres" role and password "rat"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@localhost:5432/pet_adoption_db'

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define the Pet model
class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    breed = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    description = db.Column(db.Text)
    photo_url = db.Column(db.String(255))
    adopted = db.Column(db.Boolean, default=False)
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'breed': self.breed,
            'age': self.age,
            'description': self.description,
            'photo_url': self.photo_url
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

@app.route('/')
def index():
    return 'Welcome to Pet Adoption Marketplace API!'

@app.route('/test_database_connection')
def test_database_connection():
    try:
        # Test the database connection by executing a simple query
        db.session.execute(text('SELECT 1'))
        return jsonify({'message': 'Database connection successful!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/pets')
def get_pets():
    # Retrieve all pets from the database
    pets = Pet.query.all()
    # Serialize pets to JSON and return
    return jsonify({'pets': [pet.serialize() for pet in pets]})

@app.route('/pets/<int:id>')
def get_pet(id):
    # Retrieve pet by ID from the database
    pet = Pet.query.get(id)
    if pet:
        # Serialize pet to JSON and return
        return jsonify(pet.serialize())
    else:
        return jsonify({'error': 'Pet not found'}), 404

@app.route('/pets/<int:id>/adopt', methods=['POST'])
def adopt_pet(id):
    # Logic to handle pet adoption
    return jsonify({'message': f'Pet with ID {id} has been adopted!'})

if __name__ == '__main__':
    app.run(debug=True)
