---
title: "Dependency Injection (Advanced)"
id: "internals.dependency-injection"
area: "internals"
tags: ["dependency-injection", "di", "internals", "fast-element", "fabric-ux", "advanced"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Dependency Injection (Advanced)

Dependency injection (DI) is a design pattern used to pass functionality (dependencies) to the parts of an application that need them, rather than having those parts create the dependencies themselves. The `@microsoft/fast-element` library, which underlies Fabric UX components, provides utilities for dependency injection.

While not commonly required for typical component development within Fabric UX, understanding DI can be beneficial for advanced scenarios, such as:

- Creating reusable services shared across multiple components.
- Managing complex component state or logic.
- Improving testability by injecting mock dependencies during testing.

## Introduction to FAST DI

FAST's DI system revolves around containers and registrations.

- **Container:** Holds the registered dependencies and resolves requests for them.
- **Registration:** Defines how a dependency (usually identified by an interface or token) should be created (e.g., as a singleton, transient, or factory).

### Creating a Container

There are two ways to create a DI container:

1.  **`DI.createContainer()`:** Creates a standalone container. Dependencies registered here are isolated.
2.  **`DI.getOrCreateDOMContainer(node)`:** Creates or retrieves a container associated with a DOM node (and its descendants). This is **essential** for injecting dependencies into web components, as it allows components to find the container within the DOM hierarchy.

```typescript
import { DI } from "@microsoft/fast-element/di.js";

// Standalone container (less common for components)
const standaloneContainer = DI.createContainer();

// DOM-associated container (use this for web components)
// Typically associated with a high-level element like document.body or an app root
const domContainer = DI.getOrCreateDOMContainer(document.body);
```

### Defining a Dependency Interface and Context

First, define an interface for your service and create a DI context token using `DI.createContext()`.

```typescript
import { DI } from "@microsoft/fast-element/di.js";

// Interface defining the service contract
export interface LoggerService {
    log(message: string): void;
    warn(message: string): void;
}

// DI context token associated with the interface
export const LoggerService = DI.createContext<LoggerService>();
```

### Implementing the Dependency

Create a class that implements the service interface.

```typescript
export class ConsoleLogger implements LoggerService {
    log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }

    warn(message: string): void {
        console.warn(`[WARN]: ${message}`);
    }
}
```

### Registering the Dependency

Register the implementation with the container, using the context token as the key. Use registration helpers like `Registration.singleton` or `Registration.transient`.

```typescript
import { DI, Registration } from "@microsoft/fast-element/di.js";
import { LoggerService, ConsoleLogger } from './logger'; // Your service files

const container = DI.getOrCreateDOMContainer(document.body);

// Register ConsoleLogger as a singleton implementation for LoggerService
container.register(
    Registration.singleton(LoggerService, ConsoleLogger)
);
```

- **`singleton`**: Only one instance is created and shared for all requests.
- **`transient`**: A new instance is created every time the dependency is requested.

### Injecting into a Web Component

Inject the dependency into your Fabric UX component class using the context token as a property decorator.

```typescript
import { FASTElement, html } from "@microsoft/fast-element";
import { LoggerService } from '../services/logger'; // Path to your service context

export class MyFabricComponent extends FASTElement {
    // Inject the LoggerService. Note the `!` - FAST DI assigns it.
    @LoggerService logger!: LoggerService;

    connectedCallback() {
        super.connectedCallback();

        // Dependency is available after super.connectedCallback()
        if (this.logger) {
            this.logger.log("MyFabricComponent connected!");
        }
    }

    doSomething() {
        this.logger?.warn("Something happened in MyFabricComponent.");
        // ... component logic ...
    }
}

// Placeholder: Assume MyFabricComponent is defined elsewhere using
// MyFabricComponent.define({ name: 'my-fabric-component', ... });
```

## Important Considerations for Web Components

1.  **Use `getOrCreateDOMContainer()`**: Always use this to create/get the container associated with the relevant part of the DOM tree where your components live.
2.  **Register Before Definition**: Ensure dependencies are registered in the container *before* the web components that need them are defined (`CustomElementRegistry.define`). Otherwise, the components might initialize before the dependencies are available.
3.  **Access After `connectedCallback`**: Injected dependencies are typically resolved and assigned to the component instance *during* the `connectedCallback` lifecycle phase (specifically, after `super.connectedCallback()` is called). Do not try to access them in the constructor.

## Use Cases in Fabric UX Context

While Fabric UX components aim for self-containment, DI could be useful for:

- **Centralized Configuration:** Injecting system-wide configuration (e.g., API endpoints, feature flags) into multiple components.
- **Shared Services:** Providing services like specialized data formatting, validation logic, or application state management across different parts of a UI built with Fabric components.
- **Mocking for Tests:** Injecting mock services during unit or integration testing of components.

Use DI judiciously where it genuinely simplifies architecture or improves testability, rather than for simple property passing.
