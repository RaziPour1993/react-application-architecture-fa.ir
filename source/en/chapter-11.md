::: {.section .chapter-first}
# [ 11 ]{#kobo.1.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_278 .chapterNumber}

# [ Testing the Application ]{#kobo.2.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_279 .chapterTitle}

[ Testing is what ]{#kobo.3.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c4f886d5 .index-entry index-entry="testing"} [ gives us confidence that our application works correctly. ]{#kobo.4.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we build features, fix bugs, or refactor code, we need to know that our changes don\'t break existing functionality. ]{#kobo.5.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Without tests, every change becomes risky, and we end up spending more time manually checking that everything still works. ]{#kobo.6.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In this chapter, we\'ll learn how to test ]{#kobo.7.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_12fef7e4 .index-entry index-entry="application testing"} [ our application using different testing approaches. ]{#kobo.8.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each approach serves a different purpose and together they create a comprehensive testing strategy that catches bugs early and keeps our application reliable. ]{#kobo.9.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll cover the following topics: ]{#kobo.10.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Understanding why testing is important ]{#kobo.11.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Unit testing ]{#kobo.12.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Integration testing ]{#kobo.13.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ End-to-end testing ]{#kobo.14.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By the end of this chapter, we\'ll have a solid testing strategy that gives us confidence to ship changes quickly and safely. ]{#kobo.15.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Technical requirements ]{#kobo.16.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_280 .heading-1}

[ Before we get started, we need to set up our project. ]{#kobo.17.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To be able to develop our project, we\'ll need the following things installed on our computer: ]{#kobo.18.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Node.js version 24 or above, npm version 11 or above ships with Node. ]{#kobo.19.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can confirm that by executing ]{#kobo.20.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` node -v `{.codeHighlighted}]{#kobo.21.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.22.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` npm -v `{.codeHighlighted}]{#kobo.23.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ in the terminal. ]{#kobo.24.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There are multiple ways to install Node.js and npm. ]{#kobo.25.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here is a great article that goes into more detail: ]{#kobo.26.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js ]{#kobo.27.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js){style="text-decoration: none;"}
- [ VS Code (optional) is a popular editor for JavaScript and TypeScript: open source, solid TypeScript support, and extensions. ]{#kobo.28.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It can be downloaded from ]{#kobo.29.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://code.visualstudio.com ]{#kobo.30.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://code.visualstudio.com){style="text-decoration: none;"} [ . ]{#kobo.31.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The code for this book is available at the book\'s repo. ]{#kobo.32.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To access The repository link, follow the steps in the ]{#kobo.33.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ \" ]{#kobo.34.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ Download the example code files ]{#kobo.35.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ \" ]{#kobo.36.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ section in the ]{#kobo.37.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Preface ]{#kobo.38.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ . ]{#kobo.39.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Clone it and enter the repository root: ]{#kobo.40.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

[ The repository contains chapter folders with the code for each chapter, plus a shared ]{#kobo.42.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` api `{.codeHighlighted}]{#kobo.43.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ folder with the API server used across all chapters. ]{#kobo.44.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We are on ]{#kobo.45.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ chapter ]{#kobo.46.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ 11 ]{#kobo.47.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , so we need to navigate to the ]{#kobo.48.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` chapter ‑11 `{.inlineCode}]{#kobo.49.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.50.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/chapter-11
```

[ Then we need to install dependencies: ]{#kobo.52.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm install
```

[ We also need to provide the environment variables: ]{#kobo.54.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cp .env.example .env
```

[ Now we should have the frontend running at ]{#kobo.56.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:5173 ]{#kobo.57.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:5173){style="text-decoration: none;"} [ . ]{#kobo.58.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We also need to have our API server running. ]{#kobo.59.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s open a new terminal window and navigate to the api directory: ]{#kobo.60.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/api
```

[ Now we need to run the setup script for ]{#kobo.62.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[[ Chapter 11 ]{#kobo.63.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_11.xhtml#h1_278){.chapref}* [ to configure everything for us: ]{#kobo.64.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run setup 11
```

[ Then we need to run the API server: ]{#kobo.66.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run dev
```

[ We should see the API server running on ]{#kobo.68.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:9999 ]{#kobo.69.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:9999){style="text-decoration: none;"} [ . ]{#kobo.70.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For more information about the setup details, check out the ]{#kobo.71.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` README.md `{.inlineCode}]{#kobo.72.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file. ]{#kobo.73.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Why testing is important ]{#kobo.74.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_281 .heading-1}

[ Imagine ]{#kobo.75.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_206229d5 .index-entry index-entry="testing:significance"} [ making a small change to your authentication logic and accidentally breaking the login flow for all users. ]{#kobo.76.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Or refactoring a component and unknowingly removing a feature that users depend on. ]{#kobo.77.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Without tests, these bugs are only discovered in production when users report them. ]{#kobo.78.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Tests act as a safety net. ]{#kobo.79.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They verify that our code works as expected and alert us immediately when something breaks. ]{#kobo.80.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This means we can refactor with confidence, add new features without fear, and catch bugs before they reach our users. ]{#kobo.81.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ But not all tests are equally valuable. ]{#kobo.82.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We need to think strategically about what to test and how to test it. ]{#kobo.83.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here are the three main types of tests we\'ll use: ]{#kobo.84.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Unit tests ]{#kobo.85.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ verify ]{#kobo.86.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0a25c3a1 .index-entry index-entry="tests:unit tests"} [ individual pieces of code in isolation. ]{#kobo.87.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They\'re fast to run and easy to write, but they can\'t tell us if different parts of our application work together correctly. ]{#kobo.88.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We use unit tests for utility functions, custom hooks, and reusable components that have clear inputs and outputs. ]{#kobo.89.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Integration tests ]{#kobo.90.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ verify ]{#kobo.91.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_23d1650f .index-entry index-entry="tests:integration tests"} [ how multiple parts work together. ]{#kobo.92.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They\'re more valuable than unit tests because they verify that our components, hooks, and API calls integrate correctly. ]{#kobo.93.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Most of our tests should be integration tests because they give us more confidence while still running relatively fast. ]{#kobo.94.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ End-to-end tests ]{#kobo.95.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ verify ]{#kobo.96.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e69264fb .index-entry index-entry="tests:end-to-end tests"} [ the entire application from the user\'s perspective. ]{#kobo.97.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They run the complete system with both frontend and backend, simulating real user interactions. ]{#kobo.98.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These tests are slower and more expensive to maintain, so we use them selectively to verify critical user journeys work from start to finish. ]{#kobo.99.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can use the testing trophy approach to decide what tests to write. ]{#kobo.100.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'ll write mostly integration tests, some end-to-end tests for critical paths, and unit tests for complex business logic. ]{#kobo.101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.102.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_11_1.png" data-original-image-title="" style="width:528.0px; height:363.97252382007537px;">Figure 11.1 – Testing trophy</span> </span>
</figure>

[ Figure 11.1 -- Testing trophy ]{#kobo.103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The idea ]{#kobo.104.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4031e37c .index-entry index-entry="testing:significance"} [ behind the testing trophy is to focus on integration tests for most functionality, use unit tests for complex logic that\'s hard to test otherwise, and reserve end-to-end tests for the most important user flows. ]{#kobo.105.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This gives us good coverage without slowing down our development workflow. ]{#kobo.106.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s see how to implement each type of test in our application. ]{#kobo.107.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Unit testing ]{#kobo.108.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_282 .heading-1}

**[ Unit testing ]{#kobo.109.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is a ]{#kobo.110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_53f5fd26 .index-entry index-entry="unit testing"} [ testing method where individual pieces of code (functions, hooks, components) are tested in isolation. ]{#kobo.111.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ External dependencies are replaced with mocks or stubs, ensuring tests are fast, deterministic, and focused solely on the unit\'s own logic. ]{#kobo.112.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The following diagram shows how unit tests work. ]{#kobo.113.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We test a single piece of code in isolation, providing inputs and verifying the outputs without involving any external systems: ]{#kobo.114.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.115.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_11_2.png" data-original-image-title="" style="width:528.0px; height:321.5617106137824px;">Figure 11.2 – Unit testing</span> </span>
</figure>

[ Figure 11.2 -- Unit testing ]{#kobo.116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For writing ]{#kobo.117.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_418cf505 .index-entry index-entry="unit testing"} [ unit tests, we can ]{#kobo.118.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e33bbe40 .index-entry index-entry="Vitest"} [ use ]{#kobo.119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Vitest ]{#kobo.120.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ as our test runner and ]{#kobo.121.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ React Testing Library ]{#kobo.122.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ for ]{#kobo.123.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_6058a393 .index-entry index-entry="React Testing Library"} [ testing React components and hooks. ]{#kobo.124.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Vitest is fast, has a great developer experience, and integrates seamlessly with our Vite-based application. ]{#kobo.125.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s look at how to unit test different parts of our application. ]{#kobo.126.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Utility functions are perfect candidates for unit testing. ]{#kobo.127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They have clear inputs and outputs, no side effects, and don\'t depend on external state. ]{#kobo.128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For example, our authorization policies have more logic and edge cases to cover, so they benefit from thorough unit testing: ]{#kobo.129.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/auth/lib/__tests__/authorization-policies.test.ts

const createUser = (id: string): CurrentUser => ({
  // ...
});

const createIdea = (authorId: string): Idea => ({
  // ...
});

const createReview = (authorId: string): Review => ({
  // ...
});

describe('IdeaPolicies', () => {
  describe('canCreate', () => {
    it('should return true for authenticated users', () => {
      expect(IdeaPolicies.canCreate(createUser('1'))).toBe(true);
    });

    it('should return false for unauthenticated users', () => {
      expect(IdeaPolicies.canCreate(null)).toBe(false);
    });
  });

  describe('canEdit', () => {
    it('should return true when user is the author', () => {
      const user = createUser('1');
      const idea = createIdea('1');
      expect(IdeaPolicies.canEdit(user, idea)).toBe(true);
    });

    it('should return false when user is not the author', () => {
      const user = createUser('2');
      const idea = createIdea('1');
      expect(IdeaPolicies.canEdit(user, idea)).toBe(false);
    });

    it('should return false when user is null', () => {
      const idea = createIdea('1');
      expect(IdeaPolicies.canEdit(null, idea)).toBe(false);
    });
  });

  describe('canDelete', () => {
    it('should return true when user is the author', () => {
      const user = createUser('1');
      const idea = createIdea('1');
      expect(IdeaPolicies.canDelete(user, idea)).toBe(true);
    });

    it('should return false when user is not the author', () => {
      const user = createUser('2');
      const idea = createIdea('1');
      expect(IdeaPolicies.canDelete(user, idea)).toBe(false);
    });
  });
});

describe('ReviewPolicies', () => {
  // ...
});
```

[ This test suite ]{#kobo.385.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e1e225c0 .index-entry index-entry="unit testing"} [ verifies that our ]{#kobo.386.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` IdeaPolicies `{.codeHighlighted}]{#kobo.387.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.388.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ReviewPolicies `{.codeHighlighted}]{#kobo.389.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ return the correct values across different scenarios: authenticated vs. ]{#kobo.390.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ unauthenticated users, authors vs. ]{#kobo.391.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ non-authors, and different resource types. ]{#kobo.392.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each test is focused on a single, specific behavior. ]{#kobo.393.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Utility functions like these are the easiest things to unit test because they\'re pure logic with no dependencies. ]{#kobo.394.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But what about testing React components? ]{#kobo.395.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ Let\'s look at that next. ]{#kobo.395.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Integration testing ]{#kobo.396.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_283 .heading-1}

[ Unit tests ]{#kobo.397.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_8e144108 .index-entry index-entry="integration testing"} [ should be fast and focused. ]{#kobo.398.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They should verify that individual pieces work correctly in isolation. ]{#kobo.399.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But they can\'t tell us if we wired everything correctly and our application works when all these pieces come together. ]{#kobo.400.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ That\'s where integration tests come in. ]{#kobo.401.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Our unit tests might pass, but our application can still break. ]{#kobo.402.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Integration testing catches these gaps by testing multiple parts of the application working together. ]{#kobo.403.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of testing a part of the application in isolation, we test how it works in the context of the application and all its parts. ]{#kobo.404.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The only thing we mock is the API layer. ]{#kobo.405.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This is the most valuable type of testing for most applications. ]{#kobo.406.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A good approach for integration testing is to test individual pages. ]{#kobo.407.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This ensures we are testing the complete flow of a route, including loaders, error boundaries, and user interactions within that page. ]{#kobo.408.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The following ]{#kobo.409.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_249b1e3a .index-entry index-entry="integration testing"} [ diagram illustrates how integration tests cover more of the application stack compared to unit tests: ]{#kobo.410.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.411.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_11_3.png" data-original-image-title="" style="width:528.0px; height:319.8067804121427px;">Figure 11.3 – Integration testing</span> </span>
</figure>

[ Figure 11.3 -- Integration testing ]{#kobo.412.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ As the diagram shows, integration tests cover the full component tree of a page, including routing and data loading. ]{#kobo.413.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The only boundary we mock is the API layer, which gives us control over the data without needing a running backend. ]{#kobo.414.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We have two options for what tools to use for integration testing: ]{#kobo.415.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Vitest and React Testing Library with mocked API requests ]{#kobo.416.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ but it becomes tricky when testing server-side rendered pages and data passing from server to client. ]{#kobo.417.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React Testing Library can render components, but it can\'t test how loaders fetch and pass data to the route components. ]{#kobo.418.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Playwright with mocked API requests ]{#kobo.419.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ . ]{#kobo.420.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This approach is powerful because we\'re testing our application exactly as users experience it, in a real browser with real interactions but without depending on a backend server. ]{#kobo.421.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ By mocking API requests, we can control exactly what data our application receives and test different scenarios like success, errors, and edge cases. ]{#kobo.422.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This gives us the sweet spot between speed and confidence. ]{#kobo.423.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Since our application uses React Router with server-side rendering, the second option is a better fit. ]{#kobo.424.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ While Playwright is primarily an end-to-end testing tool, it works well for integration testing too. ]{#kobo.425.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Playwright has a built-in ]{#kobo.426.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` page.route() `{.codeHighlighted}]{#kobo.427.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ mocking mechanism but it can only intercept requests made by the browser. ]{#kobo.428.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In an SSR application, the server also makes API requests from the loaders, and those requests bypass Playwright\'s client-side interception. ]{#kobo.429.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Until that\'s supported by Playwright, we can use ]{#kobo.430.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_dd94d5a2 .index-entry index-entry="Mocky Balboa library"} [ the ]{#kobo.431.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Mocky Balboa ]{#kobo.432.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ library to mock API requests via ]{#kobo.433.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` mocky.route() `{.codeHighlighted}]{#kobo.434.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ during both server-side rendering and client-side navigation. ]{#kobo.435.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It intercepts requests in both environments, so the same mock data is used whether the page is server-rendered on first load or client-rendered during navigation. ]{#kobo.436.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This gives us consistent, reliable test behavior ]{#kobo.437.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_579e98c4 .index-entry index-entry="integration testing"} [ regardless of how the page is loaded. ]{#kobo.438.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s test the ideas page to see how this works in practice: ]{#kobo.439.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/ideas/__tests__/ideas.integration.test.ts

import { test, expect } from 'testing/fixtures/integration.fixture';
import { generateIdea } from 'testing/test-data';

test.describe('Ideas page', () => {
  test.beforeEach(async ({ mocky, API_URL }) => {
    const tags = ['technology', 'design', 'business', 'health'];

    mocky.route(`${API_URL}/ideas/tags`, (route) => {
      return route.fulfill({
        body: JSON.stringify({ data: tags }),
        status: 200,
      });
    });
  });

  test.describe('Display', () => {
    test('displays ideas list', async ({ page, mocky, API_URL }) => {
      const ideas = [generateIdea(), generateIdea()];
      mocky.route(`${API_URL}/ideas**`, async (route) => {
        return route.fulfill({
          body: JSON.stringify({
            data: ideas,
            pagination: {
              page: 1,
              limit: 10,
              total: ideas.length,
              totalPages: 1,
              prevPage: null,
              nextPage: null,
            },
          }),
          status: 200,
        });
      });

      await page.goto('/ideas');

      await expect(page.getByTestId('idea-list-item').first()).toContainText(
        ideas[0].title,
      );
      await expect(page.getByTestId('idea-list-item').nth(1)).toContainText(
        ideas[1].title,
      );
    });
  });

  test.describe('Error handling', () => {
    test('shows error when ideas fail to load', async ({
      page,
      mocky,
      API_URL,
    }) => {
      mocky.route(`${API_URL}/ideas**`, (route) => {
        return route.fulfill({
          body: JSON.stringify({ message: 'Failed to fetch ideas' }),
          status: 500,
        });
      });

      await page.goto('/ideas');

      await expect(page.getByTestId('ideas-skeleton')).not.toBeVisible();

      await expect(page.getByText('Failed to fetch ideas')).toBeVisible({
        timeout: 10000,
      });
    });
  });

  test.describe('Search and filter', () => {
    // ...
  });

  test.describe('Pagination', () => {
    // ...
  });
});
```

[ This integration test ]{#kobo.694.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ddb8f4ef .index-entry index-entry="integration testing"} [ verifies that our ideas page works correctly by testing it in a real browser with different API responses. ]{#kobo.695.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s break down the key concepts: ]{#kobo.696.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Mocking API routes ]{#kobo.697.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - The ]{#kobo.698.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` mocky.route() `{.codeHighlighted}]{#kobo.699.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ function intercepts network requests and returns mock data. ]{#kobo.700.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This gives us complete control over what data our application receives. ]{#kobo.701.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can test success scenarios, error scenarios, empty states, and edge cases without needing a real backend. ]{#kobo.702.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ All we need is to mock the API routes that are used in the application and perform assertions on the page. ]{#kobo.703.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Testing user interactions ]{#kobo.704.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - We interact with the page exactly as a user would: filling in search inputs, clicking filter buttons, changing sort options. ]{#kobo.705.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The tests verify that these interactions produce the expected results. ]{#kobo.706.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Descriptive test organization ]{#kobo.707.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - We organize tests into describe blocks by feature area: Display, Error handling, Search and filter, and Pagination. ]{#kobo.708.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This makes it easy to understand what we\'re testing and to find specific tests later. ]{#kobo.709.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The power of integration tests is that they test realistic scenarios. ]{#kobo.710.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'re not testing whether a component renders correctly in isolation, we\'re testing whether users can actually search for ideas, filter by tags, and load more results. ]{#kobo.711.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These are the behaviors that matter to our users. ]{#kobo.712.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Integration tests give us confidence that features work correctly without the maintenance burden of end-to-end tests. ]{#kobo.713.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But things can still go wrong, so there\'s still value in testing the complete system with both frontend and backend. ]{#kobo.714.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ End-to-end testing ]{#kobo.715.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_284 .heading-1}

**[ End-to-end testing ]{#kobo.716.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is ]{#kobo.717.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ae127585 .index-entry index-entry="end-to-end testing"} [ where we test the complete application with both frontend and backend running together. ]{#kobo.718.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Unlike integration tests where we mock the API, end-to-end tests are executed in a production-like environment where they hit the API, interact with the database, and verify that the entire system works as a cohesive whole. ]{#kobo.719.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ These tests are the most expensive to write and maintain. ]{#kobo.720.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They\'re slower to run, more likely to be flaky, and require more infrastructure. ]{#kobo.721.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But they\'re also the most realistic since they test exactly what users will experience in production. ]{#kobo.722.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Because of their cost, we use end-to-end tests selectively. ]{#kobo.723.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We focus on critical user journeys, the core flows that must work for our application to be useful. ]{#kobo.724.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For our application, the critical journeys are user authentication, creating an idea, reviewing someone else\'s idea, and managing a user\'s profile. ]{#kobo.725.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The following diagram shows how end-to-end tests interact with the full system: ]{#kobo.726.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.727.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_11_4.png" data-original-image-title="" style="width:528.0px; height:350.5180589408376px;">Figure 11.4 – End-to-end testing</span> </span>
</figure>

[ Figure 11.4 -- End-to-end testing ]{#kobo.728.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Unlike integration tests where we mocked the API, end-to-end tests go through the entire stack. ]{#kobo.729.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The browser makes requests to our frontend, which communicates with the real API, which reads and writes to the real database. ]{#kobo.730.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Nothing is mocked and the entire flow is tested. ]{#kobo.731.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll use Playwright to run these tests in a headless browser, simulating real user interactions: ]{#kobo.732.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// testing/e2e/smoke.spec.ts

import { test, expect } from '../fixtures/e2e.fixture';
import { generateIdea, generateReview, generateUser } from '../test-data';

test.describe('Smoke Test', () => {
  const testUser = {
    ...generateUser(),
    password: 'password123',
  };

  const testIdea = generateIdea();
  const testReview = generateReview();
  const updatedReviewContent = 'Updated review content';

  test('Complete User Journey', async ({ page }) => {
    await test.step('register a new user', async () => {
      await page.goto('/auth/register');

      await page
        .getByRole('textbox', { name: 'Username' })
        .fill(testUser.username);
      await page.getByRole('textbox', { name: 'Email' }).fill(testUser.email);
      await page.getByLabel('Password').fill(testUser.password);

      await page.getByRole('button', { name: 'Register' }).click();

      await expect(page).toHaveURL('/dashboard');
    });

    await test.step('log out the user', async () => {
      await page.getByRole('button', { name: 'Logout' }).click();
      await expect(page).toHaveURL('/');
    });

    await test.step('login with the same user', async () => {
      await page.getByRole('link', { name: 'Login' }).click();
      await expect(page).toHaveURL('/auth/login');

      await page.getByRole('textbox', { name: 'Email' }).fill(testUser.email);
      await page.getByLabel('Password').fill(testUser.password);

      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page).toHaveURL('/dashboard');
    });

    await test.step('create a new idea', async () => {
     // ...
    });

    await test.step('edit the idea', async () => {
      // ...
    });

    await test.step('delete the idea', async () => {
      // ...
    });

    await test.step('discover ideas', async () => {
      // ...
    });

    await test.step('write a review for an idea of someone else', async () => {
      // ...
    });

    await test.step('edit the review', async () => {
      // ...
    });

    await test.step('delete the review', async () => {
      // ...
    });

    await test.step('update the user profile', async () => {
      // ...
    });
  });
});
```

[ This smoke ]{#kobo.1015.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a466ba3b .index-entry index-entry="end-to-end testing"} [ test walks through the entire user journey from registration to profile updates. ]{#kobo.1016.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s called a \"smoke test\" because it verifies that nothing is on fire and the core functionality works from end to end. ]{#kobo.1017.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s look at what makes this test effective: ]{#kobo.1018.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Test steps for clarity ]{#kobo.1019.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - Use ]{#kobo.1020.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` test.step() `{.codeHighlighted}]{#kobo.1021.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to break the test into logical sections. ]{#kobo.1022.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This makes the test easier to understand and helps us identify exactly which step failed if something goes wrong. ]{#kobo.1023.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Complete user journey ]{#kobo.1024.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - Cover everything a user might do: register, log out, log in, create content, edit it, delete it, discover other content, interact with it, and update their profile. ]{#kobo.1025.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is realistic usage. ]{#kobo.1026.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ No mocking ]{#kobo.1027.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - Unlike integration tests, we don\'t mock any API calls. ]{#kobo.1028.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This test hits the real backend, creates real database records, and verifies that the entire system works together. ]{#kobo.1029.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ End-to-end tests like this are our final safety net. ]{#kobo.1030.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If this test passes, we have strong confidence that our application works in production. ]{#kobo.1031.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But we usually don\'t need many of these since they are more expensive and complex to set up and run, so one or two comprehensive smoke tests covering the critical paths is usually enough depending on the application complexity. ]{#kobo.1032.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With unit tests for complex logic, integration tests for features, and end-to-end tests for critical journeys, we have a testing strategy that catches bugs at multiple levels while keeping our test suite maintainable and fast. ]{#kobo.1033.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Summary ]{#kobo.1034.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_285 .heading-1}

[ In this chapter, we learned how to test our application using three complementary approaches. ]{#kobo.1035.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each type of test serves a different purpose and together they create a comprehensive testing strategy. ]{#kobo.1036.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We started with unit tests, which verify that individual functions, hooks, and components work correctly in isolation. ]{#kobo.1037.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These tests are fast and focused, making them perfect for testing utility functions and complex logic that\'s hard to test otherwise. ]{#kobo.1038.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We then moved to integration tests, which test how multiple parts of our application work together. ]{#kobo.1039.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These are the most valuable tests for most applications because they verify realistic scenarios without the maintenance burden of end-to-end tests. ]{#kobo.1040.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ By mocking only the API layer, we can test our application exactly as users experience it while maintaining fast, reliable tests. ]{#kobo.1041.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Finally, we covered end-to-end tests that verify the entire system works from start to finish. ]{#kobo.1042.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These tests are expensive to maintain, so we use them selectively for critical user journeys. ]{#kobo.1043.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When they pass, they give us confidence that our application works in production. ]{#kobo.1044.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The key insight is to focus most of our testing effort on integration tests, use unit tests for complex isolated logic, and reserve end-to-end tests for the most important user flows. ]{#kobo.1045.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This balanced approach gives us strong confidence without slowing down our development. ]{#kobo.1046.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With a solid testing strategy in place, we can refactor code, add new features, and fix bugs knowing that our tests will catch any regressions. ]{#kobo.1047.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is what lets us move fast while keeping our application reliable. ]{#kobo.1048.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Get this book\'s PDF copy, code bundle, and more ]{#kobo.1049.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_286 .heading-1}

[ Scan the QR code (or go to ]{#kobo.1050.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.1051.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ ). ]{#kobo.1052.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search for this book by name, confirm the edition, and then follow the steps on the page. ]{#kobo.1053.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_11_5.png" original-image-title="" style="width:25%;"} ]{#kobo.1054.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_11_6.png" original-image-title="" style="width:25%;"} ]{#kobo.1055.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[ Note: Have your invoice handy. ]{#kobo.1056.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Purchases made directly from the Packt website don\'t require an invoice. ]{#kobo.1057.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}*
:::
