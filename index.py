import os
import sys
from langchain.llms import OpenAI
from langchain_experimental.agents.agent_toolkits import create_csv_agent
from langchain.chains.conversation.memory import ConversationBufferMemory
dataset = "./dataset/Employee.csv"
key = "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"
os.environ["OPENAI_API_KEY"] = key  # Fix the environment variable name

def app():
    # conversation memory
    memory = ConversationBufferMemory()

    while True:
        # Create CSV agent
        agent = create_csv_agent(OpenAI(temperature=0), dataset, memory=memory, verbose=True)

        # user query
        print("Enter Query: ")
        query = input()

        try:
            # Process query 
            agent.run(query)
        except:
            # If any error
            print("Rate Limit Error")

if __name__ == "__main__":
    app()
