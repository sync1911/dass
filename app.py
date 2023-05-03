from flask import Flask, request, jsonify
import openai

app = Flask(__name__)
openai.api_key = "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"

@app.route('/api/chat', methods=['POST'])
def chat():
    message = request.json.get('message')
    response = generate_ai_response(message)
    return jsonify(response=response)

def generate_ai_response(message):
    # Call the OpenAI API to generate a response
    # Replace 'your_model_name' with the desired model name (e.g., 'text-davinci-002')
    response = openai.Completion.create(engine="your_model_name", prompt=message, max_tokens=50, n=1, stop=None, temperature=0.5)
    return response.choices[0].text.strip()

if __name__ == '__main__':
    app.run()
