# Fanar MCP Server

This is the Fanar MCP server for the project. It provides backend functionality and can be deployed using Docker or Node.js.

## Features
- Node.js backend server
- Docker deployment support
- CLI tool for Fanar tools

## Getting Started

### Prerequisites
- Docker (for containerized deployment)
- Node.js and npm (for npx deployment)

### Running with Docker
```sh
docker build -t fanar-mcp-server .
docker run -p 8000:8000 fanar-mcp-server
```

### Running with Node.js (npx)
```sh
npx fanar-mcp-server
```

### Running Directly (Node.js)
```sh
node dist/index.js
```

## Project Structure
- `index.ts`: Main TypeScript server script
- `Dockerfile`: Docker configuration
- `package.json`: Node.js package configuration
- `tsconfig.json`: TypeScript configuration

## License
UNLICENSED