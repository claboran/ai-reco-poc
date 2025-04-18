# AI Recommendation POC Developer Guidelines

## Project Overview
This project is an AI-powered product recommendation system with the following components:
- **Backend**: Spring Boot application (Kotlin) with Spring AI for recommendation engine
- **Frontend**: Angular 19 application with NgRx Signals for state management
- **Data Processing**: Tools for loading and managing product data and embeddings

## Project Structure
```
ai-reco-poc/
├── src/                      # Backend Kotlin code (Spring Boot)
├── ai-reco-ui/               # Frontend Angular application
│   └── ai-reco-app/          # Main Angular application
├── data-preprocessor/        # Data preprocessing tools
├── infrastructure/           # Infrastructure configuration
├── openapi/                  # OpenAPI specifications
└── .junie/                   # Developer guidelines
```

## Tech Stack

### Backend
- **Language**: Kotlin
- **Framework**: Spring Boot 3.4
- **AI**: Spring AI with Ollama integration
- **Database**: JPA (likely with an embedded database)
- **Build**: Gradle

### Frontend
- **Framework**: Angular 19 with AnalogJS
- **State Management**: NgRx Signals
- **API Communication**: tRPC
- **Styling**: TailwindCSS with DaisyUI
- **Build**: Vite with NX

## Getting Started

### Prerequisites
- JDK 17+
- Node.js 18+
- Gradle
- Ollama (for AI capabilities)

### Running the Backend
```bash
# Run the web application
./gradlew bootRun

# Load embeddings (one-time setup)
./gradlew bootRun --args="--loadEmbeddings"

# Delete embeddings
./gradlew bootRun --args="--deleteEmbeddings"
```

### Running the Frontend
```bash
# Navigate to the UI directory
cd ai-reco-ui

# Install dependencies
npm install

# Start the development server
npm run serve:develop
```

### Generating API Client
```bash
# Generate TypeScript client from OpenAPI spec
cd ai-reco-ui
npm run generate:client
```

## Testing

### Backend Tests
```bash
# Run all tests
./gradlew test

# Run specific test
./gradlew test --tests "de.ecompiraten.aireco.YourTestClass"
```

### Frontend Tests
```bash
# Navigate to the UI directory
cd ai-reco-ui

# Run tests
nx test ai-reco-app
```

## Best Practices

### Code Organization
- Keep backend code organized by feature in the appropriate packages
- Follow Angular best practices for component organization
- Use NgRx Signals for state management in the frontend

### Testing
- Write unit tests for all new features
- Ensure tests are isolated and don't depend on external services
- Use mocks and stubs for external dependencies

### API Development
- Document all APIs using OpenAPI specifications
- Generate TypeScript clients after API changes
- Follow RESTful principles for API design

### AI and Embeddings
- Be mindful of token limits when working with large documents
- Test embedding generation with small datasets first
- Monitor performance of AI recommendation queries