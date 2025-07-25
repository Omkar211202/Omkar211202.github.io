---
title: Running an LLM on Local Systems
date:
  - 2025-02-04
tags:
  - Techie
draft: false
image: /Resources/tech.jpg
---
## How does ChatGPT Work???

LLM's or large language models are built using natural language processing, to give an output for the input given by the user. The input is given in a language and the model gives an output in a language, using transformers.

They can be built on the local system using `Ollama` server, in which different LLM models can be installed like: GPT-2, Llama, Llama-3, Grok.ai, Gemma 2, phi.

The following is the architecture used in building LLM's:

[[AI_Process_design.excalidraw]]

The below are few characteristics of LLM's:

- They have no memory of their own.

IMPLICATION: If you ask an LLM running in a system continuously, the LLM will not be able to answer the leading questions, as it would have forgotten the previous question asked (it does not remember the prior question).
This makes these LLM's Scalable, it the responsibility of the client application to store questions asked priorly and the answers given by the LLM and refeed it back to the LLM when a new question is asked, thus can making the entire process scalable. 
Meaning: You can ask question 1 to LLM1 and the question 2 can be answered by LLM2 etc., though it may be a leading question.

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

- enter the Venv, and install the following dependencies.

```sh
poetry add chromadb langchain openai fastapi uvicorn
poetry add langchain-openai langchain-community python-dotenv pypdf tiktoken

```

---

## RAG Implementation

Retrieval Augmented Generation is the full form of RAG. This technique was used to combine LLM's and help them to cross the time constraint they face, by giving them access to external sources.

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

# Step 1: Load PDF and process it
pdf_path = "T.pdf"  # Replace with actual PDF path
loader = PyPDFLoader(pdf_path)
documents = loader.load()

# Step 2: Split text into chunks for embedding storage
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
chunks = text_splitter.split_documents(documents)

# Step 3: Create ChromaDB Vector Store
vector_store = Chroma.from_documents(
    documents=chunks,
    embedding=OpenAIEmbeddings()  # Using OpenAI's embedding model
)

  

# Step 4: Initialize OpenAI Chat Model
llm = ChatOpenAI(model_name="gpt-4", temperature=0)
# Step 5: Chat loop to query the knowledge base
print("\nInstitute GPT is ready! Ask questions based on the PDF (type 'exit' to quit).")

while True:
    query = input("\nAsk a question: ")
    if query.lower() == "exit":
        break
# Retrieve top matching document chunks
    search_results = vector_store.similarity_search(query, k=3)  # Get top 3 matches
    retrieved_texts = "\n\n".join([doc.page_content for doc in search_results])

  
# Format the prompt
    prompt = f"Use the following institute-related information to answer the question:\n\n{retrieved_texts}\n\nQuestion: {query}\n\nAnswer:"

  
# Get response from GPT
    response = llm.invoke(prompt)
    print("\nAnswer:", response.content)
```

---


## Data handling:
1. Create
2. Read
3. Update
4. Delete
5. Transform
6. Filter


[https://maximilian-schwarzmueller.com/articles/whats-the-mcp-model-context-protocol-hype-all-about/](https://maximilian-schwarzmueller.com/articles/whats-the-mcp-model-context-protocol-hype-all-about/)

Prompts:
- system: tool.
- user

Advantages:
- Describe the API and use the latest info.



Disadvantages:
- Time taking.
- many tools, the computation will long.
- the format will change with time.

MODEL CONTEXT PROTOCOL:
- Standardizes the way in which the server and LLM interact.
- Describe tools, prompt and assistant in a standard way.

### use case:
dev
ingest of data
user use.

### coleam00 ai agents
[https://www.youtube.com/watch?v=zaNIvRllycM&list=PLyrg3m7Ei-MpsdEA6eKN1k2gJpuhllNTi](https://www.youtube.com/watch?v=zaNIvRllycM&list=PLyrg3m7Ei-MpsdEA6eKN1k2gJpuhllNTi)

---
1. Wrapped API service,
2. API call with LLM's
3. OpenAI standardised the api calling
4. Multiple servers
5. stateless: no memory
6. System Prompt: USER, Role introduction
7. sliding mechanism of memory to maintain memory
8. efficiency and the cost also increases.

RAG: retrieval augmented Generation- static data and 
embedding models

Dynamic data: tool usage and function calling.

LLM gets only english and not embedding vectors.

Limitations:
- No proper response from Similarity search
- Was not efficient
- Context bloat

Tool Calling:
- LLM's work with code, API's.
- Structure tool specs, description, tool list.
- Executions are based on sequential calls.

Model Context Protocol:
- list of tools
- Call tools.

MCP client: contact the MCP server, list of tools available, description, input schema and the output schema.

Requirement and features are taken care of by the business analyst.
- BA: uses confluence to write.
- Dev: JIRA (Task Management system to work for software's)
- QA will uses user tasks and test accordingly.
- Manual Testing and automation: playright, cucumber
