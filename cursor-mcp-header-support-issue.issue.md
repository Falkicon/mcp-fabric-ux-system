# Bug Report: Custom Headers in `mcp.json` Not Sent for SSE Transport

**Description:**

When configuring an MCP server in `mcp.json` to use the `sse` transport, custom headers defined in the `headers` block (specifically `X-API-Key` for authentication in this case) do not appear to be sent with the initial HTTP GET request that establishes the SSE connection.

This prevents server-side authentication schemes that rely on checking headers for SSE connections initiated by Cursor.

**Steps to Reproduce:**

1.  **Set up an MCP Server with SSE Transport:** Create a simple Node.js MCP server using `@modelcontextprotocol/sdk` and `SSEServerTransport`. Configure it to listen on a specific path (e.g., `/`) for GET requests to establish the SSE connection.
2.  **Implement Header Check:** In the server's HTTP request handler, implement logic to check for a specific incoming header (e.g., `x-api-key` or `X-API-Key`). Add detailed logging to show the value of the header received.
3.  **Implement API Key Env Var:** Configure the server to expect a corresponding API key from an environment variable (e.g., `MCP_API_KEY`). Log the value loaded from the environment variable within the request handler.
4.  **Deploy Server:** Deploy the server to a reachable endpoint (e.g., Vercel).
5.  **Configure `mcp.json`:** In Cursor's `mcp.json`, configure the server using `"transport": "sse"`, the correct `"url"`, and add the required header to the `"headers"` block:
    ```json
    {
      "mcpServers": {
        "my_sse_server": {
          "displayName": "My SSE Server",
          "url": "https://your-deployed-server.com/",
          "transport": "sse",
          "headers": {
            "X-API-Key": "YOUR_SECRET_API_KEY"
          },
          "enabled": true
        }
      }
    }
    ```
6.  **Attempt Connection:** Start/Restart Cursor to load the configuration and attempt to connect to the server.
7.  **Observe Server Logs:** Check the runtime logs of the deployed MCP server.

**Expected Behavior:**

The server logs should show that:
1.  It successfully loaded its own API key from the environment variable (`MCP_API_KEY`).
2.  It received the `X-API-Key` header from the Cursor client with the value specified in `mcp.json`.
3.  The authentication check comparing the received header value and the environment variable value passes.
4.  The SSE connection is successfully established.

**Actual Behavior:**

The server logs show that:
1.  It successfully loads its own API key from the environment variable (`MCP_API_KEY`).
2.  The value received for the `X-API-Key` header (checking both `req.headers['x-api-key']` and `req.headers['X-API-Key']`) is `undefined`.
3.  The server-side authentication check fails because the header is missing.
4.  The server returns a 401 Unauthorized error, and the SSE connection fails.

**Example Server Log Snippet (from our testing):**

```
// Log showing server loaded its key
[INDEX.TS] MCP_API_KEY direct read: Rk&...!51 (Length: 58)

// Log showing header check details
[KEY CHECK] Path: /, Expected Length: 58, Received Type: undefined, Received Length: -1

// Log showing auth failure
[INDEX.TS] Unauthorized attempt (Direct Read): Invalid or missing X-API-Key
```

**Troubleshooting Done:**

*   Confirmed the server correctly reads its *own* API key from environment variables (`process.env.MCP_API_KEY`) within the request handler.
*   Confirmed the `mcp.json` configuration syntax for `headers` is correct.
*   Confirmed the API key values in `mcp.json` and the server environment variable match exactly (no whitespace issues).
*   Tested checking for both lowercase `x-api-key` and original case `X-API-Key` headers on the server; both were undefined.
*   Confirmed the server works correctly if the server-side authentication check is bypassed.
*   Briefly reviewed Cursor forum/GitHub issues; found reports of general SSE instability but nothing specifically confirming/denying header support for SSE.

**Conclusion:**

This behavior strongly suggests that the Cursor client implementation for `sse` transport currently does not support or correctly send custom headers defined in the `mcp.json` file. This prevents standard header-based authentication methods for hosted SSE MCP servers.

**Environment:**

*   Cursor Version: [Please fill in your Cursor Version]
*   OS: Windows 11 (User's OS)
*   MCP Server Runtime: Node.js (e.g., v22 on Vercel)
*   `@modelcontextprotocol/sdk` Version: ^1.9.0

**Request:**

Please investigate whether sending custom headers with SSE transport is intended to be supported and fix the implementation if it's a bug. If it's not currently supported, please consider adding this capability, as it's crucial for securing hosted MCP servers.
