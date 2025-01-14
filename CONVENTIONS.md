# Code Conventions

## Effect-First Principles

1. **Effect for All Side Effects**
   - All operations that could fail or have side effects MUST use Effect
   - Never use raw Promises or synchronous operations for side effects
   - Wrap third-party Promise-based APIs with Effect.tryPromise

2. **Error Handling**
   - Define specific error types using `Data.TaggedError`
   - Every Effect operation should have explicit error channel
   - Use proper error composition with Effect combinators
   ```typescript
   class DomainError extends Data.TaggedError("DomainError")<{
     message: string
     cause?: Error
   }> {}
   ```

3. **Logging**
   - Use Effect's logging capabilities instead of console or consola
   - Log through Effect channel for proper composition
   ```typescript
   Effect.logInfo("Starting operation")
   Effect.logError("Operation failed")
   ```

4. **Resource Management**
   - Use Effect's resource management patterns (acquire/use/release)
   - Always cleanup resources using proper Effect combinators
   - Handle interruption properly

## Code Organization

1. **Services and Layers**
   ```typescript
   interface ServiceInterface {
     readonly _: unique symbol
     readonly operation: Effect<never, ServiceError, Result>
   }
   
   const LiveService = Layer.effect(
     Service.Tag,
     Effect.succeed({/*...*/})
   )
   ```

2. **Effect Pipeline Style**
   - Use pipe operator for Effect composition
   - Chain operations using appropriate Effect operators
   - Keep pipeline steps small and focused
   ```typescript
   Effect.succeed(input).pipe(
     Effect.flatMap(step1),
     Effect.tap(logProgress),
     Effect.mapError(handleError)
   )
   ```

## TypeScript Usage

1. **Types**
   - Define explicit interfaces for data structures
   - Use tagged errors for type-safe error handling
   - Leverage Effect's type system for better inference

2. **Generator Syntax**
   - Use Effect.gen for complex compositions
   - Properly type generator parameters
   ```typescript
   Effect.gen(function* (_) {
     const a = yield* _(operationA)
     const b = yield* _(operationB(a))
     return yield* _(finalOperation(b))
   })
   ```

## File Structure

1. **Module Organization**
   - Group related Effect services together
   - Separate interface definitions from implementations
   - Colocate related types and errors

2. **Exports**
   - Export interfaces and types separately from implementations
   - Export layers and live implementations distinctly
   - Consider using barrel exports for related features

## Testing

1. **Effect Testing**
   - Use Effect's testing utilities
   - Test both success and failure paths
   - Mock services using TestContext

## General Guidelines

1. **Functional Approach**
   - Prefer immutable data structures
   - Use pure functions where possible
   - Avoid classes except for errors or when absolutely necessary

2. **Documentation**
   - Document public APIs with JSDoc
   - Include Effect-specific details in documentation
   - Document error channels and requirements

3. **Configuration**
   - Use Effect contexts for configuration
   - Provide configuration through layers
   - Make dependencies explicit

4. **Command Pattern**
   - Structure commands using Effect
   - Handle command failures through Effect error channel
   - Provide proper context and dependencies

## Naming Conventions

1. **Files**
   - Use kebab-case for file names
   - Service implementations: `service-name.live.ts`
   - Service interfaces: `service-name.interface.ts`

2. **Types and Interfaces**
   - PascalCase for type names
   - Prefix interfaces with 'I' when disambiguation needed

3. **Effect Operations**
   - Use descriptive verbs for Effect operations
   - Indicate Effect in function names when appropriate

## Dependencies

1. **Effect Ecosystem**
   - Prefer Effect ecosystem solutions when available
   - Properly wrap external libraries in Effect
   - Keep Effect dependencies up to date

2. **Version Control**
   - Follow conventional commits
   - Reference issues in commits when applicable
