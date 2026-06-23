::: {.section .chapter}
# [ 9 ]{#kobo.1.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_231 .chapterNumber}

# [ Going International ]{#kobo.2.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_232 .chapterTitle}

[ If we want our application to reach users around the world, we need to support multiple languages. ]{#kobo.3.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is where internationalization comes in. ]{#kobo.4.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ You might see it abbreviated as i18n, since there are 18 letters between the \"i\" and \"n\" in \"internationalization\" . ]{#kobo.5.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When users can interact with an application in their own language, they feel more comfortable and are more likely to keep using it. ]{#kobo.6.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But internationalization is about more than just translating text. ]{#kobo.7.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We also need to think about how dates are formatted, how numbers are displayed, how pluralization works (one item vs. ]{#kobo.8.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ two items), and even the direction text flows. ]{#kobo.9.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Some languages, like Arabic and Hebrew, read from right to left. ]{#kobo.10.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ If we set up internationalization correctly from the start, adding new languages later becomes straightforward. ]{#kobo.11.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We add translation files and the application just works. ]{#kobo.12.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll cover the following topics: ]{#kobo.13.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Understanding internationalization architecture ]{#kobo.14.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Setting up i18n in our application ]{#kobo.15.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Using translations in the application ]{#kobo.16.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Switching between languages in the application ]{#kobo.17.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By the end of this chapter, we\'ll have a fully internationalized application that supports multiple languages, with type-safe translations and a smooth user experience when switching between languages. ]{#kobo.18.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Technical requirements ]{#kobo.19.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_233 .heading-1}

[ Before we get started, we need to set up our project. ]{#kobo.20.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To develop our project, we need the following tools installed on our computer: ]{#kobo.21.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Node.js version 24 or above. ]{#kobo.22.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ npm version 11 or above ships with Node. ]{#kobo.23.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can confirm this by executing ]{#kobo.24.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` node ‑v `{.inlineCode}]{#kobo.25.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.26.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` npm ‑v `{.inlineCode}]{#kobo.27.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ in the terminal. ]{#kobo.28.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There are multiple ways to install Node.js and npm. ]{#kobo.29.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here is a helpful article that goes into more detail: ]{#kobo.30.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js ]{#kobo.31.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js){style="text-decoration: none;"} [ . ]{#kobo.32.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ VS Code ]{#kobo.33.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ (optional), a popular editor for JavaScript and TypeScript. ]{#kobo.34.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It is open source, has solid TypeScript support, and offers many extensions. ]{#kobo.35.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It can be downloaded from ]{#kobo.36.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://code.visualstudio.com ]{#kobo.37.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://code.visualstudio.com){style="text-decoration: none;"} [ . ]{#kobo.38.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The code for this book is available at ]{#kobo.39.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition ]{#kobo.40.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition){style="text-decoration: none;"} [ on GitHub. ]{#kobo.41.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Clone it and enter the repository root: ]{#kobo.42.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

[ The repository contains chapter folders with the code for each chapter, along with a shared ]{#kobo.44.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` api `{.inlineCode}]{#kobo.45.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ folder that includes the API server used across all chapters. ]{#kobo.46.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We are working on ]{#kobo.47.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Chapter ]{#kobo.48.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ 9 ]{#kobo.49.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , so navigate to the ]{#kobo.50.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` chapter‑09 `{.inlineCode}]{#kobo.51.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.52.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/chapter-09
```

[ Next, install the dependencies: ]{#kobo.54.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm install
```

[ We also need to provide the environment variables: ]{#kobo.56.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cp .env.example .env
```

[ At this point, the frontend should be ready and running at ]{#kobo.58.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:5173 ]{#kobo.59.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:5173){style="text-decoration: none;"} [ . ]{#kobo.60.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We also need to run the API server. ]{#kobo.61.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Open a new terminal window and navigate to the ]{#kobo.62.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` api `{.inlineCode}]{#kobo.63.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.64.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/api
```

[ Run the setup script for ]{#kobo.66.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[[ Chapter 9 ]{#kobo.67.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_9.xhtml#h1_231){.chapref}* [ to configure everything: ]{#kobo.68.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run setup 09
```

[ Then start the API server: ]{#kobo.70.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run dev
```

[ The API server should now be running on ]{#kobo.72.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:9999 ]{#kobo.73.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:9999){style="text-decoration: none;"} [ . ]{#kobo.74.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For more information about the setup details, check out the ]{#kobo.75.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` README.md `{.codeHighlighted}]{#kobo.76.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file. ]{#kobo.77.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Understanding internationalization architecture ]{#kobo.78.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_234 .heading-1}

[ The ]{#kobo.79.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_57007c3e .index-entry index-entry="internationalization (i18n):architecture"} [ core idea behind internationalization is simple: we separate the text content from the code. ]{#kobo.80.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of writing \"Welcome\" directly in a component, we use a key like ]{#kobo.81.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` welcome `{.codeHighlighted}]{#kobo.82.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , and the i18n system looks up the appropriate text based on the user\'s language. ]{#kobo.83.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Why do we do this? ]{#kobo.84.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ Think about what happens without this separation. ]{#kobo.84.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If we hardcode \"Welcome\" in our component and later need to support Spanish, we\'d have to go through every component, find every string, and add conditional logic to show the Spanish version. ]{#kobo.85.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Or have a separate version of the application for every language. ]{#kobo.86.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ That would be messy, error-prone, and would not make sense at all. ]{#kobo.87.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With i18n, the component always uses translation keys like ]{#kobo.88.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` t('welcome') `{.codeHighlighted}]{#kobo.89.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.90.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The translation system handles the rest. ]{#kobo.91.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we add Spanish, we just create a Spanish translation file with the same keys. ]{#kobo.92.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The components don\'t change at all. ]{#kobo.93.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Where to store translations ]{#kobo.94.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_235 .heading-2}

[ Before building ]{#kobo.95.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b9b35b9d .index-entry index-entry="internationalization (i18n):translations storage location"} [ our i18n system, we need to decide where our translations will live. ]{#kobo.96.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This choice affects how translators work, how we deploy updates, and what tools we can use. ]{#kobo.97.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ There are two main approaches: ]{#kobo.98.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ In-codebase translations store translation files directly in the source code repository, typically as JSON, YAML, or TypeScript files. ]{#kobo.99.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This approach is simple and works well for most projects. ]{#kobo.100.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Translations get version controlled alongside the code, so when you add a feature, you add its translations in the same pull request. ]{#kobo.101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Changes to translations go through the same review process as code changes. ]{#kobo.102.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The main limitation is that updating a translation requires a code deployment; you can\'t fix a typo without pushing a new version. ]{#kobo.103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ External translation services like Lokalise, Crowdin, or Phrase separate translations from code. ]{#kobo.104.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These platforms provide web interfaces where translators work without touching the codebase. ]{#kobo.105.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They\'re valuable for larger teams, especially when working with professional translators who shouldn\'t need codebase access. ]{#kobo.106.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Many offer features like translation memory, automated suggestions, and ]{#kobo.107.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5b94f8d2 .index-entry index-entry="internationalization (i18n):translations storage location"} [ workflow management. ]{#kobo.108.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ However, they add complexity, cost, and integration overhead that may not be justified for smaller projects. ]{#kobo.109.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For our application, we\'re using in-codebase translations stored as TypeScript files. ]{#kobo.110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This gives us type safety (TypeScript can validate our translation keys), simplicity (no external dependencies), and tight integration with our development workflow. ]{#kobo.111.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ As our project grows, we could migrate to an external service if needed, but starting simple makes sense. ]{#kobo.112.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ How our i18n system works ]{#kobo.113.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_236 .heading-2}

[ Now let\'s understand ]{#kobo.114.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c6c5a741 .index-entry index-entry="internationalization (i18n):system flow"} [ the complete flow of how internationalization works in our server-rendered React application. ]{#kobo.115.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This will help you see how all the pieces we\'ll build fit together. ]{#kobo.116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.117.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_9_1.png" data-original-image-title="" style="width:498.4px; height:510.76881889763786px;">A diagram of a language AI-generated content may be incorrect.</span> </span>
</figure>

[ Figure 9.1 -- i18n system flow ]{#kobo.118.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The diagram shows ]{#kobo.119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e8614a32 .index-entry index-entry="internationalization (i18n):system flow"} [ how translations are flowing through our application: ]{#kobo.120.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Language detection and storage ]{#kobo.121.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_237 .heading-3}

[ When a user visits our ]{#kobo.122.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_934bdd53 .index-entry index-entry="internationalization (i18n):language detection"} [ application, we need to know which language to show them. ]{#kobo.123.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The detection is straightforward: we check for a language preference cookie. ]{#kobo.124.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If the cookie exists, we use that language. ]{#kobo.125.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If it doesn\'t exist, we default to English. ]{#kobo.126.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Users ]{#kobo.127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_15ce1ef7 .index-entry index-entry="internationalization (i18n):language storage"} [ explicitly choose their language using the language switcher we\'ll build. ]{#kobo.128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When they make a selection, we store it in a secure HTTP-only cookie. ]{#kobo.129.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This means their choice persists across browser sessions and page reloads. ]{#kobo.130.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Both the server and client read this same cookie, ensuring consistent language detection in both environments. ]{#kobo.131.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Server-side rendering with translations ]{#kobo.132.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_238 .heading-3}

[ When the ]{#kobo.133.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_2c2e03cd .index-entry index-entry="internationalization (i18n):server-side rendering, with translations"} [ server receives a request, it reads the language cookie before rendering the page. ]{#kobo.134.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The server has access to all translation files, so it can immediately render the entire page in the correct language. ]{#kobo.135.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is important for SEO since search engines see translated content. ]{#kobo.136.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s also important for performance since users see content in their language instantly, without waiting for JavaScript to load and run. ]{#kobo.137.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The server sends ]{#kobo.138.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_38b9ca7c .index-entry index-entry="internationalization (i18n):server-side rendering, with translations"} [ fully translated HTML to the browser. ]{#kobo.139.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If a Spanish user requests the home page, they receive HTML with \"Bienvenido\" already in it, not a key like ]{#kobo.140.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` welcome `{.codeHighlighted}]{#kobo.141.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ that needs to be translated client-side. ]{#kobo.142.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Client-side hydration ]{#kobo.143.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_239 .heading-3}

[ When the ]{#kobo.144.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_97f81770 .index-entry index-entry="internationalization (i18n):client-side hydration"} [ JavaScript loads in the browser, React needs to \"hydrate\"---attach event listeners and make the page interactive. ]{#kobo.145.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For this to work without flashing or re-rendering, the client needs the same translations the server used. ]{#kobo.146.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We bundle the most commonly used translations directly in the JavaScript. ]{#kobo.147.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These are translations that appear on every page, such as navigation, common, etc. ]{#kobo.148.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They\'re available immediately when JavaScript initializes. ]{#kobo.149.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The client detects the current ]{#kobo.150.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` lang `{.codeHighlighted}]{#kobo.151.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ uage from the lang attribute, which is set on the server, and loads those bundled translations. ]{#kobo.152.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Now, when React hydrates, it uses the same translation keys and gets the same text the server rendered. ]{#kobo.153.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ No flashing or layout shifts. ]{#kobo.154.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Loading translations dynamically ]{#kobo.155.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_240 .heading-3}

[ Not all translations ]{#kobo.156.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_aa555339 .index-entry index-entry="internationalization (i18n):translations, loading dynamically"} [ are bundled with the JavaScript. ]{#kobo.157.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If we bundled every translation for every feature in every language, the initial download would be huge. ]{#kobo.158.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Most users never visit every page, so they would download translations they never use. ]{#kobo.159.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Instead, we load translations on demand. ]{#kobo.160.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When a user navigates to the ]{#kobo.161.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` auth `{.codeHighlighted}]{#kobo.162.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ entication pages, the client fetches the auth namespace from our API. ]{#kobo.163.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When they visit the ]{#kobo.164.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ideas `{.codeHighlighted}]{#kobo.165.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ section, it fetches the ideas namespace. ]{#kobo.166.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This happens automatically. ]{#kobo.167.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We configure which namespaces each route needs, and react-i18next handles the fetching. ]{#kobo.168.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ These translation files are cached aggressively, so after the first visit to a section, subsequent visits are instant. ]{#kobo.169.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Switching languages ]{#kobo.170.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_241 .heading-3}

[ When a ]{#kobo.171.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_25a7a035 .index-entry index-entry="internationalization (i18n):languages, switching"} [ user switches languages, we update the cookie through an API call and tell the client-side i18n system to change languages. ]{#kobo.172.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If the new language\'s translations aren\'t loaded yet, they\'re fetched from the API. ]{#kobo.173.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Once everything is ready, the entire UI re-renders in the new language. ]{#kobo.174.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The cookie ensures that if the user reloads the page or comes back later, they see the same language. ]{#kobo.175.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This architecture gives us the best of both worlds: fast server-rendered pages with full translations for SEO and initial load, and efficient client-side updates that only load what\'s needed. ]{#kobo.176.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The same components work in both environments because they always use translation keys, never hard-coded strings. ]{#kobo.177.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s build this system piece by piece. ]{#kobo.178.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Setting up i18n in our application ]{#kobo.179.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_242 .heading-1}

[ Now that we ]{#kobo.180.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f939af34 .index-entry index-entry="i18n setup, in application"} [ understand the architecture, let\'s implement it. ]{#kobo.181.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This involves organizing translations with namespaces, configuring react-i18next, serving translations via API, adding type safety, and setting up language and direction attributes. ]{#kobo.182.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Organizing translations with namespaces ]{#kobo.183.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_243 .heading-2}

[ As we add more ]{#kobo.184.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7cb3b1bb .index-entry index-entry="i18n setup, in application:translations, organizing with namespaces"} [ features, our translation files could easily grow to thousands of lines. ]{#kobo.185.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Finding and updating translations would become difficult. ]{#kobo.186.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Namespaces solve this problem by allowing us to split translations into logical groups. ]{#kobo.187.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Instead of one massive file containing every translation, we create smaller files organized by feature or page. ]{#kobo.188.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The home page has its own translations, authentication has its own, and so on. ]{#kobo.189.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This makes translations ]{#kobo.190.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_cf0f2f05 .index-entry index-entry="i18n setup, in application:translations, organizing with namespaces"} [ easier to find and maintain. ]{#kobo.191.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It also helps with performance, since we can load only the translations we actually need for the current page. ]{#kobo.192.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We organize our translations at two levels: app-level translations for things used everywhere and feature-scoped translations that live alongside their features. ]{#kobo.193.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ App-level translations ]{#kobo.194.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_244 .heading-3}

[ For ]{#kobo.195.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_fedd6300 .index-entry index-entry="i18n setup, in application:app-level translations"} [ translations used throughout the application, we create files in the ]{#kobo.196.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` app/ `{.codeHighlighted}]{#kobo.197.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` locales `{.codeHighlighted}]{#kobo.198.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ directory: ]{#kobo.199.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/locales/en/common.ts

export default {
  cancel: 'Cancel',
  delete: 'Delete',
  deleting: 'Deleting...',
  // ...
};
```

[ This ]{#kobo.223.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` common `{.codeHighlighted}]{#kobo.224.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ namespace contains translations that appear on many pages. ]{#kobo.225.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can also create namespace files for specific pages: ]{#kobo.226.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/locales/en/home.ts

export default {
  meta: {
    description: 'A community platform for sharing and discovering AI ideas',
    title: 'AIdeas - Share and Discover AI Ideas',
  },
  subtitle: 'A community platform for sharing and discovering AI ideas',
  title: 'AIdeas - Share and Discover AI Ideas',
  // ...
};
```

[ We nest related translations together to group related translations. ]{#kobo.260.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.261.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` meta `{.codeHighlighted}]{#kobo.262.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ object groups all metadata-related translations. ]{#kobo.263.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we need to find a translation, the nesting makes it obvious where to look. ]{#kobo.264.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Feature-scoped translations ]{#kobo.265.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_245 .heading-3}

[ For ]{#kobo.266.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_da6d961b .index-entry index-entry="i18n setup, in application:feature-scoped translations"} [ larger features, we keep translations close to the feature code itself. ]{#kobo.267.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is the same principle we use for organizing components and hooks, where we keep related things together: ]{#kobo.268.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/auth/locales/en.ts

export default {
  alreadyHaveAccount: 'Already have an account?',
  creatingAccount: 'Creating account...',
  dontHaveAccount: "Don't have an account?",
  // ...
};
```

[ By placing feature translations in ]{#kobo.290.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` features/auth/locales `{.codeHighlighted}]{#kobo.291.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , we make the auth feature self-contained. ]{#kobo.292.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If we ever need to extract this feature into a separate package or reuse it elsewhere, all its translations come along. ]{#kobo.293.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Combining translations ]{#kobo.294.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_246 .heading-3}

[ All these ]{#kobo.295.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a52a9475 .index-entry index-entry="i18n setup, in application:translations, combining"} [ separate translation files need to come together so the i18n system can access them. ]{#kobo.296.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We create an index file that combines everything: ]{#kobo.297.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/locales/en/index.ts

import type { ResourceLanguage } from 'i18next';

import authTranslations from '@/features/auth/locales/en';
import ideasTranslations from '@/features/ideas/locales/en';
import profileTranslations from '@/features/profile/locales/en';
import reviewsTranslations from '@/features/reviews/locales/en';

import about from './about';
import common from './common';
import components from './components';
import dashboard from './dashboard';
import home from './home';
import navigation from './navigation';
import notFound from './not-found';

export default {
  common,
  notFound,
  home,
  about,
  dashboard,
  navigation,
  components,
  auth: authTranslations,
  ideas: ideasTranslations,
  reviews: reviewsTranslations,
  profile: profileTranslations,
} satisfies ResourceLanguage;
```

[ This gives us clear namespaces: ]{#kobo.390.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` common `{.codeHighlighted}]{#kobo.391.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.392.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` home `{.codeHighlighted}]{#kobo.393.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.394.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` auth `{.codeHighlighted}]{#kobo.395.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.396.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ideas `{.codeHighlighted}]{#kobo.397.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , and so on. ]{#kobo.398.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we use translations in components, we reference them as ]{#kobo.399.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` common:cancel `{.codeHighlighted}]{#kobo.400.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ or ]{#kobo.401.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` auth:loginTitle `{.codeHighlighted}]{#kobo.402.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.403.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The namespace prefix makes it clear where each translation comes from. ]{#kobo.404.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Configuring React-i18next ]{#kobo.405.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_247 .heading-2}

[ React-i18next is ]{#kobo.406.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0ee1ece7 .index-entry index-entry="i18n setup, in application:React-i18next, configuring"} [ the React integration for i18next, which ]{#kobo.407.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_80e91b71 .index-entry index-entry="React-i18next"} [ is a very popular i18n library in the JavaScript ecosystem. ]{#kobo.408.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It gives us hooks and ]{#kobo.409.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_19b35b2a .index-entry index-entry="React-i18next:configuring"} [ components that make working with translations in React straightforward. ]{#kobo.410.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To get started, we create a centralized configuration file that defines our supported languages and how the system should behave: ]{#kobo.411.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/config/i18n.ts

export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Language = keyof typeof languages;
const supportedLanguages = Object.keys(languages) as Language[];

export const i18nConfig = {
  defaultNS: 'common' as const,
  fallbackLng: 'en' as const,,
  supportedLanguages,
  backend: {
    loadPath: '/api/locales/{{lng}}/{{ns}}',
  },
  detection: {
    order: ['htmlTag'],
    caches: [],
  },
  cookieName: 'lng' as const,
};
```

[ Let\'s break ]{#kobo.489.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_fbfa7f0b .index-entry index-entry="React-i18next:configuring"} [ down ]{#kobo.490.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_565b0db6 .index-entry index-entry="i18n setup, in application:React-i18next, configuring"} [ what each setting does: ]{#kobo.491.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ languages ]{#kobo.492.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - Maps language codes to display names. ]{#kobo.493.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.494.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` as `{.codeHighlighted}]{#kobo.495.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` const `{.codeHighlighted}]{#kobo.496.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ makes TypeScript treat these as literal types for better type safety. ]{#kobo.497.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ supportedLanguages ]{#kobo.498.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - The list of language codes we support, extracted from the languages object. ]{#kobo.499.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ defaultNS ]{#kobo.500.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - The namespace to use when we don\'t specify one. ]{#kobo.501.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Since ]{#kobo.502.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` common `{.codeHighlighted}]{#kobo.503.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ contains frequently used translations, it is a sensible default. ]{#kobo.504.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ fallbackLng ]{#kobo.505.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - The language to use if the user\'s preferred language isn\'t available. ]{#kobo.506.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Default is English. ]{#kobo.507.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ backend.loadPath ]{#kobo.508.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - URL pattern for loading translations that aren\'t bundled. ]{#kobo.509.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.510.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` {{ `{.codeHighlighted}]{#kobo.511.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` lng `{.codeHighlighted}]{#kobo.512.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` }} `{.codeHighlighted}]{#kobo.513.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.514.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` {{ns}} `{.codeHighlighted}]{#kobo.515.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ placeholders get replaced with the language and namespace. ]{#kobo.516.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will create this API endpoint shortly. ]{#kobo.517.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ detection.order ]{#kobo.518.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - How the client detects the user\'s language. ]{#kobo.519.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We configure it to read from the HTML ]{#kobo.520.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` lang `{.codeHighlighted}]{#kobo.521.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ attribute, which the server sets based on the cookie. ]{#kobo.522.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ cookieName ]{#kobo.523.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - The name of the cookie that stores the user\'s language preference ]{#kobo.524.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s use this configuration in our application. ]{#kobo.525.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Creating the i18next middleware ]{#kobo.526.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_248 .heading-3}

[ Since we\'re ]{#kobo.527.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_986d7004 .index-entry index-entry="React-i18next:middleware, creating"} [ using server-side rendering, we need middleware that sets up i18n before rendering pages: ]{#kobo.528.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/middleware/i18next.ts

import { createCookie } from 'react-router';
import { createI18nextMiddleware } from 'remix-i18next/middleware';

import { resources } from '@/app/locales';
import { i18nConfig } from '@/config/i18n';

export const localeCookie = createCookie(i18nConfig.cookieName, {
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
});

export const [i18nextMiddleware, getLocale, getInstance] =
  createI18nextMiddleware({
    detection: {
      supportedLanguages: i18nConfig.supportedLanguages,
      fallbackLanguage: i18nConfig.fallbackLng,
      cookie: localeCookie,
    },
    i18next: {
      resources,
      defaultNS: i18nConfig.defaultNS,
    },
  });
```

[ This middleware does ]{#kobo.591.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_894520c5 .index-entry index-entry="React-i18next:middleware, creating"} [ three important things. ]{#kobo.592.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It creates a secure cookie to remember the user\'s language preference. ]{#kobo.593.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It detects the user\'s language from the cookie. ]{#kobo.594.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It initializes an i18next instance with all our translations so we can render pages in the correct language on the server. ]{#kobo.595.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Initializing on the server ]{#kobo.596.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_249 .heading-3}

[ The ]{#kobo.597.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_15f1a437 .index-entry index-entry="React-i18next:initializing, on server"} [ server has access to all translation files through the middleware we just configured. ]{#kobo.598.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The middleware reads the language cookie and initializes i18next with the appropriate language before rendering. ]{#kobo.599.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In our server entry point, we wrap the application with the i18next provider so all components can access translations: ]{#kobo.600.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/entry.server.tsx

import { I18nextProvider } from 'react-i18next';
import { ServerRouter } from 'react-router';
import type { EntryContext } from 'react-router';

import { getInstance } from './middleware/i18next';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: RouterContextProvider,
) {
  // ...

  const { pipe, abort } = renderToPipeableStream(
    <I18nextProvider i18n={getInstance(loadContext)}>
      <ServerRouter context={routerContext} url={request.url} nonce={nonce} />
    </I18nextProvider>,
    {
      // ... 
    },
  );

  // ... 
}
```

[ The ]{#kobo.695.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` I18nextProvider `{.codeHighlighted}]{#kobo.696.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ makes the i18next instance available to all components in the tree, similar to how React Context works. ]{#kobo.697.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We also need to set the ]{#kobo.698.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` lang `{.codeHighlighted}]{#kobo.699.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.700.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` dir `{.codeHighlighted}]{#kobo.701.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ attributes on the HTML element during server rendering. ]{#kobo.702.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These attributes are important since browsers, search engines, and screen readers all rely on them. ]{#kobo.703.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.704.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` lang `{.codeHighlighted}]{#kobo.705.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ attribute tells screen readers how to pronounce text, helps search engines serve content to the right users, and informs browsers about translation options. ]{#kobo.706.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The dir attribute controls text direction for right-to-left languages ]{#kobo.707.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5a801c8e .index-entry index-entry="React-i18next:initializing, on server"} [ like Arabic and Hebrew. ]{#kobo.708.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We set both attributes in the root layout component, which is rendered on the server: ]{#kobo.709.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/root.tsx

import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';

import { i18nextMiddleware } from '@/app/middleware/i18next';

export const middleware = [nonceMiddleware, userMiddleware, i18nextMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
  // ...
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { nonce } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  return (
    <html lang={i18n.language} dir={i18n.dir(i18n.language)}>
      {/* ... */}
    </html>
  );
}
```

[ The key parts here are: ]{#kobo.777.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.codeHighlighted}[` middleware `{.codeHighlighted}]{#kobo.778.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ array - Includes ]{#kobo.779.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` i18nextMiddleware `{.codeHighlighted}]{#kobo.780.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ so it runs on every request and sets up i18n before rendering. ]{#kobo.781.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` Layout `{.codeHighlighted}]{#kobo.782.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component - Gets the i18n instance from ]{#kobo.783.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useTranslation `{.codeHighlighted}]{#kobo.784.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` () `{.codeHighlighted}]{#kobo.785.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and uses it to set ]{#kobo.786.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` i18n.language `{.codeHighlighted}]{#kobo.787.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ on the ]{#kobo.788.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` lang `{.codeHighlighted}]{#kobo.789.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ attribute and ]{#kobo.790.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` i18n.dir() `{.codeHighlighted}]{#kobo.791.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ for the ]{#kobo.792.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` dir `{.codeHighlighted}]{#kobo.793.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ attribute. ]{#kobo.794.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The middleware has already initialized i18next with the correct language from the cookie. ]{#kobo.795.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The ]{#kobo.796.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` i18n.dir() `{.codeHighlighted}]{#kobo.797.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ method returns ]{#kobo.798.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ' `{.codeHighlighted}]{#kobo.799.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` ltr `{.codeHighlighted}]{#kobo.800.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` ' `{.codeHighlighted}]{#kobo.801.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ for left-to-right languages like English and ]{#kobo.802.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ' `{.codeHighlighted}]{#kobo.803.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` rtl `{.codeHighlighted}]{#kobo.804.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` ' `{.codeHighlighted}]{#kobo.805.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ for right-to-left languages like Arabic. ]{#kobo.806.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we set ]{#kobo.807.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` dir `{.codeHighlighted}]{#kobo.808.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` =" `{.codeHighlighted}]{#kobo.809.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` rtl `{.codeHighlighted}]{#kobo.810.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` " `{.codeHighlighted}]{#kobo.811.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , the browser handles most layout changes automatically. ]{#kobo.812.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With the server configured, the middleware runs on every request, detects the ]{#kobo.813.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` lang `{.codeHighlighted}]{#kobo.814.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ uage from the cookie, and renders fully translated HTML with the correct lang and ]{#kobo.815.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` dir `{.codeHighlighted}]{#kobo.816.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ attributes. ]{#kobo.817.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Initializing on the client ]{#kobo.818.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_250 .heading-3}

[ Now that the ]{#kobo.819.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0179bedd .index-entry index-entry="React-i18next:initializing, on client"} [ server has rendered the page with the correct ]{#kobo.820.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` lang `{.codeHighlighted}]{#kobo.821.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ uage and set the ]{#kobo.822.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` lang `{.codeHighlighted}]{#kobo.823.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ attribute, the client needs to initialize i18next to match. ]{#kobo.824.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The client reads the language from the lang attribute and uses plugins to load additional translations on demand. ]{#kobo.825.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ As we discussed in the overview, we use partial bundling: bundle only ]{#kobo.826.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` common `{.codeHighlighted}]{#kobo.827.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.828.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` navigation `{.codeHighlighted}]{#kobo.829.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ namespaces (used on every page) and fetch other namespaces on demand. ]{#kobo.830.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here\'s how we ]{#kobo.831.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ef08c47d .index-entry index-entry="React-i18next:initializing, on client"} [ configure this: ]{#kobo.832.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/entry.client.tsx

import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import Fetch from 'i18next-fetch-backend';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { HydratedRouter } from 'react-router/dom';

import { i18nConfig } from '@/config/i18n';

import { resources } from './locales';

async function main() {
  await i18next
    .use(initReactI18next)
    .use(Fetch)
    .use(I18nextBrowserLanguageDetector)
    .init({
      defaultNS: i18nConfig.defaultNS, // common
      partialBundledLanguages: true,
      resources: {
        en: {
          common: resources.en.common,
          navigation: resources.en.navigation,
        },
        es: {
          common: resources.es.common,
          navigation: resources.es.navigation,
        },
      },
      ns: ['common', 'navigation'],
      fallbackLng: i18nConfig.fallbackLng, // en
      detection: i18nConfig.detection, // order: ['htmlTag'], caches: []
      backend: i18nConfig.backend, // loadPath: '/api/locales/{{lng}}/{{ns}}'
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </I18nextProvider>,
    );
  });
}

main().catch((error) => console.error(error));
```

[ Let\'s break down what\'s happening here: ]{#kobo.996.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.codeHighlighted}[` use(initReactI18next) `{.codeHighlighted}]{#kobo.997.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Connects i18next to React so the ]{#kobo.998.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useTranslation `{.codeHighlighted}]{#kobo.999.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` `{.codeHighlighted}]{#kobo.1000.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook works. ]{#kobo.1001.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` use(Fetch) `{.codeHighlighted}]{#kobo.1002.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Enables loading translations from our API when needed. ]{#kobo.1003.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` use(I18nextBrowserLanguageDetector) `{.codeHighlighted}]{#kobo.1004.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Provides the detection mechanism. ]{#kobo.1005.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We configure it to read from the HTML ]{#kobo.1006.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ lang ]{#kobo.1007.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ attribute. ]{#kobo.1008.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` partialBundledLanguages `{.codeHighlighted}]{#kobo.1009.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` : true `{.codeHighlighted}]{#kobo.1010.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Tells i18next that some translations are bundled while others will be loaded later. ]{#kobo.1011.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Without this flag, i18next would think any namespace not in the bundle is missing. ]{#kobo.1012.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` resources `{.codeHighlighted}]{#kobo.1013.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Includes only ]{#kobo.1014.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` common `{.codeHighlighted}]{#kobo.1015.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.1016.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` navigation `{.codeHighlighted}]{#kobo.1017.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ namespaces. ]{#kobo.1018.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These appear on every page, so we bundle them. ]{#kobo.1019.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Other namespaces load when needed. ]{#kobo.1020.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` ns: ['common', 'navigation'] `{.codeHighlighted}]{#kobo.1021.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Preloads these namespaces at startup. ]{#kobo.1022.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` fallbackLng `{.codeHighlighted}]{#kobo.1023.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` `{.codeHighlighted}]{#kobo.1024.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - The language to use when the requested language isn\'t available. ]{#kobo.1025.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Set to \'en\' as our default. ]{#kobo.1026.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` detection `{.codeHighlighted}]{#kobo.1027.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Configures how to detect the user\'s language. ]{#kobo.1028.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We read from the HTML ]{#kobo.1029.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` lang `{.codeHighlighted}]{#kobo.1030.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ attribute (set by the server) and don\'t cache the detection result since we rely on the server-set cookie. ]{#kobo.1031.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` backend `{.codeHighlighted}]{#kobo.1032.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Configures how to fetch namespaces that aren\'t bundled. ]{#kobo.1033.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Points to our API endpoint at ]{#kobo.1034.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` / `{.codeHighlighted}]{#kobo.1035.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` api `{.codeHighlighted}]{#kobo.1036.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` /locales/{{ `{.codeHighlighted}]{#kobo.1037.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` lng `{.codeHighlighted}]{#kobo.1038.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` }}/{{ns}} `{.codeHighlighted}]{#kobo.1039.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.1040.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We initialize i18next before ]{#kobo.1041.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_079563c9 .index-entry index-entry="React-i18next:initializing, on client"} [ hydrating React to make sure translations are ready when components render. ]{#kobo.1042.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ However, before we do that, we need to create an API endpoint that serves translations on demand. ]{#kobo.1043.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Serving translations via API ]{#kobo.1044.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_251 .heading-2}

[ For the dynamic ]{#kobo.1045.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_3b0bb848 .index-entry index-entry="i18n setup, in application:translations, serving via API"} [ loading to work, we need an API endpoint that serves translations on demand: ]{#kobo.1046.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/api/locales.ts

import { cacheHeader } from 'pretty-cache-header';
import { data } from 'react-router';
import { z } from 'zod';

import { resources } from '@/app/locales';
import type { Language } from '@/config/i18n';

import type { Route } from './+types/locales';

export async function loader({ params }: Route.LoaderArgs) {
  const lng = z
    .enum(Object.keys(resources) as Array<Language>)
    .safeParse(params.lng);

  if (lng.error) return data({ error: lng.error }, { status: 400 });

  const namespaces = resources[lng.data];

  const ns = z
    .enum(Object.keys(namespaces) as Array<keyof typeof namespaces>)
    .safeParse(params.ns);

  if (ns.error) return data({ error: ns.error }, { status: 400 });

  const headers = new Headers();

  if (process.env.NODE_ENV === 'production') {
    headers.set(
      'Cache-Control',
      cacheHeader({
        maxAge: '5m',
        sMaxage: '1d',
        staleWhileRevalidate: '7d',
        staleIfError: '7d',
      }),
    );
  }

  return data(namespaces[ns.data], { headers });
}
```

[ ]{#kobo.1190.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This endpoint matches the URL pattern ]{#kobo.1191.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` / `{.codeHighlighted}]{#kobo.1192.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` api `{.codeHighlighted}]{#kobo.1193.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` /locales/{{ `{.codeHighlighted}]{#kobo.1194.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` lng `{.codeHighlighted}]{#kobo.1195.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` }}/{{ns}} `{.codeHighlighted}]{#kobo.1196.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ that we configured earlier. ]{#kobo.1197.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It validates both ]{#kobo.1198.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_844a38a2 .index-entry index-entry="i18n setup, in application:translations, serving via API"} [ parameters using Zod and returns the requested translations as JSON. ]{#kobo.1199.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Since translations don\'t change often, we cache them aggressively. ]{#kobo.1200.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This means users rarely wait for translation requests after the first load. ]{#kobo.1201.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Adding type safety to translation keys ]{#kobo.1202.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_252 .heading-2}

[ Translation keys ]{#kobo.1203.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a66a5db0 .index-entry index-entry="i18n setup, in application:type safety, adding to translation keys"} [ are strings, which means TypeScript ]{#kobo.1204.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_36ab3af1 .index-entry index-entry="translation keys"} [ can\'t catch typos by default. ]{#kobo.1205.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If we write ]{#kobo.1206.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` t(' `{.codeHighlighted}]{#kobo.1207.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` welcom `{.codeHighlighted}]{#kobo.1208.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` ') `{.codeHighlighted}]{#kobo.1209.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ instead of ]{#kobo.1210.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` t('welcome') `{.codeHighlighted}]{#kobo.1211.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , we won\'t know until we see the broken translation in the browser. ]{#kobo.1212.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can fix this by telling TypeScript about our translation structure: ]{#kobo.1213.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/types/i18next.d.ts

import 'i18next';

import type { resources } from '@/app/locales';
import { i18nConfig } from '@/config/i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof i18nConfig.defaultNS;
    resources: typeof resources.en;
  }
}
```

[ This tells TypeScript that our translations follow the structure of ]{#kobo.1247.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` resources.en `{.codeHighlighted}]{#kobo.1248.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.1249.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Now, when we type ]{#kobo.1250.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` t(' `{.codeHighlighted}]{#kobo.1251.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , our editor shows all available keys. ]{#kobo.1252.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Typos get caught at compile time with a red underline, not at runtime when a user reports the bug. ]{#kobo.1253.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We use the English translations as the source of truth. ]{#kobo.1254.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If a key exists in English, TypeScript expects it. ]{#kobo.1255.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If we reference a key that doesn\'t exist, TypeScript warns us. ]{#kobo.1256.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This also makes sure we don\'t have any missing translations in other languages; otherwise, TypeScript will warn us. ]{#kobo.1257.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With our i18n system fully configured, we\'re ready to use translations in our application components. ]{#kobo.1258.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Using translations in the application ]{#kobo.1259.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_253 .heading-1}

[ React-i18next ]{#kobo.1260.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_3b150168 .index-entry index-entry="translations, in application"} [ provides the ]{#kobo.1261.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useTranslation `{.codeHighlighted}]{#kobo.1262.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook to access translations. ]{#kobo.1263.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is how we replace hardcoded strings with translated text. ]{#kobo.1264.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s look at a simple example from our home page: ]{#kobo.1265.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/home.tsx

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { t } = useTranslation(['home']);

  return (
    <div className="container mx-auto px-4 py-16">
      <Seo
        title={t('meta.title')}
        description={t('meta.description')}
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        {/* ... */}
      </div>
      {/* ... */}
    </div>
  );
}
```

[ We pass ]{#kobo.1365.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ['home'] `{.codeHighlighted}]{#kobo.1366.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to ]{#kobo.1367.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useTranslation `{.codeHighlighted}]{#kobo.1368.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to tell it which namespace to load. ]{#kobo.1369.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The hook returns a t function we use to get translations. ]{#kobo.1370.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When we ]{#kobo.1371.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_90898b53 .index-entry index-entry="translations, in application"} [ call ]{#kobo.1372.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` t(' `{.codeHighlighted}]{#kobo.1373.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` home:title `{.codeHighlighted}]{#kobo.1374.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` ') `{.codeHighlighted}]{#kobo.1375.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , we\'re asking for the ]{#kobo.1376.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` title `{.codeHighlighted}]{#kobo.1377.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ key from the ]{#kobo.1378.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` home `{.codeHighlighted}]{#kobo.1379.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ namespace. ]{#kobo.1380.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The colon separates the namespace from the key. ]{#kobo.1381.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For nested translations like ]{#kobo.1382.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` t(' `{.codeHighlighted}]{#kobo.1383.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` home:meta.title `{.codeHighlighted}]{#kobo.1384.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` ') `{.codeHighlighted}]{#kobo.1385.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , we use dot notation to navigate into the ]{#kobo.1386.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` meta `{.codeHighlighted}]{#kobo.1387.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ object and get the ]{#kobo.1388.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` title `{.codeHighlighted}]{#kobo.1389.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ key. ]{#kobo.1390.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Using the default namespace ]{#kobo.1391.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_254 .heading-2}

[ Since we ]{#kobo.1392.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0cc1e74b .index-entry index-entry="translations, in application:default namespace"} [ configured ]{#kobo.1393.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` common `{.codeHighlighted}]{#kobo.1394.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ as our default namespace, we can access its translations without the namespace prefix: ]{#kobo.1395.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
import { useTranslation } from 'react-i18next';

function DeleteButton() {
  const { t } = useTranslation();

  return <button>{t('delete')}</button>;
}
```

[ Here, ]{#kobo.1418.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` t('delete') `{.codeHighlighted}]{#kobo.1419.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ looks up the ]{#kobo.1420.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` delete `{.codeHighlighted}]{#kobo.1421.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ key in the ]{#kobo.1422.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` common `{.codeHighlighted}]{#kobo.1423.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ namespace automatically. ]{#kobo.1424.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This saves typing for translations we use frequently. ]{#kobo.1425.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Interpolation ]{#kobo.1426.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_255 .heading-2}

[ Static translations ]{#kobo.1427.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b64afaba .index-entry index-entry="translations, in application:interpolation"} [ only get us so far. ]{#kobo.1428.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Real applications need to insert dynamic values like usernames and counts. ]{#kobo.1429.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Interpolation lets us insert variables into translation strings. ]{#kobo.1430.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We use double curly braces as placeholders: ]{#kobo.1431.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/locales/en/common.ts

export default {
  welcome: 'Welcome, {{username}}!',
  // ...
};
```

[ To use this, we pass an object with the variable values: ]{#kobo.1447.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
function WelcomeMessage({ username }: { username: string }) {
  const { t } = useTranslation();

  return <h1>{t('welcome', { username })}</h1>;
}
```

[ When rendered with ]{#kobo.1469.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` username="John" `{.inlineCode}]{#kobo.1470.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , this displays ]{#kobo.1471.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` "Welcome, John!" `{.inlineCode}]{#kobo.1472.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.1473.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.1474.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` {{username}} `{.inlineCode}]{#kobo.1475.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ placeholder gets replaced with whatever value we pass. ]{#kobo.1476.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This is powerful because translators can position the variable anywhere in the sentence. ]{#kobo.1477.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In some languages, the greeting might be structured differently, like ]{#kobo.1478.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` "John, welcome!" `{.inlineCode}]{#kobo.1479.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ The translator controls the word order, and the developer just provides the values. ]{#kobo.1480.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Pluralization ]{#kobo.1481.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_256 .heading-2}

[ Different quantities ]{#kobo.1482.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5f6405ee .index-entry index-entry="translations, in application:pluralization"} [ often require different wording. ]{#kobo.1483.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ \"1 idea\" vs \"2 ideas\" in English. ]{#kobo.1484.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React-i18next handles this with the ]{#kobo.1485.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` _one `{.codeHighlighted}]{#kobo.1486.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.1487.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` _other `{.codeHighlighted}]{#kobo.1488.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ suffixes: ]{#kobo.1489.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/locales/en.ts

export default {
  ideasBy_one: '{{count}} Idea by {{username}}',
  ideasBy_other: '{{count}} Ideas by {{username}}',
  // ...
};
```

[ When we call the translation with a ]{#kobo.1507.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` count `{.codeHighlighted}]{#kobo.1508.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ variable, i18next automatically picks the right form: ]{#kobo.1509.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
function UserIdeas({ count, username }: { count: number; username: string }) {
  const { t } = useTranslation(['ideas']);

  return <p>{t('ideas:ideasBy', { count, username })}</p>;
}
```

[ If ]{#kobo.1535.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` count `{.codeHighlighted}]{#kobo.1536.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ is 1, i18next uses ]{#kobo.1537.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ideasBy_one `{.inlineCode}]{#kobo.1538.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and shows \" ]{#kobo.1539.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` 1 Idea by John `{.inlineCode}]{#kobo.1540.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ \". ]{#kobo.1541.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For any other number, it uses ]{#kobo.1542.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ideasBy_other `{.inlineCode}]{#kobo.1543.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and shows \" ]{#kobo.1544.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` 5 Ideas by John `{.inlineCode}]{#kobo.1545.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ \". ]{#kobo.1546.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For Spanish: ]{#kobo.1547.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/locales/es.ts

export default {
  ideasBy_one: '{{count}} Idea de {{username}}',
  ideasBy_other: '{{count}} Ideas de {{username}}',
  // ...
};
```

[ The code stays the same; only the translation files differ. ]{#kobo.1565.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Formatting dates ]{#kobo.1566.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_257 .heading-2}

[ Dates are ]{#kobo.1567.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ae0f046f .index-entry index-entry="translations, in application:dates formatting"} [ tricky because different regions format them differently. ]{#kobo.1568.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ January 15, 2024, in the US becomes 15/01/2024 in many European countries. ]{#kobo.1569.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Even month names change; \"January\" in English is \"enero\" in Spanish. ]{#kobo.1570.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ JavaScript has built-in support for this through the ]{#kobo.1571.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Intl.DateTimeFormat `{.inlineCode}]{#kobo.1572.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ API: ]{#kobo.1573.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/lib/date.ts

export function formatDate(date: string | Date, locale: string = 'en'): string {
  const d = date instanceof Date ? date : new Date(date);

  if (isNaN(d.getTime())) {
    console.error(`Invalid date: "${date}"`);
    return '';
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  ).format(d);
}
```

[ This function formats dates according to the locale. ]{#kobo.1647.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For English, we might get \"Jan 15, 2024\". ]{#kobo.1648.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For Spanish, we might get \"15 ene 2024\". ]{#kobo.1649.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To use this in components, we get the current language from the i18n instance: ]{#kobo.1650.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/components/idea-card.tsx

import { useTranslation } from 'react-i18next';

import { formatDate } from '@/lib/date';

export function IdeaCard({ idea }: IdeaCardProps) {
  const { i18n } = useTranslation();
  
  return (
    <div>
      <h2>{idea.title}</h2>
      <p>Created: {formatDate(idea.createdAt, i18n.language)}</p>
    </div>
  );
}
```

[ The ]{#kobo.1702.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useTranslation `{.codeHighlighted}]{#kobo.1703.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` `{.codeHighlighted}]{#kobo.1704.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook gives us both the t function and the ]{#kobo.1705.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` i18n `{.codeHighlighted}]{#kobo.1706.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ instance. ]{#kobo.1707.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We pass ]{#kobo.1708.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` i18n.language `{.codeHighlighted}]{#kobo.1709.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to our ]{#kobo.1710.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` formatDate `{.codeHighlighted}]{#kobo.1711.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` `{.codeHighlighted}]{#kobo.1712.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ function, and dates display in the correct format for the user\'s language. ]{#kobo.1713.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Switching between languages in the application ]{#kobo.1714.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_258 .heading-1}

[ Users need a ]{#kobo.1715.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c5b698ff .index-entry index-entry="language preference:switching"} [ way to change their language preference. ]{#kobo.1716.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This requires both a UI component for the user to select their language and an API endpoint to persist that choice. ]{#kobo.1717.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s build both pieces. ]{#kobo.1718.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ The language switcher component ]{#kobo.1719.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_259 .heading-2}

[ The switcher is ]{#kobo.1720.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_2cd2fcf7 .index-entry index-entry="language switcher component"} [ a dropdown that shows available languages and lets users pick one: ]{#kobo.1721.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/components/language-switcher.tsx

import { Check, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { i18nConfig, languages, type Language } from '@/config/i18n';
import { useNotificationActions } from '@/stores/notifications';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation(['components', 'common']);
  const { showNotification } = useNotificationActions();

  const handleLanguageChange = async (language: Language) => {
    const formData = new FormData();
    formData.append(i18nConfig.cookieName, language);

    try {
      const response = await fetch('/api/set-language', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await i18n.changeLanguage(language);
        showNotification({
          type: 'success',
          title: t('common:languageChanged', {
            lng: language,
          }),
        });
      }
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Globe className="h-4 w-4" />
            <span className="sr-only">
              {t('components:languageSwitcher.switchLanguage')}
            </span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([key, value]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleLanguageChange(key as Language)}
            className="cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {i18n.language === key && <Check className="h-4 w-4" />}
              <span className={i18n.language === key ? '' : 'ml-6'}>
                {value}
              </span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

[ The language change ]{#kobo.1977.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_2e8bb5fa .index-entry index-entry="language switcher component"} [ happens in two steps. ]{#kobo.1978.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ First, we tell the server to update the cookie so the preference persists. ]{#kobo.1979.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Then we update the client-side i18n instance so the UI updates immediately. ]{#kobo.1980.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Without both steps, the change either wouldn\'t persist across page reloads or wouldn\'t be visible until refresh. ]{#kobo.1981.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ The API endpoint ]{#kobo.1982.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_260 .heading-2}

[ For the ]{#kobo.1983.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_96fa16ca .index-entry index-entry="API endpoint"} [ component to work, we need an API endpoint that sets the language cookie: ]{#kobo.1984.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/api/set-language.ts

import { data } from 'react-router';
import z from 'zod';

import { localeCookie } from '@/app/middleware/i18next';
import { i18nConfig, languages, type Language } from '@/config/i18n';

import type { Route } from './+types/set-language';

const languageSchema = z.enum(
  Object.keys(languages) as [Language, ...Language[]],
);

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const language = languageSchema.safeParse(
    formData.get(i18nConfig.cookieName),
  );

  if (!language.success) {
    return data({ success: false }, { status: 400 });
  }

  return data(
    { success: true },
    {
      headers: {
        'Set-Cookie': await localeCookie.serialize(language.data),
      },
    },
  );
```

[ This endpoint ]{#kobo.2088.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e751b06f .index-entry index-entry="API endpoint"} [ validates that the requested language is one we support, then sets the cookie. ]{#kobo.2089.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The next time the user loads a page, the server will detect their preference from this cookie and render the page in the correct language. ]{#kobo.2090.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Summary ]{#kobo.2091.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_261 .heading-1}

[ In this chapter, we built a complete internationalization system for our application. ]{#kobo.2092.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We started by understanding why separating text from code makes translations manageable. ]{#kobo.2093.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We organized translations using namespaces to keep files small and focused. ]{#kobo.2094.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ App-level namespaces like ]{#kobo.2095.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` common `{.codeHighlighted}]{#kobo.2096.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ contain shared translations, while feature-scoped translations live alongside their feature code. ]{#kobo.2097.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This organization makes translations easy to find and maintain. ]{#kobo.2098.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We set up react-i18next with both server and client initialization. ]{#kobo.2099.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The server renders pages with correct translations, and the client hydrates smoothly. ]{#kobo.2100.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We created an API endpoint for serving translations on demand, enabling partial bundling, which keeps the initial JavaScript bundle small. ]{#kobo.2101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Type safety catches translation errors early. ]{#kobo.2102.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ By telling TypeScript about our translation structure, we get autocomplete and compile-time checking for translation keys. ]{#kobo.2103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We also configure language and direction attributes so browsers, screen readers, and search engines understand our content. ]{#kobo.2104.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We learned how to use the ]{#kobo.2105.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useTranslation `{.codeHighlighted}]{#kobo.2106.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook to access translations in components, and how interpolation and pluralization handle dynamic content. ]{#kobo.2107.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We implemented localized date formatting using the browser\'s built-in Intl API. ]{#kobo.2108.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Finally, we built a language switcher that persists the user\'s choice in a cookie. ]{#kobo.2109.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The preference applies across sessions, giving users a consistent experience. ]{#kobo.2110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With internationalization in place, our application can serve users around the world in their preferred languages. ]{#kobo.2111.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Get this book\'s PDF version and more ]{#kobo.2112.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_262 .heading-1}

[ Scan the QR code (or go to ]{#kobo.2113.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.2114.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ ). ]{#kobo.2115.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search for this book by name, confirm the edition, and then follow the steps on the page. ]{#kobo.2116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_9_2.png" original-image-title="" style="width:25%;"} ]{#kobo.2117.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_9_3.png" original-image-title="" style="width:25%;"} ]{#kobo.2118.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[ Note: Keep your invoice handy. ]{#kobo.2119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Purchases made directly from Packt don\'t require an invoice. ]{#kobo.2120.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}*
:::
