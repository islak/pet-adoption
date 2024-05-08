from flask import Flask, jsonify, send_from_directory, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@localhost:5432/pet_adoption_db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

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

def populate_database():
    with app.app_context():
        existing_pets = Pet.query.all()
        if existing_pets:
            print("Database already populated.")
            return
        
        # Create some sample pet records
        pets = [
            Pet(name='Buddy', breed='Golden Retriever', age=3, description='Friendly and playful', photo_url='https://example.com/buddy.jpg'),
            Pet(name='Max', breed='Labrador', age=2, description='Energetic and loyal', photo_url='https://example.com/max.jpg')
        ]
        
        # Add pets to the session
        for pet in pets:
            db.session.add(pet)
        try:
            db.session.commit()
            print("Database populated successfully!")
        except Exception as e:
            # Rollback the session if an error occurs
            db.session.rollback()
            print(f"Error populating database: {e}")


# Route to serve the bundled JavaScript file
@app.route('/static/js/main.3172d588.js')
def serve_bundle_js():
    return send_from_directory('frontend/build/static/js', 'main.3172d588.js')

# Route to serve other static files (like CSS, images, etc.)
@app.route('/static/css/main.e2e89c21.css')
def serve_static():
    return send_from_directory('frontend/build/static/css', 'main.e2e89c21.css')

# Route to serve index.html for all other routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_index(path):
    return send_from_directory('frontend/build', 'index.html')

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



@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify({'users': [user.username for user in users]})

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)

    try:
        # Commit the session 
        db.session.commit()
        return jsonify({'message': 'User created successfully!'})
    except Exception as e:
        # Rollback the session if an error occurs
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/pets/<int:id>/adopt', methods=['POST'])
def adopt_pet(id):
    # Logic to handle pet adoption
    return jsonify({'message': f'Pet with ID {id} has been adopted!'})

if __name__ == '__main__':
    # Populate the database with test data
    populate_database()
    
    # Run the Flask application
    app.run(debug=True)
