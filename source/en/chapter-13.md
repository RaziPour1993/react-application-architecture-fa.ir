::: {.section .chapter-first}
# [ 13 ]{#kobo.1.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_307 .chapterNumber}

# [ Evolving the Application ]{#kobo.2.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_308 .chapterTitle}

[ At this point, we have built a full-blown React application from scratch and taken it all the way to production. ]{#kobo.3.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We have a solid architecture, automated tests, a CI/CD pipeline, and a live deployment. ]{#kobo.4.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ But reaching production is just the beginning of the journey. ]{#kobo.5.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Real applications evolve. ]{#kobo.6.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Teams grow. ]{#kobo.7.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Requirements change. ]{#kobo.8.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This chapter introduces several topics that naturally come up as applications mature. ]{#kobo.9.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We will cover the following topics: ]{#kobo.10.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Using AI to enforce application architecture ]{#kobo.11.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ React Server Components ]{#kobo.12.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Application monitoring and observability ]{#kobo.13.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Feature flags and A/B testing ]{#kobo.14.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Scaling the API layer ]{#kobo.15.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Monorepos ]{#kobo.16.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Microfrontends ]{#kobo.17.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By the end of this chapter, we will understand what each of these topics solves, when it becomes worth reaching for, and where to go to learn more. ]{#kobo.18.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Using AI to enforce application architecture ]{#kobo.19.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_309 .heading-1}

[ We all use AI tools to some extent for generating parts of code. ]{#kobo.20.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ However, one of the most underrated uses of AI coding ]{#kobo.21.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d87b1933 .index-entry index-entry="application architecture, AI tools:using"} [ tools is not generating code, but maintaining the architecture we already defined. ]{#kobo.22.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ As a codebase grows, it is easy for patterns to drift. ]{#kobo.23.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A component imports something it should not. ]{#kobo.24.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A feature reaches directly into another feature\'s internals and breaks our feature isolation. ]{#kobo.25.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These small violations compound over time until the architecture exists only in people\'s heads. ]{#kobo.26.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Sure, we have already configured tools for linting, testing, and type checking to catch some of these violations, but if we are using AI, we need to tell it about the architecture we want to enforce and how the generated code should fit into it. ]{#kobo.27.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ AI can be very efficient and helpful, but only if it understands the constraints we have established. ]{#kobo.28.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Understanding the right mental model ]{#kobo.29.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_310 .heading-2}

[ We can think ]{#kobo.30.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e0c0b28a .index-entry index-entry="application architecture, AI tools:constraints"} [ of AI as a very capable developer who just joined the team. ]{#kobo.31.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They are smart and fast, but they have no idea about the specific architectural decisions we have made. ]{#kobo.32.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Without context, they will write code that works but might not fit the patterns we have established. ]{#kobo.33.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The key insight is that AI needs to understand our constraints, not just our code. ]{#kobo.34.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we describe our architecture clearly---such as which layers exist, what depends on what, and where specific types of logic live---we can use AI to generate code that actually fits. ]{#kobo.35.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Context files ]{#kobo.36.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_311 .heading-2}

[ Every major AI coding tool has some mechanism for reading project-level instructions, as a plain-text markdown file ]{#kobo.37.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f6cd272e .index-entry index-entry="application architecture, AI tools:context files"} [ at the root of the repository that the tool picks up automatically. ]{#kobo.38.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The specific filename varies: Cursor uses ]{#kobo.39.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` .cursorrules `{.codeHighlighted}]{#kobo.40.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , Claude Code reads a ]{#kobo.41.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` CLAUDE.md `{.codeHighlighted}]{#kobo.42.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , GitHub Copilot reads ]{#kobo.43.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` .github/copilot-instructions.md `{.codeHighlighted}]{#kobo.44.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , and others each have their own convention, and those conventions shift as tools evolve. ]{#kobo.45.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The underlying idea is the same for all tools. ]{#kobo.46.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Pick the file your current tool expects, write the rules there, and treat it like any other source file: versioned, reviewed, and updated alongside the code it describes. ]{#kobo.47.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If your team uses multiple tools, the simplest approach is to keep one authoritative file and symlink or copy it to whatever names each tool expects. ]{#kobo.48.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Writing rules that work ]{#kobo.49.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_312 .heading-2}

[ The quality ]{#kobo.50.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f25ed022 .index-entry index-entry="application architecture, AI tools:rules, writing"} [ of AI\'s output depends on the precision of the rules it is given. ]{#kobo.51.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Vague guidance produces vague results. ]{#kobo.52.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This would be a weak rule: ]{#kobo.53.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
Abstract API calls. Do not make them directly in components.
```

[ If we used AI to create a piece of code that makes API calls and it used our weak rule, it would probably not make API calls directly, but there are no further instructions on how to abstract it, which means there are many ways to do it. ]{#kobo.55.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead, we can use a stronger rule: ]{#kobo.56.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
Abstract API calls. Never call fetch() directly in a component or hook. All API calls go through src/lib/api.ts using its HTTP verb methods (api.get, api.post, etc.). Every file in src/features/<name>/api/ exports exactly three things: a fetcher function that validates input and output with Zod, a query options factory for use in loaders and tests, and a custom hook that wraps the options factory with useQuery or useMutation.
```

[ The strong rule specifies the exact constraint, the correct alternative, and the expected shape of the resulting code. ]{#kobo.76.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ AI can apply it reliably. ]{#kobo.77.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The weak rule requires judgment that the AI doesn\'t have. ]{#kobo.78.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ A useful structure for each rule is: ]{#kobo.79.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ What is required ]{#kobo.80.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : the positive behavior and its location ]{#kobo.81.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ What is forbidden ]{#kobo.82.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : the explicit anti-pattern to avoid ]{#kobo.83.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Why ]{#kobo.84.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : a brief reason, which helps AI reason correctly about edge cases ]{#kobo.85.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ It is also worth including rules about what ]{#kobo.86.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ not ]{#kobo.87.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ to do, not just what to do. ]{#kobo.88.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Explicit prohibitions like \"never call ]{#kobo.89.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` fetch() `{.codeHighlighted}]{#kobo.90.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ directly from a component\" tend to be more effective than positive descriptions alone because they prevent the most common shortcut. ]{#kobo.91.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here is a trimmed version of what a project\'s context file might look like: ]{#kobo.92.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
# Architecture Guide

## Feature Isolation

Features follow a unidirectional dependency graph enforced by ESLint's
`import/no-restricted-paths` rule in `infra/eslint-import-rules.js`.
Features may only import from other features if explicitly listed in
`allowedFeatures` in that file. If code is needed by multiple features,
move it to the shared layer instead.

## Data Fetching

Abstract API calls. Never call `fetch()` directly in a component. All API calls go through `src/lib/api.ts`. Every file in `src/features/<name>/api/` exports
three things: a fetcher function (Zod-validated in and out), a query
options factory, and a custom hook.

...
```

## [ Practical use cases ]{#kobo.94.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_313 .heading-2}

[ There ]{#kobo.95.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_270fd5f0 .index-entry index-entry="application architecture, AI tools:use cases"} [ are a few places where AI enforcement can be useful: ]{#kobo.96.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Code reviews: Paste a diff and ask the AI to check it against the architecture rules. ]{#kobo.97.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It can often catch violations that reviewers miss because they are focused on the logic of a change. ]{#kobo.98.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Scaffolding: Ask the AI to scaffold a new component, utility, API call, or test suite following the established patterns. ]{#kobo.99.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ With good context provided, it will create the right folder structure, put files in the right places, and follow naming conventions. ]{#kobo.100.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Refactoring: Describe the changes and ask the AI to implement them without changing behavior. ]{#kobo.101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is tedious work that AI handles well. ]{#kobo.102.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Onboarding: New team members can ask the AI to explain the project structure or walk through a feature and get answers that reflect the actual patterns rather than generic advice. ]{#kobo.103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In all these cases, the AI is most useful when the rules are concrete. ]{#kobo.104.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The more precisely we describe what belongs where and why, the more reliably it enforces those decisions. ]{#kobo.105.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Keeping rules up to date ]{#kobo.106.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_314 .heading-2}

[ We need to make sure that the context file is updated regularly. ]{#kobo.107.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A context file that has not been updated in months ]{#kobo.108.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e90ffb4f .index-entry index-entry="application architecture, AI tools:rules, updating"} [ might be worse than no file at all. ]{#kobo.109.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ AI will confidently enforce rules that no longer apply and generate code that follows abandoned patterns. ]{#kobo.110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Treating the rules file as living documentation helps. ]{#kobo.111.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A good practice is to update it as part of any pull request that changes an architectural convention, where the same PR that introduces a new pattern should add the rule describing it. ]{#kobo.112.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Code review is the right checkpoint: if a PR changes where certain logic lives, the reviewer should ask whether the rules file reflects the new convention. ]{#kobo.113.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With architecture in a better position, let\'s look at another area that becomes increasingly important as the application matures: how it performs and behaves for real users in production. ]{#kobo.114.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ React server components ]{#kobo.115.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_315 .heading-1}

**[ React Server Components ]{#kobo.116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.117.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ RSC ]{#kobo.118.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ) are a ]{#kobo.119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_8a730052 .index-entry index-entry="React Server Components (RSC)"} [ relatively new model that changes where React components run. ]{#kobo.120.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Traditionally, all React components run in the browser. ]{#kobo.121.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ With RSC, some components run only on the server; they can fetch data, access databases directly, and never send their JavaScript to the client. ]{#kobo.122.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Why server components? ]{#kobo.123.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_316 .heading-2}

[ The main ]{#kobo.124.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_8171fe09 .index-entry index-entry="React Server Components (RSC):need for"} [ appeal is performance. ]{#kobo.125.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When a component runs on the server, the browser doesn\'t need to download its JavaScript bundle, wait for it to execute, and then fetch data. ]{#kobo.126.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The server does the work and sends back finished HTML. ]{#kobo.127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is especially valuable for content-heavy pages or parts of the UI that don\'t need interactivity. ]{#kobo.128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The mental model takes some getting used to because there is a clear boundary between server components (data fetching, no hooks, no browser APIs) and client components (interactive, can use state and effects). ]{#kobo.129.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Getting that boundary wrong produces confusing errors. ]{#kobo.130.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ If you\'re building an application where initial page load performance is critical or you want to simplify data fetching by ]{#kobo.131.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d143a94d .index-entry index-entry="React Server Components (RSC):need for"} [ running it closer to the database, RSC is worth exploring. ]{#kobo.132.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.133.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://react.dev/reference/rsc/servercomponents ]{#kobo.134.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://react.dev/reference/rsc/servercomponents){style="text-decoration: none;"} [ and ]{#kobo.135.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://www.joshwcomeau.com/react/server-components/ ]{#kobo.136.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://www.joshwcomeau.com/react/server-components/){style="text-decoration: none;"} [ are both good starting points. ]{#kobo.137.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Keep in mind the mental model shift required, and once you understand where the server/client boundary sits, most of the confusion will clear up. ]{#kobo.138.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Application monitoring and observability ]{#kobo.139.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_317 .heading-1}

[ Deploying to production is when the real surprises start. ]{#kobo.140.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Users hit edge cases we never thought to test. ]{#kobo.141.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Errors happen ]{#kobo.142.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7528d544 .index-entry index-entry="application monitoring and observability"} [ on devices and browsers we don\'t own and never tested our application on. ]{#kobo.143.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Pages load slowly under conditions we can\'t reproduce locally. ]{#kobo.144.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Observability is how we find out about these problems before users give up and leave. ]{#kobo.145.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Error tracking with Sentry ]{#kobo.146.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_318 .heading-2}

**[ Sentry ]{#kobo.147.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is the ]{#kobo.148.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_babebc78 .index-entry index-entry="Sentry"} [ most widely used error tracking tool in the JavaScript ecosystem. ]{#kobo.149.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It captures unhandled ]{#kobo.150.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a5fc2992 .index-entry index-entry="application monitoring and observability:error tracking, with Sentry"} [ exceptions, records the stack ]{#kobo.151.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4993b40b .index-entry index-entry="error tracking:with Sentry"} [ trace, the user\'s browser and device, the URL they were on, and recent network ]{#kobo.152.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_118efa1d .index-entry index-entry="Sentry:error tracking"} [ requests---everything we need to reproduce and fix the issue. ]{#kobo.153.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Adding Sentry to a React application takes a few minutes. ]{#kobo.154.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ After installing the SDK and initializing it with our DSN (the project identifier we get from Sentry\'s dashboard), errors are captured automatically: ]{#kobo.155.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/entry.client.tsx

import * as Sentry from "@sentry/react-router";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  sendDefaultPii: true,
});
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
```

[ From there, Sentry groups similar errors together, tracks how often they occur, and can alert us via Slack, email, or PagerDuty when something new breaks. ]{#kobo.216.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.217.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_13_1.png" data-original-image-title="" style="width:528.0px; height:315.1269870384526px;">Figure 13.1 – Sentry error tracking dashboard</span> </span>
</figure>

[ Figure 13.1 -- Sentry error tracking dashboard ]{#kobo.218.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For most ]{#kobo.219.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1ff1024b .index-entry index-entry="application monitoring and observability:error tracking, with Sentry"} [ production applications, this ]{#kobo.220.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e29a7b69 .index-entry index-entry="Sentry:error tracking"} [ is the ]{#kobo.221.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_42894464 .index-entry index-entry="error tracking:with Sentry"} [ first monitoring tool worth adding. ]{#kobo.222.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Performance monitoring ]{#kobo.223.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_319 .heading-2}

[ Beyond errors, we ]{#kobo.224.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7d023363 .index-entry index-entry="application monitoring and observability:performance monitoring"} [ want to understand how fast our application feels to real users. ]{#kobo.225.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The Web Vitals are a set of metrics defined by Google that measure the parts of performance users actually notice: ]{#kobo.226.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ LCP (Largest Contentful Paint) ]{#kobo.227.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - How quickly the main content loads ]{#kobo.228.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ CLS (Cumulative Layout Shift) ]{#kobo.229.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - How much the page jumps around during load ]{#kobo.230.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ INP (Interaction to Next Paint) ]{#kobo.231.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - How quickly the page responds to user actions ]{#kobo.232.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Sentry captures Web Vitals automatically once performance monitoring is enabled. ]{#kobo.233.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Alternatively, Lighthouse CI can run performance audits as part of the CI pipeline and fail the build if scores drop below a threshold. ]{#kobo.234.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Structured logging and alerts ]{#kobo.235.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_320 .heading-2}

[ Structured ]{#kobo.236.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_dbf5098e .index-entry index-entry="application monitoring and observability:structured logging and alerts"} [ logging means attaching consistent metadata to every error or event you want to track. ]{#kobo.237.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ An unstructured log like this: ]{#kobo.238.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
console.error("Something went wrong");
```

[ This gets captured and stored, but tells you nothing useful. ]{#kobo.245.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ You can\'t filter by user, route, or component, it\'s just a string in a haystack. ]{#kobo.246.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ By passing a structured object instead, each field gets indexed individually: ]{#kobo.247.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
console.error("Something went wrong", {
  route: "/dashboard",
  componentName: "Dashboard",
  userId: "123",
});
```

[ Now you can search all errors from a specific component, filter by user, and set up alerts when error rates spike after a deploy. ]{#kobo.266.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To make this useful in production, these logs need to be stored somewhere so we can browse them. ]{#kobo.267.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Tools like ]{#kobo.268.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f7a1872a .index-entry index-entry="application monitoring and observability:structured logging and alerts"} [ Datadog and New Relic provide browser SDKs that automatically intercept ]{#kobo.269.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` console `{.codeHighlighted}]{#kobo.270.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ calls and ship them to their platform where they can be queried and alerted on. ]{#kobo.271.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Feature flags ]{#kobo.272.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_321 .heading-1}

**[ Feature flags ]{#kobo.273.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ are a ]{#kobo.274.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_013a5439 .index-entry index-entry="feature flags"} [ way to control which users see which features at runtime without deploying new code. ]{#kobo.275.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of releasing a feature to everyone at once, we wrap it in a flag check. ]{#kobo.276.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The flag is off by default. ]{#kobo.277.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can turn it on for internal users first, then a small percentage of real users, then everyone. ]{#kobo.278.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This has a few important benefits. ]{#kobo.279.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It decouples deployment from release, so we can merge code early without exposing incomplete features. ]{#kobo.280.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It makes rollbacks instant; if something goes wrong, we flip the flag rather than reverting a deploy. ]{#kobo.281.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Simple implementation vs dedicated tools ]{#kobo.282.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_322 .heading-2}

[ For a ]{#kobo.283.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7080ffc3 .index-entry index-entry="feature flags:implementation, versus dedicated tools"} [ small number of flags, we can start with environment variables or a simple database table. ]{#kobo.284.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A flag is just a boolean we check before rendering something: ]{#kobo.285.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/lib/flags.ts

export const flags = {
  newIdeaDashboard: import.meta.env.VITE_FLAG_NEW_IDEA_DASHBOARD === 'true',
};

// src/components/dashboard.tsx

import { flags } from "@/lib/flags";

function Dashboard() {
  if (!flags.newIdeaDashboard) return <LegacyDashboard />;

  return <NewIdeaDashboard />;
}
```

[ This works fine for a few flags but doesn\'t scale well. ]{#kobo.319.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When flags multiply, we want to be able to toggle them without redeploying, target specific users or segments, and audit who changed what and when. ]{#kobo.320.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Dedicated tools like LaunchDarkly and Flagsmith provide all of this. ]{#kobo.321.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They have React SDKs that handle flag evaluation, real-time updates, and targeting rules. ]{#kobo.322.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here is the same example using Flagsmith: ]{#kobo.323.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/components/dashboard.tsx
import { useFlags } from "flagsmith/react";

function Dashboard() {
  const { new_idea_dashboard } = useFlags(["new_idea_dashboard"]);

  if (!new_idea_dashboard.enabled) return <LegacyDashboard />;

  return <NewIdeaDashboard />;
}
```

[ The flag starts disabled. ]{#kobo.353.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For example, we can enable it for internal users first, then gradually roll it out to everyone, all from the Flagsmith dashboard, without touching the code. ]{#kobo.354.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ A/B testing ]{#kobo.355.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_323 .heading-2}

[ Feature flags ]{#kobo.356.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7e60e47d .index-entry index-entry="feature flags:A/B testing"} [ are also the foundation of ]{#kobo.357.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ A/B testing ]{#kobo.358.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ . ]{#kobo.359.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of a simple on/off flag, we assign ]{#kobo.360.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_981aa87a .index-entry index-entry="A/B testing"} [ users to variant A or variant B and measure which performs better based on the collected metrics. ]{#kobo.361.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Most dedicated feature flag tools support this natively. ]{#kobo.362.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If you are already using flags for safe deployments, adding experimentation on top is a small step. ]{#kobo.363.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/components/dashboard.tsx
import { useFlags } from "flagsmith/react";

function Dashboard() {
  const { new_idea_dashboard } = useFlags(["new_idea_dashboard"]);

  if (!new_idea_dashboard.enabled) return <LegacyDashboard />;

  if (new_idea_dashboard.value === "A") return <NewIdeaDashboardA />;
  if (new_idea_dashboard.value === "B") return <NewIdeaDashboardB />;
}
```

[ Flagsmith consistently assigns each user to one variant, so the same user always sees the same experience. ]{#kobo.407.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We compare engagement between the two variants in our analytics tool and roll out the winner to everyone by updating the flag. ]{#kobo.408.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Scaling the API layer ]{#kobo.409.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_324 .heading-1}

[ REST APIs work ]{#kobo.410.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_17db0781 .index-entry index-entry="API layer:scaling"} [ well for most applications, but as applications grow, two challenges tend to emerge. ]{#kobo.411.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ First, the frontend needs more data than any single REST endpoint provides, leading to multiple round-trip requests (under-fetching) or bloated endpoints that return everything just in case (over-fetching). ]{#kobo.412.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Second, different clients (web, mobile, third-party) need the same data shaped differently. ]{#kobo.413.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ The BFF pattern ]{#kobo.414.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_325 .heading-2}

[ The ]{#kobo.415.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Backend for Frontend (BFF) ]{#kobo.416.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ pattern ]{#kobo.417.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7688df10 .index-entry index-entry="Backend for Frontend (BFF)"} [ addresses both problems by adding a ]{#kobo.418.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_07339580 .index-entry index-entry="API layer:BFF pattern"} [ thin API layer that sits in front of our backend and is tailored to a specific client\'s needs. ]{#kobo.419.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Instead of a ]{#kobo.420.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_143500aa .index-entry index-entry="BFF pattern"} [ generic API that all clients share, each client gets its own BFF. ]{#kobo.421.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The web BFF knows exactly what data the web app needs and aggregates it in one request. ]{#kobo.422.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If the underlying data comes from three different services, the BFF handles the fan-out and returns a single, composed response. ]{#kobo.423.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The following diagram shows how this sits between the clients and the backend: ]{#kobo.424.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.425.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_13_2.png" data-original-image-title="" style="width:528.0px; height:440.66292985120015px;">Figure 13.2 – The BFF pattern</span> </span>
</figure>

[ Figure 13.2 -- The BFF pattern ]{#kobo.426.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In this setup, each client talks only to its own BFF. ]{#kobo.427.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The BFF handles reshaping the data from backend services and ]{#kobo.428.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_befc4a6a .index-entry index-entry="API layer:BFF pattern"} [ returns exactly what that client needs in a single response. ]{#kobo.429.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This keeps ]{#kobo.430.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_37ee71ad .index-entry index-entry="BFF pattern"} [ backend services clean and generic while giving each client exactly what it needs. ]{#kobo.431.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The downside is more code to maintain since we are adding another layer between the client and the backend. ]{#kobo.432.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It makes the most sense when multiple clients with different needs are calling the same backend. ]{#kobo.433.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When those multiple clients start to emerge (a web app, a mobile app, perhaps a public API), the question of how to organize all the related code starts to matter. ]{#kobo.434.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ That\'s where monorepos become relevant. ]{#kobo.435.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Monorepos ]{#kobo.436.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_326 .heading-1}

[ As projects grow, it\'s common to end up with multiple related codebases: the main web app, the dashboard app, a mobile ]{#kobo.437.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_50943dba .index-entry index-entry="monorepo"} [ app, a component library, shared TypeScript types, and utility functions. ]{#kobo.438.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When these live in separate repositories, keeping them in sync becomes painful. ]{#kobo.439.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A change to the component library requires updating, versioning, publishing, and installing a new version across every consumer. ]{#kobo.440.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A breaking change in shared types requires coordinating across multiple teams. ]{#kobo.441.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ A ]{#kobo.442.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ monorepo ]{#kobo.443.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is a single repository that contains multiple applications and packages. ]{#kobo.444.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Code changes happen together, so a breaking change and all the consumers that need updating can be in the same pull request. ]{#kobo.445.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The following diagram shows what this looks like in practice: ]{#kobo.446.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.447.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_13_3.png" data-original-image-title="" style="width:528.0px; height:451.07555949479274px;">Figure 13.3 – A monorepo with multiple applications</span> </span>
</figure>

[ Figure 13.3 -- A monorepo with multiple applications ]{#kobo.448.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here, each app is its own ]{#kobo.449.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_04e65001 .index-entry index-entry="monorepo"} [ package, but they all share code from the common packages in the same repository. ]{#kobo.450.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A change to a shared package is immediately available to every app without a publish-and-install cycle. ]{#kobo.451.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Sharing packages across apps ]{#kobo.452.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_327 .heading-2}

[ The main ]{#kobo.453.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_662e590c .index-entry index-entry="monorepo:packages, sharing between applications"} [ idea behind a monorepo is sharing code between applications. ]{#kobo.454.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Common candidates are: ]{#kobo.455.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ UI component library - Shared React components used by multiple apps ]{#kobo.456.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ TypeScript types - API response types shared between the frontend and backend ]{#kobo.457.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Utility functions - Date formatting, validation, and other helpers ]{#kobo.458.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Each of these lives as its own package in the monorepo. ]{#kobo.459.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Applications import them like any other dependency, but changes are reflected immediately upon a new deployment without upgrading the dependencies. ]{#kobo.460.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This keeps things consistent and reduces the chance of applications drifting out of sync. ]{#kobo.461.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It also brings the risk of breaking changes that can propagate immediately upon deployment, so we need to be careful. ]{#kobo.462.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Microfrontends ]{#kobo.463.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_328 .heading-1}

[ We can ]{#kobo.464.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4e93a723 .index-entry index-entry="microfrontends"} [ think of ]{#kobo.465.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ microfrontends ]{#kobo.466.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ as microservices for the frontend. ]{#kobo.467.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of one team owning the entire frontend, different teams own different parts of the application. ]{#kobo.468.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each team builds and deploys their slice independently. ]{#kobo.469.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The following diagram shows what that split looks like: ]{#kobo.470.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.471.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_13_4.png" data-original-image-title="" style="width:528.0px; height:257.03877686682915px;">Figure 13.4 – A microfrontend architecture</span> </span>
</figure>

[ Figure 13.4 -- A microfrontend architecture ]{#kobo.472.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Each team has full ownership of their slice, their own codebase, their own pipeline, and their own deployment process. ]{#kobo.473.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A shell application stitches the slices together at runtime. ]{#kobo.474.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ When microfrontends make sense ]{#kobo.475.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_329 .heading-2}

[ Microfrontends solve an ]{#kobo.476.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9d1d6ca1 .index-entry index-entry="microfrontends:consideration"} [ organizational problem more than a technical one. ]{#kobo.477.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If a single team can ship the entire frontend, a monolith is simpler. ]{#kobo.478.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Microfrontends become worth considering when: ]{#kobo.479.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Multiple large teams need to deploy the frontend independently without coordinating releases ]{#kobo.480.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Different parts of the application have different technology requirements ]{#kobo.481.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The frontend has grown so large that build times and codebase navigation slow teams down. ]{#kobo.482.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For most applications, this point never arrives. ]{#kobo.483.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Introducing microfrontend complexity too early is a classic case of overengineering. ]{#kobo.484.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Trade-offs to understand before adopting ]{#kobo.485.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_330 .heading-2}

[ Microfrontends come ]{#kobo.486.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d5511cf4 .index-entry index-entry="microfrontends:trade-offs"} [ with real costs: ]{#kobo.487.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Operational complexity ]{#kobo.488.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - Each microfrontend is a separate deployment with its own pipeline, versioning, and monitoring ]{#kobo.489.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Shared dependencies ]{#kobo.490.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - Managing shared libraries across independently deployed apps is tricky. ]{#kobo.491.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Version mismatches can cause subtle bugs or bloated bundles. ]{#kobo.492.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Consistent UX ]{#kobo.493.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - Maintaining a consistent look and feel across teams requires coordination, usually through a shared design system ]{#kobo.494.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Performance ]{#kobo.495.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - Loading multiple independent bundles at runtime has overhead that needs to be managed carefully ]{#kobo.496.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The teams that succeed with microfrontends tend to invest heavily in the shared infrastructure (design systems, deployment tooling, contract testing) before splitting the frontend. ]{#kobo.497.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Without that foundation, the organizational benefits don\'t outweigh the added complexity. ]{#kobo.498.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Summary ]{#kobo.499.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_331 .heading-1}

[ In this chapter, we explored several topics that become relevant as an application matures beyond its initial launch. ]{#kobo.500.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We started with using AI to enforce architecture, looking at how context files give AI coding tools the constraints they need to generate code that fits established patterns. ]{#kobo.501.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We covered what makes a rule effective: specificity, explicit prohibitions, a clear reason, and why keeping those rules up to date matters as much as writing them in the first place. ]{#kobo.502.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ From there, we looked at React Server Components and how moving rendering to the server changes the performance and data-fetching model, then covered application monitoring and observability: capturing errors with Sentry, tracking Web Vitals, and structuring logs so they are queryable in production. ]{#kobo.503.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We then explored feature flags as a way to decouple deployment from release, enabling safe rollouts and instant rollbacks without a full redeploy. ]{#kobo.504.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We saw how the same mechanism naturally extends to A/B testing. ]{#kobo.505.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Finally, we examined patterns for scaling the API layer with the BFF pattern, organizing multiple related codebases with monorepos, and splitting frontend ownership across teams with microfrontends, along with the trade-offs and organizational signals that indicate when each is worth the added complexity. ]{#kobo.506.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Not all of these will be relevant at the same time. ]{#kobo.507.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The right move is to understand they exist, recognize the signals that indicate when a topic has become worth investing in, and then dig in when the time comes. ]{#kobo.508.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The codebase we have built throughout this book is a solid foundation for any of these directions. ]{#kobo.509.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s remember, good software is never finished; it evolves. ]{#kobo.510.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Keep iterating, keep learning, and build things worth building. ]{#kobo.511.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Get this book\'s PDF copy, code bundle, and more ]{#kobo.512.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_332 .heading-1}

[ Scan the QR code (or go to ]{#kobo.513.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.514.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ ). ]{#kobo.515.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search for this book by name, confirm the edition, and then follow the steps on the page. ]{#kobo.516.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_13_5.png" original-image-title="" style="width:25%;"} ]{#kobo.517.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_13_6.png" original-image-title="" style="width:25%;"} ]{#kobo.518.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[ Note: Have your invoice handy. ]{#kobo.519.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Purchases made directly from the Packt website don\'t require an invoice. ]{#kobo.520.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}*
:::
