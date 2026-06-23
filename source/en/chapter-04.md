::: {.section .chapter}
# [ 4 ]{#kobo.1.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_144 .chapterNumber}

# [ Routing and Rendering Strategies ]{#kobo.2.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_145 .chapterTitle}

[ When a user navigates to our application\'s URL, the application needs to decide which UI should be shown to the user. ]{#kobo.3.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is where routing comes in. ]{#kobo.4.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Beyond just displaying the right page, we also need to consider how and when that page gets rendered: whether on the server, in the browser, or a combination of both. ]{#kobo.5.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These decisions can have a significant impact on performance, user experience, and SEO. ]{#kobo.6.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll cover the following topics: ]{#kobo.7.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Routing with React Router ]{#kobo.8.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Rendering strategies ]{#kobo.9.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Adding meta tags to pages ]{#kobo.10.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Adding page layouts ]{#kobo.11.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By the end of this chapter, we\'ll have a solid understanding of how routing works in modern React applications, how to configure routes effectively, and how to choose the right rendering strategy for each page to optimize performance and user experience. ]{#kobo.12.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Technical requirements ]{#kobo.13.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_146 .heading-1}

[ Before we get started, we need to set up our project. ]{#kobo.14.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To develop our project, we need the following tools installed on our computer: ]{#kobo.15.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Node.js version 24 or above. ]{#kobo.16.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ npm version 11 or above ships with Node. ]{#kobo.17.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can confirm this by executing ]{#kobo.18.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` node ‑v `{.inlineCode}]{#kobo.19.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.20.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` npm ‑v `{.inlineCode}]{#kobo.21.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ in the terminal. ]{#kobo.22.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There are multiple ways to install Node.js and npm. ]{#kobo.23.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here is a helpful article that goes into more detail: ]{#kobo.24.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js ]{#kobo.25.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js){style="text-decoration: none;"} [ . ]{#kobo.26.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ VS Code ]{#kobo.27.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ (optional), a popular editor for JavaScript and TypeScript. ]{#kobo.28.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It is open source, has solid TypeScript support, and offers many extensions. ]{#kobo.29.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It can be downloaded from ]{#kobo.30.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://code.visualstudio.com ]{#kobo.31.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://code.visualstudio.com){style="text-decoration: none;"} [ . ]{#kobo.32.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The code for this book is available at the book\'s repo. ]{#kobo.33.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To access the repository link, follow the steps in the ]{#kobo.34.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ \" ]{#kobo.35.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ Download the example code files ]{#kobo.36.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ \" ]{#kobo.37.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ section in the ]{#kobo.38.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Preface ]{#kobo.39.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ . ]{#kobo.40.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Clone it and enter the repository root: ]{#kobo.41.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

[ The repository contains chapter folders with the code for each chapter, along with a shared ]{#kobo.43.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` api `{.inlineCode}]{#kobo.44.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ folder that includes the API server used across all chapters. ]{#kobo.45.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We are working on ]{#kobo.46.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Chapter ]{#kobo.47.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ 4 ]{#kobo.48.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , so navigate to the ]{#kobo.49.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` chapter‑04 `{.inlineCode}]{#kobo.50.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.51.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/chapter-04
```

[ Next, install the dependencies: ]{#kobo.53.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm install
```

[ We also need to provide the environment variables: ]{#kobo.55.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cp .env.example .env
```

[ At this point, the frontend should be ready and running at ]{#kobo.57.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:5173 ]{#kobo.58.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:5173){style="text-decoration: none;"} [ . ]{#kobo.59.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now we should have the frontend ready. ]{#kobo.60.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For more information about the setup details, check out the ]{#kobo.61.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` README.md `{.inlineCode}]{#kobo.62.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file. ]{#kobo.63.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Routing with React Router ]{#kobo.64.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_147 .heading-1}

[ Routing ]{#kobo.65.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f138a638 .index-entry index-entry="routing, with React Router"} [ in React Router is very straightforward. ]{#kobo.66.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Everything starts with a route configuration file. ]{#kobo.67.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Configuring routes in React Router ]{#kobo.68.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_148 .heading-2}

[ In ]{#kobo.69.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7f111298 .index-entry index-entry="routing, with React Router:routes, creating"} [ React Router, we can configure the routes in the ]{#kobo.70.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` src/app/routes.ts `{.inlineCode}]{#kobo.71.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file. ]{#kobo.72.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is a special file that React Router expects to find in the ]{#kobo.73.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` src/app `{.inlineCode}]{#kobo.74.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory and uses it to manage the routes of the application. ]{#kobo.75.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here\'s a simple example: ]{#kobo.76.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes.ts

import {
  type RouteConfig,
  route,
} from '@react-router/dev/routes';

export default [
  route('/', './routes/home.tsx'),
] satisfies RouteConfig;
```

[ We define the routes using the ]{#kobo.98.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` route `{.inlineCode}]{#kobo.99.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} ` `{.codeHighlighted}[` `{.codeHighlighted}]{#kobo.100.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ function. ]{#kobo.101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The first argument is the path of the route, and the second argument is the path to the route module. ]{#kobo.102.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In this example, the route path is ]{#kobo.103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` / `{.inlineCode}]{#kobo.104.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , and the route module is defined in ]{#kobo.105.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ./routes/home.tsx `{.inlineCode}]{#kobo.106.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.107.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ But what does a route module look like? ]{#kobo.108.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ React Router ]{#kobo.109.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_833ff608 .index-entry index-entry="routing, with React Router:routes, creating"} [ expects a route module to export the UI component of the page as the default export, so it would look something like this: ]{#kobo.110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/home.tsx

export default function HomePage() {
  return <div>Welcome to the home page!</div>;
}
```

[ Now, if the user navigates to ]{#kobo.127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` / `{.inlineCode}]{#kobo.128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , the ]{#kobo.129.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` HomePage `{.inlineCode}]{#kobo.130.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component will be rendered and the text ]{#kobo.131.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Welcome to the home page! `{.inlineCode}]{#kobo.132.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ will be displayed. ]{#kobo.133.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ But what if we had a page that needed to have a dynamic path? ]{#kobo.134.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ For example, the idea detail page. ]{#kobo.134.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In such cases, we would have a path like this: ]{#kobo.135.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /ideas/1 `{.inlineCode}]{#kobo.136.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , where ]{#kobo.137.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` 1 `{.inlineCode}]{#kobo.138.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ is the ID of the idea. ]{#kobo.139.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Since there could be many more ideas with different IDs, it would be very impractical to define a separate route for each idea, so we would have to use a dynamic route instead. ]{#kobo.140.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In that case, we could define the route like this: ]{#kobo.141.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes.ts

export default [
  route('/ideas/:id', './routes/ideas/idea.tsx'),
] satisfies RouteConfig;
```

[ This configuration would define a route that matches any path that starts with ]{#kobo.155.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /ideas/ `{.inlineCode}]{#kobo.156.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , and ]{#kobo.157.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` :id `{.inlineCode}]{#kobo.158.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ is a dynamic parameter that will be passed to the component. ]{#kobo.159.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/ideas/idea.tsx

export default function IdeaPage(props: Route.ComponentProps) {
  const ideaId = props.params.id;
  return <div>Idea {ideaId}</div>;
}
```

[ This would mean that whenever the user navigates to ]{#kobo.184.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /ideas/1 `{.inlineCode}]{#kobo.185.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , the ]{#kobo.186.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` IdeaPage `{.inlineCode}]{#kobo.187.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component will be rendered and ]{#kobo.188.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` id `{.inlineCode}]{#kobo.189.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ would be passed as a prop to the component via ]{#kobo.190.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` props.params.id `{.inlineCode}]{#kobo.191.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.192.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Once we have the routes configured, we need a mechanism to navigate between the pages in the application. ]{#kobo.193.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We don\'t want to type the URL in the browser every time we want to navigate to a page; there is a better way. ]{#kobo.194.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Navigating between pages ]{#kobo.195.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_149 .heading-2}

[ To define links ]{#kobo.196.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_080be194 .index-entry index-entry="routing, with React Router:navigation, between pages"} [ between the pages in web applications, we usually use the ]{#kobo.197.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` <a> `{.inlineCode}]{#kobo.198.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ tag to link to other pages. ]{#kobo.199.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In traditional multi-page applications, clicking a link causes the browser to request a completely new HTML document from the server. ]{#kobo.200.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This results in a visible page refresh and interrupts the user experience. ]{#kobo.201.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Modern frameworks such as React Router solve this problem by using client-side routing. ]{#kobo.202.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When a user clicks a link, JavaScript intercepts the navigation, updates the URL in the browser, and then loads and renders the appropriate component without requesting a new HTML document from the server. ]{#kobo.203.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This creates a smooth, app-like experience as we don\'t see the full page refresh. ]{#kobo.204.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ They are able to do this by providing the ]{#kobo.205.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Link `{.inlineCode}]{#kobo.206.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.207.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` NavLink `{.inlineCode}]{#kobo.208.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ components to define links between the pages in a declarative way. ]{#kobo.209.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Using Link for basic navigation ]{#kobo.210.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_150 .heading-3}

[ The ]{#kobo.211.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Link `{.inlineCode}]{#kobo.212.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component is ]{#kobo.213.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_fb201be2 .index-entry index-entry="routing, with React Router:Link component"} [ the most common way to navigate between pages. ]{#kobo.214.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It renders an anchor tag ( ]{#kobo.215.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` <a> `{.inlineCode}]{#kobo.216.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ ) that intercepts clicks to prevent full page reloads: ]{#kobo.217.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/components/navigation.tsx
import { Link } from 'react-router';

<Link to="/" className="text-xl font-bold">
  AIdeas
</Link>
```

[ When a user clicks this link, React Router updates the URL to ]{#kobo.240.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` / `{.inlineCode}]{#kobo.241.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and renders the corresponding route component without a page reload. ]{#kobo.242.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.243.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` to `{.inlineCode}]{#kobo.244.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ prop specifies the destination path. ]{#kobo.245.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Using NavLink for navigation with active states ]{#kobo.246.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_151 .heading-3}

[ The ]{#kobo.247.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` NavLink `{.inlineCode}]{#kobo.248.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component ]{#kobo.249.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d3f3319c .index-entry index-entry="routing, with React Router:NavLink component"} [ is similar to the ]{#kobo.250.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Link `{.inlineCode}]{#kobo.251.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component, but it also extends it with the ability to apply styling based on whether the link matches the current route. ]{#kobo.252.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is very useful for navigation menus where we want to highlight the current page: ]{#kobo.253.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/components/navigation.tsx
import { NavLink } from 'react-router';

<NavLink
  to="/ideas"
  end
  className={({ isActive }) =>
    cn(
      'flex items-center gap-2 text-sm hover:text-primary px-3 py-2 rounded-md',
      isActive && 'font-semibold',
    )
  }
>
  <Lightbulb className="h-4 w-4" /> Discover Ideas
</NavLink>
```

[ The ]{#kobo.287.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` className `{.inlineCode}]{#kobo.288.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ prop accepts a ]{#kobo.289.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_91abbd3c .index-entry index-entry="routing, with React Router:NavLink component"} [ function that receives an ]{#kobo.290.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` isActive `{.inlineCode}]{#kobo.291.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ boolean. ]{#kobo.292.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the current URL matches the ]{#kobo.293.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` to `{.inlineCode}]{#kobo.294.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ path, ]{#kobo.295.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` isActive `{.inlineCode}]{#kobo.296.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ is ]{#kobo.297.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` true `{.inlineCode}]{#kobo.298.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , allowing us to apply different styles. ]{#kobo.299.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In this example, we make the text bold when the link is active. ]{#kobo.300.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Notice the ]{#kobo.301.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` end `{.inlineCode}]{#kobo.302.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ prop on this ]{#kobo.303.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` NavLink `{.inlineCode}]{#kobo.304.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.305.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ By default, ]{#kobo.306.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` NavLink `{.inlineCode}]{#kobo.307.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ considers a route \"active\" if the current URL starts with the ]{#kobo.308.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` to `{.inlineCode}]{#kobo.309.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ path. ]{#kobo.310.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This means ]{#kobo.311.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /ideas/123 `{.inlineCode}]{#kobo.312.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ would mark both ]{#kobo.313.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /ideas `{.inlineCode}]{#kobo.314.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.315.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /ideas/123 `{.inlineCode}]{#kobo.316.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ as active. ]{#kobo.317.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.318.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` end `{.inlineCode}]{#kobo.319.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ prop tells ]{#kobo.320.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` NavLink `{.inlineCode}]{#kobo.321.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ to only consider the link active if it\'s an exact match, preventing the ideas index route from being highlighted when viewing sub-routes. ]{#kobo.322.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

` `{.inlineCode}[` Link `{.inlineCode}]{#kobo.323.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.324.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` NavLink `{.inlineCode}]{#kobo.325.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ trigger navigation when the user clicks the link, but what if we want to navigate programmatically in response to user actions other than clicking a link, such as after a form submission or when handling a button click? ]{#kobo.326.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Using useNavigate for programmatic navigation ]{#kobo.327.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_152 .heading-3}

[ React Router ]{#kobo.328.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_97b964a2 .index-entry index-entry="routing, with React Router:useNavigate hook, for programmatic navigation"} [ provides the ]{#kobo.329.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` useNavigate `{.inlineCode}]{#kobo.330.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ hook, which can be used to navigate programmatically. ]{#kobo.331.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s see a simple example: ]{#kobo.332.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
import { useNavigate } from 'react-router';

function MyComponent() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await saveData(data);
    // Navigate to success page
    navigate('/success');
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

[ The ]{#kobo.373.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` useNavigate `{.inlineCode}]{#kobo.374.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ hook returns a function that can be used to navigate to a different path. ]{#kobo.375.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The function takes the path as an argument and navigates to it. ]{#kobo.376.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now that we have a basic understanding of how routing works in React Router, let\'s move on to which rendering strategies we can use to build the pages of our application. ]{#kobo.377.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Rendering strategies ]{#kobo.378.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_153 .heading-1}

[ When thinking ]{#kobo.379.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_cd96c41e .index-entry index-entry="rendering strategies"} [ about our application pages, we need to think about their needs to get a better understanding of how they should be rendered. ]{#kobo.380.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Some factors to consider are: frequency of page content updates, number of pages, SEO requirements, performance requirements, infrastructure, and whether the page content is public or private. ]{#kobo.381.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can choose some of the following rendering strategies: ]{#kobo.382.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Server-side rendering ]{#kobo.383.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.384.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ SSR ]{#kobo.385.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ) ]{#kobo.386.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Client-side rendering ]{#kobo.387.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.388.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ CSR ]{#kobo.389.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ) ]{#kobo.390.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Hybrid rendering (SSR + CSR) ]{#kobo.391.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}**
- **[ Static ]{#kobo.392.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ p ]{#kobo.393.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ re-rendering ]{#kobo.394.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}**

[ We will dive deeper into each strategy by implementing it in our application to learn more about why we would use each of them. ]{#kobo.395.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Server-side rendering ]{#kobo.396.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_154 .heading-2}

**[ Server-side rendering ]{#kobo.397.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.398.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ SSR ]{#kobo.399.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ) means ]{#kobo.400.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_17032247 .index-entry index-entry="rendering strategies:server-side rendering"} [ that the page content is ]{#kobo.401.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_8be6f05a .index-entry index-entry="server-side rendering (SSR)"} [ generated on the server for each request. ]{#kobo.402.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This allows us to fetch fresh data from our database or API and render personalized content while still providing fast initial page loads and excellent SEO. ]{#kobo.403.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s visualize how server-side rendering works: ]{#kobo.404.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.405.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_1.png" data-original-image-title="" style="width:528.0px; height:352.0px;">Figure 4.1 – Server-side rendering flow</span> </span>
</figure>

[ Figure 4.1 -- Server-side rendering flow ]{#kobo.406.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Every time a ]{#kobo.407.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_81ea2974 .index-entry index-entry="rendering strategies:server-side rendering"} [ user visits an SSR page, the server fetches the data from the API and renders the HTML page content. ]{#kobo.408.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The browser receives the ]{#kobo.409.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_3bf23f09 .index-entry index-entry="server-side rendering (SSR)"} [ complete HTML and displays it immediately, then JavaScript is loaded to make the page interactive. ]{#kobo.410.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ What are the ]{#kobo.411.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7a7163d8 .index-entry index-entry="server-side rendering (SSR):benefits"} [ main benefits of using SSR? ]{#kobo.412.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ SEO-friendly ]{#kobo.413.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Search engines see complete content since everything is already rendered on the server ]{#kobo.414.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Fast perceived load ]{#kobo.415.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Content is visible immediately without the need to wait for JavaScript to load ]{#kobo.416.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Fresh data ]{#kobo.417.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Always current from the database or API since the data is fetched on the server on every request ]{#kobo.418.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Works without JavaScript ]{#kobo.419.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : The content is visible even if JavaScript fails or is disabled ]{#kobo.420.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ So, when should we use SSR? ]{#kobo.421.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ SSR is ideal for pages that need fresh, dynamic content with good SEO, such as a product detail page on an e-commerce platform, a profile page on a social network platform, and so on. ]{#kobo.421.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In the context of our application, the idea details page is a great example of a page that needs SSR because it needs to show the idea details and the reviews, which can change frequently, and it needs to be SEO-friendly. ]{#kobo.422.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Creating a server-rendered idea detail page ]{#kobo.423.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_155 .heading-3}

[ Since we are ]{#kobo.424.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9c495179 .index-entry index-entry="server-side rendering (SSR):server-rendered idea detail page, creating"} [ rendering the page on the server, we need a way to load all the data there and pass it to the page: ]{#kobo.425.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/ideas/idea.tsx

export async function loader({ params }: Route.LoaderArgs) {
  const [idea, reviews] = await Promise.all([
    getIdeaById(params.id),
    getReviewsByIdea({ id: params.id }),
  ]);
  return routerData({
    idea,
    reviews,
  });
}
```

[ In React Router, this can be done via the ]{#kobo.453.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` loader `{.inlineCode}]{#kobo.454.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ function, which is exported from the ]{#kobo.455.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` route `{.inlineCode}]{#kobo.456.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ module and executed on the server side before the component is rendered. ]{#kobo.457.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It allows us to fetch and provide the data for the page component. ]{#kobo.458.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The loader receives ]{#kobo.459.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` params.id `{.inlineCode}]{#kobo.460.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ from the URL path ]{#kobo.461.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /ideas/:id `{.inlineCode}]{#kobo.462.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , fetches data from our API, and passes it to the component: ]{#kobo.463.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
export default function IdeaDetailPage({ loaderData }: Route.ComponentProps) {
  const idea = loaderData?.idea;

  const reviews = loaderData?.reviews?.data;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... */}
      <div className="max-w-4xl mx-auto">
        <IdeaDetails idea={idea} currentUser={null} />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Reviews ({reviews?.length || 0})
            </h2>
          </div>
          <ReviewsList
            reviews={reviews}
            emptyMessage="No reviews yet. Be the first to review this idea!"
          />
        </div>
      </div>
    </div>
  );
}
```

[ Then, the component receives the data from the ]{#kobo.554.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` loader `{.inlineCode}]{#kobo.555.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ function via the ]{#kobo.556.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` loaderData `{.inlineCode}]{#kobo.557.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ prop and can use it to render the page content. ]{#kobo.558.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Another great ]{#kobo.559.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c2f6ecd6 .index-entry index-entry="server-side rendering (SSR):server-rendered idea detail page, creating"} [ thing here is that the entire route module is type-safe via TypeScript types coming from ]{#kobo.560.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ./+types/idea `{.inlineCode}]{#kobo.561.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , which is automatically generated by React Router. ]{#kobo.562.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ But what if something goes wrong with the loader and it throws an error, or the request fails? ]{#kobo.563.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ To handle errors from the loaders, we can export ]{#kobo.563.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ErrorBoundary `{.inlineCode}]{#kobo.564.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ from the ]{#kobo.565.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` route `{.inlineCode}]{#kobo.566.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ module: ]{#kobo.567.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* ... */}
    </div>
  );
}
```

[ If the ]{#kobo.590.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` loader `{.inlineCode}]{#kobo.591.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ function throws an error, the ]{#kobo.592.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ErrorBoundary `{.inlineCode}]{#kobo.593.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component will be rendered, and the error will be displayed to the user. ]{#kobo.594.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Once the ]{#kobo.595.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` route `{.inlineCode}]{#kobo.596.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ module is created, we need to register it in the ]{#kobo.597.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` src/app/routes.ts `{.inlineCode}]{#kobo.598.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file. ]{#kobo.599.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes.ts

export default [
  // ...
  route('/ideas/:id', './routes/ideas/idea.tsx'),
] satisfies RouteConfig;
```

[ Now, if we navigate to ]{#kobo.614.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /ideas/1 `{.inlineCode}]{#kobo.615.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , the ]{#kobo.616.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` IdeaDetailPage `{.inlineCode}]{#kobo.617.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component will be rendered, and the idea details will be displayed. ]{#kobo.618.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.619.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_2.png" data-original-image-title="" style="width:528.0px; height:394.5999729401198px;">Figure 4.2 – Server-side rendered idea detail page</span> </span>
</figure>

[ Figure 4.2 -- Server-side rendered idea detail page ]{#kobo.620.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To verify ]{#kobo.621.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_435e47ac .index-entry index-entry="server-side rendering (SSR):server-rendered idea detail page, creating"} [ that SSR is working, we can disable JavaScript in the browser and reload the page. ]{#kobo.622.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ All the content should still be visible. ]{#kobo.623.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.624.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_3.png" data-original-image-title="" style="width:528.0px; height:248.2666479429249px;">Figure 4.3 – Server-side rendered idea detail page without JavaScript</span> </span>
</figure>

[ Figure 4.3 -- Server-side rendered idea detail page without JavaScript ]{#kobo.625.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ SSR is powerful, but sometimes we don\'t need SEO or immediate content visibility. ]{#kobo.626.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For authenticated pages behind a login, client-side rendering is more than sufficient. ]{#kobo.627.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Client-side rendering ]{#kobo.628.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_156 .heading-2}

**[ Client-side rendering ]{#kobo.629.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.630.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ CSR ]{#kobo.631.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ) sends ]{#kobo.632.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d2ab8643 .index-entry index-entry="rendering strategies:client-side rendering"} [ the minimal HTML from ]{#kobo.633.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_773fd696 .index-entry index-entry="client-side rendering (CSR)"} [ the server and fetches data using JavaScript after the page loads. ]{#kobo.634.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is ideal for authenticated pages where SEO doesn\'t matter and we want to reduce server load. ]{#kobo.635.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here\'s how CSR works in our application: ]{#kobo.636.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.637.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_4.png" data-original-image-title="" style="width:528.0px; height:347.53333333333336px;">Figure 4.4 – CSR flow</span> </span>
</figure>

[ Figure 4.4 -- CSR flow ]{#kobo.638.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When a user visits ]{#kobo.639.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /dashboard/ideas `{.inlineCode}]{#kobo.640.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , the server sends minimal HTML. ]{#kobo.641.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ JavaScript loads, the page content is rendered, and then the component fetches data. ]{#kobo.642.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The page shows the loading state initially, and then updates the page content when the data arrives. ]{#kobo.643.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Some of the benefits ]{#kobo.644.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f0793880 .index-entry index-entry="client-side rendering (CSR):benefits"} [ of using CSR are as follows: ]{#kobo.645.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Reduces server load ]{#kobo.646.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : No server rendering per request; we only need to send the minimal HTML to the client ]{#kobo.647.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Simpler infrastructure ]{#kobo.648.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : No need to configure a server or a build process, which is great for reducing the costs of running the application ]{#kobo.649.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Some of the trade-offs of ]{#kobo.650.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a69e08e8 .index-entry index-entry="client-side rendering (CSR):trade-offs"} [ using CSR are as follows: ]{#kobo.651.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Users see loading states instead of content initially, which is not as good an experience as seeing the content immediately. ]{#kobo.652.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Worse SEO (fine for auth-required pages) since the page content is not generated on the server. ]{#kobo.653.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search engines are able to execute JavaScript and see the page content, but it\'s not as good as having the page content immediately available. ]{#kobo.654.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Requires JavaScript to be enabled in the browser. ]{#kobo.655.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If JavaScript is disabled, the page content will not be fully visible. ]{#kobo.656.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ So, when should we use CSR? ]{#kobo.657.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ CSR is ]{#kobo.657.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ecdf7a2e .index-entry index-entry="rendering strategies:client-side rendering"} [ best for pages where SEO isn\'t a concern, and we want to reduce the server load. ]{#kobo.658.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Our dashboard pages ( ]{#kobo.659.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /dashboard/ideas `{.inlineCode}]{#kobo.660.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.661.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /dashboard/reviews `{.inlineCode}]{#kobo.662.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ ) display user-specific content that doesn\'t need SEO and are protected by authentication. ]{#kobo.663.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Creating a client-rendered dashboard page ]{#kobo.664.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_157 .heading-3}

[ The ]{#kobo.665.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1c10027c .index-entry index-entry="client-side rendering (CSR):client-rendered dashboard page, creating"} [ dashboard ideas page shows the current user\'s ideas. ]{#kobo.666.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of fetching in a loader, it fetches data on the client using a custom hook: ]{#kobo.667.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/dashboard/ideas/ideas.tsx
import { useCurrentUserIdeasQuery } from '@/features/ideas/api/get-current-user-ideas';
import { IdeasList } from '@/features/ideas/components/ideas-list';

export default function MyIdeasPage() {
  const ideasQuery = useCurrentUserIdeasQuery();
  const ideas = ideasQuery.data?.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Ideas</h1>
            <p className="text-muted-foreground">
              Manage and track your submitted ideas
            </p>
          </div>
        </div>

        <IdeasList
          ideas={ideas}
          isLoading={ideasQuery.isLoading}
          emptyMessage="You haven't created any ideas yet."
          error={ideasQuery.error}
        />
      </div>
    </div>
  );
}
```

[ The ]{#kobo.770.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` MyIdeasPage `{.inlineCode}]{#kobo.771.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component is very simple, as it only fetches data on the client using a custom hook and renders the page content. ]{#kobo.772.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now that ]{#kobo.773.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_715c56d3 .index-entry index-entry="client-side rendering (CSR):client-rendered dashboard page, creating"} [ we have the route module for this page, we need to register it in the ]{#kobo.774.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` src/app/routes.ts `{.inlineCode}]{#kobo.775.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file. ]{#kobo.776.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes.ts

export default [
  // ...
  route('/dashboard/ideas', './routes/dashboard/ideas/ideas.tsx'),
] satisfies RouteConfig;
```

[ If we navigate to ]{#kobo.791.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /dashboard/ideas `{.inlineCode}]{#kobo.792.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , the ]{#kobo.793.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` MyIdeasPage `{.inlineCode}]{#kobo.794.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component will be rendered, and the current user\'s ideas will be displayed. ]{#kobo.795.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.796.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_5.png" data-original-image-title="" style="width:528.0px; height:301.86665164185223px;">Figure 4.5 – Client-rendered dashboard ideas page</span> </span>
</figure>

[ Figure 4.5 -- Client-rendered dashboard ideas page ]{#kobo.797.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To verify what is shown initially, we can disable JavaScript in the browser and reload the page. ]{#kobo.798.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.799.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_6.png" data-original-image-title="" style="width:528.0px; height:254.73335317613424px;">Figure 4.6 – Client-rendered dashboard ideas page without JavaScript</span> </span>
</figure>

[ Figure 4.6 -- Client-rendered dashboard ideas page without JavaScript ]{#kobo.800.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Initially, we ]{#kobo.801.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_6acda43f .index-entry index-entry="client-side rendering (CSR):client-rendered dashboard page, creating"} [ only see the loading state, and then, once the data is fetched on the client side, the page content is updated. ]{#kobo.802.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Sometimes we need the best of both worlds: immediate content from the server plus additional client-side data fetching. ]{#kobo.803.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ That\'s where hybrid rendering comes in. ]{#kobo.804.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Hybrid rendering ]{#kobo.805.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_158 .heading-2}

[ Hybrid rendering ]{#kobo.806.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b3dd735f .index-entry index-entry="hybrid rendering"} [ is a ]{#kobo.807.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c05b914d .index-entry index-entry="rendering strategies:hybrid rendering"} [ combination of SSR and CSR. ]{#kobo.808.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It allows us to have the best of both worlds: immediate content from the server plus additional client-side data fetching. ]{#kobo.809.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here\'s how hybrid rendering works in our application: ]{#kobo.810.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.811.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_7.png" data-original-image-title="" style="width:528.0px; height:414.9333333333333px;">Figure 4.7 – Hybrid rendering flow</span> </span>
</figure>

[ Figure 4.7 -- Hybrid rendering flow ]{#kobo.812.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When a ]{#kobo.813.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4392895b .index-entry index-entry="rendering strategies:hybrid rendering"} [ user visits ]{#kobo.814.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /profile/johndoe `{.inlineCode}]{#kobo.815.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , the server loader ]{#kobo.816.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_036dd9af .index-entry index-entry="hybrid rendering:workflow"} [ fetches profile data and renders HTML with complete profile details. ]{#kobo.817.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The browser displays this immediately. ]{#kobo.818.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ After JavaScript hydrates, the page component is rendered and the rest of the data is fetched on the client side, showing loading states until data arrives. ]{#kobo.819.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Hybrid rendering is ideal for pages that need both immediate critical content visibility and additional content that can be fetched ]{#kobo.820.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_54c627d4 .index-entry index-entry="hybrid rendering:use cases"} [ on the client side. ]{#kobo.821.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here are the main use cases: ]{#kobo.822.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Public pages that need SEO but also show personalized content ]{#kobo.823.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Pages with critical content (server-rendered) and supplementary content (client-rendered) ]{#kobo.824.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Balancing performance and functionality ]{#kobo.825.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Our profile page ]{#kobo.826.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ( `{.codeHighlighted}]{#kobo.827.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.inlineCode}[` /profile/:username `{.inlineCode}]{#kobo.828.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ ) uses hybrid rendering for the following reasons: ]{#kobo.829.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ The profile information needs to be visible immediately for SEO ]{#kobo.830.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The user\'s ideas and reviews can load progressively on the client ]{#kobo.831.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s see how this can be implemented in our application. ]{#kobo.832.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Creating a hybrid profile page ]{#kobo.833.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_159 .heading-3}

[ The ]{#kobo.834.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f056a3f1 .index-entry index-entry="hybrid rendering:hybrid profile page, creating"} [ profile page loads critical data on the server (profile info) and additional ideas and reviews data that can be fetched on the client side: ]{#kobo.835.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ First, we need to create the ]{#kobo.836.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` route `{.inlineCode}]{#kobo.837.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ module for the profile page: ]{#kobo.838.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/profile.tsx

import { data as routerData, Link } from 'react-router';

import { ErrorMessage } from '@/components/error-message';
import { Button } from '@/components/ui/button';
import { UserIdeas } from '@/features/ideas/components/user-ideas';
import { getProfileByUsername } from '@/features/profile/api/get-profile-by-username';
import { ProfileDetails } from '@/features/profile/components/profile-details';
import { UserReviews } from '@/features/reviews/components/user-reviews';

import type { Route } from './+types/profile';

export async function loader({ params }: Route.LoaderArgs) {
  const profile = await getProfileByUsername(params.username);

  return routerData({
    profile,
  });
}

export default function ProfilePage({
  params,
  loaderData,
}: Route.ComponentProps) {
  const profile = loaderData?.profile;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <ProfileDetails profile={profile} />
        <div className="mb-8">
          <UserIdeas username={params.username} />
        </div>
        <UserReviews username={params.username} />
      </div>
    </div>
  );
}
```

[ As we can see, the profile data is fetched in the ]{#kobo.984.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` loader `{.inlineCode}]{#kobo.985.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ function on the server side and then passed to the ]{#kobo.986.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_fe323e34 .index-entry index-entry="hybrid rendering:hybrid profile page, creating"} [ component via the ]{#kobo.987.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` loaderData `{.inlineCode}]{#kobo.988.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ prop. ]{#kobo.989.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Components responsible for fetching and rendering ideas and reviews are client-side components: ]{#kobo.990.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/components/user-ideas.tsx
import { useIdeasByUserQuery } from '../api/get-ideas-by-user';
import { IdeasList } from '@/features/ideas/components/ideas-list';

export function UserIdeas({ username }: { username: string }) {
  const ideasQuery = useIdeasByUserQuery({ username });
  const ideas = ideasQuery.data?.data;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Ideas by {username} ({ideas?.length || 0})
      </h2>
      <IdeasList
        ideas={ideas}
        isLoading={ideasQuery.isLoading}
        emptyMessage={`${username} hasn't shared any ideas yet.`}
        error={ideasQuery.error}
      />
    </div>
  );
}
```

[ Also, the ]{#kobo.1066.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` UserReviews `{.inlineCode}]{#kobo.1067.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component: ]{#kobo.1068.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/reviews/components/user-reviews.tsx
import { useReviewsByUserQuery } from '../api/get-reviews-by-user';
import { ReviewsList } from '@/features/reviews/components/reviews-list';

export function UserReviews({ username }: { username: string }) {
  const reviewsQuery = useReviewsByUserQuery({ username });
  const reviews = reviewsQuery.data?.data;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Reviews by {username} ({reviews?.length || 0})
      </h2>

      <ReviewsList
        reviews={reviews}
        isLoading={reviewsQuery.isLoading}
        showIdeaTitle
        emptyMessage={`${username} hasn't written any reviews yet.`}
        error={reviewsQuery.error}
      />
    </div>
  );
}
```

[ Both ]{#kobo.1145.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_99807fe4 .index-entry index-entry="hybrid rendering:hybrid profile page, creating"} [ components fetch data on the client using a custom hook. ]{#kobo.1146.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They show loading states while fetching and update when data arrives. ]{#kobo.1147.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But that\'s fine, as we want to load the profile data as soon as possible and then load the ideas and reviews data progressively on the client side. ]{#kobo.1148.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now that we have the ]{#kobo.1149.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` route `{.inlineCode}]{#kobo.1150.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ module for this page, we need to register it in the ]{#kobo.1151.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` src/app/routes.ts `{.inlineCode}]{#kobo.1152.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file. ]{#kobo.1153.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes.ts

export default [
  // ...
  route('/profile/:username', './routes/profile.tsx'),
] satisfies RouteConfig;
```

[ If we navigate to ]{#kobo.1168.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /profile/johndoe `{.inlineCode}]{#kobo.1169.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , the ]{#kobo.1170.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ProfilePage `{.inlineCode}]{#kobo.1171.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component will be rendered, and the profile details will be displayed. ]{#kobo.1172.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1173.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_8.png" data-original-image-title="" style="width:528.0px; height:499.2666955239772px;">Figure 4.8 – Hybrid-rendered profile page</span> </span>
</figure>

[ Figure 4.8 -- Hybrid-rendered profile page ]{#kobo.1174.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To verify ]{#kobo.1175.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c021c2ba .index-entry index-entry="hybrid rendering:hybrid profile page, creating"} [ what is shown initially, we can disable JavaScript in the browser and reload the page. ]{#kobo.1176.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1177.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_9.png" data-original-image-title="" style="width:528.0px; height:304.5333473979568px;">Figure 4.9 – Hybrid-rendered profile page without JavaScript</span> </span>
</figure>

[ Figure 4.9 -- Hybrid-rendered profile page without JavaScript ]{#kobo.1178.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ As we can see, the ]{#kobo.1179.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_21415887 .index-entry index-entry="hybrid rendering:hybrid profile page, creating"} [ profile data is visible, but the ideas and reviews are not, so we can only see the loading states. ]{#kobo.1180.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Once the data is fetched on the client side, the page content is updated. ]{#kobo.1181.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ But what if we had pages that are static, so the page content should not be generated on every request? ]{#kobo.1182.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ That\'s where static pre-rendering comes in. ]{#kobo.1182.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Static pre-rendering ]{#kobo.1183.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_160 .heading-2}

[ Static pre-rendered pages ]{#kobo.1184.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7d97a138 .index-entry index-entry="rendering strategies:static pre-rendering"} [ are pages that are generated at ]{#kobo.1185.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_04d7545e .index-entry index-entry="static pre-rendering"} [ build time and served as HTML files. ]{#kobo.1186.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They load quickly, work without JavaScript, and are excellent for content that doesn\'t change frequently. ]{#kobo.1187.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s see how static pre-rendering works visually: ]{#kobo.1188.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1189.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_10.png" data-original-image-title="" style="width:528.0px; height:403.79999999999995px;">Figure 4.10 – Pre-rendering flow</span> </span>
</figure>

[ Figure 4.10 -- Pre-rendering flow ]{#kobo.1190.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ At ]{#kobo.1191.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_774e1b7c .index-entry index-entry="static pre-rendering:workflow"} [ build time, we ]{#kobo.1192.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9c1e83ac .index-entry index-entry="rendering strategies:static pre-rendering"} [ fetch the data (if needed) for the page and generate the HTML page content, which will be served as a static file. ]{#kobo.1193.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The browser will then load the HTML file and display the content. ]{#kobo.1194.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Pre-rendering is ideal for pages with static or rarely changing content that benefits from fast load times and SEO. ]{#kobo.1195.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here ]{#kobo.1196.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_fdb7ee97 .index-entry index-entry="static pre-rendering:use cases"} [ are the main use cases: ]{#kobo.1197.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Marketing pages and landing pages with static content ]{#kobo.1198.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Blog posts and documentation that don\'t change frequently ]{#kobo.1199.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Pages that don\'t require user-specific data ]{#kobo.1200.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Content that\'s the same for all visitors ]{#kobo.1201.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Our home and about pages are perfect candidates for pre-rendering because they display static marketing content that\'s identical for all visitors. ]{#kobo.1202.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Creating pre-rendered home and about pages ]{#kobo.1203.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_161 .heading-3}

[ Our home and about pages ]{#kobo.1204.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_57aace50 .index-entry index-entry="static pre-rendering:pre-rendered home and about pages, creating"} [ are standard routes with a component that renders the UI: ]{#kobo.1205.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/home.tsx

export default function HomePage() {
  // ...
}
```

[ Also, the about page: ]{#kobo.1214.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/about.tsx

export default function AboutPage() {
  // ...
}
```

[ Then we need to register the routes in the ]{#kobo.1223.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` src/app/routes.ts `{.inlineCode}]{#kobo.1224.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file: ]{#kobo.1225.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes.ts

export default [
  // ...
  index('routes/home.tsx'),
  route('/about', './routes/about.tsx'),
] satisfies RouteConfig;
```

[ To enable pre-rendering, we configure React Router to generate HTML at build time in the ]{#kobo.1244.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` react‑router.config.ts `{.inlineCode}]{#kobo.1245.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file: ]{#kobo.1246.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// react-router.config.ts
import type { Config } from '@react-router/dev/config';

export default {
  ssr: true,
  appDirectory: 'src/app',
  async prerender() {
    return ['/', '/about'];
  },
} satisfies Config;
```

[ We\'re ]{#kobo.1279.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c33ab87e .index-entry index-entry="static pre-rendering:pre-rendered home and about pages, creating"} [ telling React Router to pre-render the home and about pages at build time. ]{#kobo.1280.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This will generate the HTML files for the home and about pages and store them in the ]{#kobo.1281.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` build `{.inlineCode}]{#kobo.1282.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory, ready to be served as pre-rendered HTML files. ]{#kobo.1283.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ If we run the ]{#kobo.1284.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` npm run build `{.inlineCode}]{#kobo.1285.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ command, we will see that the HTML files for the home and about pages are generated in the ]{#kobo.1286.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` build `{.inlineCode}]{#kobo.1287.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory. ]{#kobo.1288.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1289.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_11.png" data-original-image-title="" style="width:369.7288188976378px; height:237.60000000000002px;">Figure 4.11 – Pre-rendered home and about page files</span> </span>
</figure>

[ Figure 4.11 -- Pre-rendered home and about page files ]{#kobo.1290.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ As we can ]{#kobo.1291.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_326003d4 .index-entry index-entry="static pre-rendering:pre-rendered home and about pages, creating"} [ see, the HTML files are generated in the ]{#kobo.1292.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` build `{.inlineCode}]{#kobo.1293.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory, and they are ready to be served as pre-rendered HTML files. ]{#kobo.1294.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We have already mentioned that rendering page content on the server is important for SEO, but we still have one missing part related to SEO: the meta tags. ]{#kobo.1295.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Adding meta tags to pages ]{#kobo.1296.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_162 .heading-1}

[ React Router supports ]{#kobo.1297.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9de0eb63 .index-entry index-entry="meta tags:adding, to pages"} [ two ways of adding meta tags to pages: ]{#kobo.1298.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Exporting the ]{#kobo.1299.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` meta `{.inlineCode}]{#kobo.1300.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ function from the ]{#kobo.1301.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` route `{.inlineCode}]{#kobo.1302.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ module ]{#kobo.1303.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Using the ]{#kobo.1304.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` <meta> `{.inlineCode}]{#kobo.1305.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ tag ]{#kobo.1306.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The ]{#kobo.1307.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` meta `{.inlineCode}]{#kobo.1308.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ function is a function that can be defined in the ]{#kobo.1309.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` route `{.inlineCode}]{#kobo.1310.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ module. ]{#kobo.1311.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It returns an array of meta tags that will be added to the page. ]{#kobo.1312.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/home.tsx

export function meta() {
  return [
    { title: 'AIdeas - Share and Discover AI Ideas' },
    { name: 'description', content: 'AIdeas - A community platform for sharing, reviewing, and discovering innovative AI application ideas' },
  ];
}
```

[ Since React 19, it is recommended to use the built-in ]{#kobo.1332.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` <meta> `{.inlineCode}]{#kobo.1333.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ element provided by React instead of the ]{#kobo.1334.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` meta `{.inlineCode}]{#kobo.1335.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ function. ]{#kobo.1336.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/home.tsx

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <title>AIdeas - Share and Discover AI Ideas</title>
      <meta name="description" content="AIdeas - A community platform for sharing, reviewing, and discovering innovative AI application ideas" />
      {/* ... */}
    </div>
  );
}
```

[ We can do this for every page. ]{#kobo.1375.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If that\'s the case, wouldn\'t it be better to create a reusable component for the meta tags? ]{#kobo.1376.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s ]{#kobo.1377.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_bbb8e97c .index-entry index-entry="meta tags:adding, to pages"} [ create the ]{#kobo.1378.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Seo `{.inlineCode}]{#kobo.1379.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component, which will be used to add ]{#kobo.1380.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` title `{.inlineCode}]{#kobo.1381.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.1382.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` meta `{.inlineCode}]{#kobo.1383.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ tags to the page. ]{#kobo.1384.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To keep it simple, we will only add the ]{#kobo.1385.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` title `{.inlineCode}]{#kobo.1386.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and the ]{#kobo.1387.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` description `{.inlineCode}]{#kobo.1388.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ meta tag to the page, but it can be extended to add more meta tags in the future. ]{#kobo.1389.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/components/seo.tsx

export function Seo({ title, description }: { title: string; description: string }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}
```

[ Now we can use this component in our pages: ]{#kobo.1427.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/home.tsx

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Seo title="AIdeas - Share and Discover AI Ideas" description="AIdeas - A community platform for sharing, reviewing, and discovering innovative AI application ideas" />
      {/* ... */}
    </div>
  );
}
```

[ This makes our pages much better optimized for SEO, which will help us to improve the search engine rankings of our application. ]{#kobo.1458.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We are almost there. ]{#kobo.1459.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.1460.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_bd98bc83 .index-entry index-entry="meta tags:adding, to pages"} [ final missing piece of our application pages is the navigation. ]{#kobo.1461.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We don\'t have a clear way to navigate between the pages. ]{#kobo.1462.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Since the navigation is a common component that is rendered on every page, it would make sense to make it visible on every page. ]{#kobo.1463.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Adding page layouts ]{#kobo.1464.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_163 .heading-1}

[ Currently, our ]{#kobo.1465.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7d27a695 .index-entry index-entry="page layouts:adding"} [ application pages are working fine, but there is no navigation present, so there is no clear way to navigate from the home page to the dashboard. ]{#kobo.1466.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We already have the navigation component available at ]{#kobo.1467.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` src/components/navigation.tsx `{.inlineCode}]{#kobo.1468.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.1469.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ While we could add it to every page separately, it is better to add it to layouts because layouts avoid unnecessary rerenders when navigating between the pages. ]{#kobo.1470.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Layouts are components that wrap the content of pages and provide a common structure around them. ]{#kobo.1471.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A common use case for layouts is navigation. ]{#kobo.1472.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We want to keep the navigation visible on every page to provide a consistent user experience. ]{#kobo.1473.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In our application, there are 2 levels of navigation: ]{#kobo.1474.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ The main navigation is the one that is rendered on every page ]{#kobo.1475.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The dashboard navigation is the one that is rendered on the dashboard pages ]{#kobo.1476.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To achieve this, we will create the layout components that will wrap the routes of the application. ]{#kobo.1477.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We will first create the main layout component that will wrap the routes of the application: ]{#kobo.1478.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1479.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_12.png" data-original-image-title="" style="width:528.0px; height:321.93333333333334px;">Figure 4.12 – Root layout structure</span> </span>
</figure>

[ Figure 4.12 -- Root layout structure ]{#kobo.1480.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ As we can see, the ]{#kobo.1481.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ff1a93e4 .index-entry index-entry="page layouts:adding"} [ main layout should show the navigation at the top of the page and the content of the page below it. ]{#kobo.1482.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In React Router, a layout component renders shared UI elements and includes an ]{#kobo.1483.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` <Outlet /> `{.inlineCode}]{#kobo.1484.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component where child routes are rendered. ]{#kobo.1485.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can think of the ]{#kobo.1486.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Outlet `{.inlineCode}]{#kobo.1487.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ as the placeholder for the routes the layout is wrapping. ]{#kobo.1488.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here\'s our root layout: ]{#kobo.1489.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/layout.tsx

import { Outlet } from 'react-router';

import { Navigation } from '@/components/navigation';

export default function Layout() {
  return (
    <div>
      <Navigation />
      <main className="min-h-screen bg-background">
        <Outlet />
      </main>
    </div>
  );
}
```

[ As we can see, the layout component renders the navigation at the top of the page and the content of the page below it. ]{#kobo.1538.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To make the layout wrap our pages, we need to register the layout in the ]{#kobo.1539.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` routes `{.inlineCode}]{#kobo.1540.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ configuration file: ]{#kobo.1541.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes.ts

export default [
  layout('./routes/layout.tsx', [
    route('ideas/:id', './routes/ideas/idea.tsx'),
    route('ideas', './routes/ideas/ideas.tsx'),
    // ...
  ]),
] satisfies RouteConfig;
```

[ The layout wraps ]{#kobo.1567.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ada29f91 .index-entry index-entry="page layouts:adding"} [ routes where the navigation should be visible. ]{#kobo.1568.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When a user visits the ]{#kobo.1569.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /ideas/1 `{.inlineCode}]{#kobo.1570.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ page, the layout will be rendered, and the navigation will be present at the top of the page. ]{#kobo.1571.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1572.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_13.png" data-original-image-title="" style="width:528.0px; height:361.9333331247582px;">Figure 4.13 – Top-level navigation</span> </span>
</figure>

[ Figure 4.13 -- Top-level navigation ]{#kobo.1573.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now we have a clear way to navigate between the home page, the ideas page, and the dashboard. ]{#kobo.1574.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Our dashboard also needs navigation to navigate between the dashboard pages. ]{#kobo.1575.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1576.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_14.png" data-original-image-title="" style="width:528.0px; height:322.26666666666665px;">Figure 4.14 – Dashboard navigation</span> </span>
</figure>

[ Figure 4.14 -- Dashboard navigation ]{#kobo.1577.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s create ]{#kobo.1578.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_eca41d02 .index-entry index-entry="page layouts:adding"} [ the dashboard layout component that will wrap the dashboard routes. ]{#kobo.1579.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/dashboard/layout.tsx

import { LayoutDashboard, Home, MessageSquare } from 'lucide-react';
import { NavLink, Outlet } from 'react-router';

import { cn } from '@/lib/utils';

export default function DashboardLayout() {
  // ...

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          {/* ... */}
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
```

[ Now we need to register the dashboard layout in the ]{#kobo.1650.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` src/app/routes.ts `{.inlineCode}]{#kobo.1651.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file: ]{#kobo.1652.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes.ts

export default [
  layout('./routes/layout.tsx', [
    route('ideas/:id', './routes/ideas/idea.tsx'),
    route('ideas', './routes/ideas/ideas.tsx'),
    layout('./routes/dashboard/layout.tsx', [
      route('dashboard', './routes/dashboard/dashboard.tsx'),
      route('dashboard/ideas', './routes/dashboard/ideas/ideas.tsx'),
      route('dashboard/reviews', './routes/dashboard/reviews.tsx'),
    ]),
    // ...
  ]),
] satisfies RouteConfig;
```

[ Now we can ]{#kobo.1700.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_38985bfd .index-entry index-entry="page layouts:adding"} [ navigate to ]{#kobo.1701.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /dashboard `{.inlineCode}]{#kobo.1702.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and see the dashboard page. ]{#kobo.1703.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Also, if we navigate to ]{#kobo.1704.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /dashboard/ideas `{.inlineCode}]{#kobo.1705.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ or ]{#kobo.1706.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /dashboard/reviews `{.inlineCode}]{#kobo.1707.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , the dashboard navigation will be visible as well since it is a nested layout. ]{#kobo.1708.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1709.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_4_15.png" data-original-image-title="" style="width:528.0px; height:296.8666721861158px;">Figure 4.15 – Dashboard page</span> </span>
</figure>

[ Figure 4.15 -- Dashboard page ]{#kobo.1710.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ As we can see, the dashboard navigation is visible, as well as the top-level navigation. ]{#kobo.1711.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now we have a clear way to navigate between top-level and dashboard pages, which improves the user experience of our application. ]{#kobo.1712.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The final route structure defined in the ]{#kobo.1713.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` src/app/routes.ts `{.inlineCode}]{#kobo.1714.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file looks like this: ]{#kobo.1715.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes.ts

import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./routes/layout.tsx', [
    index('routes/home.tsx'),
    route('about', './routes/about.tsx'),
    ...prefix('dashboard', [
      layout('./routes/dashboard/layout.tsx', [
        index('./routes/dashboard/dashboard.tsx'),
        route('ideas', './routes/dashboard/ideas/ideas.tsx'),
        route('reviews', './routes/dashboard/reviews.tsx'),
      ]),
    ]),
    route('profile/:username', './routes/profile.tsx'),
    route('ideas/:id', './routes/ideas/idea.tsx'),
    route('ideas', './routes/ideas/ideas.tsx'),
    route('*', './routes/not-found.tsx'),
  ]),
] satisfies RouteConfig;
```

[ The configuration ]{#kobo.1793.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a1f6c1a2 .index-entry index-entry="page layouts:adding"} [ is quite straightforward, but there are a couple of things we didn\'t cover earlier: ]{#kobo.1794.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ The ]{#kobo.1795.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` prefix `{.inlineCode}]{#kobo.1796.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ function is used to group routes under a common path prefix. ]{#kobo.1797.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ All routes inside ]{#kobo.1798.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` prefix('dashboard', [...]) `{.inlineCode}]{#kobo.1799.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ will start with ]{#kobo.1800.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` /dashboard `{.inlineCode}]{#kobo.1801.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.1802.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The ]{#kobo.1803.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` index `{.inlineCode}]{#kobo.1804.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ function is used to define the default route for a path. ]{#kobo.1805.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For example, ]{#kobo.1806.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` index('routes/home.tsx') `{.inlineCode}]{#kobo.1807.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ renders the home page when the URL is ]{#kobo.1808.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` / `{.inlineCode}]{#kobo.1809.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.1810.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The ]{#kobo.1811.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` * `{.inlineCode}]{#kobo.1812.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ route is used to define the catch-all route. ]{#kobo.1813.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It matches any URL that doesn\'t match a previous route and renders the not found page. ]{#kobo.1814.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In case we have too many routes and the configuration becomes complex, we can compose them in the following way: ]{#kobo.1815.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
const dashboardRoutes = [/* ... */];
const profileRoutes = [/* ... */];
const ideasRoutes = [/* ... */];

const rootRoutes = [
  index('routes/home.tsx'),
  route('about', './routes/about.tsx'),
  ...dashboardRoutes,
  ...profileRoutes,
  ...ideasRoutes,
route('*', './routes/not-found.tsx'),
];
```

[ Now we have all the ]{#kobo.1849.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ad0e9ce8 .index-entry index-entry="page layouts:adding"} [ pages of the application configured and ready to be used. ]{#kobo.1850.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Summary ]{#kobo.1851.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_164 .heading-1}

[ In this chapter, we explored routing and rendering strategies in React Router, covering the essential architectural decisions for building modern React applications. ]{#kobo.1852.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We started by learning how to configure routes using the ]{#kobo.1853.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` route `{.inlineCode}]{#kobo.1854.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ function in ]{#kobo.1855.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` src/app/routes.ts `{.inlineCode}]{#kobo.1856.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , including dynamic routes with parameters. ]{#kobo.1857.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We then covered navigation between pages using the ]{#kobo.1858.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Link `{.inlineCode}]{#kobo.1859.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.1860.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` NavLink `{.inlineCode}]{#kobo.1861.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ components for declarative navigation, and the ]{#kobo.1862.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` useNavigate `{.inlineCode}]{#kobo.1863.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ hook for programmatic navigation. ]{#kobo.1864.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We explored four rendering strategies, each suited for different use cases: ]{#kobo.1865.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Server-side rendering ]{#kobo.1866.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.1867.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ SSR ]{#kobo.1868.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ) generates page content on the server for each request. ]{#kobo.1869.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We used SSR for the idea detail page because it needs fresh data, good SEO, and immediate content visibility. ]{#kobo.1870.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This approach is ideal for public pages with dynamic content that changes frequently. ]{#kobo.1871.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Client-side rendering ]{#kobo.1872.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.1873.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ CSR ]{#kobo.1874.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ) loads minimal HTML and fetches data using JavaScript after the page loads. ]{#kobo.1875.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We used CSR for the dashboard pages because they\'re behind authentication, don\'t need SEO, and benefit from reduced server load. ]{#kobo.1876.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This approach is perfect for authenticated pages where SEO doesn\'t matter. ]{#kobo.1877.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Hybrid rendering ]{#kobo.1878.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.1879.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ SSR + CSR ]{#kobo.1880.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ) combines both strategies to get the best of both worlds. ]{#kobo.1881.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We used hybrid rendering for the profile page, loading critical profile data on the server for SEO while fetching ideas and reviews on the client for progressive enhancement. ]{#kobo.1882.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This approach works well for public pages that need both immediate content and additional client-side interactivity. ]{#kobo.1883.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Static pre-rendering generates HTML at build time for pages with static content. ]{#kobo.1884.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We configured the home and about pages to be pre-rendered using the ]{#kobo.1885.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` prerender `{.inlineCode}]{#kobo.1886.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ function in ]{#kobo.1887.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` react‑router.config.ts `{.inlineCode}]{#kobo.1888.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.1889.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This approach is ideal for marketing pages and content that doesn\'t change frequently. ]{#kobo.1890.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We then added SEO optimization by creating a reusable ]{#kobo.1891.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Seo `{.inlineCode}]{#kobo.1892.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component that adds ]{#kobo.1893.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` title `{.inlineCode}]{#kobo.1894.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.1895.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` meta `{.inlineCode}]{#kobo.1896.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ tags to pages, improving search engine rankings for our application. ]{#kobo.1897.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Finally, we implemented page layouts to provide consistent navigation across the application. ]{#kobo.1898.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We created a root layout with top-level navigation and a dashboard layout with dashboard-specific navigation, using the ]{#kobo.1899.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` layout `{.inlineCode}]{#kobo.1900.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ function and ]{#kobo.1901.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` <Outlet /> `{.inlineCode}]{#kobo.1902.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component to render shared UI elements. ]{#kobo.1903.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By understanding these routing and rendering patterns, we can make informed architectural decisions about how to build performant, SEO-friendly, and user-friendly React applications. ]{#kobo.1904.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The key is matching the rendering strategy to the specific requirements of each page: SEO needs, authentication requirements, data freshness, and user experience goals. ]{#kobo.1905.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Get this book\'s PDF copy, code bundle, and more ]{#kobo.1906.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_165 .heading-1}

[ Scan the QR code (or go to ]{#kobo.1907.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.1908.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ ). ]{#kobo.1909.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search for this book by name, confirm the edition, and then follow the steps on the page. ]{#kobo.1910.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_4_16.png" original-image-title="" style="width:25%;"} ]{#kobo.1911.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_4_17.png" original-image-title="" style="width:25%;"} ]{#kobo.1912.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[ Note: Have your invoice handy. ]{#kobo.1913.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Purchases made directly from the Packt website don ]{#kobo.1914.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ \' ]{#kobo.1915.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ t require an invoice. ]{#kobo.1916.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}*
:::
