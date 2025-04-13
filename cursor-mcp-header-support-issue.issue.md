# Bug Report: Cursor SSE Transport Issues (Headers Not Sent & Incorrect POST Requests)

**Description:**

When configuring an MCP server in `mcp.json` to use the `sse` transport, two critical issues prevent proper operation:

1.  **Headers Not Sent:** Custom headers defined in the `headers` block (e.g., `X-API-Key`) are not sent with the initial HTTP GET request, preventing header-based authentication.
2.  **Incorrect POST Requests:** After the initial SSE connection is successfully established via GET, Cursor attempts to send subsequent MCP messages (like `mcp/listOfferings`) via **new HTTP POST requests** to the server endpoint, instead of sending JSON-RPC messages over the established SSE connection. This results in HTTP 404 errors from servers correctly configured for SSE.

These issues make the `sse` transport unusable for authenticated servers and for any actual tool communication beyond the initial handshake.

**Steps to Reproduce:**

1.  **Set up an MCP Server with SSE Transport:** Create a Node.js MCP server using `@modelcontextprotocol/sdk` (`SSEServerTransport`, `McpServer`). Configure it using `http.createServer` to listen for `GET /` requests to establish the SSE connection. Add detailed logging for incoming requests and headers.
2.  **(Optional) Implement Header Check:** Implement logic to check for `X-API-Key` and log the received value (it will be `undefined`). Temporarily disable the actual authentication failure to proceed.
3.  **Deploy Server:** Deploy to a reachable endpoint (e.g., Vercel).
4.  **Configure `mcp.json`:** Configure the server with `"transport": "sse"`, the correct `"url"`, and optionally the `"headers"` block.
    ```json
    {
      "mcpServers": {
        "my_sse_server": {
          "displayName": "My SSE Server",
          "url": "https://your-deployed-server.com/",
          "transport": "sse",
          "headers": { // These headers are NOT sent
            "X-API-Key": "YOUR_SECRET_API_KEY"
          },
          "enabled": true
        }
      }
    }
    ```
5.  **Attempt Connection:** Start/Restart Cursor.
6.  **Observe Server Logs:** Check the runtime logs of the deployed MCP server.
7.  **Observe Cursor MCP Logs:** Check Cursor's MCP output channel.

**Expected Behavior:**

1.  Cursor sends the initial `GET /` request *with* the `X-API-Key` header.
2.  Server validates the header (if auth enabled).
3.  SSE connection is established.
4.  Cursor sends subsequent MCP messages (JSON-RPC) *over the established SSE connection*.
5.  Server receives and processes these messages via the transport.
6.  Tools become available in Cursor.

**Actual Behavior:**

1.  Cursor sends the initial `GET /` request **without** the `X-API-Key` header. Server logs show `Received Type: undefined` for the header.
2.  If server auth is bypassed, the SSE connection *is* established initially. Server logs show `SSEServerTransport connected for this request.`.
3.  Cursor **immediately** attempts to send a new **HTTP POST** request to the server endpoint (`/`).
4.  Server responds with **HTTP 404 Not Found** to the POST request, as it's only expecting the initial GET for SSE setup.
5.  Cursor MCP logs show `Error POSTing to endpoint (HTTP 404): Not Found`.
6.  Cursor MCP logs show `Client closed`.
7.  Cursor UI shows `No tools available` or `Failed to create client`.

**Example Server Log Snippet (Header Issue):**

```
[KEY CHECK] Path: /, Expected Length: 58, Received Type: undefined, Received Length: -1
```

**Example Cursor MCP Log Snippet (POST Issue):**
```
[info] sted: Creating SSE transport
[error] sted: Client error for command Error POSTing to endpoint (HTTP 404): Not Found
[error] sted: Error in MCP: Error POSTing to endpoint (HTTP 404): Not Found
[info] sted: Client closed for command
[error] sted: Error in MCP: Client closed
```

**Troubleshooting Done:**

*   Confirmed server correctly reads its own env vars.
*   Confirmed `mcp.json` syntax.
*   Confirmed exact match of API keys.
*   Tested case-insensitivity for headers.
*   Isolated header issue via detailed logging.
*   Isolated POST issue via server and client logs after bypassing auth.
*   Reviewed related forum/GitHub posts, indicating general SSE instability/bugs have been reported previously.

**Conclusion:**

The Cursor client implementation for `sse` transport appears to have (at least) two bugs:
1.  It does not send custom headers defined in `mcp.json`.
2.  It incorrectly uses HTTP POST for subsequent communication instead of the established SSE channel.

This makes the SSE transport currently unsuitable for authenticated servers or actual tool usage.

**Environment:**

*   Cursor Version: [Please fill in your Cursor Version]
*   OS: Windows 11 (User's OS)
*   MCP Server Runtime: Node.js (on Vercel)
*   `@modelcontextprotocol/sdk` Version: ^1.9.0

**Request:**

Please investigate and fix these issues with the SSE transport implementation. Header support is needed for security, and using the SSE channel correctly after connection is fundamental to the transport's operation.
