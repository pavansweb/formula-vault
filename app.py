from flask import Flask, render_template, jsonify, request
import json

app = Flask(__name__)

# Load formulas from JSON
with open('formulas.json', 'r') as f:
    formulas = json.load(f)

@app.route('/')
def index():
    return render_template('index.html', formulas=formulas)
 
@app.route('/filter', methods=['POST'])
def filter_formulas():
    subject = request.json.get('subject', '').lower()
    query = request.json.get('query', '').lower()

    filtered_formulas = [
        formula for formula in formulas
        if (subject == 'all' or formula['subject'].lower() == subject) and
           (query in formula['title'].lower() or query in formula['description'].lower())
    ]
    return jsonify(filtered_formulas)

if __name__ == '__main__':
    app.run(debug=True) 
