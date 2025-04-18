# Spring AI E-commerce Recommender POC

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

An AI-powered proof-of-concept for an e-commerce product recommendation and semantic search system. Built with Kotlin, Spring Boot 3, Spring AI, Ollama (local LLM), ChromaDB (vector store), and an AnalogJS frontend.

## Overview

This project explores building an intelligent product search and recommendation engine leveraging modern AI techniques. Instead of relying solely on keyword matching, it uses vector embeddings to understand the semantic meaning of product descriptions and user queries.

**Core Concept:**

1.  **Data Loading & Embedding:** Product data (titles, descriptions, categories) is loaded, cleaned, and converted into numerical vector representations (embeddings) using a local embedding model run by Ollama.
2.  **Vector Storage:** These embeddings are stored in a ChromaDB vector database for efficient similarity searching.
3.  **Querying:** When a user searches, their query is also converted into an embedding.
4.  **Similarity Search:** ChromaDB finds the product embeddings most similar (closest in vector space) to the query embedding.
5.  **Results:** The application returns the corresponding products as recommendations/search results.

This POC utilizes a Spring Boot backend for the AI logic and a separate AnalogJS frontend for the user interface (served statically).

## Features

* **AI-Powered Recommendations:** Finds relevant products based on text similarity.
* **Local LLM Inference:** Uses [Ollama](https://ollama.com/) to run embedding models (like `nomic-embed-text`) locally.
* **Vector Database:** Employs [ChromaDB](https://www.trychroma.com/) for efficient storage and retrieval of embeddings.
* **Kotlin Backend:** Robust backend built with Kotlin and Spring Boot 3 / Spring AI.
* **Modern Frontend:** UI built with [AnalogJS](https://analogjs.org/) (using Vite and Tailwind CSS). 
* **Contract-First API:** Uses OpenAPI for defining the REST API contract between frontend and backend.

## Technology Stack

* **Backend:** Kotlin, Spring Boot 3, Spring AI, Gradle (Groovy)
* **AI/Embeddings:** Ollama, `nomic-embed-text` (or other compatible embedding model)
* **Vector Store:** ChromaDB (running in Docker)
* **Frontend:** AnalogJS, TypeScript, Tailwind CSS (likely, based on Analog setup)
* **API Definition:** OpenAPI 3
* **Containerization:** Docker, Docker Compose (for ChromaDB)
* **Java Version:** JDK 17

## Quick Start

### Prerequisites

- JDK 17+
- Node.js 18+
- Gradle
- Ollama (for AI capabilities)
- Docker (Compose) (for ChromaDB)

### Running the Application

#### Setup Ollama nomic-embed-text

For now, I am using the `nomic-embed-text` model from Ollama. You can install it with:

```bash
ollama pull nomic-embed-text
```

`Note: Embedding generation is computationally intensive.
A modern CPU with sufficient RAM (16GB+, ideally 32GB+) is recommended. 
A compatible NVIDIA GPU significantly accelerates the process (tested on NVIDIA T1200 Laptop GPU).`

#### Build Backend & Generate Code 

```bash
./gradlew build
```

This command compiles the Kotlin code, downloads dependencies, and runs the OpenAPI code generation for the backend API.

#### Install node modules for data preprocessing

```bash
cd data-preprocessor
npm install
```

#### Install node modules for frontend

```bash
cd ai-reco-ui
npm install
```

#### Install openapi generator in the frontend and build the client

This step is required only if you changed the OpenAPI spec.

```bash
cd ai-reco-ui/openapi-generator-cli
# Using curl
 curl -Lo openapi-generator-cli.jar https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.12.0/openapi-generator-cli-7.12.0.jar # Check for latest generator version
# Or using wget
# wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.4.0/openapi-generator-cli-7.12.0.jar -O openapi-generator-cli.jar
cd ..
npm run generate:client
```

#### Data Preprocessing

The ecommerce data is preprocessed and loaded into the system.
The data is in the `data-preprocessor` directory. 
You can run the preprocessing script and distribute the data to the backend and the frontend.

```bash
cd data-preprocessor
npm run start
npm run copy-to-backend
npm run copy-to-frontend
```

#### Load the Chroma Vector Store

Start the ChromaDB vector store using Docker Compose. This will run ChromaDB in a container.

```bash
cd infrastructure
docker-compose up -d
```
Run the following command to load the embeddings into the ChromaDB vector store. This is a one-time setup.

```bash
/gradlew bootRun --args='--spring.profiles.active=embedding --loadEmbeddings
```

This might take a while and uses the `nomic-embed-text` model to generate embeddings for the product data.
On my particular setup, this took about 2 hours to load the embeddings for products with heavy GPU usage.

If you want to delete the embeddings, you can run shut down the ChromaDB container and remove the volume.:

```bash
# Find the exact volume name (might be prefixed like 'infrastructure_chromadata')
docker volume ls
# Remove the volume
docker volume rm <your_exact_volume_name>
```

or just create a new volume if you want to try another embedding model along with the existing one.

#### Run the Application
1. Start the backend:
   ```bash
   ./gradlew bootRun
   ```

2. Start the frontend:
   ```bash
   cd ai-reco-ui
   npm run serve:develop
   ```
It takes a few moments to start the BFF (Backend for Frontend) server, since we are loading the products in-memory.
3. Open your browser to http://localhost:4300

4. You can now search for products using the search bar in the UI. Try 'samsung phone' or 'drilling stand' 

## Developer Guidelines

For detailed information about the project structure, tech stack, and development workflows, see the [Developer Guidelines](.junie/guidelines.md).

## Future Improvements

The immediate next step for this POC is to implement a **chat-based search interface**. This involves:

1.  Developing a chatbot component in the frontend.
2.  Modifying the backend to:
   * Accept conversational input.
   * Perform the embedding search based on the user's query.
   * **Feed the retrieved product results as context** into a chat model (also served via Ollama, e.g., Mistral).
   * Use a system prompt to instruct the chat model to act as a helpful e-commerce assistant, answering user questions based *only* on the provided product context (Retrieval-Augmented Generation - RAG).
   * Return the chatbot's conversational response to the frontend.

This will create a more interactive and intelligent search experience, allowing users to ask natural language questions about products based on the semantically retrieved information.

## License

MIT