from flask import Flask, request, jsonify
import os
from langchain.llms import OpenAI
from langchain_experimental.agents.agent_toolkits import create_csv_agent
from langchain.chains.conversation.memory import ConversationBufferMemory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Set up your OpenAI API key
key = "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"
os.environ["OPENAI_API_KEY"] = key
dataset = "./dataset/Employee.csv"

# Set up conversation memory
memory = ConversationBufferMemory()

def process_text():
    data = request.get_json()
    text = data['text']

    print("Received text from frontend:", text)

    try:
        # Create CSV agent
        openai_instance = OpenAI(temperature=0)  # Instantiate OpenAI outside the agent creation
        agent = create_csv_agent(openai_instance, dataset, memory=memory, verbose=True)

        # Process the given query
        result = agent.run(text)
        print('The given result is \n', result)

        response_data = {
            'result': result,
            'total_length': len(result)
        }
        # Return the result as JSON response
        return jsonify(response_data)  
    except Exception as e:
        # Handle exceptions (e.g., rate limit errors)
        print(f"Error processing query: {str(e)}")
        return jsonify({'error': str(e)})

@app.route('/process_text', methods=['POST'])
def process_text_route():
    return process_text()

if __name__ == '__main__':
    app.run(debug=True)
