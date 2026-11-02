import os
import csv
import json
from datetime import datetime
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Ensure results directory exists
RESULTS_DIR = os.path.join(app.root_path, 'results')
os.makedirs(RESULTS_DIR, exist_ok=True)

CSV_FILE = os.path.join(app.root_path, 'results.csv')

# Create CSV with headers if it doesn't exist
if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Timestamp', 'Name', 'Email', 'Score', 'Category'])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    name = data.get('name', 'Anonymous')
    if not name.strip():
        name = 'Anonymous'
    email = data.get('email', '')
    score = data.get('score', 0)
    category = data.get('category', 'Unknown')
    answers = data.get('answers', [])
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    safe_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # 1. Write to CSV
    with open(CSV_FILE, 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([timestamp, name, email, score, category])
        
    # 2. Write detailed response to TXT
    safe_name = "".join([c if c.isalnum() else "_" for c in name])
    txt_filename = f"response_{safe_name}_{safe_time}.txt"
    txt_filepath = os.path.join(RESULTS_DIR, txt_filename)
    
    with open(txt_filepath, 'w', encoding='utf-8') as f:
        f.write(f"Doomer Quiz Response\n")
        f.write(f"====================\n")
        f.write(f"Timestamp: {timestamp}\n")
        f.write(f"Name: {name}\n")
        f.write(f"Email: {email}\n")
        f.write(f"Score: {score}%\n")
        f.write(f"Category: {category}\n\n")
        f.write(f"Answers Breakdown:\n")
        f.write(f"------------------\n")
        for i, ans in enumerate(answers):
            f.write(f"Q{i+1}: {ans.get('question', '')}\n")
            f.write(f"Selected: {ans.get('selected', '')}\n")
            f.write(f"Points: {ans.get('points', 0)}\n\n")
            
    return jsonify({"status": "success", "message": "Results saved successfully!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
