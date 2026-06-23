::::: {.section .preface}
# [ Preface ]{#kobo.1.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_1 .mainHeading}

[ Building large-scale applications in production with React can be overwhelming due to the number of choices and lack of cohesive resources. ]{#kobo.2.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This hands-on guide is designed to share practices and examples to help address these challenges in building enterprise-ready applications with React. ]{#kobo.3.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In this book, we will first discuss the architectural principles behind scalable React applications. ]{#kobo.4.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Then, we will lay out the foundation of the project with Vite, TypeScript, ESLint, Prettier, and Husky, and organize it with a feature-based folder structure. ]{#kobo.5.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will then build reusable, documented components with Shadcn UI and Storybook, and learn how to handle routing and rendering strategies, including pre-rendering, SSR, CSR, and hybrid approaches using React Router in framework mode. ]{#kobo.6.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Once the foundations are in place, we will cover how to communicate with APIs in a type-safe way using OpenAPI-generated types, Zod validation, and React Query for server state. ]{#kobo.7.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will explore the right state management tools for each use case, covering local state, global state, form state, and URL state before implementing cookie-based authentication, authorization policies, and content security practices. ]{#kobo.8.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Finally, we will improve the quality of the application by optimizing performance with memoization, code splitting, and streaming, adding internationalization with react-i18next, ensuring accessibility by following WCAG principles, and writing a comprehensive test suite with Vitest and Playwright. ]{#kobo.9.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will finish by setting up a CI/CD pipeline with GitHub Actions and looking at advanced topics such as enforcing the architecture with AI, React Server Components, feature flags, monorepos, and microfrontends. ]{#kobo.10.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By the end of the book, you will be able to efficiently build production-ready applications by following industry practices and expert tips. ]{#kobo.11.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Who this book is for ]{#kobo.12.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_2 .heading-1}

[ This book is for intermediate-level web developers who already have a good understanding of JavaScript, React, and web development in general and want to build large-scale React applications effectively. ]{#kobo.13.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Besides experience with JavaScript and React, some experience with TypeScript will be beneficial. ]{#kobo.14.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ What this book covers ]{#kobo.15.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_3 .heading-1}

*[[ Chapter 1 ]{#kobo.16.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_1.xhtml#h1_13){.chapref} [ , Understanding the Architecture of React Applications ]{#kobo.17.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , explores how to think about applications from an architectural point of view. ]{#kobo.18.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It starts by covering the importance of good architecture and its benefits. ]{#kobo.19.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Then, it covers some bad and good practices in React applications. ]{#kobo.20.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Finally, we will cover the planning of a real React application, an AI Ideas Community Platform, that we will be building throughout the book. ]{#kobo.21.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[[ Chapter 2 ]{#kobo.22.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_2.xhtml#h1_46){.chapref} [ , Setup and Project Structure Overview ]{#kobo.23.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , covers laying out the foundation of the project with all the tools and setup for the application that we will be building. ]{#kobo.24.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It will introduce us to tools such as React Router, Vite, TypeScript, ESLint, Prettier, and Husky. ]{#kobo.25.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Finally, it will cover the feature-based project structure for the project, which improves the codebase organization. ]{#kobo.26.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[[ Chapter 3 ]{#kobo.27.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_3.xhtml#h1_106){.chapref} [ , Building and Documenting Components ]{#kobo.28.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , introduces us to component design principles and Shadcn UI, a copy-paste component library built on top of Radix UI primitives. ]{#kobo.29.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will cover how to set it up and use it to build reusable components that can be used throughout the application to keep the UI consistent. ]{#kobo.30.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Finally, we will learn about documenting those components with Storybook. ]{#kobo.31.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[[ Chapter 4 ]{#kobo.32.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_4.xhtml#h1_144){.chapref} [ , Routing and Rendering Strategies ]{#kobo.33.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , dives into React Router in framework mode and different rendering strategies in more depth. ]{#kobo.34.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ First, we will cover the basics such as routing, nested layouts, and data prefetching with loaders. ]{#kobo.35.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Then, we will explore the different rendering strategies it supports: pre-rendering, SSR, CSR, and hybrid. ]{#kobo.36.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Finally, we will apply those concepts by building the routes and layouts for our application. ]{#kobo.37.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[[ Chapter 5 ]{#kobo.38.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_5.xhtml#h1_166){.chapref} [ , Communicating with the API ]{#kobo.39.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , walks through how to communicate with the backend API in a type-safe way. ]{#kobo.40.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will first learn how to generate TypeScript types from an OpenAPI specification and validate API responses at runtime. ]{#kobo.41.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Then, we will configure React Query and use it to build the API layer for our application, covering queries, mutations, and cache invalidation. ]{#kobo.42.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[[ Chapter 6 ]{#kobo.43.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_6.xhtml#h1_188){.chapref} [ , Managing ]{#kobo.44.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ Application State ]{#kobo.45.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , teaches how to use the right state management tool for each use case. ]{#kobo.46.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will start with local UI state, then move to global state with Zustand. ]{#kobo.47.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ From there, we will look at form state with React Hook Form and Zod, and finish with URL state management for features like filters and search parameters. ]{#kobo.48.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[[ Chapter 7 ]{#kobo.49.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_7.xhtml#h1_198){.chapref} [ , Implementing Authentication and Securing the Application ]{#kobo.50.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , starts by walking through how to implement authentication for our application using cookie-based sessions. ]{#kobo.51.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Then, it demonstrates how to protect routes and enforce authorization policies for resource ownership. ]{#kobo.52.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Finally, it covers security best practices such as content sanitization and security headers. ]{#kobo.53.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[[ Chapter 8 ]{#kobo.54.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_8.xhtml#h1_214){.chapref} [ , Improving Application Performance ]{#kobo.55.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , focuses on performance optimization in a React application. ]{#kobo.56.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It starts by covering how to detect and diagnose performance bottlenecks using the React DevTools Profiler. ]{#kobo.57.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Then, it covers a range of optimization techniques including memoization, code splitting with lazy loading, server-side streaming, debouncing, infinite scroll, and optimistic UI updates. ]{#kobo.58.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[[ Chapter 9 ]{#kobo.59.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_9.xhtml#h1_231){.chapref} [ , Going International ]{#kobo.60.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , guides you through setting up internationalization for a React application. ]{#kobo.61.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will first cover how to configure react-i18next and organize translations by feature namespace. ]{#kobo.62.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Then, we will go through key concepts such as server-side language detection, pluralization, variable interpolation, and locale-aware date formatting. ]{#kobo.63.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Finally, we will build a language switcher component that stores the user\'s preference in a cookie, which persists across page reloads. ]{#kobo.64.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[[ Chapter 10 ]{#kobo.65.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_10.xhtml#h1_263){.chapref} [ , Making the Application Accessible ]{#kobo.66.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , examines the practices for making your application accessible following WCAG standards. ]{#kobo.67.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It starts with the POUR principles as a framework for thinking about accessibility. ]{#kobo.68.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Then, it covers practical techniques such as semantic HTML, skip links, ARIA attributes, live regions for dynamic content announcements, and visible focus styles for keyboard navigation. ]{#kobo.69.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[[ Chapter 11 ]{#kobo.70.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_11.xhtml#h1_278){.chapref} [ , Testing the Application ]{#kobo.71.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , takes a practical approach to testing a React application using the testing trophy strategy. ]{#kobo.72.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will cover unit and component testing with Vitest and React Testing Library, focusing on complex isolated logic and UI behavior. ]{#kobo.73.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Then, we will use Playwright for integration and end-to-end tests, covering route mocking and structuring tests with test steps. ]{#kobo.74.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[[ Chapter 12 ]{#kobo.75.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_12.xhtml#h1_287){.chapref} [ , Going to Production ]{#kobo.76.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , covers the basics of setting up a CI/CD pipeline with GitHub Actions. ]{#kobo.77.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will first configure the CI pipeline with parallel jobs for linting, type checking, format checking, and all test tiers. ]{#kobo.78.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Then, we will set up the CD pipeline to trigger on a successful CI run on the main branch and deploy the application to Render. ]{#kobo.79.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[[ Chapter 13 ]{#kobo.80.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_13.xhtml#h1_307){.chapref} [ , Evolving the Application ]{#kobo.81.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , touches on some advanced topics for taking the application beyond its current state. ]{#kobo.82.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will look at using AI to enforce architectural standards, React Server Components, application observability, feature flags, the backend for frontend pattern, and how to scale the codebase with monorepos and microfrontends. ]{#kobo.83.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ To get the most out of this book ]{#kobo.84.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_4 .heading-1}

[ Previous experience with JavaScript and React and fundamental knowledge of web development will make it a lot easier to follow along with the content of the book. ]{#kobo.85.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It is also desirable to have some experience with TypeScript and React Router, but it should be possible to follow along without it since we will cover the basics in the book. ]{#kobo.86.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Download the example code files ]{#kobo.87.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_5 .heading-2}

[ This book includes a complete downloadable code bundle containing all the example projects and files used throughout the chapters. ]{#kobo.88.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We recommend downloading the bundle so you can follow along smoothly and experiment with the examples. ]{#kobo.89.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Use the bundle as a practical starting point. ]{#kobo.90.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Modify it, extend it, and apply what you learn by creating your own variations as you progress through the chapters. ]{#kobo.91.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Get the code bundle ]{#kobo.92.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_6 .heading-3}

**[ If you bought the book directly from Packt: ]{#kobo.93.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}**

1.  [ Go to ]{#kobo.94.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ packtpub.com ]{#kobo.95.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}**
2.  [ Click your ]{#kobo.96.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ profile picture ]{#kobo.97.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ and select ]{#kobo.98.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Your Orders ]{#kobo.99.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}**
3.  [ Find this book and click ]{#kobo.100.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Download Code ]{#kobo.101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}**

**[ If you bought this book from Amazon or any other channel partner: ]{#kobo.102.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}**

1.  [ Go to ]{#kobo.103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.104.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ or scan the following QR code: ]{#kobo.105.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

    [ [Image]{.image .placeholder original-image-src="images/B31385_Preface_1.png" original-image-title="" style="width:25%;"} ]{#kobo.106.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

2.  [ Search for this book ]{#kobo.107.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

3.  [ Sign up or log in to your free Packt account ]{#kobo.108.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

4.  [ Upload your proof of purchase and download the code bundle locally ]{#kobo.109.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

**[ Usage note: ]{#kobo.110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ You\'re free to use and modify this code for personal learning and non-commercial projects. ]{#kobo.111.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Conventions used ]{#kobo.112.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_7 .heading-2}

[ There are a number of text conventions used throughout this book. ]{#kobo.113.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

` `{.inlineCode}[` CodeInText `{.inlineCode}]{#kobo.114.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Indicates code words in text, database table names, folder names, filenames, file extensions, pathnames, dummy URLs, user input, and Twitter handles. ]{#kobo.115.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For example: \" We could use this same ]{#kobo.116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Counter `{.inlineCode}]{#kobo.117.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component multiple times on a page ]{#kobo.118.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ A block of code is set as follows: ]{#kobo.119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Counter
        initialValue={0}
        label="Click Counter"
        onIncrement={(newValue) => {
          console.log(`Incremented to ${newValue}`);
        }}
        onDecrement={(newValue) => {
          console.log(`Decremented to ${newValue}`);
        }}
      />
    </div>
  );
}
```

[ When we wish to draw your attention to a particular part of a code block, the relevant lines or items are set in bold: ]{#kobo.159.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Counter
        initialValue={0}
        label="Click Counter"
        onIncrement={(newValue) => {
          console.log(`Incremented to ${newValue}`);
        }}
        onDecrement={(newValue) => {
          console.log(`Decremented to ${newValue}`);
        }}
      />
    </div>
  );
}
```

[ Any command-line input or output is written as follows: ]{#kobo.213.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run dev
```

**[ Bold ]{#kobo.215.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Indicates a new term, an important word, or words that you see on the screen. ]{#kobo.216.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For instance, words in menus or dialog boxes appear in the text like this. ]{#kobo.217.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For example: \"This is an ]{#kobo.218.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ MVP ]{#kobo.219.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.220.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Minimum Viable Product ]{#kobo.221.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ). ]{#kobo.222.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

::: note
[ Warnings or important notes appear like this. ]{#kobo.223.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
:::

::: packt_tip
[ Tips and tricks appear like this. ]{#kobo.224.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
:::

# [ Get in touch ]{#kobo.225.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_8 .heading-1}

[ Feedback from our readers is always welcome. ]{#kobo.226.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

**[ General feedback ]{#kobo.227.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : If you have questions about any aspect of this book or have any general feedback, please email us at ]{#kobo.228.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` customercare@packt.com `{.inlineCode}]{#kobo.229.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and mention the book\'s title in the subject of your message. ]{#kobo.230.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

**[ Errata ]{#kobo.231.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Although we have taken every care to ensure the accuracy of our content, mistakes do happen. ]{#kobo.232.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If you have found a mistake in this book, we would be grateful if you reported this to us. ]{#kobo.233.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Please visit ]{#kobo.234.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://www.packt.com/submit-errata ]{#kobo.235.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://www.packt.com/submit-errata){style="text-decoration: none;"} [ , click ]{#kobo.236.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Submit Errata ]{#kobo.237.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ , and fill in the form. ]{#kobo.238.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

**[ Piracy ]{#kobo.239.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : If you come across any illegal copies of our works in any form on the internet, we would be grateful if you would provide us with the location address or website name. ]{#kobo.240.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Please contact us at ]{#kobo.241.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` copyright@packt.com `{.inlineCode}]{#kobo.242.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ with a link to the material. ]{#kobo.243.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

**[ If ]{#kobo.244.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ you ]{#kobo.245.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ are ]{#kobo.246.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ interested in becoming an author ]{#kobo.247.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : If there is a topic that you have expertise in and you are interested in either writing or contributing to a book, please visit . ]{#kobo.248.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Free benefits with your book ]{#kobo.249.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_9 .heading-1}

[ This book includes free benefits designed to support your learning and help you apply what you learn effectively. ]{#kobo.250.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Activate them now for instant access (see the ]{#kobo.251.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ How to unlock ]{#kobo.252.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ section for instructions). ]{#kobo.253.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here\'s a quick overview of what you can instantly unlock with your purchase: ]{#kobo.254.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.255.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_Preface_2.png" data-original-image-title="" style="width:528.0px; height:470.1333333333333px;">A screenshot displaying four digital product options for a book, each in a separate gray box with icons and descriptions. Options include Complete Code Bundle with source code, DRM-Free PDF and ePub versions, 7-Day Packt Library Access to 8,000+ books and videos, and Next-Gen Reader Access featuring progress sync, dark mode, and note-taking.</span> </span>
</figure>

## [ How to unlock ]{#kobo.256.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_10 .heading-2}

[ Scan the QR code (or go to ]{#kobo.257.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.258.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ ). ]{#kobo.259.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search for this book by name, confirm the edition, and then follow the steps on the page. ]{#kobo.260.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_Preface_3.png" original-image-title="" style="width:25%;"} ]{#kobo.261.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_Preface_4.png" original-image-title="" style="width:25%;"} ]{#kobo.262.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[ Note: Have your invoice handy. ]{#kobo.263.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Purchases made directly from the Packt website don ]{#kobo.264.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ \' ]{#kobo.265.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ t require an invoice. ]{#kobo.266.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}*

# [ ]{#kobo.267.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_11 .heading-1}

# [ Share your thoughts ]{#kobo.268.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_12 .heading-1}

[ Once you\'ve read ]{#kobo.269.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ React Application Architecture for Production ]{#kobo.270.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , we\'d love to hear your thoughts! ]{#kobo.271.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ Scan the QR code below to go straight to the Amazon review page for this book and share your feedback. ]{#kobo.271.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ ]{#kobo.272.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_Preface_5.png" original-image-title="" style="width:25%;"} ]{#kobo.273.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ https://packt.link/r/1836202970 ]{#kobo.274.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ ]{#kobo.275.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Your review is important to us and the tech community and will help us make sure we\'re delivering excellent quality content. ]{#kobo.276.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ ]{#kobo.277.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
:::::
