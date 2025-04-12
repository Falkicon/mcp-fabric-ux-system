Resolving TypeScript Module Resolution Error TS2307 for @modelcontextprotocol/sdk on Vercel1. IntroductionThis report addresses a persistent TypeScript compilation error (TS2307: "Cannot find module") encountered during the deployment of a Node.js server application to the Vercel platform. The server utilizes the @modelcontextprotocol/sdk (specifically version ^1.9.0) to implement the Model Context Protocol (MCP) with Server-Sent Events (SSE) transport. The project is configured to use ES Modules (ESM) via "type": "module" in package.json and employs modern TypeScript settings ("moduleResolution": "NodeNext" or "Node16").The core issue manifests when attempting a standard static import of necessary components like McpServer and HttpServerTransport directly from the root of the @modelcontextprotocol/sdk package. Despite the package being correctly installed and configured for ESM, the TypeScript compiler (tsc) within the Vercel build environment fails to locate the module or its type declarations. Troubleshooting steps, including adjustments to tsconfig.json and a temporary dynamic import workaround (which led to a runtime ERR_PACKAGE_PATH_NOT_EXPORTED error), have not resolved the underlying build-time problem.This analysis investigates the interplay between Node.js ESM module resolution, TypeScript's configuration (specifically moduleResolution: "NodeNext"/"Node16"), the structure and export mechanisms of the @modelcontextprotocol/sdk package, and the specifics of the Vercel build environment. The objective is to diagnose the root cause of the TS2307 error and provide actionable recommendations for resolving it, enabling successful deployment.2. Understanding the TypeScript Module Resolution Failure (TS2307)The TS2307 error ("Cannot find module '[module]' or its corresponding type declarations.") fundamentally indicates that the TypeScript compiler, following the rules specified in tsconfig.json, could not locate the necessary files (either the JavaScript module itself or its associated type definition .d.ts file) for the given import statement. In the context of a modern Node.js project using ES Modules, understanding this error requires examining the specifics of ESM resolution.2.1. The Shift to ES Modules (ESM) in Node.jsNode.js traditionally used the CommonJS (CJS) module system (require/module.exports). However, it has progressively adopted the official ECMAScript module standard (ESM - import/export). Setting "type": "module" in a project's package.json signals to Node.js that .js files within that package scope should be treated as ES Modules by default.1 This shift impacts how modules are resolved and introduces stricter rules compared to CJS.2.2. TypeScript's Role: Type Checking and Module ResolutionThe TypeScript compiler (tsc) performs two critical functions relevant here:
Type Checking: It verifies that the code adheres to the type rules defined in the project and its dependencies.
Module Resolution Simulation: Before type checking an import, tsc must first locate the module and its type definitions. It simulates the runtime module resolution process based on the module and moduleResolution settings in tsconfig.json. If it cannot find the module according to these settings, it emits the TS2307 error.
2.3. Deep Dive: moduleResolution: "NodeNext" and "Node16"The tsconfig.json settings moduleResolution: "NodeNext" and moduleResolution: "Node16" instruct TypeScript to mimic the module resolution behavior of modern Node.js versions (v12+) that support ESM alongside CJS.6 These are the recommended settings for projects targeting Node.js ESM environments.8 Their behavior is key to understanding the user's issue:
Respecting package.json "exports": This is the most critical aspect. Modern Node.js introduced the "exports" field in package.json as a way for package authors to explicitly define the public entry points of their package and encapsulate internal modules.5 NodeNext and Node16 resolution strategies strictly adhere to this field. If an import attempts to access a path within a package that is not explicitly listed in the "exports" map, TypeScript (like Node.js at runtime) will consider it unresolvable.6 This provides package authors control over their public API but requires consumers to use only the designated entry points.
File Extension Requirement: Node.js ESM resolution often requires explicit file extensions in import paths (e.g., import './utils.js'), unlike CJS which could often omit them. The NodeNext/Node16 strategies enforce this requirement during type resolution, meaning imports might need to include .js (even when importing .ts files before compilation, as the compiled output will be .js).2
Conditional Exports: The "exports" field allows defining different module targets based on conditions, such as whether the package is being imported ("import") or required ("require").4 NodeNext/Node16 resolution understands these conditions and attempts to find the corresponding module and, crucially, its associated type definition file (.d.ts), often specified via a "types" condition within the "exports" map.11
The strictness of NodeNext/Node16 regarding the "exports" field is not a bug but a feature designed to accurately model Node.js runtime behavior. The TS2307 error, when using these settings, likely signals that the attempted import path violates the package's explicitly defined export boundaries. Switching to older, less strict resolution modes (like "node" or "classic") might suppress the build-time error but would likely lead to runtime errors (like ERR_PACKAGE_PATH_NOT_EXPORTED) because Node.js itself would still enforce the "exports" map. Therefore, troubleshooting should focus on aligning the import strategy with the SDK's intended structure, not circumventing the resolution rules.2.4. Common Causes for TS2307 in Node ESM ContextsGiven the behavior of NodeNext/Node16, common causes for TS2307 include:
Incorrect Import Path: Importing a module from a path that is not defined as an entry point in the package's "exports" map (the most likely cause in this scenario).
Missing Type Declarations: The JavaScript module exists and is exported, but the corresponding .d.ts file is missing, malformed, or not correctly referenced in the "exports" map (e.g., missing "types" condition).18
tsconfig.json Misconfiguration: Using incompatible settings, such as moduleResolution: "node" (for older Node versions) or "classic" when the dependency relies on "exports" for proper resolution.7
Case Sensitivity Mismatch: Importing with incorrect letter casing (e.g., import X from './MyModule' when the file is myModule.ts). This works on case-insensitive file systems (like default macOS/Windows) but fails on case-sensitive systems like Linux (used by Vercel).19
Dependency Installation Issues: The package is not correctly installed in node_modules, although user logs suggest this is not the case here.22
Flawed "exports" Map: The dependency's package.json "exports" map itself might be incorrectly structured or fail to point to the correct type definition files for the exported JavaScript modules.3
3. Analysis of the @modelcontextprotocol/sdk Package Structure (v1.9.0)To diagnose the TS2307 error accurately, understanding how the @modelcontextprotocol/sdk package is structured and intended to be used is crucial.3.1. Observed Import Patterns (Evidence from Documentation/Examples)Reviewing official documentation and examples for the SDK reveals a consistent pattern:
Core classes and types are imported using deep paths that include the .js extension.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"; 1
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"; 1
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js"; 26


There are no examples showing imports of these core components directly from the package root, such as import { McpServer } from '@modelcontextprotocol/sdk';.
Even related libraries, like the Vercel AI SDK's MCP client, use deep imports for specific transports (import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';).27
This consistent use of deep imports strongly suggests that the SDK is designed to be consumed this way, likely enforced via its package.json configuration.3.2. SDK Issue #280: "Properly export everything"Further evidence comes from a specific issue filed against the SDK's GitHub repository (#280: "Properly export everything").28 The issue author explicitly requests that core components like McpServer, ResourceTemplate, and StdioServerTransport be exported from the root of the package to enable simpler imports like import { McpServer } from "@modelcontextprotocol/sdk";.The existence of this issue strongly implies that, as of the time it was filed (shortly before v1.9.0 was published), the SDK did not offer these root exports. This directly contradicts the user's failing import statement (import { McpServer, HttpServerTransport } from '@modelcontextprotocol/sdk';) and reinforces the conclusion that deep imports are required.3.3. Inferred package.json "exports" StructureWhile direct inspection of the package.json for v1.9.0 was hindered 29, the observed import patterns and Issue #280 allow for a strong inference about its structure, particularly the "exports" field:
The package likely does not have a simple root export (".") that exposes all core classes.
Instead, it almost certainly defines specific subpath exports corresponding to the documented deep import paths.
A plausible structure for the "exports" map would resemble:
JSON{
  "name": "@modelcontextprotocol/sdk",
  "type": "module", // Assumed based on user config and modern practices
  "exports": {
    "./server/mcp.js": {
      "types": "./dist/server/mcp.d.ts", // Path to type definitions
      "import": "./dist/server/mcp.js"  // Path to compiled ESM JavaScript
    },
    "./server/stdio.js": {
      "types": "./dist/server/stdio.d.ts",
      "import": "./dist/server/stdio.js"
    },
    "./types.js": {
      "types": "./dist/types.d.ts",
      "import": "./dist/types.js"
    },
    //... other potential exports for clients, specific transports (like SSE), etc.
    "./package.json": "./package.json" // Optionally export package.json itself
  }
  // Potentially a "main" field for CJS fallback or legacy Node versions
  // Potentially a "types" field as a fallback if "exports"["."]["types"] isn't defined
}


The keys in the "exports" map (e.g., "./server/mcp.js") define the publicly accessible import paths. The .js extension in these keys is conventional for ESM exports and matches the documented import style.
The "types" condition within each export entry is crucial. It tells TypeScript's NodeNext/Node16 resolver where to find the corresponding .d.ts file for that specific entry point.11
This structure enforces the use of deep imports for ESM consumers using modern resolution strategies.3.4. Type Definition Files (.d.ts)The TS2307 error explicitly mentions missing "corresponding type declarations". While the primary issue appears to be the module path specified in the import, the correct association with type definition files is also essential. Assuming the package installation is correct (as user logs suggest), the .d.ts files should be present within node_modules/@modelcontextprotocol/sdk. The critical factor is whether the "exports" map correctly points TypeScript to these files using the "types" condition for each exported path. If the JavaScript module path resolves correctly via "exports" but the corresponding "types" entry is missing or points to the wrong file, TS2307 could still occur.The way the SDK appears to enforce deep imports via its "exports" map represents a specific design choice. This might be intended to promote modularity, prevent coupling to internal structures, or optimize loading. However, it contrasts with the very common developer expectation of being able to import the main components of a library directly from its root path. Issue #280 reflects this expectation gap.28 The user's error stems directly from this mismatch: the attempted import follows a common convention, but the SDK's defined ESM interface requires a different, more specific style.4. Decoding the ERR_PACKAGE_PATH_NOT_EXPORTED Runtime ErrorThe user's temporary workaround using a dynamic import('@modelcontextprotocol/sdk') bypassed the TypeScript build-time error but resulted in a Node.js runtime error: ERR_PACKAGE_PATH_NOT_EXPORTED. Understanding this error provides further confirmation of the underlying problem.4.1. Package Encapsulation ExplainedAs previously mentioned, the "exports" field in package.json enforces encapsulation.5 It defines the package's public API surface. Any attempt to import or require a file path within the package that is not explicitly listed in the "exports" map is blocked by Node.js itself.114.2. How the Error OccursThe ERR_PACKAGE_PATH_NOT_EXPORTED error is thrown by the Node.js runtime when code tries to resolve a module path within a package that has an "exports" field, but the specific path being requested is not among the declared exports.104.3. Connecting Runtime Error to Build-Time ErrorThe user encountered this runtime error specifically when using import('@modelcontextprotocol/sdk'). This dynamic import attempted to load the module defined by the package's root (.) entry point.The fact that this dynamic import failed at runtime serves as a powerful diagnostic indicator. It bypassed the TypeScript compiler's check (which caused TS2307 for the static import), but it still failed when the Node.js runtime tried to resolve the path. This demonstrates that the issue is not merely a matter of missing type definitions (which tsc focuses on) but a fundamental problem with module path resolution as enforced by Node.js based on the SDK's package.json "exports". The ERR_PACKAGE_PATH_NOT_EXPORTED error confirms that the root path (.) is not a valid, exported entry point according to the SDK's package definition for ESM consumers. In essence, the TS2307 error generated by tsc with NodeNext/Node16 resolution was accurately predicting this runtime restriction.5. Navigating the Vercel Build EnvironmentWhile the primary issue appears rooted in the interaction between the import statement, the SDK's structure, and TypeScript's resolution settings, the Vercel build environment itself can introduce factors that affect builds.5.1. Vercel Build Process OverviewVercel's build process for Node.js/TypeScript projects generally involves:
Dependency Installation: Detecting lock files (package-lock.json, yarn.lock, pnpm-lock.yaml) and running the corresponding install command (npm install, yarn install, pnpm install).35 The user confirmed the SDK dependency appeared correctly installed in build logs.
Build Command Execution: Running the script specified in the build property of package.json (in this case, npm run build, which executes npx tsc).1
TypeScript Compilation: Vercel's Node.js runtime has built-in support for compiling .ts files found in the standard /api directory.35 For projects using a custom build step like npx tsc, Vercel executes that command.
Output Handling: Deploying the artifacts generated by the build command, often expected in a specific directory like dist.36
5.2. Key Environmental FactorsSeveral environmental factors on Vercel could potentially influence build outcomes:
Case Sensitivity: Vercel builds run on a case-sensitive Linux filesystem.21 Local development environments (macOS, Windows) are often case-insensitive by default. This is a frequent source of "module not found" errors that only appear during deployment. If an import statement uses different casing than the actual file or directory name (e.g., import Util from './Utils' when the file is utils.ts), it might work locally but will fail reliably on Vercel.19 While the primary suspect here is the import path structure, meticulously verifying the case consistency of all import paths, filenames, and directory names is a crucial secondary check, especially for the deep imports required by the SDK. Using forceConsistentCasingInFileNames: true in tsconfig.json helps catch some issues locally but doesn't prevent committing incorrectly cased files from an insensitive system.19
Node.js/npm Versions: Vercel uses specific versions of Node.js and package managers during builds.35 While typically stable LTS versions, minor differences from the local environment could potentially expose subtle compatibility issues, although this is less likely to be the root cause of a fundamental module resolution failure like TS2307 compared to the "exports" map interaction. Build logs should indicate the exact versions used.
Environment Variables: Vercel injects environment variables during build and runtime. It's unlikely these would directly cause a TS2307 error unless they somehow interfere with build script paths or tsconfig.json resolution in an unexpected manner.
5.3. Vercel Build CacheVercel utilizes caching to accelerate deployments, primarily caching node_modules and potentially build outputs.37 While generally beneficial, a corrupted or stale cache can occasionally lead to unexpected build failures that don't occur locally.38
Relevance: While less likely to be the direct cause of a TS2307 error stemming from incorrect import paths and tsconfig settings, clearing the cache is a standard diagnostic step for Vercel-specific build issues.
Clearing the Cache:

Dashboard Redeploy: When initiating a redeploy from the Vercel project dashboard, there is an option to uncheck "Use existing Build Cache".37
Vercel CLI: Using the command vercel --force triggers a deployment without using the cache.38
Environment Variable: Setting the environment variable VERCEL_FORCE_NO_BUILD_CACHE=1 in the Vercel project settings will disable the build cache for all subsequent builds until the variable is removed.38


If the primary recommendations below do not resolve the issue, attempting a redeploy with the build cache disabled is a worthwhile troubleshooting step.6. Diagnosis and Actionable Recommendations6.1. Primary Hypothesis RecapThe most probable cause of the TS2307 error ("Cannot find module '@modelcontextprotocol/sdk'") during the Vercel build is the use of a root-level static import (import {... } from '@modelcontextprotocol/sdk';). This import path is likely not defined as a valid entry point in the @modelcontextprotocol/sdk package's package.json "exports" map. The TypeScript compiler, correctly configured with moduleResolution: "NodeNext" or "Node16" to mimic modern Node.js ESM resolution rules, accurately identifies this mismatch and reports that the module cannot be found via that path. The runtime error ERR_PACKAGE_PATH_NOT_EXPORTED encountered with the dynamic import further validates this hypothesis.6.2. Recommendation 1: Correct the Import Path (Highest Priority)The most critical action is to align the import statements in the project's code with the documented and inferred structure of the @modelcontextprotocol/sdk package.
Action: Modify the import statement(s) in src/index.ts (and any other relevant files) to use the specific deep paths required by the SDK, including the .js file extension.
Example:
TypeScript// src/index.ts

// Import McpServer from its specific module
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

// Import HttpServerTransport from its specific module.
// NOTE: The exact path for HttpServerTransport needs verification.
// Check SDK documentation or node_modules structure. Assuming it's related to SSE:
import { HttpServerTransport } from '@modelcontextprotocol/sdk/server/sse.js'; // <-- VERIFY THIS PATH

// Other necessary imports...
import { z } from 'zod'; // Example dependency

// Initialize server using imported classes
const server = new McpServer({ name: "my-mcp-server", version: "1.0.0" });

// Example: Setup a simple resource (adapt as needed)
server.resource("ping", "ping://test", async () => ({
  contents: [{ type: "text", text: "pong" }],
}));

// Setup transport and connect
async function startServer() {
  // Ensure correct configuration for SSE transport if needed
  const transport = new HttpServerTransport({ port: 3000 }); // Adjust port/config as needed
  await server.connect(transport);
  console.log('MCP Server listening with SSE transport...');
}

startServer().catch(console.error);


Justification: This change directly addresses the root cause by using the import paths that the SDK appears to expose via its "exports" map.1 Using deep paths with the .js extension is essential for compatibility with Node.js ESM resolution rules and the NodeNext/Node16 TypeScript module resolution strategies.2
6.3. Recommendation 2: Optimize tsconfig.json for Node ESM on VercelEnsure the tsconfig.json file is configured correctly for a Node.js ESM project deploying to Vercel. While the user tried NodeNext and Node16, verifying the complete configuration is important.

Action: Use the following tsconfig.json configuration as a baseline:
JSON{
  "compilerOptions": {
    // --- Module System & Resolution ---
    "module": "NodeNext", // Essential for modern Node.js ESM/CJS interop & resolution features.
    "moduleResolution": "NodeNext", // Strictly follows Node.js ESM rules, including "exports" and extension requirements.
    "target": "ES2020", // Target modern ECMAScript version supported by Vercel's Node runtime. ES2021/ES2022 are also viable.

    // --- Output ---
    "outDir": "./dist", // Standard output directory for compiled JS.
    "rootDir": "./src", // Specifies the root directory of source files.

    // --- Interoperability & Strictness ---
    "esModuleInterop": true, // Enables compatibility helpers for CJS/ESM imports. Often required.
    "strict": true, // Recommended: Enables all strict type-checking options.
    "forceConsistentCasingInFileNames": true, // Helps prevent case-sensitivity errors between environments.
    "skipLibCheck": true, // Speeds up compilation by skipping.d.ts file checks in node_modules.

    // --- Other Useful Options ---
    "resolveJsonModule": true, // Allows importing.json files.
    // "allowJs": false, // Set to true only if mixing JS and TS files.
    // "allowImportingTsExtensions": false, // MUST be false (default). Imports need.js extension.
    "noEmit": false // MUST be false (or absent) for tsc to output JavaScript files for Vercel.
  },
  "include":,
  "exclude":
}



Justification: This configuration aligns TypeScript's behavior with modern Node.js ESM standards. module: "NodeNext" and moduleResolution: "NodeNext" are the key settings that ensure TypeScript correctly interprets the SDK's package.json "exports" and enforces necessary constraints like file extensions in imports.6 The other settings (target, esModuleInterop, strict, forceConsistentCasingInFileNames) represent best practices for robust Node.js development on platforms like Vercel.16


Table 6.3.1: Comparison of TypeScript moduleResolution Strategies


StrategyKey Features / Behavior"exports" SupportExtension Requirement (in imports)Use Case / RecommendationclassicLegacy strategy (pre-TS 1.6). Unpredictable resolution based on relative paths and ambient declarations.NoOptionalDeprecated. Should not be used. 6node10 (node)Mimics older Node.js CJS require resolution. Looks in node_modules, supports index.js, allows extension omission.NoOptionalLegacy. Default for module: "commonjs". Poor model for modern Node.js with ESM. Avoid for new projects. 6node16 / nodenextMimics modern Node.js (v12+) resolution for both ESM (import) and CJS (require).YesRequired (for ESM imports)Recommended for Node.js v12+. Accurately models runtime behavior, including "exports" and ESM extension rules. Use with module: "NodeNext". 6bundlerMimics resolution behavior of bundlers (Webpack, Vite, esbuild). Supports "exports" like NodeNext.YesOptionalFor Bundler Targets. Useful when code targets a bundler that resolves modules differently than Node.js (esp. regarding extensions). Requires module: "esnext". 7
This table clarifies why `NodeNext` is the appropriate choice for this project, which targets the Node.js runtime on Vercel and interacts with a package utilizing the `"exports"` field. It explicitly handles the constraints specific to Node.js ESM resolution.
6.4. Further Troubleshooting Steps (If Recommendations 1 & 2 Fail)If the primary recommendations do not resolve the TS2307 error, consider the following steps:
Verify SDK Installation Integrity: Delete the local node_modules directory and the package-lock.json file. Run npm install again. Commit the updated package-lock.json and trigger a fresh Vercel deployment. Consider clearing the Vercel build cache during this redeploy.22
Inspect node_modules: Manually navigate into the node_modules/@modelcontextprotocol/sdk directory within your local project (after a fresh install).

Examine its package.json: Confirm the presence and structure of the "exports" map. Does it list the expected deep paths (e.g., ./server/mcp.js, ./server/sse.js)? Does each relevant export have a "types" condition pointing to a .d.ts file?
Verify Type Definition Files: Check if the .d.ts files referenced in the "exports" map (e.g., dist/server/mcp.d.ts, dist/server/sse.d.ts) actually exist at those locations within the package.


Check Case Sensitivity: Double-check every segment of the required deep import paths (e.g., import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';) against the actual directory and file names within node_modules/@modelcontextprotocol/sdk. Ensure the casing matches exactly.19 If developing on a case-insensitive system, consider using git config core.ignorecase false locally to help Git track casing changes.21
Clear Vercel Build Cache: Explicitly trigger a redeployment from the Vercel dashboard, ensuring the "Use existing Build Cache" option is unchecked.37 Alternatively, set the VERCEL_FORCE_NO_BUILD_CACHE=1 environment variable temporarily in Vercel project settings.38
Check Node/TypeScript Version Compatibility: Verify the TypeScript version being used (npx tsc --version locally, check Vercel build logs) and the Node.js version in the Vercel build environment (from logs).35 Ensure these versions are compatible with each other and with the @modelcontextprotocol/sdk. Check the SDK's issue tracker for any known compatibility problems with specific versions.45
Isolate the Problem: Create a new, minimal project containing only typescript, @modelcontextprotocol/sdk, the recommended tsconfig.json, and a single src/index.ts file with the corrected deep import statement. Deploy this minimal project to Vercel. If it succeeds, the issue likely lies within other dependencies, configurations, or code in the original project. If it fails, it points more strongly towards an issue within the SDK itself or a subtle interaction with the Vercel environment.
7. ConclusionThe persistent TS2307 ("Cannot find module") error encountered when importing from @modelcontextprotocol/sdk within a Node.js ESM project on Vercel is most likely caused by an attempt to import core components from the package root. Evidence from SDK documentation, community-reported issues 28, and the behavior of Node.js ESM module resolution (particularly the "exports" field in package.json 5) strongly indicates that the SDK requires consumers to use specific deep import paths (e.g., @modelcontextprotocol/sdk/server/mcp.js) rather than root imports.The TypeScript compiler, when configured with the appropriate modern module resolution strategy ("NodeNext" or "Node16") 6, correctly identifies that the attempted root import path is not exposed by the package's defined interface, resulting in the TS2307 error. This error accurately reflects the constraints imposed by the package's structure and the Node.js runtime's handling of ESM packages with explicit exports.The primary recommendation is to modify the import statements to use the documented deep paths with .js extensions. This aligns the code with the SDK's intended usage pattern. Additionally, adopting the recommended tsconfig.json configuration provided in Section 6.3, particularly setting module and moduleResolution to "NodeNext", is crucial for ensuring correct type checking and module resolution in the target Node.js ESM environment on Vercel.Secondary troubleshooting steps, such as verifying case sensitivity 19, ensuring dependency integrity 22, inspecting the installed package structure, and clearing the Vercel build cache 37, should be pursued if the primary fixes are insufficient.By adhering to the SDK's required import patterns and utilizing the correct TypeScript configuration for modern Node.js ESM development, the TS2307 build error should be resolved, enabling successful deployment to Vercel. It is worth noting that separate runtime concerns regarding the statefulness of the SSE transport in serverless environments have been raised 46, but these are distinct from the build-time module resolution error addressed here.