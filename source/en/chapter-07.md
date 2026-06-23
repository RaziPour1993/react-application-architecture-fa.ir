::: {.section .chapter}
# [ 7 ]{#kobo.1.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_198 .chapterNumber}

# [ Implementing Authentication and Securing the Application ]{#kobo.2.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_199 .chapterTitle}

[ Authentication and authorization are ]{#kobo.3.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_6bbaf399 .index-entry index-entry="authorization"} [ fundamental to building secure applications. ]{#kobo.4.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Think of authentication ]{#kobo.5.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e3376806 .index-entry index-entry="authentication"} [ as checking in at a hotel; it verifies who the user is by confirming their identity through login credentials. ]{#kobo.6.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Authorization is like the key card you receive; it determines what the user can do once they\'re in. ]{#kobo.7.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In the context of our application, authentication confirms someone is a registered user, while authorization ensures only the author of an idea can edit or delete it. ]{#kobo.8.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Beyond authentication and authorization, we need to protect our application and its users from security vulnerabilities by preventing malicious code from running on behalf of the user. ]{#kobo.9.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'ll cover the following topics: ]{#kobo.10.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Understanding authentication and authorization ]{#kobo.11.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Implementing authentication with httpOnly cookies ]{#kobo.12.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Protecting parts of the application with authorization policies ]{#kobo.13.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Building registration, login, and logout flows ]{#kobo.14.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Protecting authenticated routes ]{#kobo.15.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Preventing XSS attacks with content sanitization ]{#kobo.16.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Securing the application with security headers ]{#kobo.17.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By the end of this chapter, we\'ll have a secure authentication system in place that protects the application and implements security practices to keep our application and users safe. ]{#kobo.18.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Technical requirements ]{#kobo.19.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_200 .heading-1}

[ Before we get started, we need to set up our project. ]{#kobo.20.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To develop our project, we need the following tools installed on our computer: ]{#kobo.21.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Node.js version 24 or above. ]{#kobo.22.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ npm version 11 or above ships with Node. ]{#kobo.23.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can confirm this by executing ]{#kobo.24.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` node ‑v `{.inlineCode}]{#kobo.25.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.26.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` npm ‑v `{.inlineCode}]{#kobo.27.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ in the terminal. ]{#kobo.28.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There are multiple ways to install Node.js and npm. ]{#kobo.29.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here is a helpful article that goes into more detail: ]{#kobo.30.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js ]{#kobo.31.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js){style="text-decoration: none;"} [ . ]{#kobo.32.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ VS Code ]{#kobo.33.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ (optional), a popular editor for JavaScript and TypeScript. ]{#kobo.34.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It is open source, has solid TypeScript support, and offers many extensions. ]{#kobo.35.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It can be downloaded from ]{#kobo.36.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://code.visualstudio.com ]{#kobo.37.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://code.visualstudio.com){style="text-decoration: none;"} [ . ]{#kobo.38.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The code for this book is available at ]{#kobo.39.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition ]{#kobo.40.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition){style="text-decoration: none;"} [ on GitHub. ]{#kobo.41.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Clone it and enter the repository root: ]{#kobo.42.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

[ The repository contains chapter folders with the code for each chapter, along with a shared ]{#kobo.44.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` api `{.inlineCode}]{#kobo.45.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ folder that includes the API server used across all chapters. ]{#kobo.46.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We are working on ]{#kobo.47.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Chapter ]{#kobo.48.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ 7 ]{#kobo.49.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ so navigate to the ]{#kobo.50.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` chapter‑07 `{.inlineCode}]{#kobo.51.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.52.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/chapter-07
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

[ Run the setup script for ]{#kobo.66.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Chapter ]{#kobo.67.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ 7 ]{#kobo.68.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ to configure everything: ]{#kobo.69.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run setup 07
```

[ Then start the API server: ]{#kobo.71.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run dev
```

[ The API server should now be running on ]{#kobo.73.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:9999 ]{#kobo.74.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:9999){style="text-decoration: none;"} [ . ]{#kobo.75.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For more information about the setup details, check out the ]{#kobo.76.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` README.md `{.codeHighlighted}]{#kobo.77.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file. ]{#kobo.78.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Authentication ]{#kobo.79.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_201 .heading-1}

**[ Authentication ]{#kobo.80.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is the ]{#kobo.81.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_14f602c1 .index-entry index-entry="authentication"} [ process of verifying who a user is. ]{#kobo.82.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When a user logs into our application, we need to verify their identity and then remember who they are as they navigate through different pages and make requests to our API. ]{#kobo.83.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is fundamental to building applications that serve personalized content and protect sensitive data. ]{#kobo.84.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Without authentication, we can\'t distinguish between different users or restrict access to certain features. ]{#kobo.85.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Every user would see the same content, and anyone could access any data. ]{#kobo.86.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This works for public websites, but most applications need to know who is using them. ]{#kobo.87.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll implement ]{#kobo.88.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d3c1de72 .index-entry index-entry="authentication:implementing"} [ authentication using a token-based approach. ]{#kobo.89.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When users log in with their credentials, our API will verify them and send back authentication tokens. ]{#kobo.90.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These tokens will be ]{#kobo.91.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5f6ce247 .index-entry index-entry="httpOnly cookies"} [ stored in ]{#kobo.92.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` httpOnly `{.codeHighlighted}]{#kobo.93.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ cookies, which are cookies that JavaScript can\'t access. ]{#kobo.94.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is important because it protects the tokens from being stolen by malicious scripts that might run on our page, as httpOnly cookies can\'t be accessed by JavaScript on the client-side. ]{#kobo.95.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It is worth noting that while ]{#kobo.96.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` httpOnly `{.codeHighlighted}]{#kobo.97.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ cookies reduce the risk of cross-site scripting (XSS) attacks stealing our tokens, they don\'t protect against cross-site request forgery (CSRF) attacks on their own. ]{#kobo.98.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To help mitigate CSRF, the ]{#kobo.99.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` SameSite `{.codeHighlighted}]{#kobo.100.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ cookie ]{#kobo.101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_38d0645d .index-entry index-entry="SameSite cookie"} [ attribute can be used; setting it to ]{#kobo.102.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Lax `{.codeHighlighted}]{#kobo.103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ or ]{#kobo.104.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Strict `{.codeHighlighted}]{#kobo.105.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ instructs browsers to limit when the cookie is sent with cross-origin requests. ]{#kobo.106.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To learn more about ]{#kobo.107.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` SameSite `{.codeHighlighted}]{#kobo.108.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , you can check ]{#kobo.109.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://web.dev/articles/samesite-cookies-explained ]{#kobo.110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://web.dev/articles/samesite-cookies-explained){style="text-decoration: none;"} [ . ]{#kobo.111.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The following diagram shows how the authentication flow works: ]{#kobo.112.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.113.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_7_1.png" data-original-image-title="" style="width:528.0px; height:373.80013294925766px;">Figure 7.1 – The authentication flow</span> </span>
</figure>

[ Figure 7.1 -- The authentication flow ]{#kobo.114.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In this flow, the ]{#kobo.115.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b6957e38 .index-entry index-entry="authentication:flow"} [ user submits their credentials to the API, which validates them and returns authentication tokens. ]{#kobo.116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These tokens are stored as httpOnly cookies in the browser and automatically sent with subsequent requests to identify the user. ]{#kobo.117.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Our API uses two types of tokens to ]{#kobo.118.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_596e060e .index-entry index-entry="authentication:tokens, for handling"} [ handle authentication: ]{#kobo.119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Access tokens ]{#kobo.120.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Short-lived tokens (usually 15 minutes) that ]{#kobo.121.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_913f62b9 .index-entry index-entry="access tokens"} [ prove the user\'s identity for each request. ]{#kobo.122.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These are sent with every API call to identify the user. ]{#kobo.123.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Refresh tokens ]{#kobo.124.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Longer-lived ]{#kobo.125.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_36062f6a .index-entry index-entry="refresh tokens"} [ tokens (usually 7 days) that can generate new access tokens when the old ones expire. ]{#kobo.126.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This lets users stay logged in without having to re-enter their credentials every 15 minutes. ]{#kobo.127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This two-token system balances security and user experience. ]{#kobo.128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Access tokens expire quickly to limit the damage if they\'re intercepted, while refresh tokens let users stay logged in for longer periods without compromising security. ]{#kobo.129.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To support this authentication flow, we need to extend our API client to handle tokens, implement registration and login pages, and protect routes that require authentication. ]{#kobo.130.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Extending the API client ]{#kobo.131.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_202 .heading-2}

[ When ]{#kobo.132.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7d153605 .index-entry index-entry="authentication:API client, extending"} [ our access token expires, the API will respond with a 401 Unauthorized status. ]{#kobo.133.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of logging the user out immediately, we should try to get a new access token using the refresh token. ]{#kobo.134.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This way, users can stay logged in without noticing that their token expired. ]{#kobo.135.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ First, let\'s update the client to always send cookies automatically on the client side: ]{#kobo.136.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/lib/api.ts

async function fetchApi<T, TBody = unknown>(
  url: string,
  options: RequestOptions<TBody> = {},
): Promise<T> {
  // ...

  const makeRequest = async (accessToken?: string): Promise<Response> => {
    try {
      return await fetch(fullUrl, {
        // ...
        credentials: typeof window !== 'undefined' ? 'include' : undefined,
      });
    } catch (error) {
      // ...
    }
  };
}
```

[ We are sending ]{#kobo.192.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e6b5146c .index-entry index-entry="authentication:API client, extending"} [ cookies automatically on the client-side by setting the ]{#kobo.193.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` credentials `{.codeHighlighted}]{#kobo.194.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` `{.codeHighlighted}]{#kobo.195.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ option to ]{#kobo.196.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` include `{.codeHighlighted}]{#kobo.197.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.198.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The default value is ]{#kobo.199.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` same-origin `{.codeHighlighted}]{#kobo.200.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ which means cookies are only sent for requests to the same origin. ]{#kobo.201.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But our API is running on a different origin, so we need to send cookies explicitly. ]{#kobo.202.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ On the server-side, we will have to pass cookies explicitly in the headers like this: ]{#kobo.203.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
const response = await api.get<GetCurrentUserResponse>('/auth/me', {
    headers: {
      Cookie: cookieHeader ?? '',
    },
});
```

[ We also want to support refreshing the access token. ]{#kobo.218.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/lib/api.ts

async function fetchApi<T, TBody = unknown>(
  url: string,
  options: RequestOptions<TBody> = {},
): Promise<T> {
  // ...

  // Handle 401 errors with automatic token refresh
  const isAuthenticationError = 
    !response.ok &&
    response.status === 401 &&
    !url.endsWith('/auth/login') &&
    !url.endsWith('/auth/register')


  if (isAuthenticationError) {
    // Extract cookie header from options for server-side requests
    // On client-side, this will be undefined and credentials: 'include' will be used
    const cookieHeader = headers.Cookie;

    try {
      // Attempt to refresh the token
      const { accessToken } = await refreshToken(cookieHeader);

      // Retry the original request with the new token
      response = await makeRequest(accessToken);
    } catch (refreshError) {
      // If refresh fails, the original 401 error will be handled below
      console.warn('Token refresh failed:', refreshError);
    }
  }

  // ...
}
```

[ When a ]{#kobo.283.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_13401d4a .index-entry index-entry="authentication:API client, extending"} [ request fails with a 401 status, we automatically attempt to refresh the token and retry the original request with the new access token. ]{#kobo.284.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This setup ensures that users stay logged in seamlessly even when their access tokens expire, and it works correctly both in the browser and on the server. ]{#kobo.285.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The following diagram illustrates the token refresh process: ]{#kobo.286.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.287.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_7_2.png" data-original-image-title="" style="width:528.0px; height:372.2791934411699px;">Figure 7.2 – The refresh token flow</span> </span>
</figure>

[ Figure 7.2 -- The refresh token flow ]{#kobo.288.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When an API request fails with a 401 status, the client automatically calls the refresh endpoint using the refresh token cookie. ]{#kobo.289.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If the refresh token is valid, the API returns a new access token, and the client retries the original request. ]{#kobo.290.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This all happens in the background without the user being aware of it. ]{#kobo.291.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now that we have the API client ready to handle authentication, we need a way for users to get those tokens in the first place. ]{#kobo.292.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Users can either register as a new user or log in with existing credentials. ]{#kobo.293.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Registration page ]{#kobo.294.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_203 .heading-2}

[ To register ]{#kobo.295.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_6daeeb1c .index-entry index-entry="authentication:registration page"} [ a new user, we need to create a new route and a form component that when submitted will call the registration endpoint that will create a new user and return the auth tokens in the cookies. ]{#kobo.296.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ ]{#kobo.297.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/auth/register.tsx

export default function RegisterPage() {
  const navigate = useNavigate();

  const registerUserMutation = useRegisterUserMutation();

  const onSubmit = (data: RegisterUserData['body']) => {
    registerUserMutation.mutate(data, {
      onSuccess: () => {
        navigate('/dashboard');
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm
              onSubmit={onSubmit}
              error={registerUserMutation.error}
              isPending={registerUserMutation.isPending}
            />
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-primary hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

[ The registration ]{#kobo.436.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_33131bf1 .index-entry index-entry="authentication:registration page"} [ page looks like this: ]{#kobo.437.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.438.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_7_3.png" data-original-image-title="" style="width:528.0px; height:293.0148460004432px;">Figure 7.3 – The registration page</span> </span>
</figure>

[ Figure 7.3 -- The registration page ]{#kobo.439.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This ]{#kobo.440.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a3267265 .index-entry index-entry="authentication:registration page"} [ registration page is straightforward. ]{#kobo.441.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It renders a form inside a card component and handles the submission by calling the registration mutation. ]{#kobo.442.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When registration succeeds, we navigate the user to the dashboard. ]{#kobo.443.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The form component receives the error and loading states from the mutation so it can show error messages and disable inputs while the request is in progress. ]{#kobo.444.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The actual registration logic lives in the mutation hook. ]{#kobo.445.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/auth/api/register.ts

export async function registerUser(
  data: RegisterUserData['body'],
): Promise<RegisterUserResponse> {
  const response = await api.post<RegisterUserResponse>('/auth/register', {
    body: data,
  });

  return zRegisterUserResponse.parse(response);
}

export function getRegisterUserMutationOptions() {
  return mutationOptions({
    mutationFn: registerUser,
  });
}

export function useRegisterUserMutation({
  options,
}: {
  options?: Omit<
    UseMutationOptions<RegisterUserResponse, Error, RegisterUserData['body']>,
    'mutationFn'
  >;
} = {}) {
  return useMutation({
    ...getRegisterUserMutationOptions(),
    ...options,
  });
}
```

[ The registration function sends the user\'s credentials to the ]{#kobo.514.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` /auth/register `{.codeHighlighted}]{#kobo.515.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ endpoint. ]{#kobo.516.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When registration succeeds, the API automatically sets the authentication tokens in ]{#kobo.517.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` httpOnly `{.codeHighlighted}]{#kobo.518.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ cookies in the response, so the user is immediately ]{#kobo.519.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c444344f .index-entry index-entry="authentication:registration page"} [ logged in without any additional steps. ]{#kobo.520.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now we need to configure the route to render the registration page. ]{#kobo.521.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is done in the ]{#kobo.522.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` routes.ts `{.codeHighlighted}]{#kobo.523.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file. ]{#kobo.524.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes.ts

export default [
  route('auth/register', './routes/auth/register.tsx'),
  // ...
];
```

[ With registration in place, we also need a way for existing users to log back into the application. ]{#kobo.537.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Login page ]{#kobo.538.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_204 .heading-2}

[ The login flow ]{#kobo.539.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_3e2712b1 .index-entry index-entry="authentication:login page"} [ is very similar to registration. ]{#kobo.540.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We need a page with a form where users can enter their credentials, and when they submit the form, we call the login endpoint to authenticate them. ]{#kobo.541.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/auth/login.tsx

export default function LoginPage() {
  const navigate = useNavigate();

  const loginUserMutation = useLoginUserMutation();

  const onSubmit = (data: LoginUserData['body']) => {
    loginUserMutation.mutate(data, {
      onSuccess: () => {
        navigate('/dashboard');
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm
              onSubmit={onSubmit}
              error={loginUserMutation.error}
              isPending={loginUserMutation.isPending}
            />
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link
                  to="/auth/register"
                  className="text-primary hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

[ The login page looks like this: ]{#kobo.682.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.683.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_7_4.png" data-original-image-title="" style="width:528.0px; height:248.73210724573457px;">Figure 7.4 – The login page</span> </span>
</figure>

[ Figure 7.4 -- The login page ]{#kobo.684.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The login page ]{#kobo.685.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c3668e28 .index-entry index-entry="authentication:login page"} [ follows the same pattern as registration. ]{#kobo.686.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It handles form submission with a mutation and navigates to the dashboard on success. ]{#kobo.687.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The mutation calls the login endpoint to verify the user\'s credentials. ]{#kobo.688.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/auth/api/login.ts

export async function loginUser(
  data: LoginUserData['body'],
): Promise<LoginUserResponse> {
  const response = await api.post<LoginUserResponse>('/auth/login', {
    body: data,
  });

  return zLoginUserResponse.parse(response);
}

export function getLoginUserMutationOptions() {
  return mutationOptions({
    mutationFn: loginUser,
  });
}

export function useLoginUserMutation({
  options,
}: {
  options?: Omit<
    UseMutationOptions<LoginUserResponse, Error, LoginUserData['body']>,
    'mutationFn'
  >;
} = {}) {
  return useMutation({
    ...getLoginUserMutationOptions(),
    ...options,
  });
}
```

[ Just like registration, the ]{#kobo.757.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_6cb05fc1 .index-entry index-entry="authentication:login page"} [ login endpoint sets authentication tokens in httpOnly cookies when the credentials are valid. ]{#kobo.758.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The user is then authenticated and can access protected areas of the application. ]{#kobo.759.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We also need to configure the route to render the login page. ]{#kobo.760.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is done in the ]{#kobo.761.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` routes.ts `{.codeHighlighted}]{#kobo.762.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file. ]{#kobo.763.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes.ts

export default [
  route('auth/login', './routes/auth/login.tsx'),
  // ...
];
```

[ Now that users can register and log in, we need to provide a way for them to log out. ]{#kobo.776.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Logging out the user ]{#kobo.777.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_205 .heading-2}

**[ Logging out ]{#kobo.778.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is different from ]{#kobo.779.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9a4f2eaa .index-entry index-entry="authentication:logout"} [ registration and login because users don\'t fill out a form. ]{#kobo.780.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead, they click the \"Logout\" button in the navigation, and we immediately call the logout endpoint to clear their authentication tokens. ]{#kobo.781.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Our navigation component has a logout button that calls an ]{#kobo.782.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` onLogout `{.codeHighlighted}]{#kobo.783.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ callback. ]{#kobo.784.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'ll implement this callback in the layout component that wraps our application. ]{#kobo.785.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/layout.tsx

import { Outlet, useNavigate } from 'react-router';

import { Navigation } from '@/components/navigation';
import { useLogoutUserMutation } from '@/features/auth/api/logout';
import { useUser } from '@/features/auth/hooks/use-user';

export default function Layout() {
  const user = useUser();
  const navigate = useNavigate();
  const logoutUserMutation = useLogoutUserMutation({
    options: {
      onSuccess: () => navigate('/'),
    },
  });
  const handleLogout = async () => {
    logoutUserMutation.mutate();
  };

  return (
    <div>
      <Navigation user={user} onLogout={handleLogout} />
      <main className="min-h-screen bg-background">
        <Outlet />
      </main>
    </div>
  );
}
```

[ The layout component uses the ]{#kobo.879.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useUser `{.codeHighlighted}]{#kobo.880.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook to get the current user and passes it to the navigation. ]{#kobo.881.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the user clicks the logout button, the ]{#kobo.882.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` handleLogout `{.codeHighlighted}]{#kobo.883.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ function is called, which triggers the logout mutation. ]{#kobo.884.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ After a successful logout, we navigate the user back to the home page. ]{#kobo.885.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s implement the ]{#kobo.886.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_3e1ce71d .index-entry index-entry="authentication:logout"} [ logout mutation. ]{#kobo.887.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/auth/api/logout.ts

export async function logoutUser(): Promise<LogoutUserResponse> {
  const response = await api.post<LogoutUserResponse>('/auth/logout', {
    body: {},
  });

  return zLogoutUserResponse.parse(response);
}

export function getLogoutUserMutationOptions() {
  return mutationOptions({
    mutationFn: logoutUser,
  });
}

export function useLogoutUserMutation({
  options,
}: {
  options?: Omit<
    UseMutationOptions<LogoutUserResponse, Error, void>,
    'mutationFn'
  >;
} = {}) {
  return useMutation({
    ...getLogoutUserMutationOptions(),
    ...options,
  });
}
```

[ The logout function calls the ]{#kobo.948.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` /auth/logout `{.codeHighlighted}]{#kobo.949.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ endpoint, which clears the authentication tokens from the cookies. ]{#kobo.950.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ After this, the user is no longer authenticated and will need to log in again to access protected pages. ]{#kobo.951.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ But how does our application know if we are authenticated or not? ]{#kobo.952.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ We need a way to access the current user\'s information throughout our application. ]{#kobo.952.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Accessing the user in the app ]{#kobo.953.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_206 .heading-2}

[ Usually, we need to access the ]{#kobo.954.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_994874af .index-entry index-entry="authentication:user access"} [ current user\'s information in many parts of our application. ]{#kobo.955.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The navigation shows the user\'s name, the dashboard displays user-specific data, and we need to decide which features to show based on user permissions. ]{#kobo.956.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of fetching the user in every component, we\'ll fetch it once and make it available throughout the application. ]{#kobo.957.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll use React Router\'s middleware to load the user on the server and make it available to all components. ]{#kobo.958.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ First, we need a function that fetches the current user\'s data from the API. ]{#kobo.959.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/auth/api/get-me.ts

export async function getMe(
  cookieHeader?: string,
): Promise<GetCurrentUserResponse> {
  const response = await api.get<GetCurrentUserResponse>('/auth/me', {
    headers: {
      Cookie: cookieHeader ?? '',
    },
  });
  return zGetCurrentUserResponse.parse(response);
}
```

[ This function calls the ]{#kobo.994.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` /auth/me `{.codeHighlighted}]{#kobo.995.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ endpoint to get the current user\'s data. ]{#kobo.996.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It accepts an optional ]{#kobo.997.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` cookieHeader `{.codeHighlighted}]{#kobo.998.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ parameter ]{#kobo.999.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1ac5d66c .index-entry index-entry="authentication:user access"} [ because we\'ll call this on the server where cookies need to be passed explicitly. ]{#kobo.1000.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now we need to fetch this user data and make it available throughout our application using middleware. ]{#kobo.1001.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ First, we need to enable middleware in our application. ]{#kobo.1002.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// react-router.config.ts

import type { Config } from '@react-router/dev/config';

export default {
  // ...
  future: {
    v8_middleware: true,
  },
} satisfies Config;
```

[ This is required by React Router as this is a new feature that will be available in the next major version of React Router by default. ]{#kobo.1025.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s create the user middleware: ]{#kobo.1026.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/middleware/user.ts

import { createContext, type MiddlewareFunction } from 'react-router';

import { getMe } from '@/features/auth/api/get-me';
import type { CurrentUser } from '@/types/generated/types.gen';

export const userContext = createContext<CurrentUser | null>();

function hasAuthCookies(request: Request): boolean {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return false;

  return (
    cookieHeader.includes('accessToken=') ||
    cookieHeader.includes('refreshToken=')
  );
}

export const userMiddleware: MiddlewareFunction = async (
  { request, context },
  next,
) => {
  try {
    const existingUser = context.get(userContext);

    if (existingUser !== undefined) {
      return next();
    }
  } catch {
  }

  if (!hasAuthCookies(request)) {
    context.set(userContext, null);
    return next();
  }

  try {
    const cookieHeader = request.headers.get('Cookie') || '';
    const user = await getMe(cookieHeader);
    context.set(userContext, user);
  } catch {
    context.set(userContext, null);
  }

  return next();
};
```

[ This middleware ]{#kobo.1146.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_72c4c9e5 .index-entry index-entry="authentication:user access"} [ runs on every request and fetches the current user if authentication cookies are present. ]{#kobo.1147.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s break down how it works: ]{#kobo.1148.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Check for existing user ]{#kobo.1149.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : If the user is already in the context, we skip the fetch to avoid duplicate requests. ]{#kobo.1150.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Check for auth cookies ]{#kobo.1151.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : We only attempt to fetch the user if auth cookies are present in the request. ]{#kobo.1152.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Fetch and store user ]{#kobo.1153.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : If cookies exist, we fetch the user data and store it in the context. ]{#kobo.1154.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Handle errors gracefully ]{#kobo.1155.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : If fetching fails (invalid token, network error, etc.), we set the user to null instead of crashing the application. ]{#kobo.1156.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The middleware stores either the user object or null in React Router\'s request context (not to be confused with React\'s Context API), so downstream code always knows whether a user is authenticated. ]{#kobo.1157.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To activate this middleware, we need to add it to the middleware array in our root file. ]{#kobo.1158.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/root.tsx

export const middleware = [userMiddleware];

// ...
```

[ By adding ]{#kobo.1164.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` userMiddleware `{.inlineCode}]{#kobo.1165.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ to the middleware array, it will run on every request before any loaders execute. ]{#kobo.1166.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This ensures the user is available in the context when we need it. ]{#kobo.1167.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now we can access the user from the context in our root loader. ]{#kobo.1168.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/root.tsx

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  return data({ user });
}
```

[ The root loader gets the user from the context and returns it. ]{#kobo.1187.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This makes the user data available to all components through React Router\'s loader data mechanism. ]{#kobo.1188.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With the user data loaded in the root, we can create a custom hook to access it from any component. ]{#kobo.1189.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/auth/hooks/use-user.ts

import { useRouteLoaderData } from 'react-router';

import type { RootLoaderData } from '@/types/app-context';

export function useUser() {
  const rootData = useRouteLoaderData<RootLoaderData>('root');
  return rootData?.user ?? null;
}
```

[ The ]{#kobo.1218.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useUser `{.codeHighlighted}]{#kobo.1219.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook gets the ]{#kobo.1220.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7e52d33d .index-entry index-entry="authentication:user access"} [ root loader data and extracts the user from it. ]{#kobo.1221.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This hook can be called from any component in our application to access the current user. ]{#kobo.1222.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here\'s how we use it in practice. ]{#kobo.1223.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/layout.tsx
import { useUser } from '@/features/auth/hooks/use-user';

export default function Layout() {
  const user = useUser();
  
  // ...
}
```

[ Any component can now call ]{#kobo.1241.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useUser() `{.codeHighlighted}]{#kobo.1242.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to get the current user. ]{#kobo.1243.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If the user is authenticated, it returns their data. ]{#kobo.1244.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If not, it returns null. ]{#kobo.1245.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We have authentication working and can access the user throughout our app, but we still need to protect certain routes so that only authenticated users can access them. ]{#kobo.1246.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Protecting routes ]{#kobo.1247.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_207 .heading-2}

[ Some routes in ]{#kobo.1248.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_27cc9df7 .index-entry index-entry="authentication:routes, protecting"} [ our application should only be accessible to authenticated users. ]{#kobo.1249.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For example, the dashboard pages don\'t make sense for users who aren\'t logged in. ]{#kobo.1250.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We need a way to protect these routes and redirect unauthenticated users to the login page. ]{#kobo.1251.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can create a middleware that checks if a user is authenticated. ]{#kobo.1252.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If not, it redirects them to the login page before the route even loads. ]{#kobo.1253.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/middleware/protected.ts
import { redirect, type MiddlewareFunction } from 'react-router';

import { userContext } from './user';

export const protectedMiddleware: MiddlewareFunction = async (
  { context },
  next,
) => {
  const user = context.get(userContext);

  if (!user) {
    throw redirect('/auth/login');
  }

  return next();
};
```

[ This middleware is simple but powerful. ]{#kobo.1290.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It gets the user from the context and checks if they\'re authenticated. ]{#kobo.1291.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If there\'s no user, it throws a redirect to the login page, which stops the request from continuing. ]{#kobo.1292.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If there is a user, it calls ]{#kobo.1293.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` next() `{.codeHighlighted}]{#kobo.1294.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to continue processing the request. ]{#kobo.1295.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The order of middleware execution matters. ]{#kobo.1296.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The user middleware must run before the protected middleware because ]{#kobo.1297.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d40fccb1 .index-entry index-entry="authentication:routes, protecting"} [ the protected middleware needs to access the user that was loaded by the user middleware. ]{#kobo.1298.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now we can apply this middleware to protect specific routes. ]{#kobo.1299.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Since our dashboard routes are all nested under the dashboard layout, we can add the middleware there to protect all of them at once. ]{#kobo.1300.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/dashboard/layout.tsx

export const middleware = [protectedMiddleware];

export default function DashboardLayout() {
  // ...
}
```

[ By adding ]{#kobo.1312.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` protectedMiddleware `{.codeHighlighted}]{#kobo.1313.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to the dashboard layout, all routes nested under the dashboard will check for authentication. ]{#kobo.1314.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If a user tries to access the dashboard without being logged in, they\'ll be redirected to the login page. ]{#kobo.1315.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With authentication in place, we know who our users are and can protect entire routes. ]{#kobo.1316.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ However, knowing who a user is doesn\'t tell us what they\'re allowed to do in the application. ]{#kobo.1317.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is where authorization comes in. ]{#kobo.1318.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Authorization ]{#kobo.1319.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_208 .heading-1}

[ Authentication ]{#kobo.1320.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7724b32f .index-entry index-entry="authorization"} [ tells us who users are, but authorization determines what they can do. ]{#kobo.1321.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These are two different concepts that work together. ]{#kobo.1322.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Authentication answers \"Are you who you say you are?\" ]{#kobo.1323.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ while authorization answers \"Are you allowed to do this action?\" ]{#kobo.1323.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For example, authentication lets us know that a user is logged in as John. ]{#kobo.1324.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Authorization then determines whether John can edit a particular idea. ]{#kobo.1325.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Maybe John can only edit his own ideas, not ideas created by other users. ]{#kobo.1326.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This kind of permission checking is authorization. ]{#kobo.1327.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Without authorization, authenticated users could perform any action in the application. ]{#kobo.1328.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They could delete other users\' content, modify data they don\'t own, or access features they shouldn\'t have access to. ]{#kobo.1329.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Authorization rules define the boundaries of what each user can do. ]{#kobo.1330.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In our application, we need authorization for several scenarios: ]{#kobo.1331.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Users can only edit and delete their own ideas ]{#kobo.1332.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Users can\'t review their own ideas ]{#kobo.1333.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Users can only review each idea once ]{#kobo.1334.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Users can only edit their own profile ]{#kobo.1335.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll implement ]{#kobo.1336.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_52f03488 .index-entry index-entry="authorization:implementing"} [ authorization using a policy-based approach. ]{#kobo.1337.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Policies are functions that take the current user and a resource, then return whether the user has permission to perform an action on that resource. ]{#kobo.1338.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s create authorization policies for the different resources in our application. ]{#kobo.1339.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/auth/lib/authorization-policies.ts

import type {
  CurrentUser,
  Idea,
  Review,
  User,
} from '@/types/generated/types.gen';

export const IdeaPolicies = {
  canCreate: (currentUser: CurrentUser | null): boolean => {
    const isAuthenticated = !!currentUser;
    return isAuthenticated;
  },

  canEdit: (currentUser: CurrentUser | null, idea: Idea): boolean => {
    const isIdeaAuthor = currentUser?.id === idea.authorId;
    return isIdeaAuthor;
  },

  canDelete: (currentUser: CurrentUser | null, idea: Idea): boolean => {
    const isIdeaAuthor = currentUser?.id === idea.authorId;
    return isIdeaAuthor;
  },
};

export const ReviewPolicies = {
  canCreate: (
    currentUser: CurrentUser | null,
    idea: Idea,
    existingReviews?: Review[],
  ): boolean => {
    const isAuthenticated = !!currentUser;
    if (!isAuthenticated) return false;

    const isIdeaAuthor = currentUser.id === idea.authorId;
    if (isIdeaAuthor) return false;

    const hasAlreadyReviewed = existingReviews?.some(
      (review) => review.authorId === currentUser.id,
    );
    if (hasAlreadyReviewed) return false;

    return true;
  },

  canEdit: (currentUser: CurrentUser | null, review: Review): boolean => {
    const isReviewAuthor = currentUser?.id === review.authorId;
    return isReviewAuthor;
  },

  canDelete: (currentUser: CurrentUser | null, review: Review): boolean => {
    const isReviewAuthor = currentUser?.id === review.authorId;
    return isReviewAuthor;
  },
};

export const ProfilePolicies = {
  canEdit: (currentUser: CurrentUser | null, user: User): boolean => {
    const isUserAuthor = currentUser?.id === user.id;
    return isUserAuthor;
  },
};
```

[ These authorization policies encapsulate our business rules for who can do what. ]{#kobo.1534.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each policy is a simple function that returns true or false based on the current user and the resource being accessed. ]{#kobo.1535.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The policies follow a clear pattern: ]{#kobo.1536.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Idea policies ]{#kobo.1537.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Users must be logged in to create ideas and can only edit or delete ideas they authored ]{#kobo.1538.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Review policies ]{#kobo.1539.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Users must be logged in, can\'t review their own ideas, and can\'t review the same idea twice ]{#kobo.1540.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Profile policies ]{#kobo.1541.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Users can only edit their own profile ]{#kobo.1542.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By centralizing these ]{#kobo.1543.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_11a20642 .index-entry index-entry="authorization:implementing"} [ rules in one place, we make them easy to update and maintain. ]{#kobo.1544.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If we need to change who can do what, we just update the policy functions. ]{#kobo.1545.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now we need a way to use these policies in our components. ]{#kobo.1546.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'ll create a hook that wraps the authorization policies and makes them easy to use throughout our application. ]{#kobo.1547.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/auth/hooks/use-authorization.ts

import type { Idea, Review, User } from '@/types/generated/types.gen';

import {
  IdeaPolicies,
  ProfilePolicies,
  ReviewPolicies,
} from '../lib/authorization-policies';

import { useUser } from './use-user';

export function useAuthorization() {
  const currentUser = useUser();

  return {
    // Ideas
    canCreateIdea: () => IdeaPolicies.canCreate(currentUser),
    canEditIdea: (idea: Idea) => IdeaPolicies.canEdit(currentUser, idea),
    canDeleteIdea: (idea: Idea) => IdeaPolicies.canDelete(currentUser, idea),

    // Reviews
    canCreateReview: (idea: Idea, reviews?: Review[]) =>
      ReviewPolicies.canCreate(currentUser, idea, reviews),
    canEditReview: (review: Review) =>
      ReviewPolicies.canEdit(currentUser, review),
    canDeleteReview: (review: Review) =>
      ReviewPolicies.canDelete(currentUser, review),

    // Profile
    canEditProfile: (user: User) => ProfilePolicies.canEdit(currentUser, user),
  };
}
```

[ The ]{#kobo.1675.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useAuthorization `{.codeHighlighted}]{#kobo.1676.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook provides a convenient way to check permissions in our components. ]{#kobo.1677.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It gets the current user with the ]{#kobo.1678.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useUser `{.codeHighlighted}]{#kobo.1679.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook and passes it to the appropriate policy functions. ]{#kobo.1680.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This gives us a clean API for authorization checks throughout our application. ]{#kobo.1681.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Instead of importing policy functions and the current user in every component, we can just call ]{#kobo.1682.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useAuthorization() `{.codeHighlighted}]{#kobo.1683.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and get all the permission checks we need. ]{#kobo.1684.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s see how we use this ]{#kobo.1685.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_85e726c4 .index-entry index-entry="authorization:implementing"} [ hook in a real component. ]{#kobo.1686.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/dashboard/ideas/ideas.tsx

import { Plus } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { useAuthorization } from '@/features/auth/hooks/use-authorization';
import { useCurrentUserIdeasQuery } from '@/features/ideas/api/get-current-user-ideas';
import { IdeasList } from '@/features/ideas/components/ideas-list';

import type { Route } from './+types/ideas';

export default function MyIdeasPage() {
  const ideasQuery = useCurrentUserIdeasQuery();
  const ideas = ideasQuery.data?.data;

  const { canCreateIdea } = useAuthorization();

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
          {canCreateIdea() && (
            <Link to="/dashboard/ideas/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Idea
              </Button>
            </Link>
          )}
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

[ In this example, we use the ]{#kobo.1854.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useAuthorization `{.codeHighlighted}]{#kobo.1855.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook to check if the current user can create ideas. ]{#kobo.1856.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Based on that check, we conditionally render the \" ]{#kobo.1857.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ New Idea ]{#kobo.1858.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ \" button. ]{#kobo.1859.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If the user doesn\'t have permission, the button simply doesn\'t appear in the UI. ]{#kobo.1860.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This pattern works throughout our application. ]{#kobo.1861.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We check permissions before showing action buttons, before navigating to edit pages, and in forms before enabling submit buttons. ]{#kobo.1862.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The UI adapts to what each user is allowed to do. ]{#kobo.1863.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ It\'s important to note ]{#kobo.1864.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_46f8b6fa .index-entry index-entry="authorization:implementing"} [ that authorization checks in the UI are about user experience, not security. ]{#kobo.1865.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They prevent users from seeing buttons for actions they can\'t perform, which avoids confusion and error messages. ]{#kobo.1866.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ However, we must also enforce authorization on the server side in our API. ]{#kobo.1867.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A determined user could bypass client-side checks, so the backend must verify permissions before allowing any action on the server side. ]{#kobo.1868.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With authentication and authorization in place, users can log in and the application knows what each user can do. ]{#kobo.1869.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But we still need to protect against security threats that can affect any web application, regardless of authentication. ]{#kobo.1870.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Securing the application ]{#kobo.1871.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_209 .heading-1}

[ Authentication ]{#kobo.1872.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_aec109cb .index-entry index-entry="application security"} [ tells us who users are, but security is about protecting them and our application from malicious attacks. ]{#kobo.1873.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Even with perfect authentication, our application can be vulnerable to attacks that steal data, hijack user sessions, or execute malicious code. ]{#kobo.1874.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Web applications face many security threats, but two of the most common are Cross-Site Scripting (XSS) attacks and missing security headers. ]{#kobo.1875.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ XSS attacks inject malicious scripts into our application, while missing security headers leave our application vulnerable to various browser-based attacks. ]{#kobo.1876.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s look at how to protect against these threats. ]{#kobo.1877.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Content sanitization ]{#kobo.1878.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_210 .heading-2}

**[ Cross-Site Scripting (XSS) ]{#kobo.1879.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is one ]{#kobo.1880.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_81cdd2f9 .index-entry index-entry="application security:content sanitization"} [ of the most common web security vulnerabilities. ]{#kobo.1881.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It ]{#kobo.1882.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1a5dc8a2 .index-entry index-entry="Cross-Site Scripting (XSS)"} [ happens when an attacker injects malicious JavaScript code into our application, which then executes in other users\' browsers. ]{#kobo.1883.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For example, if a user can submit content that includes ]{#kobo.1884.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` < `{.codeHighlighted}]{#kobo.1885.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` script `{.codeHighlighted}]{#kobo.1886.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` > `{.codeHighlighted}]{#kobo.1887.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ tags and we display that content without sanitization, the script will run in every user\'s browser who views it. ]{#kobo.1888.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This is particularly dangerous because the malicious script runs with the same permissions as our application. ]{#kobo.1889.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It can read cookies, access local storage, make API requests on behalf of the user, or redirect users to malicious sites. ]{#kobo.1890.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Even though we\'re using httpOnly cookies for authentication (which JavaScript can\'t access), XSS attacks can still perform actions as the logged-in user. ]{#kobo.1891.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In our application, users can create ideas with descriptions in markdown format. ]{#kobo.1892.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Markdown gets converted to HTML for display, which means we\'re rendering HTML that came from user input. ]{#kobo.1893.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If we don\'t sanitize this HTML, users could inject malicious scripts into their markdown content. ]{#kobo.1894.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll use DOMPurify to sanitize the HTML before rendering it. ]{#kobo.1895.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ DOMPurify removes any potentially dangerous content like ]{#kobo.1896.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` < `{.codeHighlighted}]{#kobo.1897.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` script `{.codeHighlighted}]{#kobo.1898.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` > `{.codeHighlighted}]{#kobo.1899.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ tags, inline event handlers, and dangerous attributes while keeping safe HTML elements like headings, lists, and links. ]{#kobo.1900.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/components/markdown-renderer.tsx

import DOMPurify from 'isomorphic-dompurify';
import { useMemo } from 'react';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

export type MarkdownRendererProps = {
  content: string;
  className?: string;
};

export function MarkdownRenderer({
  content,
  className = '',
}: MarkdownRendererProps) {
  const htmlContent = useMemo(() => {
    try {
      // Process markdown to HTML
      const result = remark()
        .use(remarkGfm) // GitHub Flavored Markdown
        .use(remarkHtml, { sanitize: false })
        .processSync(content);

      const sanitizedHtml = DOMPurify.sanitize(result.toString(), {
        ALLOWED_TAGS: [
          'p',
          'br',
          'strong',
          'em',
          'u',
          's',
          'code',
          'pre',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'ul',
          'ol',
          'li',
          'blockquote',
          'a',
          'table',
          'thead',
          'tbody',
          'tr',
          'th',
          'td',
          'hr',
        ],
        ALLOWED_ATTR: ['href', 'title', 'class'],
        ALLOW_DATA_ATTR: false,
        ALLOWED_URI_REGEXP:
          /^(?:(?:(?:f|ht)tps?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
      });

      return sanitizedHtml;
    } catch (error) {
      console.error('Error processing markdown:', error);
      return `<p>Error rendering markdown content</p>`;
    }
  }, [content]);

  return (
    <div
      className={`prose prose-sm max-w-none dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
```

[ Let\'s break down how this component protects against XSS: ]{#kobo.2100.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Two-step processing ]{#kobo.2101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : First, we convert markdown to HTML using remark. ]{#kobo.2102.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Then, we sanitize the HTML with ]{#kobo.2103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` DOMPurify `{.inlineCode}]{#kobo.2104.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.2105.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We intentionally disable remark\'s built-in sanitization because ]{#kobo.2106.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` DOMPurify `{.inlineCode}]{#kobo.2107.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ does a better job. ]{#kobo.2108.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Strict allowlist ]{#kobo.2109.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : We only allow specific HTML tags that are safe and necessary for text content. ]{#kobo.2110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Tags like ]{#kobo.2111.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` <script> `{.inlineCode}]{#kobo.2112.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , ]{#kobo.2113.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` <iframe> `{.inlineCode}]{#kobo.2114.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , and ]{#kobo.2115.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` <object> `{.inlineCode}]{#kobo.2116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ are automatically blocked. ]{#kobo.2117.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Limited attributes ]{#kobo.2118.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : We only allow safe attributes like ]{#kobo.2119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` href `{.inlineCode}]{#kobo.2120.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , ]{#kobo.2121.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` title `{.inlineCode}]{#kobo.2122.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , and ]{#kobo.2123.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` class `{.inlineCode}]{#kobo.2124.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.2125.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Event handlers like ]{#kobo.2126.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` onclick `{.codeHighlighted}]{#kobo.2127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ are blocked. ]{#kobo.2128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Safe protocols ]{#kobo.2129.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : For links, we only allow ]{#kobo.2130.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` http: `{.inlineCode}]{#kobo.2131.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , ]{#kobo.2132.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` https: `{.inlineCode}]{#kobo.2133.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , and ]{#kobo.2134.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` mailto: `{.inlineCode}]{#kobo.2135.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ protocols. ]{#kobo.2136.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This prevents ]{#kobo.2137.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` javascript: `{.inlineCode}]{#kobo.2138.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ links that could execute code. ]{#kobo.2139.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The result is ]{#kobo.2140.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7f5fccb2 .index-entry index-entry="application security:content sanitization"} [ that users can write rich markdown content with formatting, links, and lists, but they can\'t inject malicious scripts or dangerous HTML elements. ]{#kobo.2141.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Content sanitization protects against XSS attacks, but there\'s another layer of security we need: security headers. ]{#kobo.2142.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Security headers ]{#kobo.2143.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_211 .heading-2}

**[ Security headers ]{#kobo.2144.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ are ]{#kobo.2145.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_004f1d11 .index-entry index-entry="application security:security headers"} [ special HTTP headers that tell the browser ]{#kobo.2146.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5be7660c .index-entry index-entry="security headers"} [ how to behave when handling our application. ]{#kobo.2147.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They\'re like rules that the browser follows to protect users from various attacks. ]{#kobo.2148.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Without these headers, browsers use default behaviors that aren\'t always secure. ]{#kobo.2149.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Modern browsers support many security headers that can prevent attacks like clickjacking, MIME-type sniffing, and cross-site scripting. ]{#kobo.2150.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ By setting these headers on all our responses, we create multiple layers of defense that work together to protect our application and users. ]{#kobo.2151.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s implement a function that applies all the necessary security headers to our responses. ]{#kobo.2152.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/lib/security-headers.ts

export function applySecurityHeaders(
  responseHeaders: Headers,
  nonce: string,
): void {
  const isProd = (process.env.NODE_ENV as string) === 'production';
  const apiUrl = process.env.VITE_API_URL as string | undefined;
  const securityHeaders = getSecurityHeaders(isProd, apiUrl, nonce);

  Object.entries(securityHeaders).forEach(([key, value]) => {
    responseHeaders.set(key, value);
  });
}

function getSecurityHeaders(
  isProd: boolean,
  apiUrl?: string,
  nonce?: string,
): Record<string, string> {
  return {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    ...(isProd
      ? { 'Strict-Transport-Security': 'max-age=63072000; includeSubDomains' }
      : {}),

    'Content-Security-Policy': [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}'
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      `connect-src 'self' ${apiUrl}`,
    ].join('; '),
  };
}
```

[ Here\'s what ]{#kobo.2266.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c7537afe .index-entry index-entry="security headers"} [ each security ]{#kobo.2267.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1ba76f10 .index-entry index-entry="application security:security headers"} [ header does: ]{#kobo.2268.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` X‑Frame‑Options: DENY `{.inlineCode}]{#kobo.2269.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Prevents our site from being embedded in an iframe. ]{#kobo.2270.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This stops clickjacking attacks where attackers overlay invisible iframes on top of buttons to trick users into clicking them. ]{#kobo.2271.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` X‑Content‑Type‑Options: nosniff `{.inlineCode}]{#kobo.2272.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Prevents browsers from guessing the content type of files. ]{#kobo.2273.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Without this, browsers might execute a file as JavaScript even if we said it was an image, which could lead to XSS attacks. ]{#kobo.2274.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` Referrer‑Policy: strict‑origin‑when‑cross‑origin `{.inlineCode}]{#kobo.2275.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Controls what information is sent in the ]{#kobo.2276.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Referer `{.inlineCode}]{#kobo.2277.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ header. ]{#kobo.2278.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This balances privacy (not leaking full URLs to other sites) with functionality (allowing same-origin analytics). ]{#kobo.2279.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` Strict‑Transport‑Security `{.inlineCode}]{#kobo.2280.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Forces browsers to only use HTTPS connections to our site. ]{#kobo.2281.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This prevents attackers from intercepting traffic by downgrading users to HTTP. ]{#kobo.2282.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We only enable this in production since we use HTTP in development. ]{#kobo.2283.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` Content‑Security‑Policy `{.inlineCode}]{#kobo.2284.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : This is the most powerful security header. ]{#kobo.2285.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It controls where the browser can load resources from, which we\'ll explain in detail next. ]{#kobo.2286.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The ]{#kobo.2287.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Content-Security-Policy ]{#kobo.2288.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.2289.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ CSP ]{#kobo.2290.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ) header ]{#kobo.2291.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a4a969b5 .index-entry index-entry="Content-Security-Policy (CSP) header"} [ tells the browser which sources are safe to load resources from. ]{#kobo.2292.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Without CSP, the browser will load scripts, styles, images, and other resources from anywhere. ]{#kobo.2293.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ CSP creates an allowlist of trusted sources. ]{#kobo.2294.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Our CSP has several directives: ]{#kobo.2295.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` default‑src 'self' `{.inlineCode}]{#kobo.2296.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : By default, only load resources from our own origin. ]{#kobo.2297.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` script‑src 'self' 'nonce‑...' `{.inlineCode}]{#kobo.2298.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Only load scripts from our origin or scripts with a matching nonce. ]{#kobo.2299.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` style‑src 'self' 'unsafe‑inline' https://fonts.googleapis.com `{.inlineCode}]{#kobo.2300.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Load styles from our origin, allow inline styles (needed for some libraries), and allow Google Fonts. ]{#kobo.2301.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` font‑src 'self' https://fonts.gstatic.com `{.inlineCode}]{#kobo.2302.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Load fonts from our origin and Google Fonts CDN. ]{#kobo.2303.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` Img‑src 'self' data: https: `{.inlineCode}]{#kobo.2304.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ Load images from our origin, data URIs (for inline images), and any HTTPS source. ]{#kobo.2305.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` Connect‑src 'self' [API_URL] `{.inlineCode}]{#kobo.2306.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ :Only make API requests to our origin and our API server. ]{#kobo.2307.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The nonce (number used once) in the ]{#kobo.2308.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` script-src `{.codeHighlighted}]{#kobo.2309.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ directive is important. ]{#kobo.2310.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of allowing all inline scripts with ]{#kobo.2311.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` unsafe-inline `{.codeHighlighted}]{#kobo.2312.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , we generate a unique random value for each request and only allow scripts with that specific nonce. ]{#kobo.2313.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This prevents injected scripts from running even if an attacker manages to insert them into our HTML. ]{#kobo.2314.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To learn more about nonce in CSP you can check out ]{#kobo.2315.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://content-security-policy.com/nonce ]{#kobo.2316.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://content-security-policy.com/nonce){style="text-decoration: none;"} [ . ]{#kobo.2317.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To implement ]{#kobo.2318.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b3922763 .index-entry index-entry="application security:security headers"} [ nonces, we need to generate a new random nonce for each request and use it both in the CSP header and in our script tags. ]{#kobo.2319.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s create a middleware that generates nonces. ]{#kobo.2320.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/middleware/nonce.ts

import { randomBytes } from 'node:crypto';

import { createContext, type MiddlewareFunction } from 'react-router';

export function generateNonce(): string {
  return randomBytes(16).toString('base64');
}

export const nonceContext = createContext<string>();

export const nonceMiddleware: MiddlewareFunction = async (
  { context },
  next,
) => {
  const nonce = generateNonce();
  context.set(nonceContext, nonce);

  return next();
};
```

[ This middleware generates a random nonce for each request and stores it in the context. ]{#kobo.2372.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The nonce will be used both in the CSP header and in our script tags so that the browser knows our scripts are legitimate. ]{#kobo.2373.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now we need to apply the security headers to every response that our application sends. ]{#kobo.2374.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/entry.server.tsx

import { applySecurityHeaders } from '@/lib/security-headers';

import { nonceContext } from './middleware/nonce';

export const streamTimeout = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: RouterContextProvider,
) {
  return new Promise((resolve, reject) => {
    // ...

    const nonce = loadContext.get(nonceContext);

    applySecurityHeaders(responseHeaders, nonce);

    // ...

    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} nonce={nonce} />,
      {
        nonce,
        // ...
      },
    );
  });
}
```

[ In the ]{#kobo.2454.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` entry.server.tsx `{.inlineCode}]{#kobo.2455.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file, we handle server-side rendering of our React application. ]{#kobo.2456.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is where we have access to the response headers before they\'re sent to the browser, making it the perfect place to apply our security headers. ]{#kobo.2457.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The key changes are: ]{#kobo.2458.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Get the nonce ]{#kobo.2459.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : We retrieve the nonce from the context that was set by our nonce middleware ]{#kobo.2460.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Apply security headers ]{#kobo.2461.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : We call ]{#kobo.2462.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` applySecurityHeaders `{.inlineCode}]{#kobo.2463.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ to add all security headers to the response ]{#kobo.2464.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Pass nonce to React ]{#kobo.2465.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : We pass the nonce to the ]{#kobo.2466.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ServerRouter `{.inlineCode}]{#kobo.2467.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component so it can be used in script tags throughout our application ]{#kobo.2468.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The nonce is ]{#kobo.2469.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_71532045 .index-entry index-entry="application security:security headers"} [ passed to React\'s rendering function, which will automatically add it to the script tags that React generates. ]{#kobo.2470.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This ensures that our application\'s JavaScript can run while blocking any injected scripts. ]{#kobo.2471.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Finally, we need to make the nonce available in our root layout so we can add it to the Scripts and ]{#kobo.2472.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ScrollRestoration `{.inlineCode}]{#kobo.2473.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ components that React Router provides. ]{#kobo.2474.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/root.tsx

import { QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { useState } from 'react';
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router';

import { Notifications } from '@/components/notifications';
import { createQueryClient } from '@/lib/react-query';

import type { Route } from './+types/root';
import './app.css';
import { nonceContext, nonceMiddleware } from './middleware/nonce';
import { userContext, userMiddleware } from './middleware/user';

export const middleware = [nonceMiddleware, userMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const nonce = context.get(nonceContext);
  return data({ user, nonce });
}

// ...

export function Layout({ children }: { children: React.ReactNode }) {
  const { nonce } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}
```

[ In the root ]{#kobo.2646.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_92e3c666 .index-entry index-entry="application security:security headers"} [ layout, we load the nonce from the loader data and pass it to the ]{#kobo.2647.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ScrollRestoration `{.inlineCode}]{#kobo.2648.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.2649.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Scripts `{.inlineCode}]{#kobo.2650.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ components. ]{#kobo.2651.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These components will add the nonce attribute to their script tags, allowing them to execute under our Content Security Policy. ]{#kobo.2652.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The middleware executes in order: first ]{#kobo.2653.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` nonceMiddleware `{.inlineCode}]{#kobo.2654.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ generates the nonce, then ]{#kobo.2655.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` userMiddleware `{.inlineCode}]{#kobo.2656.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ loads the user. ]{#kobo.2657.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Both values are stored in the context and loaded in the root loader, making them available to the entire application. ]{#kobo.2658.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With these security measures in place, our application is protected against common web vulnerabilities. ]{#kobo.2659.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The combination of httpOnly cookies, content sanitization, and security headers creates multiple layers of defense that work together to keep our users safe. ]{#kobo.2660.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Summary ]{#kobo.2661.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_212 .heading-1}

[ In this chapter, we implemented a complete authentication and authorization system and secured our application against common threats. ]{#kobo.2662.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We started by extending our API client to handle authentication tokens automatically, including automatic token refresh when access tokens expire. ]{#kobo.2663.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This provides a seamless user experience where users stay logged in without interruption. ]{#kobo.2664.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We built registration, login, and logout flows that use httpOnly cookies to store authentication tokens securely. ]{#kobo.2665.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These cookies can\'t be accessed by JavaScript, protecting them from XSS attacks. ]{#kobo.2666.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We created middleware to load the current user on every request and made the user available throughout the application with a simple ]{#kobo.2667.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useUser `{.codeHighlighted}]{#kobo.2668.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook. ]{#kobo.2669.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To protect sensitive routes, we implemented a protected middleware that redirects unauthenticated users to the login page. ]{#kobo.2670.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ By adding this middleware to layout components, we can protect entire sections of our application with a single line of code. ]{#kobo.2671.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We implemented authorization policies to control what authenticated users can do. ]{#kobo.2672.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These policies define who can create, edit, and delete different resources in our application. ]{#kobo.2673.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.2674.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useAuthorization `{.codeHighlighted}]{#kobo.2675.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook makes these policies easy to use in components, allowing us to show or hide UI elements based on user permissions. ]{#kobo.2676.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Beyond authentication and authorization, we implemented security measures to protect against attacks. ]{#kobo.2677.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We used DOMPurify to sanitize user-generated HTML content, preventing XSS attacks while still allowing users to create rich markdown content. ]{#kobo.2678.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We added comprehensive security headers including Content Security Policy with nonces to create multiple layers of defense against various browser-based attacks. ]{#kobo.2679.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ These security practices aren\'t just nice to have---they\'re essential for any production application. ]{#kobo.2680.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Authentication tells us who users are, authorization controls what they can do, and security measures protect both our users and our application from malicious actors. ]{#kobo.2681.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Get this book\'s PDF version and more ]{#kobo.2682.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_213 .heading-1}

[ Scan the QR code (or go to ]{#kobo.2683.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.2684.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ ). ]{#kobo.2685.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search for this book by name, confirm the edition, and then follow the steps on the page. ]{#kobo.2686.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_7_5.png" original-image-title="" style="width:25%;"} ]{#kobo.2687.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_7_6.png" original-image-title="" style="width:25%;"} ]{#kobo.2688.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[ Note: Keep your invoice handy. ]{#kobo.2689.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Purchases made directly from Packt don\'t require an invoice. ]{#kobo.2690.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}*
:::
