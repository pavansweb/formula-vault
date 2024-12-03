from flask import Flask, render_template, jsonify, request, redirect, url_for
import json
import os

app = Flask(__name__)

# Load formulas and concepts from JSON
with open('formulas.json', 'r') as f:
    formulas = json.load(f)

with open('concepts.json', 'r') as f:
    concepts = json.load(f)

@app.route('/')
def index():
    return render_template('index.html', formulas=formulas, concepts=concepts)

@app.route('/filter', methods=['POST'])
def filter_items():
    subject = request.json.get('subject', '').lower()
    query = request.json.get('query', '').lower()

    # Filter formulas
    filtered_formulas = [
        formula for formula in formulas
        if (subject == 'all' or formula['subject'].lower() == subject) and
           (query in formula['title'].lower() or query in formula['description'].lower())
    ]

    # Filter concepts
    filtered_concepts = [
        concept for concept in concepts
        if (subject == 'all' or concept['subject'].lower() == subject) and
           (query in concept['title'].lower() or query in concept['description'].lower())
    ]

    return jsonify({"formulas": filtered_formulas, "concepts": filtered_concepts})

@app.route('/concept/<name>')
def show_concept(name):
    concept_file = os.path.join('templates', 'concepts', f'{name}.html')
    if os.path.exists(concept_file):
        return render_template(f'concepts/{name}.html')
    return "Concept not found", 404

if __name__ == '__main__':
    app.run(debug=True)
