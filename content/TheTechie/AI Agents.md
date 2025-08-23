---
title: Building AI Agents
date:
  - 2025-02-04
tags:
  - Techie
  - AI
draft: "false"
image: /Resources/tech.jpg
keywords: building AI agents, autonomous agent design, reinforcement learning agents, conversational AI bots, multi-agent systems, AI agent architecture, agent-based modeling tutorial
---
## How does ChatGPT Work???

LLM's or large language models are built using natural language processing, to give an output for the input given by the user. The input is given in a language and the model gives an output in a language, using transformers.

They can be run on the local system using `Ollama` server, in which different LLM models can be installed like: GPT-2, Llama, Llama-3, Grok.ai, Gemma 2, phi.

The following is the architecture used in building LLM's:

[[AI_Process_design.excalidraw]]

The below are few characteristics of LLM's:

- They have no memory of their own. Its called the `Stateless` property.

IMPLICATION: If you ask questions to a LLM running in a system continuously, the LLM will not be able to answer the leading questions, as it would have forgotten the previous question asked (it does not remember the prior question). They have no memory of their own.

Thus, we need to provide the LLM with the prior context for each question asked. 
Its the responsibility of the client application to store questions asked priorly and the answers given by the LLM and refeed it back to the LLM when a new question is asked.

This can make the entire process scalable. 
Meaning: You can ask question 1 to LLM1 and the question 2 can be answered by LLM2 etc., though it may be a leading question, as you will feed the entire context upon giving a new question for it to answer.

- The local LLM's will have a last updated date, meaning they will not be able to answer questions post a certain date. This is because they do not have the ability to access online resources and rephrase to give an answer.

Lets try to set up some basic setup to use LLM's:

---
## Setting up the environment:

(Package Management using Poetry)

- check if you have python and also check the version `>=3.12`, else do the needful to update.

```sh
python
python --version
```


- install poetry
```sh
pip install poetry
```

- create a folder for development, name it `Project Ai` or anything whatever you want, navigate to folder in shell, (starting working on VScode or any IDE)

- initialize poetry: choose all defaults after going to the folder created.
- choose all defaults, do not install any dependencies.
```sh
poetry init
```

- the command will install shell plugin
```sh
poetry self add poetry-plugin-shell
poetry self add poetry-plugin-export
```

- setting up the virtual environment.
```sh
poetry shell
```

- You have to enter virtual environment and install the dependencies (figure out this)

```sh
poetry add chromadb langchain openai fastapi uvicorn
poetry add langchain-openai langchain-community python-dotenv pypdf tiktoken

```

---

## RAG Implementation

Retrieval Augmented Generation is the full form of RAG. This technique is used to combine LLM's and help them to cross the time constraint they face, by giving them access to external sources, that are static in nature.

- This can be done for data, that is static in nature, generally data from newspapers, textbooks, reports etc. may be given to the model using the RAG implementation.

- We can begin the rag implementation by setting up Chroma dB, a database to store chunks of data we will upload in the form of pdf's etc.
- The below is code to initialize and check if its compatible to set up the Chroma Db for further use.

```python
import chromadb
# Initialize ChromaDB in-memory
chroma_client = chromadb.PersistentClient(path="./chroma_db")
// path

# Create a collection
collection = chroma_client.get_or_create_collection(name="test_collection")


# Add a sample document
collection.add(
    ids=["1"],
	   documents=["Hello, this is a test document stored in ChromaDB."]
)
# Query ChromaDB
results = collection.query(query_texts=["test"], n_results=1)
print("Query Results:", results)
```


Once, your Chroma Db is setup, you can write the following code:
```python

import os
from dotenv import load_dotenv
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI

# Load API key from .env
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("Missing OpenAI API Key. Set it in .env file.")

# === Constants ===
PERSIST_DIRECTORY = "chromadb_store"
PDF_PATH = "T.pdf"  # Replace with dynamic path if needed

  

# === Step 1: Load and chunk PDF ===
loader = PyPDFLoader(PDF_PATH)
documents = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
chunks = text_splitter.split_documents(documents)

# === Step 2: Setup Embeddings ===
embedding = OpenAIEmbeddings()


# === Step 3: Create (ChromaDb doesnot exist) or Load Chroma Vector Store (Loading only if the Db exists) ===
if os.path.exists(PERSIST_DIRECTORY):
    print("Loading existing Chroma DB...")
    vector_store = Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=embedding)
    vector_store.add_documents(chunks)

else:
    print("Creating new Chroma DB...")
    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embedding,
        persist_directory=PERSIST_DIRECTORY,
    )

# Persist DB to disk
vector_store.persist()

  
# === Step 4: Setup LLM ===
llm = ChatOpenAI(model_name="gpt-4", temperature=0)

# === Step 5: Chat Loop ===

print("\nInstitute GPT is ready! Ask questions based on the PDF (type 'exit' to quit).")
while True:
    query = input("\nAsk a question: ")
    if query.lower() == "exit":
        break

    search_results = vector_store.similarity_search(query, k=3)
    retrieved_texts = "\n\n".join([doc.page_content for doc in search_results])

    prompt = f"Use the following institute-related information to answer the question:\n\n{retrieved_texts}\n\nQuestion: {query}\n\nAnswer:"
    
    response = llm.invoke(prompt)

    print("\nAnswer:", response.content)
```

Any Input PDF or static data is converted into Chunks using Embeddings and stored in the database based on similarity and relatedness. When a query is asked, a similarity search is do, it finds the relevant chunks, that are then passed on the LLM for writing the output.

---

## Tool or Function Calling:

Sometimes we may want to play with data, data i.e. dynamic and changes everyday, and we need to make inference from that. Thus, Programmers have developed the concept of `API calls` to collect data from various providers. This is also called a Wrapped API service.

Generally this `API calls` were hard coded into the system via strict coding. But with AI coming into the area of programming, this has been taken to a next level.

- Dynamic data can be embedded into AI models with `Functional Calling` .
- Today when we have multiple functions, and we need to obtain some output, we have to call the functions in a sequential order. Lets say I want to know the weather in Bangalore, and there are two functions.
- Function 1 gives the latitudes and longitudes of an input city and Function 2 gives the weather conditions if given the latitudes and longitudes.
- So when we do Function calling, the LLM helps us to run these functions in the sequential order so as to obtain the output finally.
- The uniqueness in the entire process is that it is not hard coded into the system, and its LLM that is deciding the order.

Below is an implementation of Tool or function calling:

```python
import os
import json
import requests
from dotenv import load_dotenv
from datetime import datetime

from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage, ToolMessage

load_dotenv()
model = os.getenv('LLM_MODEL', 'gpt-4o')
weather_api_key = os.getenv("WEATHER_API_KEY")


"""
The following is the procedure to define functions for tool calling.
The function must have a commented description to tell the AI model what it can do.
Then the definition of the function follows.
"""
# Tool 1: Get latitude and longitude from city name
@tool  # This is a decorator
def get_lat_lon_from_city(city: str):

    """

    Converts a city name to its latitude and longitude using OpenWeatherMap Geocoding API.

    """

    try:
        url = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={weather_api_key}"
        response = requests.get(url).json()
        if response.status_code != 200:
            return f"Error getting location: {response.status_code} - {response.text}"
        data = response.json()
        print(data)
        if not data:
            return f"Could not find coordinates for {city}"

        lat = data[0]["lat"]
        lon = data[0]["lon"]
        return json.dumps({"latitude": lat, "longitude": lon})

    except Exception as e:
        return f"Error during geocoding: {str(e)}"

  

# Tool 2: Get weather from lat/lon

@tool
def get_weather_by_lat_lon(latitude: float, longitude: float):
    """
    Fetches current weather for given coordinates using OpenWeatherMap API.
    """
    try:
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={weather_api_key}&units=metric"
        response = requests.get(url)
        if response.status_code != 200:
            return f"Weather API error: {response.status_code} - {response.text}"
        data = response.json()
        weather = data["weather"][0]["description"]
        temperature = data["main"]["temp"]
        location = data.get("name", f"({latitude}, {longitude})")
        return f"The current weather in {location} is '{weather}' with a temperature of {temperature}°C."

    except Exception as e:
        return f"Error fetching weather: {str(e)}"

  

# Recursive AI prompting
"""
The following function does all the computation.
When the user sends his first message (look below for the code), the prompt_ai function is called.
1. At first, the model is intialised and tools are binded. When the messages are sent to the Model, the model responds.
2. The Message from the Model is a guide for the sequential order of functions to be called, inorder to obtain the desired function.
3. Upon compeleting all the functions in the tools in the ai_response, the entire messages containing all the user prompts, function outputs are fed into the model to obtain the fincal output.
"""
def prompt_ai(messages, nested_calls=0):
    if nested_calls > 5:
        raise Exception("AI is tool-calling too much!")

    tools = [get_lat_lon_from_city, get_weather_by_lat_lon]
    ai = ChatOpenAI(model=model)
    ai_with_tools = ai.bind_tools(tools)
    ai_response = ai_with_tools.invoke(messages)


    if hasattr(ai_response, "tool_calls") and len(ai_response.tool_calls) > 0:
        messages.append(ai_response)
        
        for tool_call in ai_response.tool_calls:
            tool_name = tool_call["name"]
            tool_args = tool_call["args"]

            # Choose tool function
            tool_func = next(t for t in tools if t.name == tool_name)
            print(f"[TOOL INVOKED] {tool_name} with args {tool_args}")

            tool_output = tool_func.invoke(tool_args)
            messages.append(ToolMessage(tool_output, tool_call_id=tool_call["id"]))
        return prompt_ai(messages, nested_calls + 1)
    return ai_response

  

# Main interaction loop

def main():

# System Prompt defines what the AI Model is helping in, the user prompt is given by the user to use the functionality to obtain solutions.
    messages = [
        SystemMessage(content=f"You are a weather assistant. You can answer questions about weather for a given city name or latitude/longitude. Today's date is {datetime.now().date()}.")
    while True:
        user_input = input("Ask about the weather (q to quit): ").strip()
        if user_input.lower() == 'q':
            break
        messages.append(HumanMessage(content=user_input))
        ai_response = prompt_ai(messages)
        print("\nAssistant:", ai_response.content)
        messages.append(ai_response)

  

if __name__ == "__main__":

    main()
```




---

## Model Context Protocol:

- The latest development in the field of AI Agents in MCP or Model context protocol.
- The bottleneck in tool calling is that it has to be done locally for each project it is used in, that too in a non-standard way.
- AI companies have thus started running the MCP servers, that contains all the functions that are related to context of functionality, example an Amazon MCP server will have the functions like Price calls, Quantity available, highest sold etc. defined centrally and can be accessed by all with ease.
- Thus, MCP servers give the list of functions available to local machine, which sends the same to the model.
- Upon receiving the sequential order of functions, the local sends the order, the functions are then run in the MCP servers and output is given back to the local machine which sends it to the LLM model.

---

## Other important learnings:

- operations on data will generally: create, read, update, delete, transform or filter data from one form to another,

To read and watch out: 
- [MCP](https://maximilian-schwarzmueller.com/articles/whats-the-mcp-model-context-protocol-hype-all-about/)
- [coleam00 ai agents](https://www.youtube.com/watch?v=zaNIvRllycM&list=PLyrg3m7Ei-MpsdEA6eKN1k2gJpuhllNTi)
- [Blog by Langchain](https://blog.langchain.com/how-to-build-an-agent/)

---




