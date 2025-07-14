# Fanar MCP Tools

A Model Context Protocol (MCP) server for Fanar API tools: Islamic RAG, image generation, and translation. Publishable as an npm package and usable as a CLI tool or MCP server.

## Installation

```sh
npm install -g @danijeun/fanar-mcp-server
```

Or use with npx:

```sh
npx @danijeun/fanar-mcp-server
```

## Environment Variable

Set your Fanar API key:

```sh
export FANAR_API_KEY=your_api_key_here
```

## Usage (CLI)

You can run the MCP server directly:

```sh
@danijeun/fanar-mcp-server
```

Or via npx:

```sh
npx @danijeun/fanar-mcp-server
```

## Usage (MCP Client)

Configure your MCP client to use this server. Example config:

```json
{
  "mcpServers": {
    "fanar_mcp": {
      "command": "npx",
      "args": ["@danijeun/fanar-mcp-server"],
      "env": {
        "FANAR_API_KEY": "your api key here"
      }
    }
  }
}
```

## Tools

### fanar_rag
- **Input:** `{ messages: [{ role: string, content: string }], model?: string }`
- **Output:** `{ content: [{ type: "text", text: string }], references?: any[] }`

### fanar_image_gen
- **Input:** `{ prompt: string }`
- **Output:** `{ content: [{ type: "image", image: string }] }` (base64)

### fanar_translate
- **Input:** `{ text: string, langpair: string, preprocessing?: string }`
- **Output:** `{ content: [{ type: "text", text: string }] }`

## License
None