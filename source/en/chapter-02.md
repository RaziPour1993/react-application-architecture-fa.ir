::: {.section .chapter}
# [ 2 ]{#kobo.1.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_46 .chapterNumber}

# [ Setup and Project Structure Overview ]{#kobo.2.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_47 .chapterTitle}

[ Before writing any feature code, it\'s worth getting our project set up right. ]{#kobo.3.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Poor tooling choices and messy folder structures are some of the most common reasons code bases become hard to work with over time. ]{#kobo.4.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In this chapter, we\'ll set up the tools and structure that prevent those problems: a meta framework, type checking, linting, formatting, pre-commit checks, and a feature-based project structure. ]{#kobo.5.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ By the end, we\'ll have a solid foundation that we can build on with confidence. ]{#kobo.6.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll cover the following topics: ]{#kobo.7.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Choosing a meta framework for the project ]{#kobo.8.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Build tool setup overview ]{#kobo.9.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Type-checking setup overview ]{#kobo.10.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Linting setup overview ]{#kobo.11.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Formatting setup overview ]{#kobo.12.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Pre-commit checks setup overview ]{#kobo.13.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Project structure overview ]{#kobo.14.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Environment variables setup overview ]{#kobo.15.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By the end of this chapter, you\'ll have a good understanding of the tools we\'ll be using for the project setup and the feature-based project structure to make organizing our code more manageable. ]{#kobo.16.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Technical requirements ]{#kobo.17.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_48 .heading-1}

[ Before we get started, we need to set up our project. ]{#kobo.18.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To develop our project, we need the following tools installed on our computer: ]{#kobo.19.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Node.js version 24 or above. ]{#kobo.20.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ npm version 11 or above ships with Node. ]{#kobo.21.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can confirm this by executing ]{#kobo.22.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` node ‑v `{.inlineCode}]{#kobo.23.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.24.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` npm ‑v `{.inlineCode}]{#kobo.25.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ in the terminal. ]{#kobo.26.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There are multiple ways to install Node.js and npm. ]{#kobo.27.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here is a helpful article that goes into more detail: ]{#kobo.28.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js ]{#kobo.29.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js){style="text-decoration: none;"} [ . ]{#kobo.30.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ VS Code ]{#kobo.31.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ (optional), a popular editor for JavaScript and TypeScript. ]{#kobo.32.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It is open source, has solid TypeScript support, and offers many extensions. ]{#kobo.33.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It can be downloaded from ]{#kobo.34.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://code.visualstudio.com ]{#kobo.35.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://code.visualstudio.com){style="text-decoration: none;"} [ . ]{#kobo.36.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The code for this book is available at the book\'s repo. ]{#kobo.37.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To access the repository link, follow the steps in the ]{#kobo.38.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ \" ]{#kobo.39.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ Download the example code files ]{#kobo.40.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ \" ]{#kobo.41.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ section in the ]{#kobo.42.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Preface ]{#kobo.43.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ . ]{#kobo.44.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Clone it and enter the repository root: ]{#kobo.45.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

[ The repository contains chapter folders with the code for each chapter, along with a shared ]{#kobo.47.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` api `{.inlineCode}]{#kobo.48.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ folder that includes the API server used across all chapters. ]{#kobo.49.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We are working on ]{#kobo.50.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Chapter ]{#kobo.51.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ 2 ]{#kobo.52.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , so navigate to the ]{#kobo.53.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` chapter‑02 `{.inlineCode}]{#kobo.54.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.55.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/chapter-02
```

[ Next, install the dependencies: ]{#kobo.57.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm install
```

[ We also need to provide the environment variables: ]{#kobo.59.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cp .env.example .env
```

[ At this point, the frontend should be ready and running at ]{#kobo.61.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:5173 ]{#kobo.62.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:5173){style="text-decoration: none;"} [ . ]{#kobo.63.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now, we should have the project code ready. ]{#kobo.64.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For more information about the setup details, check out the ]{#kobo.65.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` README.md `{.inlineCode}]{#kobo.66.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file. ]{#kobo.67.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Choosing a meta framework for the project ]{#kobo.68.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_49 .heading-1}

[ Before we ]{#kobo.69.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_13b42105 .index-entry index-entry="meta framework"} [ dive into the meta framework setup, we need to understand what a meta framework is and why we need it. ]{#kobo.70.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In this section, we\'ll cover the following topics: ]{#kobo.71.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ What is a meta framework, and why do we need it? ]{#kobo.72.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The React meta framework landscape ]{#kobo.73.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Making the right choice ]{#kobo.74.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Why we\'re using React Router ]{#kobo.75.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ How to get started with React Router ]{#kobo.76.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ What is a meta framework, and why do we need it? ]{#kobo.77.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_50 .heading-2}

[ When we start building web applications with libraries such as React, we quickly realize that these tools ]{#kobo.78.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e513aa9c .index-entry index-entry="meta framework:need for"} [ only solve one part of the problem. ]{#kobo.79.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React, being a UI library, handles our ]{#kobo.80.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_59dc1da1 .index-entry index-entry="server-side rendering (SSR)"} [ components and basic state management properly, but what about routing? ]{#kobo.81.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Server-side rendering ]{#kobo.82.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.83.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ SSR ]{#kobo.84.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ )? ]{#kobo.85.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ Build optimization? ]{#kobo.85.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ API integration? ]{#kobo.85.3 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ Suddenly, we\'re spending more time configuring tools than building features. ]{#kobo.85.4 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This is where meta frameworks come in. ]{#kobo.86.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They\'re a layer that sits on top of our UI library or base framework, providing all the application-level infrastructure that we need for our project. ]{#kobo.87.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ The pain points they solve ]{#kobo.88.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_51 .heading-2}

[ Building a production-ready web application involves many decisions and configurations that have nothing ]{#kobo.89.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a544b518 .index-entry index-entry="meta framework:problem-solving"} [ to do with our actual business logic. ]{#kobo.90.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We need to figure out how to handle different types of rendering (client-side, server-side, and static), set up routing with code splitting, optimize our bundles, configure TypeScript, set up linting, handle data fetching, and deploy everything reliably. ]{#kobo.91.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ If we tried to set all of this up from scratch, we\'d spend days (or weeks) just configuring tools before writing a single line of product code. ]{#kobo.92.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Even then, we\'d likely end up with a setup that\'s hard to maintain, hard to update, and full of subtle issues that only show up in production. ]{#kobo.93.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Meta frameworks ]{#kobo.94.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e1ae5567 .index-entry index-entry="client-side rendering (CSR)"} [ solve these problems directly. ]{#kobo.95.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Routing, rendering modes ( ]{#kobo.96.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ client-side rendering ]{#kobo.97.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.98.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ CSR ]{#kobo.99.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ), SSR, and static), code splitting, and data-fetching patterns are all handled out of the box. ]{#kobo.100.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of wiring all these pieces together ourselves, we get a well-thought-out system that works from day one, leaving us free to focus on what actually matters: building features and solving problems for our users. ]{#kobo.101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ The React meta framework landscape ]{#kobo.102.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_52 .heading-2}

[ Since this ]{#kobo.103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_cf7b66ba .index-entry index-entry="meta framework, React"} [ book is about React, let\'s focus on the main options available to us in the React ecosystem. ]{#kobo.104.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The landscape has matured significantly over the last few years, and we now have several solid choices depending on what our project needs. ]{#kobo.105.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Next.js ]{#kobo.106.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_53 .heading-3}

**[ Next.js ]{#kobo.107.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is the ]{#kobo.108.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4a2463b2 .index-entry index-entry="meta framework, React:Next.js"} [ most popular choice in the React world. ]{#kobo.109.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s backed ]{#kobo.110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_3e021f8b .index-entry index-entry="Next.js"} [ by Vercel and has the largest community, which means excellent documentation, plenty of tutorials, and easier hiring. ]{#kobo.111.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It comes with a lot built in: automatic image optimization, React Server Components, partial prerendering, and more. ]{#kobo.112.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ React Router (in framework mode) ]{#kobo.113.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_54 .heading-3}

**[ React Router ]{#kobo.114.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ has been ]{#kobo.115.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_3ecaeeec .index-entry index-entry="React Router"} [ around for a long time as a client-side routing library, but it ]{#kobo.116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_86774eca .index-entry index-entry="meta framework, React:React Router"} [ also ships with a framework mode that is the successor to Remix. ]{#kobo.117.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In framework mode, it acts as a full meta framework with SSR and data loading built in. ]{#kobo.118.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It focuses on web standards and progressive enhancement. ]{#kobo.119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ TanStack Start ]{#kobo.120.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_55 .heading-3}

**[ TanStack Start ]{#kobo.121.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is the ]{#kobo.122.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_23fb34b2 .index-entry index-entry="meta framework, React:TanStack Start"} [ newest framework in this space. ]{#kobo.123.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It emphasizes ]{#kobo.124.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_55fd18c0 .index-entry index-entry="TanStack Start"} [ type safety and developer experience, taking a type-first approach where things such as route parameters, data loading, and navigation are fully typed out of the box. ]{#kobo.125.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ While still evolving, TanStack Start shows promise for teams that prioritize strong TypeScript integration. ]{#kobo.126.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Making the right choice ]{#kobo.127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_56 .heading-2}

[ All three frameworks are solid, production-ready options with strong communities behind them. ]{#kobo.128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The right ]{#kobo.129.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_2a93bcb8 .index-entry index-entry="meta framework, React:selecting"} [ choice for a project depends on team familiarity, hosting requirements, and how much abstraction feels comfortable. ]{#kobo.130.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For this book, we are using React Router in framework mode. ]{#kobo.131.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Why we\'re using React Router ]{#kobo.132.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_57 .heading-2}

[ We chose ]{#kobo.133.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a111c2bf .index-entry index-entry="React Router:benefits"} [ React Router for two main reasons: ]{#kobo.134.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Deployment ]{#kobo.135.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ f ]{#kobo.136.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ lexibility ]{#kobo.137.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : React Router works consistently across any hosting environment with no preference for any particular platform, giving us more freedom in how we deploy our application. ]{#kobo.138.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Learning ]{#kobo.139.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ f ]{#kobo.140.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ ocus ]{#kobo.141.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : React Router\'s data-loading model maps closely to how the web platform works natively. ]{#kobo.142.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This makes it a good fit for a book focused on understanding how React applications work. ]{#kobo.143.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Whichever framework we choose, the concepts we cover in this book are applicable across all of them. ]{#kobo.144.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ How to get started with React Router ]{#kobo.145.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_58 .heading-2}

[ To get ]{#kobo.146.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4cb1e3e0 .index-entry index-entry="React Router:implementing"} [ started with a new project, we can use the ]{#kobo.147.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` create‑react‑router `{.inlineCode}]{#kobo.148.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ CLI and generate a new project with the following command: ]{#kobo.149.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npx create-react-router@latest my-app
```

[ This will prompt us with a list of options to choose from. ]{#kobo.151.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can select the default options and the project will be generated. ]{#kobo.152.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This is how our initial project structure looks: ]{#kobo.153.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
├── src/
│   └── app/
│       ├── app.css
│       ├── root.tsx
│       ├── routes/
│       │   └── home.tsx
│       ├── routes.ts
│       └── welcome/
│           ├── logo-dark.svg
│           ├── logo-light.svg
│           └── welcome.tsx
├── Dockerfile
├── node_modules/
├── package-lock.json
├── package.json
├── public/
│   └── favicon.ico
├── react-router.config.ts
├── README.md
├── tsconfig.json
└── vite.config.ts
```

[ The project ]{#kobo.155.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b1e05fcb .index-entry index-entry="React Router:implementing"} [ structure is as follows: ]{#kobo.156.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` src/app `{.inlineCode}]{#kobo.157.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Application directory ]{#kobo.158.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` src/app/root.tsx `{.inlineCode}]{#kobo.159.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Root of the application with HTML structure and error handling ]{#kobo.160.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` src/app/routes.ts `{.inlineCode}]{#kobo.161.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Route configuration file that maps URLs to components ]{#kobo.162.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` react‑router.config.ts `{.inlineCode}]{#kobo.163.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : React Router configuration file ]{#kobo.164.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` tsconfig.json `{.inlineCode}]{#kobo.165.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : TypeScript configuration file ]{#kobo.166.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` vite.config.ts `{.inlineCode}]{#kobo.167.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Vite configuration file ]{#kobo.168.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ One thing we would notice if we ran the CLI is that the ]{#kobo.169.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` app `{.codeHighlighted}]{#kobo.170.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ folder is created directly in the root of the project, not in the ]{#kobo.171.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` src `{.codeHighlighted}]{#kobo.172.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ directory. ]{#kobo.173.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is because the CLI generates the project in the current directory. ]{#kobo.174.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ However, we will keep it in the ]{#kobo.175.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` src `{.codeHighlighted}]{#kobo.176.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ directory just because we want to reference anything that is inside the ]{#kobo.177.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` src `{.codeHighlighted}]{#kobo.178.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ directory with the ]{#kobo.179.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` @/ `{.codeHighlighted}]{#kobo.180.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ alias, which we will cover in the following sections. ]{#kobo.181.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We will cover these files as we go through the book, so we shouldn\'t worry much about them for now. ]{#kobo.182.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now that we have our meta framework set up, let\'s understand the build tool that powers it and how we can configure it to our needs. ]{#kobo.183.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Build tool setup overview ]{#kobo.184.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_59 .heading-1}

[ React Router ]{#kobo.185.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_366f1ba9 .index-entry index-entry="React Router, build tool setup:overview"} [ in framework mode uses Vite as its build tool, which provides fast development and optimized production builds. ]{#kobo.186.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In this section, we will cover the following topics: ]{#kobo.187.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ What is Vite, and why do we need it? ]{#kobo.188.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ How Vite works with React Router ]{#kobo.189.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Our Vite configuration ]{#kobo.190.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Development versus production builds ]{#kobo.191.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ What is Vite, and why do we need it? ]{#kobo.192.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_60 .heading-2}

[ Vite is ]{#kobo.193.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_6e7382f3 .index-entry index-entry="React Router, build tool setup:Vite"} [ a modern ]{#kobo.194.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_87cb134e .index-entry index-entry="Vite"} [ build tool ]{#kobo.195.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f010ff24 .index-entry index-entry="Vite:need for"} [ that provides the following: ]{#kobo.196.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Fast development ]{#kobo.197.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : ]{#kobo.198.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Hot Module Replacement ]{#kobo.199.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.200.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ HMR ]{#kobo.201.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ) for ]{#kobo.202.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5d8986d1 .index-entry index-entry="Hot Module Replacement (HMR)"} [ instant updates during development ]{#kobo.203.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Optimized builds ]{#kobo.204.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Tree shaking, code splitting, and asset optimization for production ]{#kobo.205.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Framework agnostic ]{#kobo.206.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Works with React, Vue, Svelte, and more ]{#kobo.207.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Modern standards ]{#kobo.208.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Native ES modules in development; optimized bundles for production ]{#kobo.209.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When we\'re building React applications, we need a tool that can do the following: ]{#kobo.210.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Bundle our code efficiently ]{#kobo.211.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Handle different file types (TypeScript, JSX, CSS, and images) ]{#kobo.212.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Provide fast development experience ]{#kobo.213.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Optimize for production deployment ]{#kobo.214.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Vite solves these problems with a modern approach that\'s faster than traditional bundlers such as webpack. ]{#kobo.215.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ How Vite works with React Router ]{#kobo.216.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_61 .heading-2}

[ React ]{#kobo.217.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e2a92f37 .index-entry index-entry="React Router, build tool setup:Vite, working with"} [ Router is built on top of Vite, which means the following: ]{#kobo.218.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ The ]{#kobo.219.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ d ]{#kobo.220.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ evelopment server ]{#kobo.221.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ runs on ]{#kobo.222.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a4cfa308 .index-entry index-entry="Vite:working"} [ Vite\'s dev server with HMR ]{#kobo.223.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The ]{#kobo.224.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ b ]{#kobo.225.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ uild process ]{#kobo.226.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ uses Vite\'s optimizations for production ]{#kobo.227.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Environment variables ]{#kobo.228.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ are handled by Vite\'s system ]{#kobo.229.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This integration means we get the best of both worlds: React Router\'s routing and data-loading capabilities with Vite\'s fast build system. ]{#kobo.230.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Our Vite configuration ]{#kobo.231.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_62 .heading-2}

[ We\'re ]{#kobo.232.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c3a0eca7 .index-entry index-entry="Vite:configuration"} [ using Vite ]{#kobo.233.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_11b5379f .index-entry index-entry="React Router, build tool setup:Vite, configuration"} [ to handle our build process, and our configuration is set up in ]{#kobo.234.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` vite.config.ts `{.inlineCode}]{#kobo.235.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : ]{#kobo.236.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// vite.config.ts
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
```

[ Here\'s what is configured here: ]{#kobo.283.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ The ]{#kobo.284.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` tailwindcss `{.codeHighlighted}]{#kobo.285.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` () `{.codeHighlighted}]{#kobo.286.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ plugin: This is the Tailwind CSS plugin that handles the CSS layer of the application. ]{#kobo.287.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The ]{#kobo.288.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` reactRouter `{.codeHighlighted}]{#kobo.289.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` () `{.codeHighlighted}]{#kobo.290.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ plugin: This is the React Router plugin that handles routing, SSR, and other framework-specific features. ]{#kobo.291.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The ]{#kobo.292.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` tsconfigPaths `{.codeHighlighted}]{#kobo.293.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` () `{.codeHighlighted}]{#kobo.294.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ plugin: This plugin allows us to use ]{#kobo.295.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` @/ `{.inlineCode}]{#kobo.296.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ as an alias for our ]{#kobo.297.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` src `{.inlineCode}]{#kobo.298.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory in TypeScript files, so we can write ]{#kobo.299.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` @/components/button `{.inlineCode}]{#kobo.300.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ instead ]{#kobo.301.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode} [ of ]{#kobo.302.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ../../../components/button `{.inlineCode}]{#kobo.303.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.304.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Don\'t worry about TypeScript for now; we will cover it in the next section. ]{#kobo.305.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Type-checking setup overview ]{#kobo.306.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_63 .heading-1}

[ Now that ]{#kobo.307.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1d8f365e .index-entry index-entry="TypeScript for type checking:overview"} [ we understand our build tool, we need to set up TypeScript for type checking. ]{#kobo.308.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In this section, we will cover the following topics: ]{#kobo.309.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ What is TypeScript, and why do we need it? ]{#kobo.310.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ How TypeScript works ]{#kobo.311.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Our TypeScript configuration ]{#kobo.312.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Running TypeScript checks ]{#kobo.313.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ TypeScript is a very valuable tool in modern React development. ]{#kobo.314.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s see why and how we can configure it to our needs. ]{#kobo.315.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ What is TypeScript, and why do we need it? ]{#kobo.316.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_64 .heading-2}

[ TypeScript is ]{#kobo.317.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_8f40991f .index-entry index-entry="TypeScript"} [ a programming language that extends JavaScript by adding static type definitions. ]{#kobo.318.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Think of it as JavaScript with a safety net---it helps us catch errors before they happen in production. ]{#kobo.319.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When we\'re building a React application, or any other JavaScript application in general, we often run into issues such as the following: ]{#kobo.320.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Passing a string where we expected a number ]{#kobo.321.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Calling a function that doesn\'t exist or with the wrong arguments ]{#kobo.322.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Accessing properties on objects that might be undefined or do not exist ]{#kobo.323.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Forgetting to handle all the possible cases in our code ]{#kobo.324.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ TypeScript ]{#kobo.325.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c2264621 .index-entry index-entry="TypeScript:need for"} [ catches these issues at compile time, before our users ever see them. ]{#kobo.326.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ TypeScript is especially useful for large applications built by large teams. ]{#kobo.327.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Code written in TypeScript is much better documented than code written in vanilla JavaScript. ]{#kobo.328.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ By looking at the type definitions, we can figure out how a piece of code is supposed to work. ]{#kobo.329.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Another reason is that TypeScript makes refactoring much easier because most of the issues can be caught before running the application. ]{#kobo.330.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ TypeScript also helps inside our IDE with autocomplete, hover information, and signature information, which speeds up our productivity. ]{#kobo.331.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ How TypeScript works ]{#kobo.332.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_65 .heading-2}

[ TypeScript ]{#kobo.333.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_2ea87f4f .index-entry index-entry="TypeScript:working"} [ works by analyzing our code and understanding the types of data we\'re working with. ]{#kobo.334.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here is an example: ]{#kobo.335.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// Function expects a number
function double(value: number) {
  return value * 2;
}

// TypeScript is happy - we passed a number
double(21); // Works fine, returns 42

// TypeScript catches the error - we passed a string
double("21"); // TypeScript error: Argument of type 'string' is not assignable to parameter of type 'number'
```

[ The key benefit is that TypeScript catches these mistakes at compile time, before our users ever see them. ]{#kobo.360.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Our TypeScript configuration ]{#kobo.361.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_66 .heading-2}

[ We\'re using ]{#kobo.362.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_573622c7 .index-entry index-entry="TypeScript:configuration"} [ TypeScript to catch errors before they reach production, and our setup is configured to be strict but practical. ]{#kobo.363.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s look at how we\'ve configured it in our ]{#kobo.364.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` tsconfig.json `{.inlineCode}]{#kobo.365.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file: ]{#kobo.366.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
{
  "include": [
    "**/*",
    "**/.server/**/*",
    "**/.client/**/*",
    ".react-router/types/**/*"
  ],
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "types": ["node", "vite/client"],
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "rootDirs": [".", "./.react-router/types"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "esModuleInterop": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true
  }
}
```

[ Here are ]{#kobo.478.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_390d7810 .index-entry index-entry="TypeScript:configuration"} [ the most important parts of the preceding configuration: ]{#kobo.479.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` "strict" `{.inlineCode}]{#kobo.480.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : true: This enables all strict type-checking options. ]{#kobo.481.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It might seem aggressive, but it catches a lot of potential bugs early. ]{#kobo.482.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` "jsx": "react‑jsx" `{.inlineCode}]{#kobo.483.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : This tells TypeScript how to handle our React components. ]{#kobo.484.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We don\'t need to import React in every file anymore. ]{#kobo.485.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` "noEmit": true `{.inlineCode}]{#kobo.486.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : We\'re letting Vite handle the actual compilation, so TypeScript just does the type checking. ]{#kobo.487.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` "paths": { "@/*": ["./src/*"] } `{.inlineCode}]{#kobo.488.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : This lets us use ]{#kobo.489.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` @/ `{.inlineCode}]{#kobo.490.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ as an alias for our ]{#kobo.491.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` src `{.inlineCode}]{#kobo.492.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory, so we can write absolute paths to our files, such as ]{#kobo.493.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` @/components/button `{.inlineCode}]{#kobo.494.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ instead of ]{#kobo.495.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ../../../components/button `{.inlineCode}]{#kobo.496.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.497.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Remember ]{#kobo.498.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` tsconfigPaths `{.codeHighlighted}]{#kobo.499.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` () `{.codeHighlighted}]{#kobo.500.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ ? ]{#kobo.501.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ It allows Vite to resolve paths that are defined here. ]{#kobo.501.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We also have a ]{#kobo.502.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` typecheck `{.inlineCode}]{#kobo.503.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ script in our ]{#kobo.504.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` package.json `{.inlineCode}]{#kobo.505.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file that runs both React Router\'s type generation and TypeScript compilation: ]{#kobo.506.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
"typecheck": "react-router typegen && tsc"
```

[ This ensures that our types are always up to date with our routes before we run the type checker. ]{#kobo.508.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ React Router type generation ]{#kobo.509.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_67 .heading-2}

[ The ]{#kobo.510.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` react-router `{.codeHighlighted}]{#kobo.511.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` typegen `{.codeHighlighted}]{#kobo.512.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ command ]{#kobo.513.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_8cdf6bf9 .index-entry index-entry="TypeScript:react-router typegen command"} [ allows React ]{#kobo.514.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d38519a1 .index-entry index-entry="react-router typegen command"} [ Router to generate TypeScript types for our routes based on the file structure and exports in our route files. ]{#kobo.515.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This gives us the following: ]{#kobo.516.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Type-safe route parameters ]{#kobo.517.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : We get autocomplete and type checking for route parameters ]{#kobo.518.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Type-safe loaders and actions ]{#kobo.519.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Our data-loading functions are fully typed ]{#kobo.520.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Type-safe navigation ]{#kobo.521.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : When navigating between routes, we get type safety for params and search parameters ]{#kobo.522.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ These generated types are placed in the ]{#kobo.523.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` .react‑router/types `{.inlineCode}]{#kobo.524.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory (which is included in our ]{#kobo.525.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` tsconfig.json `{.inlineCode}]{#kobo.526.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ ), and they\'re regenerated whenever we run the ]{#kobo.527.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` typecheck `{.inlineCode}]{#kobo.528.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ command. ]{#kobo.529.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This means our route types are always in sync with our actual route files. ]{#kobo.530.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Running TypeScript checks ]{#kobo.531.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_68 .heading-2}

[ We can ]{#kobo.532.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_eb174daa .index-entry index-entry="TypeScript:checks, running"} [ run type checking using our configured scripts: ]{#kobo.533.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
# Run type checking once (includes React Router type generation)
npm run typecheck

# Run type checking in watch mode (reruns on file changes)
npx tsc --watch

# Run type checking for specific files
npx tsc --noEmit src/features/ideas/api/create-idea.ts
```

[ TypeScript catches type errors, but there are other issues that can occur. ]{#kobo.535.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ That\'s where linting comes in. ]{#kobo.536.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Linting setup overview ]{#kobo.537.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_69 .heading-1}

[ TypeScript\'s type system is very powerful for catching errors at compile time, but it doesn\'t enforce coding ]{#kobo.538.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_977276a1 .index-entry index-entry="linting:setup"} [ standards or catch all potential issues. ]{#kobo.539.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For example, TypeScript won\'t complain if we declare variables we never use, write overly complex functions, or use inconsistent formatting. ]{#kobo.540.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To maintain a clean, consistent, and high-quality code base across our entire team, we need a linter. ]{#kobo.541.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In this section, we will cover the following topics: ]{#kobo.542.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ What is linting, and why do we need it? ]{#kobo.543.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ ESLint overview ]{#kobo.544.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Our ESLint configuration ]{#kobo.545.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Running ESLint checks ]{#kobo.546.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ What is linting, and why do we need it? ]{#kobo.547.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_70 .heading-2}

[ Linting is the ]{#kobo.548.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a9cb6323 .index-entry index-entry="linting"} [ process of analyzing our source code to find potential errors, bugs, stylistic errors, and suspicious constructs. ]{#kobo.549.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Think of it as an automated code review that runs every time we write code. ]{#kobo.550.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When we\'re working in a team, everyone will have different coding styles and preferences. ]{#kobo.551.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Some might prefer single quotes and others double quotes. ]{#kobo.552.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Some might forget to handle edge cases or write code that\'s hard to read. ]{#kobo.553.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ A linter ]{#kobo.554.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ec33358b .index-entry index-entry="linting:need for"} [ helps us by doing the following: ]{#kobo.555.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Catching bugs early ]{#kobo.556.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Finding potential issues before they become problems ]{#kobo.557.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Enforcing ]{#kobo.558.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ a ]{#kobo.559.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ consistent style ]{#kobo.560.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Making sure all our code looks the same ]{#kobo.561.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Teaching best practices ]{#kobo.562.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Showing us better ways to write code ]{#kobo.563.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Preventing common mistakes ]{#kobo.564.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Catching things we might miss ]{#kobo.565.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ ESLint overview ]{#kobo.566.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_71 .heading-2}

[ ESLint is the ]{#kobo.567.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_6575b9de .index-entry index-entry="linting:ESLint"} [ most popular JavaScript/TypeScript linter. ]{#kobo.568.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It works by parsing ]{#kobo.569.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_dc996117 .index-entry index-entry="ESLint:overview"} [ our code and then running rules against it to find issues. ]{#kobo.570.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For example, we might write the following: ]{#kobo.571.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
const unusedVariable = "hello";
console.log("This is fine");
```

[ ESLint can detect that ]{#kobo.582.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` unusedVariable `{.inlineCode}]{#kobo.583.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ is declared but never used and warn us about it. ]{#kobo.584.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Our ESLint configuration ]{#kobo.585.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_72 .heading-2}

[ Our ESLint ]{#kobo.586.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_30a9e55b .index-entry index-entry="ESLint:configuration"} [ configuration is quite comprehensive and helps us maintain ]{#kobo.587.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5da6ade2 .index-entry index-entry="linting:ESLint configuration"} [ code quality across the entire team. ]{#kobo.588.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s break down what we\'ve set up in ]{#kobo.589.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` eslint.config.js `{.codeHighlighted}]{#kobo.590.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : ]{#kobo.591.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

... the rest of the configuration
```

[ We\'re using the flat config format (the new ESLint configuration style) and have several key plugins worth mentioning: ]{#kobo.675.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` @typescript‑eslint `{.inlineCode}]{#kobo.676.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : TypeScript-specific linting rules ]{#kobo.677.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` eslint‑plugin‑react `{.inlineCode}]{#kobo.678.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : React-specific rules ]{#kobo.679.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` eslint‑plugin‑react‑hooks `{.inlineCode}]{#kobo.680.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Rules for React hooks ]{#kobo.681.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` eslint‑plugin‑prettier `{.inlineCode}]{#kobo.682.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Integrates Prettier with ESLint, which we will cover in a moment ]{#kobo.683.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` eslint‑plugin‑import `{.inlineCode}]{#kobo.684.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Import/export linting ]{#kobo.685.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` eslint‑plugin‑check‑file `{.inlineCode}]{#kobo.686.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Filenaming conventions ]{#kobo.687.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here ]{#kobo.688.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1a4806b9 .index-entry index-entry="ESLint:configuration"} [ are some ]{#kobo.689.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_945b9e94 .index-entry index-entry="linting:ESLint configuration"} [ of the important rules we\'ve configured: ]{#kobo.690.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
rules: {
  'prettier/prettier': 'error',
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
  '@typescript-eslint/no-unused-vars': 'warn',
  '@typescript-eslint/no-explicit-any': 'warn',
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    },
  ],
  'import/no-cycle': ['error', { maxDepth: Infinity }],
  'check-file/filename-naming-convention': [
    'error',
    {
      '**/*.{js,jsx,ts,tsx}': 'KEBAB_CASE',
    },
  ],
}
```

[ Here is ]{#kobo.762.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_89ad603b .index-entry index-entry="ESLint:rules"} [ what each rule does: ]{#kobo.763.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.codeHighlighted}[` prettier/prettier `{.codeHighlighted}]{#kobo.764.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : Treats any Prettier formatting issues as ESLint errors, so formatting problems show up alongside linting issues in a single pass. ]{#kobo.765.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` react/react-in- `{.codeHighlighted}]{#kobo.766.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` jsx `{.codeHighlighted}]{#kobo.767.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` -scope `{.codeHighlighted}]{#kobo.768.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : In older React versions, we had to import React at the top of every JSX file. ]{#kobo.769.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Modern React no longer requires this, so we turn this rule off. ]{#kobo.770.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` react/prop-types `{.codeHighlighted}]{#kobo.771.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : In JavaScript projects, ]{#kobo.772.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` prop‑types `{.inlineCode}]{#kobo.773.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ was used to validate component props at runtime. ]{#kobo.774.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Since we use TypeScript, our props are already statically typed, so this rule is unnecessary. ]{#kobo.775.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` @typescript `{.codeHighlighted}]{#kobo.776.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` -eslint/no-unused-vars `{.codeHighlighted}]{#kobo.777.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : Warns us when we declare variables that are never used, keeping the code clean and avoiding confusion. ]{#kobo.778.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` @typescript `{.codeHighlighted}]{#kobo.779.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` -eslint/no-explicit-any `{.codeHighlighted}]{#kobo.780.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : Warns us when we use the ]{#kobo.781.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` any `{.codeHighlighted}]{#kobo.782.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ type. ]{#kobo.783.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Using ]{#kobo.784.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` any `{.codeHighlighted}]{#kobo.785.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ defeats the purpose of TypeScript\'s type safety, so this forces us to use proper types instead. ]{#kobo.786.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` import/order `{.codeHighlighted}]{#kobo.787.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : Enforces a ]{#kobo.788.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ad09e0d8 .index-entry index-entry="ESLint:rules"} [ consistent order for imports: built-in modules first, then external packages, then internal imports, with each group separated by a blank line and sorted alphabetically. ]{#kobo.789.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This makes imports easier to scan at a glance. ]{#kobo.790.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` import/no-cycle `{.codeHighlighted}]{#kobo.791.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : Prevents circular dependencies between files. ]{#kobo.792.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Circular imports can cause hard-to-debug issues and are usually a sign of an architectural problem. ]{#kobo.793.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` check-file/filename-naming-convention `{.codeHighlighted}]{#kobo.794.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : Enforces kebab-case naming for all JavaScript/TypeScript files (e.g., ]{#kobo.795.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` my- `{.codeHighlighted}]{#kobo.796.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` component.tsx `{.codeHighlighted}]{#kobo.797.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ instead of ]{#kobo.798.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` MyComponent.tsx `{.codeHighlighted}]{#kobo.799.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ ). ]{#kobo.800.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This keeps filenaming consistent across the entire project without having to think about it each time we create a new file. ]{#kobo.801.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We also ]{#kobo.802.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_10d92372 .index-entry index-entry="ESLint:configuration"} [ have some custom import rules that help enforce our project ]{#kobo.803.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_daadc44a .index-entry index-entry="linting:ESLint configuration"} [ structure; we\'ll cover those in detail when we talk about our project organization. ]{#kobo.804.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Which rules we are using is something that should be decided by the whole team or organization. ]{#kobo.805.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Once decided, we should add them to the ESLint configuration file and stick to them. ]{#kobo.806.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Running ESLint ]{#kobo.807.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_73 .heading-2}

[ We can ]{#kobo.808.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e501713e .index-entry index-entry="linting:ESLint, running"} [ run linting ]{#kobo.809.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_39ddac20 .index-entry index-entry="ESLint:running"} [ using our configured scripts: ]{#kobo.810.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
# Run linting on all files
npm run lint

# Run linting and automatically fix what can be fixed
npm run lint:fix

# Run linting on specific files or directories
npx eslint src/features/ideas/
npx eslint src/components/button.tsx
```

[ ESLint will show us errors and warnings, and with the ]{#kobo.812.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ‑‑fix `{.inlineCode}]{#kobo.813.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ flag, it can automatically fix many issues, such as formatting, unused imports, and simple code style problems. ]{#kobo.814.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Formatting setup overview ]{#kobo.815.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_74 .heading-1}

[ Now that ]{#kobo.816.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_78c7d7ef .index-entry index-entry="code formatting:overview"} [ we\'ve covered linting, let\'s look at code formatting. ]{#kobo.817.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In this section, we will cover the following topics: ]{#kobo.818.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ What is code formatting, and why do we need it? ]{#kobo.819.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ How Prettier works ]{#kobo.820.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Configuring Prettier ]{#kobo.821.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Running Prettier checks ]{#kobo.822.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ What is code formatting, and why do we need it? ]{#kobo.823.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_75 .heading-2}

[ Code formatting is ]{#kobo.824.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0f86615a .index-entry index-entry="code formatting"} [ about making our code look consistent and readable. ]{#kobo.825.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we\'re working in a team, we all have different preferences for how code should look---some like semicolons while others don\'t; some prefer single quotes while others prefer double quotes. ]{#kobo.826.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The problem ]{#kobo.827.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e251aac6 .index-entry index-entry="code formatting:need for"} [ is that these differences can make code reviews harder and create unnecessary diffs and conflicts. ]{#kobo.828.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we\'re focused on the logic of our code, we don\'t want to be distracted by formatting inconsistencies. ]{#kobo.829.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ How Prettier works ]{#kobo.830.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_76 .heading-2}

**[ Prettier ]{#kobo.831.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is a ]{#kobo.832.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_969553bf .index-entry index-entry="Prettier"} [ code formatter that automatically formats our code according to a set of ]{#kobo.833.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b4bdfcac .index-entry index-entry="code formatting:Prettier"} [ rules. ]{#kobo.834.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s great because we don\'t have to debate whether to use semicolons or not; Prettier handles it for us. ]{#kobo.835.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Prettier ]{#kobo.836.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_de9821e4 .index-entry index-entry="Prettier:working"} [ works by doing the following: ]{#kobo.837.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

1.  **[ Parsing ]{#kobo.838.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ our code ]{#kobo.839.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Understanding the structure of our JavaScript, TypeScript, CSS, and so on ]{#kobo.840.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
2.  **[ Applying formatting rules ]{#kobo.841.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Making it look consistent ]{#kobo.842.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
3.  **[ Outputting formatted code ]{#kobo.843.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Giving us back clean, readable code ]{#kobo.844.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The beauty of Prettier is that it\'s consistent across the entire team. ]{#kobo.845.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Everyone\'s code looks the same, regardless of their personal preferences. ]{#kobo.846.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Configuring Prettier ]{#kobo.847.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_77 .heading-2}

[ Prettier ]{#kobo.848.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b10144b2 .index-entry index-entry="Prettier:configuring"} [ has some opinionated defaults, but we can configure it to our needs. ]{#kobo.849.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can find the configuration file in ]{#kobo.850.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` .prettierrc `{.inlineCode}]{#kobo.851.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , which is already set up for us: ]{#kobo.852.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

[ The key settings here are the following: ]{#kobo.888.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` "trailingComma": "all" `{.inlineCode}]{#kobo.889.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : This adds trailing commas everywhere possible, which makes Git diffs cleaner when we add new items to arrays or objects ]{#kobo.890.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` "singleQuote": true `{.inlineCode}]{#kobo.891.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : We use single quotes for strings, which is a common preference in the React community ]{#kobo.892.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` "printWidth": 80 `{.inlineCode}]{#kobo.893.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : We keep lines under 80 characters, which makes code more readable on smaller screens ]{#kobo.894.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Prettier is integrated ]{#kobo.895.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_aa9c8f24 .index-entry index-entry="Prettier:configuring"} [ with ESLint through the ]{#kobo.896.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` eslint‑plugin‑prettier `{.inlineCode}]{#kobo.897.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ plugin, so formatting issues show up as linting errors. ]{#kobo.898.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This ensures that our code is both properly formatted and follows our linting rules. ]{#kobo.899.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Prettier will automatically format our code according to our configuration, and since it\'s integrated with ESLint, formatting issues will also show up when we run ]{#kobo.900.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` npm run lint `{.inlineCode}]{#kobo.901.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.902.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With our type checking, linting, and formatting tools configured, we need to make sure they actually run before code enters our repository. ]{#kobo.903.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will see how in the next section. ]{#kobo.904.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Pre-commit checks setup overview ]{#kobo.905.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_78 .heading-1}

[ Having static code analysis tools such as TypeScript, ESLint, and Prettier is great; we have configured ]{#kobo.906.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_98de2358 .index-entry index-entry="pre-commit checks:overview"} [ them and can run individual scripts whenever we make some changes to ensure everything is in the best order. ]{#kobo.907.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ However, there are some drawbacks. ]{#kobo.908.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Developers can forget to run all checks before committing to the repo, which can still bring problematic and inconsistent code to production. ]{#kobo.909.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Fortunately, there is a solution that can fix this problem: whenever we try to commit to the repository, we want to run all checks in an automated way. ]{#kobo.910.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is where pre-commit hooks come in. ]{#kobo.911.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ What are pre-commit hooks, and why do we need them? ]{#kobo.912.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_79 .heading-2}

[ Pre-commit hooks ]{#kobo.913.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9e250a7a .index-entry index-entry="pre-commit checks"} [ are scripts that run automatically before we can commit our code to the repository. ]{#kobo.914.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They act as a safety net, ensuring that only high-quality code makes it into our code base. ]{#kobo.915.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Without ]{#kobo.916.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5f43eef8 .index-entry index-entry="pre-commit checks:need for"} [ pre-commit hooks, we might accidentally commit the following: ]{#kobo.917.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Code that doesn\'t compile ]{#kobo.918.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Code that has linting errors ]{#kobo.919.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Code that\'s not properly formatted ]{#kobo.920.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Code that breaks our tests ]{#kobo.921.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Pre-commit hooks catch these issues before they end up in a pull request or, even worse, in production. ]{#kobo.922.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ How pre-commit hooks work ]{#kobo.923.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_80 .heading-2}

[ Git hooks are ]{#kobo.924.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a2a67ab1 .index-entry index-entry="pre-commit checks:working"} [ scripts that Git runs at certain points in the Git workflow. ]{#kobo.925.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The pre-commit hook runs just before a commit is created, and if it exits with a non-zero status, the commit is blocked. ]{#kobo.926.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Check the following diagram to understand how pre-commit hooks work: ]{#kobo.927.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.928.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_2_1.png" data-original-image-title="" style="width:528.0px; height:221.66666666666666px;">Figure 2.1 – How pre-commit hooks work</span> </span>
</figure>

[ Figure 2.1 -- How pre-commit hooks work ]{#kobo.929.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This means we can\'t commit bad code; we have to fix the issues first. ]{#kobo.930.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It might seem annoying at first, but it prevents us from accidentally breaking the build or introducing bugs or inconsistencies. ]{#kobo.931.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Our pre-commit workflow ]{#kobo.932.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_81 .heading-2}

[ As we can see, whenever we attempt to commit to the repository, the Git pre-commit hook will run and ]{#kobo.933.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e0d06588 .index-entry index-entry="pre-commit checks:workflow"} [ execute the scripts that will do the checking. ]{#kobo.934.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If all the checks pass, the changes will be committed to the repository; otherwise, we will have to fix the issues and try again. ]{#kobo.935.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To enable this flow, we will use ]{#kobo.936.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` husky `{.inlineCode}]{#kobo.937.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.938.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` lint‑staged `{.inlineCode}]{#kobo.939.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : ]{#kobo.940.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` husky `{.inlineCode}]{#kobo.941.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ is a tool that allows us to run Git hooks. ]{#kobo.942.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We want to run the pre-commit hook to run the checks before committing our changes. ]{#kobo.943.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` lint‑staged `{.inlineCode}]{#kobo.944.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ is a tool that allows us to run those checks only on files that are in the staging area of Git. ]{#kobo.945.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This improves the speed of code checking since doing that on the entire code base might be too slow. ]{#kobo.946.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Before starting, we need to make sure the Git repository is initialized if it isn\'t already. ]{#kobo.947.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Then we can install ]{#kobo.948.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` husky `{.inlineCode}]{#kobo.949.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.950.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` lint‑staged `{.inlineCode}]{#kobo.951.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ with the following commands: ]{#kobo.952.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm install --save-dev husky lint-staged
```

[ Then, we would need to initialize ]{#kobo.954.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` husky `{.inlineCode}]{#kobo.955.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ to enable Git hooks: ]{#kobo.956.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npx husky init
```

[ A new folder named ]{#kobo.958.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` .husky `{.inlineCode}]{#kobo.959.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ will be created with a file named ]{#kobo.960.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` pre‑commit `{.inlineCode}]{#kobo.961.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ that will contain the following content: ]{#kobo.962.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm test
```

[ Let\'s modify ]{#kobo.964.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_bc65c23c .index-entry index-entry="pre-commit checks:workflow"} [ the file to run the ]{#kobo.965.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` lint‑staged `{.inlineCode}]{#kobo.966.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ script: ]{#kobo.967.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run lint-staged
```

[ The ]{#kobo.969.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` husky `{.inlineCode}]{#kobo.970.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ pre-commit hook will run ]{#kobo.971.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` lint‑staged `{.inlineCode}]{#kobo.972.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , so we should define what commands ]{#kobo.973.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` lint‑staged `{.inlineCode}]{#kobo.974.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ should run inside the ]{#kobo.975.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` lint-staged.config.js `{.codeHighlighted}]{#kobo.976.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file: ]{#kobo.977.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// infra/lint-staged.config.js
export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '*.{json,md,css,scss,html}': ['prettier --write'],
  '*.{ts,tsx}': ['bash -c "npm run typecheck"'],
};
```

[ This means the following: ]{#kobo.1004.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ JavaScript/TypeScript files get linted and fixed ]{#kobo.1005.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Other files just get formatted with Prettier ]{#kobo.1006.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ TypeScript files also get type-checked ]{#kobo.1007.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The beauty of this setup is that it\'s fast (only checks changed files) and comprehensive (catches formatting, linting, and type issues). ]{#kobo.1008.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Running pre-commit checks ]{#kobo.1009.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_82 .heading-2}

[ We can ]{#kobo.1010.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b033eff5 .index-entry index-entry="pre-commit checks:running"} [ run our pre-commit checks manually: ]{#kobo.1011.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
# Run all pre-commit checks (linting, formatting, type checking)
npm run pre-commit

# Run only lint-staged (checks only changed files)
npm run lint-staged

# Run individual checks
npm run lint
npm run format
npm run typecheck
```

[ These checks also run automatically when we try to commit code, but we can run them manually to catch issues before committing. ]{#kobo.1013.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ It\'s worth noting that since we are now in the ]{#kobo.1014.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` chapters/chapter‑02 `{.inlineCode}]{#kobo.1015.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory, the pre-commit hook ]{#kobo.1016.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ad615f5b .index-entry index-entry="pre-commit checks:running"} [ will not work if we try to run it from the current setup. ]{#kobo.1017.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.1018.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` .husky `{.codeHighlighted}]{#kobo.1019.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ folder would need to be in the root of the repository to work. ]{#kobo.1020.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With our development tooling in place, let\'s look at how we organize our code files and folders in our project so we can keep our code base scalable and maintainable. ]{#kobo.1021.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Project structure overview ]{#kobo.1022.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_83 .heading-1}

[ How we organize our files and folders has a huge impact on how easy it is to navigate and maintain ]{#kobo.1023.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9690a7d4 .index-entry index-entry="project structure:overview"} [ our code base. ]{#kobo.1024.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s explore different approaches and understand why we chose a feature-based structure for our application. ]{#kobo.1025.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ What is project structure, and why does it matter? ]{#kobo.1026.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_84 .heading-2}

[ When we\'re ]{#kobo.1027.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_319d4184 .index-entry index-entry="project structure:feature-based structure"} [ building a React application, we have to decide how to organize the following: ]{#kobo.1028.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Components (reusable UI pieces) ]{#kobo.1029.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Pages (full screens) ]{#kobo.1030.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ API calls (data fetching) ]{#kobo.1031.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ State management (application data) ]{#kobo.1032.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Utilities (helper functions) ]{#kobo.1033.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Tests (quality assurance) ]{#kobo.1034.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The wrong structure can make our code base hard to navigate, leading to the following: ]{#kobo.1035.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Difficulty finding related code ]{#kobo.1036.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Unclear dependencies between different parts ]{#kobo.1037.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Harder code reviews ]{#kobo.1038.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Slower development as the project grows ]{#kobo.1039.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Different approaches to project structure ]{#kobo.1040.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_85 .heading-2}

[ There are ]{#kobo.1041.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_80d33221 .index-entry index-entry="project structure:approaches"} [ several common approaches to organizing React applications, each with its own trade-offs. ]{#kobo.1042.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will go through each one next. ]{#kobo.1043.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ File type structure ]{#kobo.1044.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_86 .heading-3}

[ Here\'s ]{#kobo.1045.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4fa971cd .index-entry index-entry="project structure:file type structure"} [ how a file-type-based structure ]{#kobo.1046.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1b422742 .index-entry index-entry="file type structure"} [ typically looks in a project: ]{#kobo.1047.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
src/
├── components/
├── pages/
├── hooks/
├── utils/
└── types/
```

[ The following ]{#kobo.1049.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9f2281ba .index-entry index-entry="file type structure:advantages"} [ are the advantages of this approach: ]{#kobo.1050.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Simple to get started with ]{#kobo.1051.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Easy to find all components in one place ]{#kobo.1052.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Clear separation by file type (components, pages, hooks, utils, and types) ]{#kobo.1053.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The following ]{#kobo.1054.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_492aa4d8 .index-entry index-entry="file type structure:disadvantages"} [ are the disadvantages of this approach: ]{#kobo.1055.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Hard to find related code when working on a feature ]{#kobo.1056.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Components become tightly coupled across features ]{#kobo.1057.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Difficult to scale as the application grows as the code base becomes too large to navigate ]{#kobo.1058.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Code reviews become harder (need to look in multiple folders) ]{#kobo.1059.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Difficult to remove a feature when not used anymore because it is all over the place ]{#kobo.1060.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Feature-based structure ]{#kobo.1061.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_87 .heading-3}

[ Here\'s ]{#kobo.1062.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_bdd950e2 .index-entry index-entry="project structure:feature-based structure"} [ how ]{#kobo.1063.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_81873437 .index-entry index-entry="feature-based structure"} [ a feature-type-based structure typically looks in a project: ]{#kobo.1064.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
src/
├── app/             
├── components/       
├── features/
│   ├── auth/
│   ├── ideas/
│   ├── profile/
│   └── reviews/
└── lib/
```

[ The following ]{#kobo.1066.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_036e524f .index-entry index-entry="feature-based structure:advantages"} [ are the advantages of this approach: ]{#kobo.1067.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Easy to find all code related to a feature ]{#kobo.1068.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Features can be developed independently ]{#kobo.1069.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Clear boundaries prevent tight coupling ]{#kobo.1070.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Scales well as the application grows ]{#kobo.1071.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Team members can work on different features without conflicts ]{#kobo.1072.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The following ]{#kobo.1073.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_48308ece .index-entry index-entry="feature-based structure:disadvantages"} [ are the disadvantages of this approach: ]{#kobo.1074.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Slightly more complex to set up initially ]{#kobo.1075.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Need to think about where shared code belongs ]{#kobo.1076.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Requires discipline to maintain boundaries, but this is solved by ESLint rules ]{#kobo.1077.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Why we chose the feature-based structure ]{#kobo.1078.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_88 .heading-2}

[ Here\'s ]{#kobo.1079.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c91023db .index-entry index-entry="feature-based structure:benefits"} [ why this is the right choice for our application: ]{#kobo.1080.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Clear feature boundaries ]{#kobo.1081.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Our app has distinct features, such as authentication, ideas management, user profiles, and reviews. ]{#kobo.1082.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each feature has its own components, API calls, and logic. ]{#kobo.1083.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Clear code flow ]{#kobo.1084.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : The code flow is clear and easy to understand. ]{#kobo.1085.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Team collaboration ]{#kobo.1086.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Different developers can work on different features (auth, ideas, and reviews) without stepping on each other\'s toes. ]{#kobo.1087.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Scalability ]{#kobo.1088.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : As we add new features, we can add them as new feature folders without affecting existing code. ]{#kobo.1089.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Code reviews ]{#kobo.1090.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : When reviewing a feature, we only need to look at the files in that feature folder, making reviews more focused and efficient. ]{#kobo.1091.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Deployment ]{#kobo.1092.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : In the future, we could potentially split features into separate repos or micro-frontends or deploy them independently. ]{#kobo.1093.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Ease of removal ]{#kobo.1094.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : If a feature is not used anymore, it can be removed easily without affecting the rest of the code base. ]{#kobo.1095.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The slight complexity of setting up boundaries is worth it because it pays dividends as our application grows and our team expands. ]{#kobo.1096.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here\'s how we will structure our ]{#kobo.1097.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` src `{.codeHighlighted}]{#kobo.1098.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ directory: ]{#kobo.1099.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
src/
├── app/              # Core application setup and entry points
├── components/       # Reusable UI components (not feature-specific)
├── config/           # Configuration files
├── features/         # Feature-based modules
│   ├── auth/        # Authentication feature
│   ├── ideas/       # Ideas management feature
│   ├── profile/     # User profile feature
│   └── reviews/     # Reviews feature
├── hooks/           # Custom React hooks (shared across features)
├── lib/             # Utility functions and third-party integrations
├── stores/          # Global state management
├── types/           # TypeScript type definitions
```

[ Each feature folder contains everything related to that feature: ]{#kobo.1101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
features/ideas/
├── api/              # API calls for this feature
├── components/       # Feature-specific components
├── config/           # Feature configuration (query keys, etc.)
├── hooks/            # Feature-specific hooks
└── locales/          # Internationalization for this feature
```

[ This ]{#kobo.1103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_12f37e34 .index-entry index-entry="feature-based structure:benefits"} [ structure has several benefits: ]{#kobo.1104.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Easy to find code ]{#kobo.1105.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : When we need to work on ideas, we know exactly where to look ]{#kobo.1106.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Clear boundaries ]{#kobo.1107.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Each feature is self-contained with its own components, API calls, and logic ]{#kobo.1108.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Scalable ]{#kobo.1109.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Adding new features doesn\'t affect existing ones ]{#kobo.1110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Team-friendly ]{#kobo.1111.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Different developers can work on different features without conflicts ]{#kobo.1112.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Modular ]{#kobo.1113.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Features can be developed, tested, and deployed independently ]{#kobo.1114.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ How the code flows ]{#kobo.1115.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_89 .heading-2}

[ Let\'s take ]{#kobo.1116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c370a258 .index-entry index-entry="feature-based structure:code flows"} [ a look at how the code flows in our application. ]{#kobo.1117.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1118.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_2_2.png" data-original-image-title="" style="width:528.0px; height:335.73333333333335px;">Figure 2.2 – Code flow in our code base</span> </span>
</figure>

[ Figure 2.2 -- Code flow in our code base ]{#kobo.1119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The code flows in a clear, unidirectional manner. ]{#kobo.1120.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will go through each level next. ]{#kobo.1121.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Application (top-level) ]{#kobo.1122.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_90 .heading-3}

[ The ]{#kobo.1123.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` app `{.codeHighlighted}]{#kobo.1124.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ directory ]{#kobo.1125.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_08203b9a .index-entry index-entry="code flows, feature-based structure:application (top-level)"} [ is at the top of our code base hierarchy. ]{#kobo.1126.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ It can import from anywhere: features, components, hooks, lib, stores, and types ]{#kobo.1127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Example: A route in ]{#kobo.1128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` app/routes/dashboard/ideas/ `{.codeHighlighted}]{#kobo.1129.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` ideas.tsx `{.codeHighlighted}]{#kobo.1130.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ can import from ]{#kobo.1131.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` features/ideas/components/ `{.codeHighlighted}]{#kobo.1132.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` idea- `{.codeHighlighted}]{#kobo.1133.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` list.tsx `{.codeHighlighted}]{#kobo.1134.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted}
- [ This is where most of the code is composed together to form the application ]{#kobo.1135.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Features (mid level) ]{#kobo.1136.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_91 .heading-3}

[ Features ]{#kobo.1137.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1d738daa .index-entry index-entry="code flows, feature-based structure:features (mid level)"} [ sit in the middle of the hierarchy. ]{#kobo.1138.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ They can import from shared utilities (components, hooks, lib, stores, and types) ]{#kobo.1139.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ They can import from other features only if explicitly allowed ]{#kobo.1140.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ They cannot import from the ]{#kobo.1141.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` app `{.codeHighlighted}]{#kobo.1142.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ directory ]{#kobo.1143.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Example: The ]{#kobo.1144.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ideas `{.codeHighlighted}]{#kobo.1145.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ feature can import from ]{#kobo.1146.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` features/auth/hooks/use-user `{.codeHighlighted}]{#kobo.1147.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ because ]{#kobo.1148.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` auth `{.inlineCode}]{#kobo.1149.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ is an allowed dependency ]{#kobo.1150.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Example: The ]{#kobo.1151.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ideas `{.codeHighlighted}]{#kobo.1152.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ feature cannot import ]{#kobo.1153.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

  [ from ]{#kobo.1154.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` features/profile `{.codeHighlighted}]{#kobo.1155.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ or ]{#kobo.1156.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` features/reviews `{.codeHighlighted}]{#kobo.1157.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted}

### [ Shared utilities (bottom-level) ]{#kobo.1158.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_92 .heading-3}

[ Shared ]{#kobo.1159.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_126772ac .index-entry index-entry="code flows, feature-based structure:shared utilities (bottom-level)"} [ utilities are at the bottom of the hierarchy. ]{#kobo.1160.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ They can only import from each other ]{#kobo.1161.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ They cannot import from features or app ]{#kobo.1162.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Example: A component in ]{#kobo.1163.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` components `{.codeHighlighted}]{#kobo.1164.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ can use a hook from ]{#kobo.1165.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` hooks `{.codeHighlighted}]{#kobo.1166.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ or a utility from ]{#kobo.1167.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` lib `{.codeHighlighted}]{#kobo.1168.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted}
- [ Example: A hook in ]{#kobo.1169.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` hooks `{.codeHighlighted}]{#kobo.1170.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ cannot import from ]{#kobo.1171.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` features/auth `{.codeHighlighted}]{#kobo.1172.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted}

### [ Why this matters ]{#kobo.1173.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_93 .heading-3}

[ Let\'s look ]{#kobo.1174.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0ede7c63 .index-entry index-entry="code flows, feature-based structure:example"} [ at a real example. ]{#kobo.1175.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Imagine we\'re displaying a list of ideas: ]{#kobo.1176.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// ALLOWED: App imports from feature
// app/routes/dashboard/ideas/ideas.tsx
import { IdeaList } from '@/features/ideas/components/idea-list';

// ALLOWED: Feature imports from auth feature (explicit dependency)
// features/ideas/components/idea-list.tsx
import { useUser } from '@/features/auth/hooks/use-user';

// ALLOWED: Feature imports from shared utilities
// features/ideas/components/idea-list.tsx
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/date';

// FORBIDDEN: Feature cannot import from app
// features/ideas/api/get-ideas.ts
import { loader } from '@/app/routes/dashboard/ideas/ideas'; // ESLint error!

// FORBIDDEN: Feature cannot import from non-allowed feature
// features/ideas/components/idea-list.tsx
import { ProfileCard } from '@/features/profile/components/profile-card'; // ESLint error!

// FORBIDDEN: Shared utility cannot import from feature
// components/idea-card.tsx
import { useUser } from '@/features/auth/hooks/use-user'; // ESLint error!
```

[ This ]{#kobo.1249.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_136b44c6 .index-entry index-entry="code flows, feature-based structure:example"} [ unidirectional flow ensures the following: ]{#kobo.1250.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Shared utilities remain truly reusable and don\'t have hidden dependencies ]{#kobo.1251.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Features stay independent and can be developed/tested in isolation ]{#kobo.1252.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The app layer orchestrates everything without being imported by lower layers ]{#kobo.1253.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Dependencies are explicit and controlled ]{#kobo.1254.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Enforcing project structure with ESLint ]{#kobo.1255.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_94 .heading-2}

[ Having such a standard is great and the code flow is clear, but how do we enforce it? ]{#kobo.1256.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ If we leave it to ]{#kobo.1256.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_14861e95 .index-entry index-entry="feature-based structure:with ESLint"} [ our developers to follow the rules, we will have to rely on them to do the right thing. ]{#kobo.1257.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Humans make mistakes. ]{#kobo.1258.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They should not have to worry ]{#kobo.1259.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_016f80b2 .index-entry index-entry="ESLint:feature-based structure, enforcing with"} [ about these kinds of things while building features and solving actual problems. ]{#kobo.1260.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is where ESLint comes into the picture. ]{#kobo.1261.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We will use ]{#kobo.1262.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` import/no-restricted-paths `{.codeHighlighted}]{#kobo.1263.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ from ]{#kobo.1264.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` eslint `{.codeHighlighted}]{#kobo.1265.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` -plugin-import `{.codeHighlighted}]{#kobo.1266.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to set these constraints. ]{#kobo.1267.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To keep the ]{#kobo.1268.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` eslint.config.js `{.codeHighlighted}]{#kobo.1269.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file clean, we will use the ]{#kobo.1270.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` infra/eslint-import-rules.js `{.codeHighlighted}]{#kobo.1271.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file to generate the rules for import constraints. ]{#kobo.1272.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ If we open the ]{#kobo.1273.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` eslint.config.js `{.codeHighlighted}]{#kobo.1274.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file, we\'ll see the following configuration: ]{#kobo.1275.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// eslint.config.js
import { importRules } from './infra/eslint-import-rules.js';

export default [
  // ... other config
  {
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: importRules, // Our custom rules are applied here
        },
      ],
    },
  },
];
```

[ Each ]{#kobo.1299.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a9ead7b9 .index-entry index-entry="feature-based structure:with ESLint"} [ entry in ]{#kobo.1300.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` zones `{.codeHighlighted}]{#kobo.1301.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ defines a restriction: a ]{#kobo.1302.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` target `{.codeHighlighted}]{#kobo.1303.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ (the files being protected) and ]{#kobo.1304.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_34dd185b .index-entry index-entry="ESLint:feature-based structure, enforcing with"} [ a ]{#kobo.1305.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` from `{.codeHighlighted}]{#kobo.1306.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ (the files they are not allowed to import from). ]{#kobo.1307.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s walk through each constraint defined in ]{#kobo.1308.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` infra/eslint-import-rules.js `{.codeHighlighted}]{#kobo.1309.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.1310.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Constraint 1: Shared utilities must remain independent ]{#kobo.1311.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_95 .heading-3}

[ To enforce ]{#kobo.1312.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b97a5e8d .index-entry index-entry="ESLint, feature-based structure:constraint, defining"} [ this, we define the following rule: ]{#kobo.1313.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// infra/eslint-import-rules.js
zones.push({
  target: [
    './src/components/**',
    './src/config/**',
    './src/hooks/**',
    './src/lib/**',
    './src/stores/**',
    './src/types/**',
    './src/utils/**',
  ],
  from: ['./src/features/**', './src/app/**'],
  message:
    'Shared utilities should not import from features or app directories.',
});
```

[ This rule ensures that shared folders (components, config, hooks, lib, stores, types, and utils) cannot import from features or the app. ]{#kobo.1364.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This keeps our shared code truly reusable. ]{#kobo.1365.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If a utility needs feature-specific logic, it should accept that logic as a parameter or be moved into the feature. ]{#kobo.1366.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Constraint 2: Features cannot import from the app ]{#kobo.1367.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_96 .heading-3}

[ To maintain this boundary, we define another rule: ]{#kobo.1368.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
zones.push({
  target: `./src/features/**/**`,
  from: `./src/app/**/**`,
  message: `Features should not import from app directory.`,
});
```

[ This maintains unidirectional flow where features cannot import from ]{#kobo.1390.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` app `{.codeHighlighted}]{#kobo.1391.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.1392.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This keeps features independent of how they\'re used in routes, allowing them to be reused throughout the application. ]{#kobo.1393.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Constraint 3: Feature dependencies are explicit and controlled ]{#kobo.1394.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_97 .heading-3}

[ This is ]{#kobo.1395.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_26a3416e .index-entry index-entry="ESLint, feature-based structure:constraint, defining"} [ configured with the following rule: ]{#kobo.1396.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// infra/eslint-import-rules.js
const features = [
  { name: 'auth', allowedFeatures: [] },
  { name: 'ideas', allowedFeatures: ['auth'] },
  { name: 'profile', allowedFeatures: ['auth'] },
  { name: 'reviews', allowedFeatures: ['auth'] },
];
```

[ This creates a dependency configuration where we have the following: ]{#kobo.1430.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` auth `{.inlineCode}]{#kobo.1431.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ is the foundation; it cannot import from other features ]{#kobo.1432.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` ideas `{.inlineCode}]{#kobo.1433.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , ]{#kobo.1434.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` profile `{.inlineCode}]{#kobo.1435.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , and ]{#kobo.1436.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` reviews `{.inlineCode}]{#kobo.1437.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ can only import from ]{#kobo.1438.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` auth `{.codeHighlighted}]{#kobo.1439.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted}
- [ No feature can import from features at the same level (e.g., ]{#kobo.1440.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ideas `{.inlineCode}]{#kobo.1441.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ cannot import from ]{#kobo.1442.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` profile `{.inlineCode}]{#kobo.1443.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ ) ]{#kobo.1444.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This prevents circular dependencies and keeps features independent. ]{#kobo.1445.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If we need shared code between features, we move it to the ]{#kobo.1446.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` components `{.inlineCode}]{#kobo.1447.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ or ]{#kobo.1448.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` lib `{.inlineCode}]{#kobo.1449.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory. ]{#kobo.1450.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Why this matters ]{#kobo.1451.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_98 .heading-3}

[ These ESLint ]{#kobo.1452.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9aeaabf4 .index-entry index-entry="ESLint, feature-based structure:common problems, preventing"} [ rules prevent common problems in large code bases: ]{#kobo.1453.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Prevents circular dependencies ]{#kobo.1454.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : A clear hierarchy makes circular imports impossible ]{#kobo.1455.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Reduces tight coupling ]{#kobo.1456.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Features stay independent with well-defined interfaces ]{#kobo.1457.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Stops architectural drift ]{#kobo.1458.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Violations are caught immediately, preventing shortcuts ]{#kobo.1459.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Makes dependencies explicit ]{#kobo.1460.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : There are no hidden dependencies in shared utilities ]{#kobo.1461.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Enables isolated testing ]{#kobo.1462.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Each feature can be tested independently ]{#kobo.1463.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Improves onboarding ]{#kobo.1464.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Architecture is self-documenting through ESLint config ]{#kobo.1465.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ ESLint in action ]{#kobo.1466.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_99 .heading-2}

[ When we violate these rules, ESLint gives us clear error messages: ]{#kobo.1467.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/profile/components/profile-stats.tsx
import { IdeaCard } from '@/features/ideas/components/idea-card';
// ESLint Error: profile feature should not import from ideas features.
```

[ The solution ]{#kobo.1482.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_365967a3 .index-entry index-entry="ESLint:use case"} [ depends on our use case: ]{#kobo.1483.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Move to shared ]{#kobo.1484.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : If multiple features use a component or a hook, or anything that needs to be used across multiple features, move it to one of the shared folders, such as ]{#kobo.1485.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` src `{.codeHighlighted}]{#kobo.1486.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` /components `{.codeHighlighted}]{#kobo.1487.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ or ]{#kobo.1488.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` src `{.codeHighlighted}]{#kobo.1489.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` /lib `{.codeHighlighted}]{#kobo.1490.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.1491.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end}

  [ Example: A generic ]{#kobo.1492.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Card `{.codeHighlighted}]{#kobo.1493.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component used by both ]{#kobo.1494.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ideas `{.inlineCode}]{#kobo.1495.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.1496.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` profile `{.inlineCode}]{#kobo.1497.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode}

- **[ Pass as props ]{#kobo.1498.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : If the component is specific to one feature, keep it there and pass data through ]{#kobo.1499.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` props `{.inlineCode}]{#kobo.1500.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.1501.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end}

  [ Example: A profile displaying the idea count by receiving it as a prop ]{#kobo.1502.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Add dependency ]{#kobo.1503.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Only if there\'s a legitimate architectural reason for one feature to depend on another, update ]{#kobo.1504.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` allowedFeatures `{.codeHighlighted}]{#kobo.1505.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ in ]{#kobo.1506.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` infra/eslint-import-rules.js `{.codeHighlighted}]{#kobo.1507.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.1508.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end}

  [ Example: ]{#kobo.1509.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` profile `{.inlineCode}]{#kobo.1510.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ legitimately needs to use ]{#kobo.1511.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` auth `{.inlineCode}]{#kobo.1512.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ \'s session check ]{#kobo.1513.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ These rules automatically check that we\'re following the architecture. ]{#kobo.1514.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we try to import from the wrong place, ESLint will tell us immediately. ]{#kobo.1515.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This keeps our features independent and our code easy to understand. ]{#kobo.1516.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now that we have our project structure and code quality tools in place, there\'s one final piece of our setup: handling configuration that changes between environments. ]{#kobo.1517.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Environment variables allow us to configure our application without hardcoding values. ]{#kobo.1518.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Environment variables setup overview ]{#kobo.1519.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_100 .heading-1}

[ Our application ]{#kobo.1520.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7b2f910a .index-entry index-entry="environment variables:overview"} [ needs different configurations for development, staging, and production. ]{#kobo.1521.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Environment variables let us manage these configurations without changing our code. ]{#kobo.1522.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s see how to set them up properly with type safety and validation. ]{#kobo.1523.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ What are environment variables, and why do we need them? ]{#kobo.1524.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_101 .heading-2}

[ Without ]{#kobo.1525.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d78277b4 .index-entry index-entry="environment variables"} [ environment variables, we\'d have to hardcode configuration values into our code: ]{#kobo.1526.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// Bad: hardcoded values
const API_URL = "https://api.production.com";
const API_KEY = "1234567890";
```

[ This creates ]{#kobo.1538.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d8b88bf7 .index-entry index-entry="environment variables:need for"} [ several problems: ]{#kobo.1539.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ We can\'t use different APIs for different environments ]{#kobo.1540.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ We\'d accidentally commit sensitive information to our repository ]{#kobo.1541.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ We\'d have to change the code every time we want to switch environments ]{#kobo.1542.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Our environment variable system ]{#kobo.1543.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_102 .heading-2}

[ We\'ve set ]{#kobo.1544.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_fdce19b0 .index-entry index-entry="environment variables:system"} [ up a robust environment variable system that validates our configuration at startup. ]{#kobo.1545.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here\'s how it works: ]{#kobo.1546.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/config/env.ts
const envMapping = {
  API_URL: 'VITE_API_URL',
} as const;

export const envSchema = z.object({
  API_URL: z.url('API_URL must be a valid URL'),
});

const parseEnv = () => {
  const rawEnv: Record<string, string | undefined> = {};
  
  for (const [cleanKey, viteKey] of Object.entries(envMapping)) {
    rawEnv[cleanKey] = import.meta.env[viteKey];
  }
  
  try {
    return envSchema.parse(rawEnv);
  } catch (error) {
    // ... error handling
  }
};

export const env = parseEnv();
```

[ Here\'s why we\'ve set it up this way: ]{#kobo.1612.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Clean variable names ]{#kobo.1613.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : We use ]{#kobo.1614.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` envMapping `{.codeHighlighted}]{#kobo.1615.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to map the environment variable names to the clean variable names, such as ]{#kobo.1616.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` API_URL `{.codeHighlighted}]{#kobo.1617.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , internally instead of ]{#kobo.1618.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` VITE_API_URL `{.codeHighlighted}]{#kobo.1619.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.1620.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We need to do this because Vite prefixes the environment variable names with ]{#kobo.1621.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` VITE_ `{.codeHighlighted}]{#kobo.1622.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.1623.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Type safety ]{#kobo.1624.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Zod validates that our environment variables are the right type. ]{#kobo.1625.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Clear error messages ]{#kobo.1626.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : If a variable is missing or invalid, we get a helpful error message. ]{#kobo.1627.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Note that we\'re not just reading environment variables; we\'re validating them and providing a clean, typed interface for the rest of our application to use. ]{#kobo.1628.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can now import and use environment variables, as follows: ]{#kobo.1629.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
import { env } from '@/config/env';

console.log(env.API_URL);
```

[ This approach ]{#kobo.1639.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7a3ba401 .index-entry index-entry="environment variables:system"} [ prevents runtime errors caused by missing or invalid environment variables, and it makes it clear what configuration our application needs to run, as the whole setup is centralized. ]{#kobo.1640.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Setting up environment variables ]{#kobo.1641.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_103 .heading-2}

[ In our ]{#kobo.1642.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_902fecf1 .index-entry index-entry="environment variables:setting up"} [ project, we provide a ]{#kobo.1643.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` . `{.codeHighlighted}]{#kobo.1644.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` env.example `{.codeHighlighted}]{#kobo.1645.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file that lists all the environment variables that our application needs: ]{#kobo.1646.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
# .env.example
VITE_API_URL=http://localhost:9999
```

[ To set up our local development environment, we copy this file to ]{#kobo.1651.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` .env `{.codeHighlighted}]{#kobo.1652.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : ]{#kobo.1653.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cp .env.example .env
```

[ Then we update the values in ]{#kobo.1655.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` .env `{.codeHighlighted}]{#kobo.1656.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to match our local setup. ]{#kobo.1657.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.1658.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` .env `{.codeHighlighted}]{#kobo.1659.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file is git-ignored, so we can safely add our own values without committing them to the repository. ]{#kobo.1660.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ If we try to run the application without setting the environment variables, we\'ll get the following error: ]{#kobo.1661.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
3:10:35 PM [vite] Internal server error: Environment validation failed:
API_URL (VITE_API_URL): API_URL must be a valid URL

Please check your .env file and ensure all required variables are set.
```

[ This is great because it prevents us from deploying the application with missing environment variables. ]{#kobo.1663.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The error message clearly shows which variable is missing and what the expected format is. ]{#kobo.1664.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With all these tools and structures in place---our meta framework, TypeScript, linting, formatting, pre-commit hooks, project organization, and environment configuration---we have a solid foundation for building maintainable React applications. ]{#kobo.1665.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Summary ]{#kobo.1666.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_104 .heading-1}

[ In this chapter, we established the foundation for building a production-ready React application. ]{#kobo.1667.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We started by choosing ]{#kobo.1668.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ React Router ]{#kobo.1669.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ as our meta framework for its flexibility in supporting both CSR and SSR without locking us into a specific hosting provider. ]{#kobo.1670.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We also covered ]{#kobo.1671.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Vite ]{#kobo.1672.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ as our build tool and how we can configure it to our needs. ]{#kobo.1673.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We then set up our development workflow with ]{#kobo.1674.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ TypeScript ]{#kobo.1675.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ for type safety, ]{#kobo.1676.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ ESLint ]{#kobo.1677.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ for code quality, ]{#kobo.1678.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Prettier ]{#kobo.1679.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ for consistent formatting, and ]{#kobo.1680.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ pre-commit ]{#kobo.1681.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ hooks to automatically catch issues before they reach our repository. ]{#kobo.1682.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The most important architectural decision was adopting a feature-based project structure. ]{#kobo.1683.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of grouping files by type (components, hooks, and utils), we organized them by feature (auth, ideas, profile, and reviews). ]{#kobo.1684.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We enforced feature boundaries with ESLint rules, preventing circular dependencies and keeping our code base modular as it grows. ]{#kobo.1685.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Finally, we implemented environment variable validation using ]{#kobo.1686.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Zod ]{#kobo.1687.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ to ensure our configuration is correct before the application even starts, catching configuration errors early. ]{#kobo.1688.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With these tools and patterns in place, we have everything we need to build maintainable, scalable React applications. ]{#kobo.1689.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Get this book\'s PDF copy, code bundle, and more ]{#kobo.1690.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_105 .heading-1}

[ Scan the QR code (or go to ]{#kobo.1691.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.1692.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ ). ]{#kobo.1693.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search for this book by name, confirm the edition, and then follow the steps on the page. ]{#kobo.1694.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_2_3.png" original-image-title="" style="width:25%;"} ]{#kobo.1695.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_2_4.png" original-image-title="" style="width:25%;"} ]{#kobo.1696.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[ Note: Have your invoice handy. ]{#kobo.1697.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Purchases made directly from the Packt website don ]{#kobo.1698.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ \' ]{#kobo.1699.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ t require an invoice. ]{#kobo.1700.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}*

[ ]{#kobo.1701.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
:::
