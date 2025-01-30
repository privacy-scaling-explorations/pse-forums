# High-Level Technical Design Document

## Overview

This document outlines the architecture and design choices for the forum backend, focusing on modularity, security, and maintainability.

## Architecture Diagram

```
┌────────────────────────────────────┐
│             Client App             │
│  - Initiates actions               │
│  - Generates proofs (ZKPs, etc.)   │
│  - Manages tokens/credentials      │
└────────────────────────────────────┘
             │       ▲
             ▼       │
┌────────────────────────────────────┐
│          API Gateway / RPC         │
│  - Exposes rspc endpoints          │
│  - Routes requests                 │
│  - Handles authentication          │
│  - Enforces authorization          │
└────────────────────────────────────┘
             │
             ▼
┌───────────────────────────────────────┐
│         Application Services          │
│  ┌───────────────┐  ┌────────────┐    │
│  │ Authn Service │  │ Authz Service   │
│  │ (Credential,  │  │ (Policy    │    │
│  │  JWT, etc.)   │  │  Engine)   │    │
│  └───────────────┘  └────────────┘    │
│         │            │                │
│         ▼            ▼                │
│  ┌──────────────────────────────┐     │
│  │  Pluggable Verification Layer │◄─  ┼─ Interface for various proof verifiers
│  │  (JWT verifier, ZKP verifier, │    │  Each implements a defined interface
│  │   VC verifier, etc.)          │    │
│  └──────────────────────────────┘     │
│         │            │                │
│         ▼            ▼               │
│  ┌──────────────────────────────┐     │
│  │ Modular Policy System        │     │
│  │  - Enforces group policies   │     │
│  │  - Authenticated authz       │     │
│  │  - ZK verifier for anon auth │     │
│  └──────────────────────────────┘     │
└───────────────────────────────────---─┘
             │
             ▼
┌────────────────────────────────────┐
│             Datastore              │
│  - User profiles, credentials      │
│  - Group and post records          │
│  - Configuration for policies      │
│  - Optional revocation lists       │
└────────────────────────────────────┘
```

## Key Components

### API Layer

- Exposes RPC endpoints using `rspc`
- Handles authentication (JWT-based)
- Implements authorization middleware
- Provides endpoints for CRUD operations on users, posts, comments, and groups

### Service Layer

- Encapsulates business logic
- Interacts with repositories for data access
- Implements authentication and authorization logic
- Supports **modular policies and group management with authn/authz**
  - **Authenticated authorization**
  - **Unauthenticated authorization with zk verifier**

### Infrastructure Layer

- Manages database interactions using Prisma ORM
- Implements repository pattern for data access

## Authentication & Authorization

- **Authentication:** JWT-based authentication for registered users
- **Authorization:**
  - Middleware enforces permissions on protected routes
  - Supports **modular policies for group management**
  - Implements both **authenticated authorization** and **unauthenticated authorization using zk verifier**

## Group Management

- Groups (`Group` model) allow users to create, join, and manage communities
- Posts can belong to groups
- **Authorization policies dictate who can create, update, or delete groups and posts**
- Supports **zk verifier for anonymous access control**

## Next Steps

- Implement **policy-based access control (PBAC)**
- Integrate zk verifier for unauthenticated authorization
- Optimize queries for fetching groups with posts efficiently
