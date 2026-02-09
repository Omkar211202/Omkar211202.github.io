---
title: RAG Systems
image: /Resources/tech.jpg
date:
  - 2026-02-03
tags:
  - Techie
  - Research
  - AI
  - LLM
keywords:
description:
---
## RAG in Basics:

Today AI has become the first brain of humans. Anything you don't know, go to Chat GPT, Gemini, Perplexity etc. and you can keep asking sequential questions. Well, there is nothing wrong to do this, in fact not doing this means there is something wrong.

Judgements apart. Do you know that your typically LLM (AI Models) may not know some questions you ask. Then, what do they do?

Obviously, they try to refer and answer. Well, All this is possible because of an idea called RAG, Retrieval Augmented Generation (RAG). 

Fundamentally, the model is trained on the data of the past, and data that is typically very general. This leads to two problems namely:
- Out of Timely knowledge: The LLM does not know the latest developments and news.
- Hallucination: If you ask the model, to be very specific to a domain, it will not be able to required justice. 

RAG is a design system that tries to solve this problem by giving context to AI for every question the user asks.

## General Workflow:

Let's understand how this works:

Lets say we wanted an AI to help with documentation and answer from a specific text, which is not available on the internet, like a workflow manual at your organization.

- First, for every prompt given by the user, the prompt must be given to the model along with similar context that is there in the workflow manual.
- Therefore, its important to have a database with chunks of data from the manual. 
- When the user inputs data, there is similarity search done and the chunks of data that are very close to the prompt are given as context.
- The prompt and the additional context are given to the LLM to give a very good answer, that is specific to solve the problem.


## Technical Concepts in RAG:

- Embedding Models: Whenever we upload a context that the AI Model is to use while answering, like a PDF or Excel, we should convert the words in it to Embeddings (A vector representation) that will aid while doing a similarity search. Thus, we use Embedding models like BERT, text-embedding-3-large,-small, etc. to convert the chunks to data into number scores for easy similarity retrieval.

- Similarity Search: When an user enter a prompt, the Retriever must return chunks of data, that are very useful and relevant to the prompt, no distracting info. This calls for a Similarity search based of seeing Vector nearness of the prompt and Context relevant.

- Vector Database: The database that consists of chunks of data in words and relevant vector embeddings for the context.

## RAG Designs and Applications:

Inputs from [Michael Oleszak](https://medium.com/data-science/designing-rags-dbb9a7c1d729)
The RAG systems are typically based up with five main choices:
- Indexing: Batch Mode VS Streaming mode. Indexing Model, [Hugging Face](https://huggingface.co/spaces/mteb/leaderboard), Text Splitting
	[Chunk Size optimisation](https://blog.llamaindex.ai/evaluating-the-ideal-chunk-size-for-a-rag-system-using-llamaindex-6207e5d3fec5)
- Storing: Database Choice,[Options](https://superlinked.com/vector-db-comparison/), Meta Data Selection
- Retrieval: Retrieval Strategy, Hyperparameters, Query Transformations., Hybrid Strategy, BM25, RRF.
- Synthesis:
- Evaluation:

