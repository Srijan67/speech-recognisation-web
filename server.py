from flask import Flask, request, jsonify
import spacy
from flask_cors import CORS
import scispacy
# Load the language model
nlp = spacy.load("en_ner_bc5cdr_md")
nlp2 = spacy.load("en_core_web_lg")
# Create a Flask app
app = Flask(__name__)
CORS(app) 
# Backend code
@app.route('/parse', methods=['POST'])
def parse_text():
    # Get the text from the request
    text = request.get_json().get('text')  # Access text from JSON request

    # Process the text with SpaCy
    doc = nlp(text)
    # Extract named entities
    entities = []
    for ent in doc.ents:
        entities.append({
            'label': ent.label_,
            'text': ent.text
        })
    # Process the text with SpaCy

    doc2 = nlp2(text)
    # Extract named entities

    entities2= []
    for ent in doc2.ents:
            entities2.append({
                'label': ent.label_,
                'text': ent.text
            })
    # Return the named entities as JSON
    return jsonify(entities, entities2)

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
