::: {.section .chapter}
# [ 5 ]{#kobo.1.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_166 .chapterNumber}

# [ Communicating with the API ]{#kobo.2.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_167 .chapterTitle}

[ Every modern application needs to communicate with a backend API to fetch data, submit forms, and keep content up to date. ]{#kobo.3.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ While routing shows users the right page, the API layer provides the actual content for those pages. ]{#kobo.4.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Setting this up with type safety, caching, and error handling makes our application easier to develop and maintain. ]{#kobo.5.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll cover the following topics: ]{#kobo.6.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Creating an API client ]{#kobo.7.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Generating TypeScript types and validation schemas from OpenAPI specification ]{#kobo.8.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Setting up React Query ]{#kobo.9.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Creating the API layer for the application ]{#kobo.10.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Integrating with the application ]{#kobo.11.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By the end of this chapter, we\'ll have a complete API layer with automatic type safety, caching, and seamless integration with both server-side and client-side rendering. ]{#kobo.12.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Technical requirements ]{#kobo.13.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_168 .heading-1}

[ Before we get started, we need to set up our project. ]{#kobo.14.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To develop our project, we need the following tools installed on our computer: ]{#kobo.15.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Node.js version 24 or above. ]{#kobo.16.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ npm version 11 or above ships with Node. ]{#kobo.17.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can confirm this by executing ]{#kobo.18.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` node ‑v `{.inlineCode}]{#kobo.19.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.20.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` npm ‑v `{.inlineCode}]{#kobo.21.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ in the terminal. ]{#kobo.22.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There are multiple ways to install Node.js and npm. ]{#kobo.23.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here is a helpful article that goes into more detail: ]{#kobo.24.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js ]{#kobo.25.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js){style="text-decoration: none;"} [ . ]{#kobo.26.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ VS Code ]{#kobo.27.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ (optional), a popular editor for JavaScript and TypeScript. ]{#kobo.28.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It is open source, has solid TypeScript support, and offers many extensions. ]{#kobo.29.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It can be downloaded from ]{#kobo.30.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://code.visualstudio.com ]{#kobo.31.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://code.visualstudio.com){style="text-decoration: none;"} [ . ]{#kobo.32.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The code for this book is available at the book\'s repo. ]{#kobo.33.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To access the repository link, follow the steps in the \" ]{#kobo.34.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Download the example code files ]{#kobo.35.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ \" section in the ]{#kobo.36.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Preface ]{#kobo.37.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ . ]{#kobo.38.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Clone it and enter the repository root: ]{#kobo.39.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

[ The repository contains chapter folders with the code for each chapter, along with a shared ]{#kobo.41.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` api `{.inlineCode}]{#kobo.42.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ folder that includes the API server used across all chapters. ]{#kobo.43.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We are working on ]{#kobo.44.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Chapter ]{#kobo.45.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ 5 ]{#kobo.46.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , so navigate to the ]{#kobo.47.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` chapter‑05 `{.inlineCode}]{#kobo.48.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.49.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/chapter-05
```

[ Next, install the dependencies: ]{#kobo.51.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm install
```

[ We also need to provide the environment variables: ]{#kobo.53.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cp .env.example .env
```

[ At this point, the frontend should be ready and running at ]{#kobo.55.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:5173 ]{#kobo.56.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:5173){style="text-decoration: none;"} [ . ]{#kobo.57.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We also need to run the API server. ]{#kobo.58.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Open a new terminal window and navigate to the ]{#kobo.59.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` api `{.inlineCode}]{#kobo.60.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.61.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/api
```

[ Run the setup script for ]{#kobo.63.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[[ Chapter 5 ]{#kobo.64.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_5.xhtml#h1_166){.chapref}* [ to configure everything: ]{#kobo.65.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run setup 05
```

[ Then start the API server: ]{#kobo.67.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run dev
```

[ The API server should now be running on ]{#kobo.69.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:9999 ]{#kobo.70.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:9999){style="text-decoration: none;"} [ . ]{#kobo.71.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For more information about the setup details, check out the ]{#kobo.72.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` README.md `{.codeHighlighted}]{#kobo.73.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file. ]{#kobo.74.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Creating API client ]{#kobo.75.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_169 .heading-1}

[ Every ]{#kobo.76.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_207f6812 .index-entry index-entry="API client:creating"} [ application needs a way to communicate with its backend API. ]{#kobo.77.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In modern browsers, we can use the ]{#kobo.78.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` fetch `{.codeHighlighted}]{#kobo.79.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ API to make HTTP requests, and while we could use ]{#kobo.80.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` fetch `{.codeHighlighted}]{#kobo.81.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ directly, that would mean defining base URLs, headers, error handling, and request formatting in every request. ]{#kobo.82.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of doing that, we\'ll build a centralized API client that defines these things once and provides a clean interface for it to be used throughout the application. ]{#kobo.83.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ An API client is just a wrapper around the ]{#kobo.84.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` fetch `{.codeHighlighted}]{#kobo.85.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ API that provides a consistent interface for making HTTP requests. ]{#kobo.86.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It will abstract away some repetitive things we need to do for every request such as setting the base URL, headers, and error handling. ]{#kobo.87.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s start by defining which parameters we need to pass to the API client: ]{#kobo.88.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/lib/api.ts

type RequestOptions<TBody = unknown> = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: TBody;
  params?: Record<string, string | number | boolean | undefined | null>;
};
```

[ The wrapper will expect the URL of the request and the options object that contains the following parameters: ]{#kobo.137.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ The method of the request which can be one of the following: ]{#kobo.138.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` GET `{.codeHighlighted}]{#kobo.139.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.140.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` POST `{.codeHighlighted}]{#kobo.141.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.142.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` PUT `{.codeHighlighted}]{#kobo.143.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.144.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` PATCH `{.codeHighlighted}]{#kobo.145.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.146.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` DELETE `{.codeHighlighted}]{#kobo.147.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.148.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The headers of the request which can be a record of key-value pairs. ]{#kobo.149.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The body of the request. ]{#kobo.150.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The parameters of the request, which can be a record of key-value pairs. ]{#kobo.151.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These are the query parameters (e.g. ]{#kobo.152.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ ]{#kobo.153.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ?page=1&limit=10 `{.codeHighlighted}]{#kobo.154.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ ). ]{#kobo.155.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end}

[ Now let\'s see what our wrapper looks like: ]{#kobo.156.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/lib/api.ts

import { env } from '@/config/env';

async function fetchApi<T, TBody = unknown>(
  url: string,
  options: RequestOptions<TBody> = {},
): Promise<T> {
  const { method = 'GET', headers = {}, body, params } = options;

  const fullUrl = new URL(url, env.API_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) {
        fullUrl.searchParams.set(key, String(value));
      }
    });
  }

  const makeRequest = async (): Promise<Response> => {
    try {
      return await fetch(fullUrl, {
        method,
        headers: {
          Accept: 'application/json',
          ...(body ? { 'Content-Type': 'application/json' } : {}),
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (error) {
      if (error instanceof TypeError) {
        const networkError = new Error(
          'Network error. Please check your connection.',
        );

        throw networkError;
      }
      throw error;
    }
  };

  let response = await makeRequest();

  // ...
}
```

[ Sending the ]{#kobo.270.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_26079dd4 .index-entry index-entry="API client:creating"} [ request is pretty straightforward. ]{#kobo.271.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We use params (if provided) to form the full URL of the request by appending the query parameters to the base URL. ]{#kobo.272.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We also set some default headers such as ]{#kobo.273.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Accept: application/json `{.codeHighlighted}]{#kobo.274.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.275.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Content-Type: application/json `{.codeHighlighted}]{#kobo.276.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ if the body is present. ]{#kobo.277.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We also make sure the body is stringified before being sent to the API because the API server expects it to be a JSON object. ]{#kobo.278.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s see how we handle the response: ]{#kobo.279.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/lib/api.ts

// ...

async function fetchApi<T, TBody = unknown>(
  url: string,
  options: RequestOptions<TBody> = {},
): Promise<T> {

  // ...

  let response = await makeRequest();

  if (!response.ok) {
    let message = response.statusText;
    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {
 // response body may not be JSON, use the statusText as the message instead
    }

    throw new Error(message);
  }

  try {
    return await response.json();
  } catch {
    throw new Error('Invalid response from server');
  }
}
```

[ If the ]{#kobo.342.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_35c3c8e4 .index-entry index-entry="API client:creating"} [ response is not successful, we handle it properly. ]{#kobo.343.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If everything is fine, we return the JSON response. ]{#kobo.344.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The ]{#kobo.345.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` fetchApi `{.codeHighlighted}]{#kobo.346.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ function is the ]{#kobo.347.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a3ac3fc5 .index-entry index-entry="API client:fetchApi function"} [ core of our API client. ]{#kobo.348.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It handles the actual HTTP request and response, error handling, etc, but we won\'t be using it directly in our application. ]{#kobo.349.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead, we\'ll use a more convenient interface that is easier to use and understand. ]{#kobo.350.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/lib/api.ts

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'GET' });
  },
  post<T, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: RequestOptions,
  ): Promise<T> {
    return fetchApi<T, TBody>(url, { ...options, method: 'POST', body });
  },
  put<T, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: RequestOptions,
  ): Promise<T> {
    return fetchApi<T, TBody>(url, { ...options, method: 'PUT', body });
  },
  patch<T, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: RequestOptions,
  ): Promise<T> {
    return fetchApi<T, TBody>(url, { ...options, method: 'PATCH', body });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'DELETE' });
  },
};
```

[ This object provides a simple interface with methods for each HTTP verb: ]{#kobo.467.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` get `{.codeHighlighted}]{#kobo.468.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.469.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` post `{.codeHighlighted}]{#kobo.470.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.471.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` put `{.codeHighlighted}]{#kobo.472.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.473.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` patch `{.codeHighlighted}]{#kobo.474.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , and ]{#kobo.475.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` delete `{.codeHighlighted}]{#kobo.476.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.477.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each method wraps the ]{#kobo.478.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` fetchApi `{.codeHighlighted}]{#kobo.479.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ function and passes the appropriate HTTP method. ]{#kobo.480.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This makes our API calls ]{#kobo.481.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_8e5d1ed5 .index-entry index-entry="API client:creating"} [ cleaner and more readable throughout the application. ]{#kobo.482.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now if we want to use the API client in our application, we can do it like this: ]{#kobo.483.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
import { api } from '@/lib/api';

const idea = await api.get<Idea>('/ideas/1');

const newIdea = await api.post<Idea>('/ideas', { title: 'New Idea' });
```

[ What\'s great with this approach is that we can control which parameters we pass to ]{#kobo.509.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` fetchApi `{.codeHighlighted}]{#kobo.510.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ for each method. ]{#kobo.511.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For example, there is not much point in passing the body to the ]{#kobo.512.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` get `{.codeHighlighted}]{#kobo.513.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ method since it shouldn\'t have a body. ]{#kobo.514.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This way, every method is type-safe and we can\'t pass the wrong parameters. ]{#kobo.515.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With our API client in place, we need to ensure the data we send and receive matches what the backend expects. ]{#kobo.516.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s see how we can generate TypeScript types from the API specification to keep everything in sync. ]{#kobo.517.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Generating TypeScript types and validation schemas from OpenAPI specifications ]{#kobo.518.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_170 .heading-1}

[ When our data ]{#kobo.519.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b376f19b .index-entry index-entry="TypeScript types:generating, from OpenAPI specifications"} [ comes from the API, there is no way for TypeScript to know what the data is. ]{#kobo.520.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ While we could manually define types for what gets returned from the API, there is no guarantee that the data is always correct. ]{#kobo.521.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For example, if a property is added or removed from an API response object, our frontend application would not know about that which could break the application. ]{#kobo.522.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To make our API calls type-safe, we need to provide proper types for the request and response data. ]{#kobo.523.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ What is OpenAPI and why generate types? ]{#kobo.524.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_171 .heading-2}

[ OpenAPI is ]{#kobo.525.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_3011534a .index-entry index-entry="OpenAPI"} [ a standard format for describing REST APIs. ]{#kobo.526.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Our backend provides an OpenAPI specification at the ]{#kobo.527.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ${API_URL}/doc `{.codeHighlighted}]{#kobo.528.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ endpoint that lists every endpoint, the data it accepts, and what it returns. ]{#kobo.529.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Instead of manually writing and maintaining types for every endpoint, we generate them from the OpenAPI specification. ]{#kobo.530.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This keeps our frontend types in sync with the backend automatically. ]{#kobo.531.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the API changes, we regenerate the types and TypeScript will tell us exactly what needs to be updated. ]{#kobo.532.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Instead of manually writing and maintaining types for every endpoint, we generate them from the OpenAPI specification. ]{#kobo.533.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This gives us a contract between the backend and the frontend that keeps our frontend types in sync with the backend automatically. ]{#kobo.534.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the API changes, we regenerate the types and TypeScript will tell us exactly what needs to be updated. ]{#kobo.535.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This contract is only as reliable as the spec itself, though. ]{#kobo.536.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It is important that the backend keeps the OpenAPI spec accurate and up to date, otherwise the generated types will be misleading. ]{#kobo.537.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Configuring type generation ]{#kobo.538.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_172 .heading-2}

[ To ]{#kobo.539.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1c1e34cc .index-entry index-entry="type generation:configuring"} [ generate types from the OpenAPI specification, we use the ]{#kobo.540.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` @hey-api/openapi-ts `{.codeHighlighted}]{#kobo.541.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` `{.codeHighlighted}]{#kobo.542.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ package. ]{#kobo.543.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ First, let\'s set up the configuration for the generator tool in ]{#kobo.544.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` openapi-ts.config.ts `{.codeHighlighted}]{#kobo.545.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : ]{#kobo.546.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// openapi-ts.config.ts

export default {
  input: `${process.env.VITE_API_URL}/doc`,
  output: {
    format: 'prettier', // Run prettier to format the generated code.
    path: './src/types/generated', // Output directory for the generated types.
  },
  plugins: [
    {
      name: '@hey-api/typescript', // Generate TypeScript types.
      exportFromIndex: false,
    },
    'zod', // We can also generate runtime validation schemas with Zod.
  ],
};
```

[ To run the generator, we can use the following command: ]{#kobo.585.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run generate:openapi
```

[ It is defined in the ]{#kobo.587.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` package.json `{.codeHighlighted}]{#kobo.588.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file as follows: ]{#kobo.589.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// package.json
"generate:openapi": "dotenv -e .env -- openapi-ts"
```

[ Once we run the command, we can find TypeScript types generated in the ]{#kobo.594.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` src/types/generated/types.gen.ts `{.codeHighlighted}]{#kobo.595.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file: ]{#kobo.596.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/types/generated/types.gen.ts

// ...

export type User = {
  id: string;
  email: string;
  username: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export type Idea = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  tags: Array<string>;
  authorId: string;
  author: UserSummary;
  reviewsCount: number;
  avgRating: number | null;
  createdAt: string;
  updatedAt: string;
};


export type Review = {
  id: string;
  content: string;
  rating: number;
  authorId: string;
  author: UserSummary;
  ideaId: string;
  idea?: IdeaSummary;
  createdAt: string;
  updatedAt: string;
};

// ...
```

[ These generated ]{#kobo.720.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7b26befc .index-entry index-entry="type generation:configuring"} [ types describe the data structures our API returns. ]{#kobo.721.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The generator creates a type for each request body, response, and data model defined in the OpenAPI specification. ]{#kobo.722.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In addition to TypeScript types, we can also generate validation schemas with Zod that can be used to validate the data at runtime. ]{#kobo.723.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can find the Zod schemas generated in the ]{#kobo.724.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` src/types/generated/zod.gen.ts `{.codeHighlighted}]{#kobo.725.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file: ]{#kobo.726.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/types/generated/zod.gen.ts

// ...

export const zUser = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  bio: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const zReview = z.object({
  id: z.string(),
  content: z.string(),
  rating: z.number(),
  authorId: z.string(),
  author: zUserSummary,
  ideaId: z.string(),
  idea: z.optional(zIdeaSummary),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ...
```

[ These ]{#kobo.798.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_77449762 .index-entry index-entry="type generation:configuring"} [ schemas mirror the TypeScript types but provide runtime validation. ]{#kobo.799.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can use them to verify that the data we receive from the API matches what we expect, catching issues that TypeScript alone cannot detect at runtime. ]{#kobo.800.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ They can be used to validate the data at runtime like this: ]{#kobo.801.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
const idea = zIdea.parse(idea);
```

[ If the data is not valid, the Zod schema will throw a validation error. ]{#kobo.806.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We don\'t need to worry about this yet; we will see how these validation schemas are used when we start building the API layer and forms. ]{#kobo.807.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ NOTE: We still need to remember to run the generator command manually to generate the types since the types could still go out of sync if the API changes and we forget to regenerate the types. ]{#kobo.808.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We could solve this with the help of a CI/CD pipeline. ]{#kobo.809.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will cover CI/CD in the future chapters, but here is a brief overview of how we can solve this problem: ]{#kobo.810.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ If the frontend and backend apps are in the same repository, we can configure our CI/CD pipeline to automatically generate types whenever the API specification changes. ]{#kobo.811.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The typecheck step in CI will then verify that the frontend code is compatible with the new types. ]{#kobo.812.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If the API changes break existing frontend code, the typecheck will fail, preventing the merge and alerting us to fix the breaking changes. ]{#kobo.813.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can visualize this process like this: ]{#kobo.814.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.815.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_5_1.png" data-original-image-title="" style="width:528.0px; height:485.47219144693105px;">Figure 5.1 – Flow when backend and frontend are in the same repository</span> </span>
</figure>

[ Figure 5.1 -- Flow when backend and frontend are in the same repository ]{#kobo.816.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ If they are in ]{#kobo.817.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c1534def .index-entry index-entry="type generation:configuring"} [ different repositories, we can configure a CI/CD pipeline in the backend repo to trigger CI/CD in the frontend repository whenever the API specification changes. ]{#kobo.818.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This workflow would generate the updated TypeScript types and create a pull request. ]{#kobo.819.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The frontend\'s CI pipeline will then run typechecking and tests on this PR, catching any breaking changes. ]{#kobo.820.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can review the PR to see the changes and fix any breaking changes before merging. ]{#kobo.821.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here is how that would look like: ]{#kobo.822.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.823.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_5_2.png" data-original-image-title="" style="width:528.0px; height:449.4961223133171px;">Figure 5.2 – Flow when backend and frontend are in different repositories</span> </span>
</figure>

[ Figure 5.2 -- Flow when backend and frontend are in different repositories ]{#kobo.824.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With our types ]{#kobo.825.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7e48a1ea .index-entry index-entry="type generation:configuring"} [ and validation schemas generated and always in sync with the backend, we have a good foundation to build type-safe and validated API calls. ]{#kobo.826.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Next, we need to set up React Query to manage how we fetch and cache this data. ]{#kobo.827.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Setting up React Query ]{#kobo.828.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_173 .heading-1}

[ When making API calls in React applications, we have a lot of things to handle such as loading states, error handling, caching, request deduplication, and more. ]{#kobo.829.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This is where React Query comes in to simplify the process of handling server state. ]{#kobo.830.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Why React Query? ]{#kobo.831.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_174 .heading-2}

**[ React Query ]{#kobo.832.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is a ]{#kobo.833.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7661b53e .index-entry index-entry="React Query"} [ library that manages asynchronous state in React applications. ]{#kobo.834.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Without it, we would need to manually track loading states, handle errors, implement caching, prevent duplicate requests, and decide when to refetch data. ]{#kobo.835.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React Query handles all of this for us automatically, letting us focus on building features instead of reinventing the wheel with our own solution. ]{#kobo.836.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Configuring React Query for the application ]{#kobo.837.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_175 .heading-2}

[ React Query ]{#kobo.838.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9076f291 .index-entry index-entry="React Query:configuring, for application"} [ needs a ]{#kobo.839.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` QueryClient `{.inlineCode}]{#kobo.840.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ instance to manage queries. ]{#kobo.841.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'ll create a function that configures the client with sensible defaults for our application: ]{#kobo.842.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/lib/react-query.ts

import { QueryClient, type QueryClientConfig } from '@tanstack/react-query';

export function createQueryClient(config: Partial<QueryClientConfig> = {}) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
    ...config,
  });
}
```

[ We set a stale time of 60 seconds, meaning data stays fresh for one minute before React Query considers refetching it. ]{#kobo.880.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now we ]{#kobo.881.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f5aede74 .index-entry index-entry="React Query:configuring, for application"} [ need to make the QueryClient available to our entire application by wrapping our routes in the ]{#kobo.882.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` QueryClientProvider `{.codeHighlighted}]{#kobo.883.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : ]{#kobo.884.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/root.tsx

import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Outlet } from 'react-router';

import { createQueryClient } from '@/lib/react-query';

export default function App() {
  const [queryClient] = useState(() => createQueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
```

[ We create the QueryClient instance once using the ]{#kobo.940.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useState `{.codeHighlighted}]{#kobo.941.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook with a lazy initializer. ]{#kobo.942.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This ensures the client is created only once and persists for the lifetime of the application. ]{#kobo.943.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.944.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` QueryClientProvider `{.codeHighlighted}]{#kobo.945.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ makes the client available within the application via the ]{#kobo.946.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useQueryClient `{.codeHighlighted}]{#kobo.947.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook. ]{#kobo.948.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With React Query configured, our application now has the infrastructure to handle server state efficiently. ]{#kobo.949.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The next step is to build our API layer, the functions and hooks that will fetch and mutate data throughout our application. ]{#kobo.950.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Creating API layer for the application ]{#kobo.951.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_176 .heading-1}

[ Now that we ]{#kobo.952.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_20cce263 .index-entry index-entry="API layer, for application:creating"} [ have our API client and React Query set up, we can build the actual API layer that our application will use. ]{#kobo.953.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Before we start building the API layer, we need to organize the query keys. ]{#kobo.954.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Organizing query keys ]{#kobo.955.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_177 .heading-2}

[ React Query ]{#kobo.956.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0993bf79 .index-entry index-entry="API layer, for application:query keys, organizing"} [ uses query keys to identify and cache queries. ]{#kobo.957.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each unique key represents a unique piece of data in the cache. ]{#kobo.958.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We could define these keys inline in each query, but organizing them in one place makes them easier to manage and reuse. ]{#kobo.959.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s look at the query keys for the ideas feature: ]{#kobo.960.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/config/query-keys.ts

import type { GetAllIdeasData } from '@/types/generated/types.gen';

export const ideasQueryKeys = {
  all: ['ideas'] as const,
  lists: () => [...ideasQueryKeys.all, 'list'] as const,
  list: (params?: GetAllIdeasData['query']) =>
    [...ideasQueryKeys.lists(), params] as const,
  details: () => [...ideasQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...ideasQueryKeys.details(), id] as const,
  current: () => [...ideasQueryKeys.all, 'current'] as const,
  byUser: (username: string) =>
    [...ideasQueryKeys.all, 'user', username] as const,
  tags: () => [...ideasQueryKeys.all, 'tags'] as const,
} as const;
```

[ This structure ]{#kobo.1068.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_79948fb8 .index-entry index-entry="API layer, for application:query keys, organizing"} [ follows a pattern where we start from a root key ( ]{#kobo.1069.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ideas `{.codeHighlighted}]{#kobo.1070.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ ) and compose more specific keys for different types of queries. ]{#kobo.1071.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For example, ]{#kobo.1072.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` detail(id) `{.codeHighlighted}]{#kobo.1073.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ creates a key like ]{#kobo.1074.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ['ideas', 'detail', '123'] `{.codeHighlighted}]{#kobo.1075.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.1076.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This makes it easy to invalidate related queries, we can invalidate all idea lists by targeting ]{#kobo.1077.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ideasQueryKeys.lists() `{.codeHighlighted}]{#kobo.1078.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , or just a specific detail by targeting ]{#kobo.1079.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ideasQueryKeys.detail(id) `{.codeHighlighted}]{#kobo.1080.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.1081.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We are now ready to define our queries. ]{#kobo.1082.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Defining queries ]{#kobo.1083.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_178 .heading-2}

[ Each ]{#kobo.1084.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f6350df4 .index-entry index-entry="API layer, for application:queries, defining"} [ query follows the same pattern: a fetcher function that makes the API call, query options that configure the query, and a custom hook that makes it easy to use. ]{#kobo.1085.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s see this pattern in action by fetching an idea by its ID: ]{#kobo.1086.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/api/get-idea-by-id.ts
import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { GetIdeaByIdResponse } from '@/types/generated/types.gen';
import {
  zGetIdeaByIdData,
  zGetIdeaByIdResponse,
} from '@/types/generated/zod.gen';
import { ideasQueryKeys } from '../config/query-keys';

// Fetcher function for making API call to fetch an idea by its ID
export async function getIdeaById(id: string): Promise<GetIdeaByIdResponse> {
  // Validate input data using the Zod schema
  // In this example, we need to validate the path parameter `id`
  // If it is not provided, the Zod schema will throw a validation error.
  const validatedData = zGetIdeaByIdData.parse({ path: { id } });

  // Make the API request
  const response = await api.get<GetIdeaByIdResponse>(
    `/ideas/${validatedData.path.id}`,
  );

  // Validate response data using the Zod schema
  // In this example, we need to validate the response data
  return zGetIdeaByIdResponse.parse(response);
}

// Query options factory for the query
export function getIdeaByIdQueryOptions(id: string) {
  return queryOptions({
    queryKey: ideasQueryKeys.detail(id), // Use the query key from the query keys
    queryFn: () => getIdeaById(id), // Use the fetcher function to fetch the data
  });
}

// Custom hook for fetching an idea by ID that returns the query
export function useIdeaByIdQuery({
  id,
  options,
}: {
  id: string;
  options?: Omit<
    ReturnType<typeof getIdeaByIdQueryOptions>,
    'queryKey' | 'queryFn'
  >;
}) {
  return useQuery({
    ...getIdeaByIdQueryOptions(id), // Using the query options factory to create the query
    ...options, // Allowing to override the query options
  });
}
```

[ This pattern ]{#kobo.1217.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9d16c3af .index-entry index-entry="API layer, for application:queries, defining"} [ gives us three things: a fetcher function that handles the API call and validation, a query options factory that configures the query, and a custom hook that allows us to use the query in components. ]{#kobo.1218.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The options parameter allows components to override specific settings like enabling or disabling the query. ]{#kobo.1219.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s see how mutations work for operations that modify data on the server. ]{#kobo.1220.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Defining mutations ]{#kobo.1221.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_179 .heading-2}

[ Mutations ]{#kobo.1222.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_3f382204 .index-entry index-entry="API layer, for application:mutations, defining"} [ are for operations that modify data on the server. ]{#kobo.1223.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They follow the same pattern as queries: a fetcher function, mutation options, and a custom hook. ]{#kobo.1224.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here\'s how we create a new idea: ]{#kobo.1225.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/api/create-idea.ts

import {
  mutationOptions,
  useMutation,
  type UseMutationOptions,
} from '@tanstack/react-query';

import { api } from '@/lib/api';
import type {
  CreateIdeaData,
  CreateIdeaResponse,
} from '@/types/generated/types.gen';
import {
  zCreateIdeaData,
  zCreateIdeaResponse,
} from '@/types/generated/zod.gen';

// Fetcher function for making API call to create an idea
export async function createIdea(
  data: CreateIdeaData['body'],
): Promise<CreateIdeaResponse> {
  // Validate input data using the Zod schema
  // In this example, we need to validate the body of the request
  // If it is not provided, the Zod schema will throw a validation error.
  const validatedData = zCreateIdeaData.parse({ body: data });

  // Make the API request
  const response = await api.post<CreateIdeaResponse>(
    '/ideas',
    validatedData.body,
  );

  // Validate response data using the Zod schema
  // In this example, we need to validate the response data
  return zCreateIdeaResponse.parse(response);
}

// Mutation options factory for the mutation
export function getCreateIdeaMutationOptions() {
  return mutationOptions({
    mutationFn: createIdea,
  });
}

// Custom hook for creating an idea that returns the mutation
export function useCreateIdeaMutation({
  options,
}: {
  options?: Omit<
    UseMutationOptions<CreateIdeaResponse, Error, CreateIdeaData['body']>,
    'mutationFn'
  >;
}) {
  return useMutation({
    ...getCreateIdeaMutationOptions(), // Using the mutation options factory to create the mutation
    ...options, // Allowing to override the mutation options
  });
}
```

[ The mutation ]{#kobo.1339.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7c9dfbd5 .index-entry index-entry="API layer, for application:mutations, defining"} [ pattern follows the same structure as queries: a fetcher function, mutation options factory, and a custom hook. ]{#kobo.1340.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The key difference is that mutations are for operations that change data, like creating, updating, or deleting resources. ]{#kobo.1341.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Unlike queries, mutations don\'t run automatically. ]{#kobo.1342.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We trigger them by calling the ]{#kobo.1343.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` mutate `{.codeHighlighted}]{#kobo.1344.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ method, which we will see in action in a moment. ]{#kobo.1345.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now that we have our API layer defined, we can integrate it into our application. ]{#kobo.1346.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Integrating with the application ]{#kobo.1347.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_180 .heading-1}

[ We\'ve built ]{#kobo.1348.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f5147c57 .index-entry index-entry="API layer, integrating with application"} [ all the pieces: the API client, generated types, React Query configuration, and our API layer. ]{#kobo.1349.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Now it\'s time to put it all together and see how these pieces work in different rendering scenarios. ]{#kobo.1350.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Queries ]{#kobo.1351.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_181 .heading-2}

[ We can use ]{#kobo.1352.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0346485c .index-entry index-entry="API layer, integrating with application:queries"} [ our API layer on the client or the server side. ]{#kobo.1353.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s explore how. ]{#kobo.1354.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Client-side usage ]{#kobo.1355.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_182 .heading-3}

[ The ]{#kobo.1356.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a145fa2b .index-entry index-entry="queries:client-side usage"} [ simplest way to use React Query is on the client side. ]{#kobo.1357.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We call a custom hook in our component, and React Query fetches the data, manages the cache, and provides loading and error states. ]{#kobo.1358.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here\'s how we fetch the current user\'s ideas: ]{#kobo.1359.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/dashboard/ideas/ideas.tsx

import { useCurrentUserIdeasQuery } from '@/features/ideas/api/get-current-user-ideas';
import { IdeasList } from '@/features/ideas/components/ideas-list';


export default function MyIdeasPage() {
  const ideasQuery = useCurrentUserIdeasQuery(); // Use the custom hook to use the query
  const ideas = ideasQuery.data?.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* More UI code here */}
        <IdeasList
          ideas={ideas}
          isLoading={ideasQuery.isLoading} // Show loading state while the query is loading
          emptyMessage="You haven't created any ideas yet."
          error={ideasQuery.error} // Show error state if the query fails
        />
      </div>
    </div>
  );
}
```

[ The hook returns a query object that contains ]{#kobo.1442.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` data `{.codeHighlighted}]{#kobo.1443.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.1444.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` isLoading `{.codeHighlighted}]{#kobo.1445.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , and ]{#kobo.1446.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` error `{.codeHighlighted}]{#kobo.1447.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ properties. ]{#kobo.1448.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React Query handles all the complexity, fetches the data, manages the loading state, caches the result, and handles errors. ]{#kobo.1449.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We just need to display the data in our component. ]{#kobo.1450.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This works great for client-side data fetching. ]{#kobo.1451.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But what if we need to fetch data on the server and send it to the client for better performance and SEO? ]{#kobo.1452.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Server-side usage ]{#kobo.1453.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_183 .heading-3}

[ For ]{#kobo.1454.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_dd9f079c .index-entry index-entry="queries:server-side usage"} [ server-side rendering, we fetch data in the loader function and pass it to the query as initial data. ]{#kobo.1455.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This gives us the benefits of SSR while still using React Query. ]{#kobo.1456.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here\'s how we fetch an idea and its reviews on the server: ]{#kobo.1457.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/ideas/idea.tsx

import {
  getReviewsByIdea,
  useReviewsByIdeaQuery,
} from '@/features/reviews/api/get-reviews-by-idea';


import type { Route } from './+types/idea';

// We are using the loader function to fetch the data on the server side
export async function loader({ params }: Route.LoaderArgs) {
  const [idea, reviews] = await Promise.all([
    getIdeaById(params.id),
    getReviewsByIdea(params.id),
  ]);
  return routerData({
    idea,
    reviews,
    error: null,
    meta: {
      title: idea.title,
      description: idea.shortDescription,
    },
  });
}

export default function IdeaDetailPage({
  params,
  loaderData, // We are receiving the data from the loader function
}: Route.ComponentProps) {
  const ideaId = params.id as string;
  const user = useUser();

  const ideaQuery = useIdeaByIdQuery({
    id: ideaId,
    options: {
       // Use the data from the loader function as initial data
      ...(loaderData?.idea && { initialData: loaderData.idea }),
    },
  });
  const idea = ideaQuery?.data;

  const reviewsQuery = useReviewsByIdeaQuery({
    id: ideaId,
    options: {
       // Use the data from the loader function as initial data
      ...(loaderData?.reviews && { initialData: loaderData.reviews }),
    },
  });

  // more code here...
}

export function ErrorBoundary({ error }: { error: Error }) {
  // ...
}
```

[ In this approach, we fetch the data in the loader function and pass it as ]{#kobo.1570.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` initialData `{.codeHighlighted}]{#kobo.1571.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to the query. ]{#kobo.1572.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This gives us server-side rendering while still using React Query for all its benefits. ]{#kobo.1573.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The query uses the initial data immediately, then React Query takes over for any refetching or updates. ]{#kobo.1574.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If any of the queries fail, we can handle ]{#kobo.1575.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_03858e56 .index-entry index-entry="queries:server-side usage"} [ the errors in the ]{#kobo.1576.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ErrorBoundary `{.codeHighlighted}]{#kobo.1577.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component. ]{#kobo.1578.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This works well when the query is used directly in the page component. ]{#kobo.1579.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But what if a component deep in the tree needs the data? ]{#kobo.1580.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ We could pass it down through props, but that leads to prop drilling. ]{#kobo.1580.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There\'s a better way. ]{#kobo.1581.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Server-side usage via HydrationBoundary ]{#kobo.1582.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_184 .heading-3}

[ React Query provides a ]{#kobo.1583.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` HydrationBoundary `{.codeHighlighted}]{#kobo.1584.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component that ]{#kobo.1585.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_75475c8f .index-entry index-entry="HydrationBoundary component"} [ solves the prop drilling problem. ]{#kobo.1586.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of passing data ]{#kobo.1587.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_926ba7bf .index-entry index-entry="queries:server-side usage, via HydrationBoundary"} [ as props, we prefetch queries on the server, dehydrate the cache, and rehydrate it on the client. ]{#kobo.1588.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Any component can then use the queries and get the prefetched data. ]{#kobo.1589.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here\'s how it works: ]{#kobo.1590.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/ideas/ideas.tsx

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import {
  getIdeasQueryOptions,
  useIdeasQuery,
} from '@/features/ideas/api/get-ideas';
import { createQueryClient } from '@/lib/react-query';

import type { Route } from './+types/ideas';

// We are using the loader function to prefetch the query on the server side 
// and return the dehydrated state to the component
export async function loader() {
  const queryClient = createQueryClient();

  // But we are not fetching the data directly.
  // Instead, we are prefetching the query using the query options factory.
  // This will populate the cache with the data from the server side.
  await queryClient.prefetchQuery(getIdeasQueryOptions());

  return routerData({
    meta: {
      title: 'AIdeas - Discover AI Ideas',
      description:
        'AIdeas - Browse and explore innovative AI application ideas from the community',
    },
    // Dehydrate the query client state which will be used to hydrate the component on the client side
    dehydratedState: dehydrate(queryClient), 
  });
}

// Component that uses the hydrated data
export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    // Wrap the component in the HydrationBoundary component to hydrate the component on the client side
    <HydrationBoundary state={loaderData.dehydratedState}>
      <Ideas />
    </HydrationBoundary>
  );
}


// This component could be rendered anywhere in the application
// Queries used here will always have access to the initial data 
// from the server side because of dehydrated state
function Ideas() {
  const ideasQuery = useIdeasQuery({});

  const allIdeas = ideasQuery.data?.data || [];

  // more code here...
}
export function ErrorBoundary({ error }: { error: Error }) {
  // ...
}
```

[ Here\'s how ]{#kobo.1708.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_bfb2265f .index-entry index-entry="queries:server-side usage, via HydrationBoundary"} [ this works: ]{#kobo.1709.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

1.  [ The loader function prefetches the query on the server using ]{#kobo.1710.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` queryClient.prefetchQuery() `{.codeHighlighted}]{#kobo.1711.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.1712.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This populates the React Query cache with data from the server. ]{#kobo.1713.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
2.  [ We dehydrate the query client state using the ]{#kobo.1714.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` dehydrate `{.codeHighlighted}]{#kobo.1715.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ function. ]{#kobo.1716.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This serializes the cache into a format that can be sent to the client. ]{#kobo.1717.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
3.  [ The page component wraps its content in a ]{#kobo.1718.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` HydrationBoundary `{.codeHighlighted}]{#kobo.1719.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component, passing the dehydrated state. ]{#kobo.1720.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
4.  [ On the client, the ]{#kobo.1721.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` HydrationBoundary `{.codeHighlighted}]{#kobo.1722.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ rehydrates the cache with the server data. ]{#kobo.1723.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Any component that uses the same query will immediately have access to that data. ]{#kobo.1724.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This approach is powerful ]{#kobo.1725.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_217d6afc .index-entry index-entry="HydrationBoundary component"} [ because components anywhere in the tree can use the query without prop drilling. ]{#kobo.1726.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.1727.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Ideas `{.codeHighlighted}]{#kobo.1728.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component doesn\'t need to receive the data as props---it just uses the query hook and gets the server-prefetched data from the cache. ]{#kobo.1729.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s see how mutations work in our application. ]{#kobo.1730.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Mutations ]{#kobo.1731.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_185 .heading-2}

[ Now let\'s ]{#kobo.1732.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0501cbe8 .index-entry index-entry="API layer, integrating with application:mutations"} [ see how we can use the ]{#kobo.1733.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useCreateIdeaMutation `{.codeHighlighted}]{#kobo.1734.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook to create a new idea: ]{#kobo.1735.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/dashboard/ideas/new.tsx

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { ErrorMessage } from '@/components/error-message';
import { useCreateIdeaMutation } from '@/features/ideas/api/create-idea';
import { IdeaForm } from '@/features/ideas/components/idea-form';
import { ideasQueryKeys } from '@/features/ideas/config/query-keys';

export default function NewIdeaPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // We are using the mutation hook to get the mutation object:
  const createIdeaMutation = useCreateIdeaMutation({
    options: {
      onSuccess: () => {
        // We are using the query keys to invalidate the queries and refresh the data
        queryClient.invalidateQueries({ queryKey: ideasQueryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: ideasQueryKeys.current() });
        navigate('/dashboard/ideas');
      },
    },
  });

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create New Idea</h1>
          <p className="text-muted-foreground">
            Share your AI idea with the community
          </p>
        </div>

        {/* We are displaying the error state if the mutation fails */}
        {createIdeaMutation.error && (
          <ErrorMessage error={createIdeaMutation.error} />
        )}
        <IdeaForm
          // We are using mutate method to trigger the mutation
          onSubmit={createIdeaMutation.mutate} 
          onCancel={() => navigate('/dashboard/ideas')}
          // We are showing the loading state if the mutation is pending
          isSubmitting={createIdeaMutation.isPending} 
        />
      </div>
    </div>
  );
}
```

[ The mutation ]{#kobo.1893.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_41691841 .index-entry index-entry="API layer, integrating with application:mutations"} [ hook provides a ]{#kobo.1894.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` mutate `{.codeHighlighted}]{#kobo.1895.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ method that we pass to the form\'s ]{#kobo.1896.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` onSubmit `{.codeHighlighted}]{#kobo.1897.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.1898.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the form is submitted, the mutation executes. ]{#kobo.1899.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We use ]{#kobo.1900.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` isPending `{.codeHighlighted}]{#kobo.1901.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to show loading state and ]{#kobo.1902.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` error `{.codeHighlighted}]{#kobo.1903.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to display any errors. ]{#kobo.1904.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the mutation succeeds, we invalidate the related queries so they refetch with the updated data, then navigate to the ideas list. ]{#kobo.1905.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This pattern keeps our mutation logic clean and separate from the UI. ]{#kobo.1906.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The form just calls ]{#kobo.1907.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` mutate `{.codeHighlighted}]{#kobo.1908.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ with the data, and React Query handles the rest. ]{#kobo.1909.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Summary ]{#kobo.1910.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_186 .heading-1}

[ In this chapter, we built a complete API layer for our application. ]{#kobo.1911.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We started by creating an API client that wraps the ]{#kobo.1912.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ fetch ]{#kobo.1913.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ API with error handling and consistent configuration. ]{#kobo.1914.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This gives us a single place to manage how we communicate with our backend. ]{#kobo.1915.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Next, we set up type generation from our OpenAPI specification. ]{#kobo.1916.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Now we can run a command to generate TypeScript types and Zod validation schemas that match our backend. ]{#kobo.1917.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This catches breaking changes at compile time and provides runtime validation. ]{#kobo.1918.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We then configured React Query to manage server state. ]{#kobo.1919.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React Query handles caching, loading states, error handling, and request deduplication automatically, so we don\'t have to manage these manually. ]{#kobo.1920.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With the foundation ready, we built our API layer following a consistent pattern: fetcher function, options factory, and custom hook. ]{#kobo.1921.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each API function validates input and output using Zod schemas for end-to-end type safety. ]{#kobo.1922.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Finally, we explored three ways to integrate queries: client-side fetching with hooks, server-side fetching with initial data, and server-side prefetching with hydration boundaries. ]{#kobo.1923.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each approach fits different use cases, and they all work seamlessly with React Query. ]{#kobo.1924.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Our API layer ensures data is type-safe, cached efficiently, and always up to date, whether we\'re rendering on the server or the client. ]{#kobo.1925.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Get this book\'s PDF version and more ]{#kobo.1926.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_187 .heading-1}

[ Scan the QR code (or go to ]{#kobo.1927.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.1928.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ ). ]{#kobo.1929.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search for this book by name, confirm the edition, and then follow the steps on the page. ]{#kobo.1930.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_5_3.png" original-image-title="" style="width:25%;"} ]{#kobo.1931.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_5_4.png" original-image-title="" style="width:25%;"} ]{#kobo.1932.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[ Note: Keep your invoice handy. ]{#kobo.1933.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Purchases made directly from Packt don\'t require an invoice. ]{#kobo.1934.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}*
:::
