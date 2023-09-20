```
npm install
npm run start
```

DOM types
Unfortunately, setting a value for "types" means that TypeScript will ignore other global type definitions, including lib: ["dom"]. If you need to add DOM types into your project, add the following triple-slash directives at the top of any TypeScript file in your project.

/// <reference lib="dom" />
/// <reference lib="dom.iterable" />