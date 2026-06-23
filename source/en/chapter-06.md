::: {.section .chapter}
# [ 6 ]{#kobo.1.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_188 .chapterNumber}

# [ Managing Application State ]{#kobo.2.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_189 .chapterTitle}

[ State management is an important aspect of every interactive web application. ]{#kobo.3.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It determines how data flows through our application, how the UI responds to user interactions, and how to keep the application synchronized with the API. ]{#kobo.4.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Without proper state management, our applications would be difficult to maintain and prone to bugs. ]{#kobo.5.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ State refers to application data that changes over time and affects what is rendered in the UI. ]{#kobo.6.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When state changes, React re-renders the components that depend on that state, updating the UI to reflect the new data. ]{#kobo.7.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This mechanism is what makes interactive web applications responsive and dynamic. ]{#kobo.8.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In React applications, there are different types of state depending on where the data comes from, how long it should persist, and which components need access to it. ]{#kobo.9.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Understanding these different types of state helps us make better architectural decisions and write more maintainable code. ]{#kobo.10.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'ll cover the following topics: ]{#kobo.11.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Managing local state ]{#kobo.12.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Sharing state globally across components ]{#kobo.13.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Handling asynchronous data from the server ]{#kobo.14.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Managing form state with validation ]{#kobo.15.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Using URL state for persistence and sharing ]{#kobo.16.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By the end of this chapter, we\'ll have an understanding of the different types of state in React applications and when to use each approach. ]{#kobo.17.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'ll see practical examples from our application that demonstrate real-world state management patterns. ]{#kobo.18.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Technical requirements ]{#kobo.19.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_190 .heading-1}

[ Before we get started, we need to set up our project. ]{#kobo.20.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To develop our project, we need the following tools installed on our computer: ]{#kobo.21.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Node.js version 24 or above. ]{#kobo.22.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ npm version 11 or above ships with Node. ]{#kobo.23.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can confirm this by executing ]{#kobo.24.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` node ‑v `{.inlineCode}]{#kobo.25.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.26.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` npm ‑v `{.inlineCode}]{#kobo.27.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ in the terminal. ]{#kobo.28.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There are multiple ways to install Node.js and npm. ]{#kobo.29.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here is a helpful article that goes into more detail: ]{#kobo.30.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js ]{#kobo.31.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js){style="text-decoration: none;"} [ . ]{#kobo.32.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ VS Code ]{#kobo.33.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ (optional), a popular editor for JavaScript and TypeScript. ]{#kobo.34.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It is open source, has solid TypeScript support, and offers many extensions. ]{#kobo.35.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It can be downloaded from ]{#kobo.36.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://code.visualstudio.com ]{#kobo.37.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://code.visualstudio.com){style="text-decoration: none;"} [ . ]{#kobo.38.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The code for this book is available at the book\'s repo. ]{#kobo.39.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To access the repository link, follow the steps in the \" ]{#kobo.40.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Download ]{#kobo.41.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ the example code files ]{#kobo.42.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ \" section in the ]{#kobo.43.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Preface ]{#kobo.44.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ . ]{#kobo.45.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Clone it and enter the repository root: ]{#kobo.46.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

[ The repository contains chapter folders with the code for each chapter, along with a shared ]{#kobo.48.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` api `{.inlineCode}]{#kobo.49.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ folder that includes the API server used across all chapters. ]{#kobo.50.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We are working on ]{#kobo.51.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[[ Chapter 6 ]{#kobo.52.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_6.xhtml#h1_188){.chapref}* [ , so navigate to the ]{#kobo.53.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` chapter‑06 `{.inlineCode}]{#kobo.54.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.55.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/chapter-06
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

[ We also need to run the API server. ]{#kobo.64.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Open a new terminal window and navigate to the ]{#kobo.65.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` api `{.inlineCode}]{#kobo.66.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.67.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/api
```

[ Run the setup script for ]{#kobo.69.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[[ Chapter 6 ]{#kobo.70.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_6.xhtml#h1_188){.chapref}* [ to configure everything: ]{#kobo.71.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run setup 06
```

[ Then start the API server: ]{#kobo.73.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run dev
```

[ The API server should now be running on ]{#kobo.75.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:9999 ]{#kobo.76.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:9999){style="text-decoration: none;"} [ . ]{#kobo.77.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For more information about the setup details, check out the ]{#kobo.78.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` README.md `{.codeHighlighted}]{#kobo.79.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file. ]{#kobo.80.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Managing local state ]{#kobo.81.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_191 .heading-1}

[ Local state is ]{#kobo.82.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b7cadaaa .index-entry index-entry="application state:local state, managing"} [ the simplest ]{#kobo.83.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0f545a55 .index-entry index-entry="local state"} [ and most fundamental type of state in React. ]{#kobo.84.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It lives within a single component and is only accessible to that component and its ]{#kobo.85.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_fee25c13 .index-entry index-entry="local state:managing"} [ children if passed down as props. ]{#kobo.86.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This encapsulation makes local state easy to reason about and maintain. ]{#kobo.87.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We should try to keep the state as close to the component that needs it as possible. ]{#kobo.88.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If a piece of state is only needed within a small portion of the application and does not need to be persisted, there\'s no reason to make it more complicated. ]{#kobo.89.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This principle of keeping state colocated helps us avoid unnecessary complexity and makes our components more reusable. ]{#kobo.90.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s look at a practical example from our application. ]{#kobo.91.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we try to create a new review from the idea detail page, we need to track whether the review modal is open or closed. ]{#kobo.92.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ First, we need to click the \"Write Review\" button: ]{#kobo.93.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.94.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_6_1.png" data-original-image-title="" style="width:528.0px; height:235.45313538666073px;">Figure 6.1 – Write Review button</span> </span>
</figure>

[ Figure 6.1 -- Write Review button ]{#kobo.95.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When ]{#kobo.96.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_16a87721 .index-entry index-entry="local state:managing"} [ we ]{#kobo.97.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_6b96aa2b .index-entry index-entry="application state:local state, managing"} [ click the button, the review modal should open: ]{#kobo.98.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.99.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_6_2.png" data-original-image-title="" style="width:528.0px; height:254.05539552404164px;">Figure 6.2 – Review modal in action</span> </span>
</figure>

[ Figure 6.2 -- Review modal in action ]{#kobo.100.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here is the code for the ]{#kobo.101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` CreateReview `{.codeHighlighted}]{#kobo.102.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component: ]{#kobo.103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/reviews/components/create-review.tsx

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ReviewFormModal } from '@/features/reviews/components/review-form-modal';

export function CreateReview({ ideaId }: { ideaId: string }) {

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const createReviewMutation = useCreateReviewMutation({
    options: {
      onSuccess: () => {
        setIsReviewModalOpen(false);
      },
    },
  });


  const handleOpenReviewModalForCreate = () => {
    setIsReviewModalOpen(true);
  };


  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    createReviewMutation.reset();
  };

  // ...

  return (
    <>
      <Button
        onClick={handleOpenReviewModalForCreate}
        disabled={createReviewMutation.isPending}
      >
        Write Review
      </Button>
      <ReviewFormModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        onSubmit={handleReviewSubmit}
        isSubmitting={createReviewMutation.isPending}
        ideaId={ideaId}
        error={createReviewMutation.error}
      />
    </>
  );
}
```

[ In this ]{#kobo.214.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c826f343 .index-entry index-entry="local state:managing"} [ example, we\'re using the ]{#kobo.215.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useState `{.codeHighlighted}]{#kobo.216.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook to ]{#kobo.217.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0b5c7b46 .index-entry index-entry="application state:local state, managing"} [ manage the modal\'s open/closed state. ]{#kobo.218.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.219.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` isReviewModalOpen `{.codeHighlighted}]{#kobo.220.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ boolean tracks whether the modal is currently displayed, and we have two handler functions to open and close it. ]{#kobo.221.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is a good example of using local state because: ]{#kobo.222.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ The modal state is only needed within this component ]{#kobo.223.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ No other components in our application need to know if this modal is open ]{#kobo.224.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The state doesn\'t need to persist when the component unmounts ]{#kobo.225.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The logic is self-contained and easy to understand ]{#kobo.226.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When the user clicks the \"Write Review\" button, we call ]{#kobo.227.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` handleOpenReviewModalForCreate `{.codeHighlighted}]{#kobo.228.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ which sets the state to ]{#kobo.229.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` true `{.codeHighlighted}]{#kobo.230.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , opening the modal. ]{#kobo.231.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the user closes the modal or submits the review, we call ]{#kobo.232.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` handleCloseReviewModal `{.codeHighlighted}]{#kobo.233.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ which sets the state back to ]{#kobo.234.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` false `{.codeHighlighted}]{#kobo.235.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.236.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This pattern works ]{#kobo.237.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_11e37dee .index-entry index-entry="application state:local state, managing"} [ great for UI state that\'s isolated to a single component. ]{#kobo.238.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ However, as ]{#kobo.239.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_97b4152b .index-entry index-entry="local state:managing"} [ our application grows, we\'ll encounter situations where multiple components need access to the same state or we need to update the state from multiple parts of the application. ]{#kobo.240.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ That\'s where global state comes in. ]{#kobo.241.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Sharing state globally ]{#kobo.242.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_192 .heading-1}

[ Global state is ]{#kobo.243.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_2f154e85 .index-entry index-entry="application state:global state, managing"} [ application ]{#kobo.244.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b5bf7321 .index-entry index-entry="global state"} [ state that can be accessed or modified from ]{#kobo.245.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_efd6f580 .index-entry index-entry="global state:managing"} [ any component in the application that is subscribed to the changes, regardless of where it sits in the component tree. ]{#kobo.246.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Unlike local state, which is encapsulated within a single component, global state is shared across multiple parts of our application. ]{#kobo.247.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The most common use cases for global state are features that need to be triggered or accessed from anywhere in the application. ]{#kobo.248.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For example, showing notifications, managing theme preferences, or tracking the current user\'s shopping cart. ]{#kobo.249.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In our application, we use global state for the notifications system. ]{#kobo.250.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When a user creates a review, updates their profile, or encounters an error, we want to show a toast notification. ]{#kobo.251.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Since these actions can happen from any page or component, we need a way to trigger notifications globally. ]{#kobo.252.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ There are several approaches to managing global state in React: ]{#kobo.253.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Prop drilling ]{#kobo.254.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - Passing state down through many levels of components, but it becomes difficult to manage quickly as the application grows. ]{#kobo.255.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Intermediate components must accept and forward props they never read, so they become coupled to data they do not use which also makes the application difficult to maintain. ]{#kobo.256.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Context API ]{#kobo.257.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - React\'s built-in solution for sharing state. ]{#kobo.258.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s worth noting that context API is just a mechanism for passing data down through the component tree, not a full state management solution and can cause performance issues if not used carefully, since all consumers are rerendered when the provider value changes. ]{#kobo.259.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Redux ]{#kobo.260.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - A powerful but verbose state management library. ]{#kobo.261.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It adds boilerplate, but it\'s very popular. ]{#kobo.262.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Zustand ]{#kobo.263.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - A lightweight state management library with minimal boilerplate which is our choice for this project. ]{#kobo.264.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We chose Zustand for our application because it provides a simple API, good TypeScript support, and good performance without the complexity of larger solutions like Redux. ]{#kobo.265.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is exactly what we need. ]{#kobo.266.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s see how we implement our notifications store using Zustand: ]{#kobo.267.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/stores/notifications.ts

import { create } from 'zustand';

import { uid } from '@/lib/uid';

export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export type Notification = {
  id: string;
  type: NotificationType;
  title?: string;
  duration?: number;
  message?: string;
};

type NotificationsStore = {
  notifications: Notification[];
  actions: {
    showNotification: (notification: Omit<Notification, 'id'>) => void;
    dismissNotification: (id: string) => void;
  };
};

const useNotificationsStore = create<NotificationsStore>((set, get) => ({
  notifications: [],
  actions: {
    showNotification: (notification) => {
      const id = uid();
      const duration = notification.duration ?? 5000;

      set((state) => ({
        notifications: [
          ...state.notifications,
          { id, duration, ...notification },
        ],
      }));
      if (duration > 0) {
        setTimeout(() => {
          get().actions.dismissNotification(id);
        }, duration);
      }
    },
    dismissNotification: (id) => {
      set((state) => ({
        notifications: state.notifications.filter(
          (notification) => notification.id !== id,
        ),
      }));
    },
  },
}));

export const useNotifications = () =>
  useNotificationsStore((state) => state.notifications);

export const useNotificationActions = () =>
  useNotificationsStore((state) => state.actions);
```

[ This ]{#kobo.444.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ec85e931 .index-entry index-entry="application state:global state, managing"} [ store demonstrates several important patterns for global state management. ]{#kobo.445.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'re ]{#kobo.446.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_158f6af5 .index-entry index-entry="global state:managing"} [ creating a Zustand store with the ]{#kobo.447.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` create `{.codeHighlighted}]{#kobo.448.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ function, which takes a callback function that defines our state structure. ]{#kobo.449.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The store contains a ]{#kobo.450.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` notifications `{.codeHighlighted}]{#kobo.451.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ array to hold all active notifications and an ]{#kobo.452.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` actions `{.codeHighlighted}]{#kobo.453.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ object with methods to show and dismiss notifications. ]{#kobo.454.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The ]{#kobo.455.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` showNotification `{.codeHighlighted}]{#kobo.456.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ action generates a unique ID for each notification, adds it to the notifications array, and sets up an automatic dismissal after the specified duration (defaulting to 5 seconds). ]{#kobo.457.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.458.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` dismissNotification `{.codeHighlighted}]{#kobo.459.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ action removes a notification from the array by filtering it out based on its ID. ]{#kobo.460.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ An important performance optimization we\'re using here is separating the state and actions into different selector hooks. ]{#kobo.461.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of exporting the store directly, we export two custom hooks: ]{#kobo.462.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useNotifications `{.codeHighlighted}]{#kobo.463.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ for accessing the notifications array and ]{#kobo.464.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useNotificationActions `{.codeHighlighted}]{#kobo.465.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ for accessing the action methods. ]{#kobo.466.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This ]{#kobo.467.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ccad30f6 .index-entry index-entry="global state:managing"} [ separation means that components using only the actions won\'t re-render when ]{#kobo.468.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7c285212 .index-entry index-entry="application state:global state, managing"} [ the notifications array changes, and it improves performance. ]{#kobo.469.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ With our store defined, we need a component to display the notifications to users: ]{#kobo.470.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/components/notifications.tsx

import {
  useNotifications,
  useNotificationActions,
  type Notification,
} from '@/stores/notifications';

type NotificationItemProps = {
  notification: Notification;
};

export function NotificationItem({ notification }: NotificationItemProps) {
  // ...
}

export function Notifications() {
  const notifications = useNotifications();

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
```

[ The ]{#kobo.542.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Notifications `{.codeHighlighted}]{#kobo.543.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component is straightforward. ]{#kobo.544.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It uses the ]{#kobo.545.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useNotifications `{.codeHighlighted}]{#kobo.546.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook to access the notifications array from our global store and renders a ]{#kobo.547.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` NotificationItem `{.codeHighlighted}]{#kobo.548.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ for each notification to show them to the user. ]{#kobo.549.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To make notifications available throughout our application, we need to render this component at the root level. ]{#kobo.550.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This ensures that no matter which page the user is on, notifications will appear: ]{#kobo.551.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/root.tsx

import { Notifications } from '@/components/notifications';

export default function App() {
  const [queryClient] = useState(() => createQueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Notifications />
      <Outlet />
    </QueryClientProvider>
  );
}
```

[ By placing the ]{#kobo.594.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Notifications `{.codeHighlighted}]{#kobo.595.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component at the root of our application, it will be rendered from every page. ]{#kobo.596.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.597.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` < `{.codeHighlighted}]{#kobo.598.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` Outlet / `{.codeHighlighted}]{#kobo.599.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` > `{.codeHighlighted}]{#kobo.600.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component renders our page content, while the ]{#kobo.601.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Notifications `{.codeHighlighted}]{#kobo.602.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component sits above it, ready to display notifications triggered from anywhere in the application. ]{#kobo.603.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now ]{#kobo.604.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f525d432 .index-entry index-entry="global state:managing"} [ comes ]{#kobo.605.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7052a109 .index-entry index-entry="application state:global state, managing"} [ the real power of global state: we can show notifications from any component without prop drilling or complex state passing. ]{#kobo.606.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here\'s how we can notify the user when a review is created: ]{#kobo.607.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/reviews/components/create-review.tsx

import { useState } from 'react';

import { useCreateReviewMutation } from '@/features/reviews/api/create-review';
import { useNotificationActions } from '@/stores/notifications';

export function CreateReview({ ideaId }: { ideaId: string }) {

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const { showNotification } = useNotificationActions();

  const createReviewMutation = useCreateReviewMutation({
    options: {
      onSuccess: () => {
        // trigger the notification to be shown
        showNotification({
          type: 'success',
          title: 'Review created',
        });
        setIsReviewModalOpen(false);
      },
    },
  });
  // ... 
}
```

[ In the ]{#kobo.670.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` CreateReview `{.codeHighlighted}]{#kobo.671.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component, we use the ]{#kobo.672.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useNotificationActions `{.codeHighlighted}]{#kobo.673.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook to get access to the ]{#kobo.674.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` showNotification `{.codeHighlighted}]{#kobo.675.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ action. ]{#kobo.676.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the review is successfully created, we call this action with the notification details. ]{#kobo.677.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The notification appears in the top-right corner of the screen, automatically disappears after 5 seconds, and can be dismissed by the user, as shown in Figure 6.3: ]{#kobo.678.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.679.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_6_3.png" data-original-image-title="" style="width:528.0px; height:309.51118989585643px;">A screenshot of a computer AI-generated content may be incorrect.</span> </span>
</figure>

[ Figure 6.3 -- Notifications in action ]{#kobo.680.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This is ]{#kobo.681.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_62206aaa .index-entry index-entry="application state:global state, managing"} [ the benefit of global state management. ]{#kobo.682.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We don\'t need to pass ]{#kobo.683.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f67f6376 .index-entry index-entry="global state:managing"} [ the notification system down through props or worry about where in the component tree we are. ]{#kobo.684.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Any component can show a notification by simply calling ]{#kobo.685.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` showNotification `{.inlineCode}]{#kobo.686.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.687.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This makes our code cleaner and our features easier to implement. ]{#kobo.688.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now what if we have a state that comes from the server? ]{#kobo.689.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ For example, we want to fetch the current user\'s reviews from the server and display them in the dashboard reviews page. ]{#kobo.689.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is where asynchronous state comes in. ]{#kobo.690.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Handling asynchronous state ]{#kobo.691.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_193 .heading-1}

[ Asynchronous state ]{#kobo.692.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_38d99681 .index-entry index-entry="application state:asynchronous state, handling"} [ is state that comes from external sources ]{#kobo.693.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f9924bbe .index-entry index-entry="asynchronous state"} [ like API requests. ]{#kobo.694.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Unlike local or global state that we control entirely on the client, async state ]{#kobo.695.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f801fe75 .index-entry index-entry="asynchronous state:handling"} [ is a bit more challenging because it is loaded asynchronously so it can be loading, failing with errors, becoming stale, and needing to be synchronized between the source and the application. ]{#kobo.696.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Managing async state manually with ]{#kobo.697.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` useState `{.inlineCode}]{#kobo.698.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.699.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` useEffect `{.inlineCode}]{#kobo.700.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ quickly becomes complex. ]{#kobo.701.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We need to track loading states, handle errors, prevent race conditions, implement caching, and manage refetching. ]{#kobo.702.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is where React Query becomes super useful. ]{#kobo.703.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It provides a powerful and declarative way to manage all aspects of asynchronous data. ]{#kobo.704.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We already explored React Query in the previous chapter, but let\'s look at how it fits into our overall state management strategy once again. ]{#kobo.705.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s imagine we have this component: ]{#kobo.706.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
const loadData = () => api.get('/data');

const DataComponent = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    setIsLoading(true);
    loadData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  return <div>{data}</div>;
};
```

[ This is fine ]{#kobo.801.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7b952be0 .index-entry index-entry="asynchronous state:handling"} [ if we fetch data from an API only once, but in most cases, we need to fetch it from many different endpoints. ]{#kobo.802.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can see that there is a certain amount of boilerplate here: ]{#kobo.803.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ The same data, error, and isLoading pieces of state need to be defined ]{#kobo.804.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Different pieces of state must be updated accordingly ]{#kobo.805.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ The data is thrown away as soon as we move away from the component ]{#kobo.806.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ That\'s where ]{#kobo.807.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7abe9e47 .index-entry index-entry="application state:asynchronous state, handling"} [ React Query comes in. ]{#kobo.808.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can update our component to the following: ]{#kobo.809.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
import { useQuery } from '@tanstack/react-query';

const loadData = () => api.get('/data');

const DataComponent = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['data'],
    queryFn: loadData,
  });
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  return <div>{data}</div>;
};
```

[ This is much cleaner and more maintainable. ]{#kobo.869.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We don\'t need to define the same pieces of state over and over again. ]{#kobo.870.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can just use the ]{#kobo.871.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useQuery `{.codeHighlighted}]{#kobo.872.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook to fetch the data and React Query handles the rest. ]{#kobo.873.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s see how this works in practice. ]{#kobo.874.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we create reviews in our application, we should see them on the dashboard reviews page: ]{#kobo.875.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.876.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_6_4.png" data-original-image-title="" style="width:528.0px; height:309.56968756924437px;">A screenshot of a computer AI-generated content may be incorrect.</span> </span>
</figure>

[ Figure 6.4 -- Dashboard reviews page ]{#kobo.877.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s ]{#kobo.878.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5c56429f .index-entry index-entry="asynchronous state:handling"} [ look ]{#kobo.879.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f6c2d441 .index-entry index-entry="application state:asynchronous state, handling"} [ at the code responsible for fetching the current user\'s reviews: ]{#kobo.880.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/reviews/api/get-current-user-reviews.ts

import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { GetReviewsByUserResponse } from '@/types/generated/types.gen';
import { zGetReviewsByUserResponse } from '@/types/generated/zod.gen';

import { reviewsQueryKeys } from '../config/query-keys';

export async function getCurrentUserReviews(): Promise<GetReviewsByUserResponse> {
  const response = await api.get<GetReviewsByUserResponse>('/reviews/current');

  return zGetReviewsByUserResponse.parse(response);
}

export function getCurrentUserReviewsQueryOptions() {
  return queryOptions({
    queryKey: reviewsQueryKeys.current(),
    queryFn: () => getCurrentUserReviews(),
  });
}

export function useCurrentUserReviewsQuery({
  options,
}: {
  options?: Omit<
    ReturnType<typeof getCurrentUserReviewsQueryOptions>,
    'queryKey' | 'queryFn'
  >;
} = {}) {
  return useQuery({
    ...getCurrentUserReviewsQueryOptions(),
    ...options,
  });
}
```

[ This code demonstrates our pattern for async state management. ]{#kobo.975.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We create three parts: ]{#kobo.976.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Fetcher function ]{#kobo.977.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.978.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` getCurrentUserReviews `{.codeHighlighted}]{#kobo.979.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ ) - The actual API call with input and output validation ]{#kobo.980.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Query options factory ]{#kobo.981.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.982.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` getCurrentUserReviewsQueryOptions `{.codeHighlighted}]{#kobo.983.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ ) - Configuration for React Query including the cache key, the fetcher function, and any conditions ]{#kobo.984.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Custom hook ]{#kobo.985.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.986.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useCurrentUserReviewsQuery `{.codeHighlighted}]{#kobo.987.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ ) - A convenient hook that wraps React Query\'s ]{#kobo.988.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useQuery `{.codeHighlighted}]{#kobo.989.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ with our options ]{#kobo.990.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This ]{#kobo.991.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f2efb1ab .index-entry index-entry="application state:asynchronous state, handling"} [ pattern provides several benefits. ]{#kobo.992.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The fetcher function can be ]{#kobo.993.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9fc38c43 .index-entry index-entry="asynchronous state:handling"} [ used independently for server-side data fetching or testing. ]{#kobo.994.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The query options can be used for prefetching data, and the custom hook provides a clean API for components to use. ]{#kobo.995.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s see how we use this in a component: ]{#kobo.996.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/dashboard/reviews.tsx

import { Seo } from '@/components/seo';
import { useCurrentUserReviewsQuery } from '@/features/reviews/api/get-current-user-reviews';
import { ReviewsList } from '@/features/reviews/components/reviews-list';

export default function MyReviewsPage() {
  const reviewsQuery = useCurrentUserReviewsQuery();
  const reviews = reviewsQuery.data?.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <Seo
        title="My Reviews | AIdeas"
        description="View and manage all reviews you've written for AI application ideas"
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Reviews</h1>
          <p className="text-muted-foreground">
            View and manage all reviews you've written
          </p>
        </div>

        <ReviewsList
          reviews={reviews}
          isLoading={reviewsQuery.isLoading}
          showIdeaTitle
          emptyMessage="You haven't written any reviews yet. Explore ideas and share your feedback!"
          error={reviewsQuery.error}
        />
      </div>
    </div>
  );
}
```

[ The ]{#kobo.1110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` MyReviewsPage `{.codeHighlighted}]{#kobo.1111.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component demonstrates how simple async state management becomes with React Query. ]{#kobo.1112.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We call our custom hook, and React Query handles everything else with the ]{#kobo.1113.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useQuery `{.codeHighlighted}]{#kobo.1114.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook under the hood. ]{#kobo.1115.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We ]{#kobo.1116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5b04b6a2 .index-entry index-entry="asynchronous state:handling"} [ get the data, loading state, and error state automatically. ]{#kobo.1117.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the component gets rendered, React Query fetches the data. ]{#kobo.1118.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If another component has already fetched reviews for the current user, React Query ]{#kobo.1119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_bc25ff72 .index-entry index-entry="application state:asynchronous state, handling"} [ returns the cached data immediately without duplicating the request. ]{#kobo.1120.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ React Query also handles many complex scenarios for us: ]{#kobo.1121.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Automatic caching ]{#kobo.1122.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Data is cached and reused across components ]{#kobo.1123.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Background refetching ]{#kobo.1124.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Stale data is refreshed automatically in the background ]{#kobo.1125.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Deduplication ]{#kobo.1126.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Multiple components requesting the same data trigger only one network request ]{#kobo.1127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Error handling ]{#kobo.1128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Failed requests are retried automatically ]{#kobo.1129.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Loading states ]{#kobo.1130.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : We get granular control over loading states for better UX ]{#kobo.1131.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This is why we treat async state differently from other types of state. ]{#kobo.1132.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Libraries like React Query are specifically designed to handle the complexities of server data, and they do it much better than we could with manual state management. ]{#kobo.1133.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ It\'s worth noting that async state is not just for data that comes from the API, but any data that is loaded asynchronously. ]{#kobo.1134.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For example, we can use React Query to fetch data from a browser API like the Geolocation API or the Web Speech API. ]{#kobo.1135.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Managing form state ]{#kobo.1136.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_194 .heading-1}

[ Forms are ]{#kobo.1137.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7b3dd5f2 .index-entry index-entry="application state:form state, handling"} [ used to collect user information in web applications. ]{#kobo.1138.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Whether ]{#kobo.1139.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_246d1d6f .index-entry index-entry="form state"} [ users are creating content, updating their profile, or submitting reviews, they\'re using forms. ]{#kobo.1140.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Managing form state effectively is important for a good user experience. ]{#kobo.1141.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We could use local ]{#kobo.1142.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d53805bf .index-entry index-entry="form state:managing"} [ state to track the form values, but form state includes not just the current values of inputs, but also validation errors, submission status, which fields have been touched, and more. ]{#kobo.1143.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Managing all this manually becomes error-prone and repetitive. ]{#kobo.1144.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ That\'s where libraries like React Hook Form come in. ]{#kobo.1145.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ React Hook Form provides a performant and flexible way to handle forms with minimal re-renders. ]{#kobo.1146.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Combined with Zod for schema validation, it gives us type-safe forms with automatic validation. ]{#kobo.1147.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s look at our review form as an example. ]{#kobo.1148.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This form demonstrates several key concepts of form state management. ]{#kobo.1149.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s break down what\'s happening: ]{#kobo.1150.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/reviews/components/review-form.tsx

export function ReviewForm({
  onSubmit,
  isSubmitting,
  onModalClose,
  initialReview,
  error,
  ideaId,
}: ReviewFormProps) {
  const form = useForm<CreateReviewData['body']>({
    resolver: zodResolver(zCreateReviewData.shape.body),
    defaultValues: {
      content: initialReview?.content || '',
      rating: initialReview?.rating || 5,
      ideaId: initialReview?.ideaId || ideaId || '',
    },
  });

  const handleClose = () => {
    form.reset();
    onModalClose();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 py-4"
      >
        {/* ... */}
      </form>
    </Form>
  );
}
```

[ First, we ]{#kobo.1224.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_994bbfe4 .index-entry index-entry="form state:managing"} [ initialize the form with the ]{#kobo.1225.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` useForm `{.inlineCode}]{#kobo.1226.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ hook from React Hook Form. ]{#kobo.1227.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We pass it a ]{#kobo.1228.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` zodResolver `{.inlineCode}]{#kobo.1229.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ with our Zod schema to get the field validation. ]{#kobo.1230.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Notice how we provide the same schema that validates the request body ]{#kobo.1231.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_3421fb02 .index-entry index-entry="application state:form state, handling"} [ in our API. ]{#kobo.1232.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This schema is automatically generated from the OpenAPI specification, ensuring frontend and backend validation stay synchronized. ]{#kobo.1233.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The ]{#kobo.1234.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` defaultValues `{.inlineCode}]{#kobo.1235.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ can be either from an existing review we\'re editing or empty values for creating a new review. ]{#kobo.1236.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The form manages all the complexity of form state for us: ]{#kobo.1237.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Field values ]{#kobo.1238.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Current input values are tracked automatically ]{#kobo.1239.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Validation ]{#kobo.1240.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Zod schemas validate on blur and submit ]{#kobo.1241.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Error messages ]{#kobo.1242.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Validation errors are displayed next to fields ]{#kobo.1243.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Form submission ]{#kobo.1244.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : The ]{#kobo.1245.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` handleSubmit `{.inlineCode}]{#kobo.1246.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ wrapper prevents default behavior and validates before calling our callback ]{#kobo.1247.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Reset functionality ]{#kobo.1248.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : We can reset the form to initial values with ]{#kobo.1249.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` form.reset() `{.inlineCode}]{#kobo.1250.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode}

[ Now let\'s look at how to add fields to the form: ]{#kobo.1251.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/reviews/components/review-form.tsx

export function ReviewForm({
  // ...
  return (
    <Form {...form}>
      <form {/* ... */}>
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex space-x-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 cursor-pointer ${
                        i < field.value
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      onClick={() => field.onChange(i + 1)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your review here..."
                  rows={4}
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

{error&&<ErrorMessage error={error} />}

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
```

[ The ]{#kobo.1433.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` FormField `{.codeHighlighted}]{#kobo.1434.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ components connect React Hook Form to our UI components. ]{#kobo.1435.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each field uses the ]{#kobo.1436.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` render `{.codeHighlighted}]{#kobo.1437.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ prop pattern to access the field\'s value, change handler, and validation state. ]{#kobo.1438.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This gives us complete ]{#kobo.1439.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c45f438a .index-entry index-entry="application state:form state, handling"} [ control over how each field is rendered while React Hook Form ]{#kobo.1440.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9e7bc9d5 .index-entry index-entry="form state:managing"} [ handles the state management behind the scenes. ]{#kobo.1441.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here is how the form looks in action: ]{#kobo.1442.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1443.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_6_5.png" data-original-image-title="" style="width:528.0px; height:309.8621759361843px;">A screenshot of a review AI-generated content may be incorrect.</span> </span>
</figure>

[ Figure 6.5 -- Review form in action ]{#kobo.1444.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With form state covered, let\'s explore the final type of state we\'ll discuss in this chapter: URL state. ]{#kobo.1445.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Persisting state in the URL ]{#kobo.1446.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_195 .heading-1}

[ URL state, also ]{#kobo.1447.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9c97e65b .index-entry index-entry="URL state"} [ called URL search ]{#kobo.1448.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_13b2effa .index-entry index-entry="application state:URL state"} [ parameters or query parameters, is a special type of state that lives in the browser\'s address bar. ]{#kobo.1449.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s one of the most underutilized but very powerful types of state in web applications. ]{#kobo.1450.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Why would we want to store state ]{#kobo.1451.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_3983eadd .index-entry index-entry="URL state:advantages"} [ in the URL? ]{#kobo.1452.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ URL state has unique advantages: ]{#kobo.1452.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Persistable ]{#kobo.1453.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : URL state persists across page reloads. ]{#kobo.1454.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Shareable ]{#kobo.1455.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Users can share URLs that preserve the exact state of the page ]{#kobo.1456.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Bookmarkable ]{#kobo.1457.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Users can bookmark URLs and return to the exact same view ]{#kobo.1458.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Browser navigation ]{#kobo.1459.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Back and forward buttons work naturally with URL state ]{#kobo.1460.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Server-side rendering ]{#kobo.1461.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : URL state is available on the server for initial data fetching ]{#kobo.1462.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In our application, we use URL state for search filters and sorting on the ideas page. ]{#kobo.1463.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When a user searches for ideas, filters by tags, or changes the sort order, these preferences are reflected in the URL. ]{#kobo.1464.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This means they can share a link to a filtered view or refresh the page without losing their filters. ]{#kobo.1465.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ While React Router has built-in functionality to manage query params via the ]{#kobo.1466.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useSearchParams `{.codeHighlighted}]{#kobo.1467.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook, there is a library called nuqs which provides a nicer way for managing URL state with React hooks. ]{#kobo.1468.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To get started, we ]{#kobo.1469.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0353b536 .index-entry index-entry="application state:URL state"} [ need to wrap ]{#kobo.1470.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4dd9fbed .index-entry index-entry="URL state"} [ our application with the nuqs adapter: ]{#kobo.1471.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/root.tsx

import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';

export default function App() {
  const [queryClient] = useState(() => createQueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Notifications />
        <Outlet />
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
```

[ The ]{#kobo.1521.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` NuqsAdapter `{.inlineCode}]{#kobo.1522.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ provides the context needed for nuqs to work with React Router. ]{#kobo.1523.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Now let\'s look at how we use it to manage search and filter state: ]{#kobo.1524.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/hooks/use-search-and-filters.ts

import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs';

export function useSearchAndFilters() {
  const [urlSearchTerm, setUrlSearchTerm] = useQueryState(
    'search',
    parseAsString.withDefault(''),
  );

  const [selectedTags, setSelectedTags] = useQueryState(
    'tags',
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    parseAsString.withDefault(''),
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((currentTags) => {
      const newTags = currentTags.includes(tag)
        ? currentTags.filter((t) => t !== tag)
        : [...currentTags, tag];
      return newTags.length > 0 ? newTags : null;
    });
  };

  const clearFilters = () => {
    setUrlSearchTerm('');
    setSelectedTags(null);
    setSortBy(null);
  };

  const hasActiveFilters =
    selectedTags.length > 0 || urlSearchTerm.length > 0 || sortBy.length > 0;

  return {
    searchTerm: urlSearchTerm,
    urlSearchTerm,
    selectedTags,
    sortBy,
    params: {
      ...(selectedTags.length > 0 && { tags: selectedTags.join(',') }),
      ...(urlSearchTerm && { search: urlSearchTerm }),
      ...(sortBy && { sortBy }),
    },
    hasActiveFilters,
    setSearchTerm: setUrlSearchTerm,
    setSelectedTags,
    toggleTag,
    setSortBy,
    clearFilters,
  };
}
```

[ This ]{#kobo.1637.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_abd07d8c .index-entry index-entry="application state:URL state"} [ custom hook ]{#kobo.1638.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_14e22dd5 .index-entry index-entry="URL state"} [ demonstrates the power of URL state management. ]{#kobo.1639.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s break down what\'s happening: ]{#kobo.1640.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We use ]{#kobo.1641.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` useQueryState `{.inlineCode}]{#kobo.1642.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ from ]{#kobo.1643.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` nuqs `{.inlineCode}]{#kobo.1644.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ for each piece of filter state: search term, selected tags, sort order, and current page. ]{#kobo.1645.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each call to ]{#kobo.1646.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` useQueryState `{.inlineCode}]{#kobo.1647.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ returns the current value from the URL and a setter function that updates both the URL and the state. ]{#kobo.1648.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.1649.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` parseAs `{.inlineCode}]{#kobo.1650.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ functions ensure type safety and proper serialization. ]{#kobo.1651.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The hook includes several useful features: ]{#kobo.1652.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Automatic URL synchronization ]{#kobo.1653.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : When we call the setter functions, the URL updates automatically ]{#kobo.1654.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Type-safe parsing ]{#kobo.1655.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : The ]{#kobo.1656.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` parseAs `{.inlineCode}]{#kobo.1657.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ functions convert URL strings to the correct types ]{#kobo.1658.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Default values ]{#kobo.1659.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Each parameter has a sensible default if not present in the URL ]{#kobo.1660.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Computed params ]{#kobo.1661.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : We build an object ready to pass to our API queries ]{#kobo.1662.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Helper functions ]{#kobo.1663.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Functions like ]{#kobo.1664.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` toggleTag `{.inlineCode}]{#kobo.1665.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.1666.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` clearFilters `{.inlineCode}]{#kobo.1667.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ make the API convenient to use ]{#kobo.1668.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ One important detail is the ]{#kobo.1669.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` useEffect `{.inlineCode}]{#kobo.1670.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ that resets the page to 1 when filters change. ]{#kobo.1671.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This prevents users from ending up on page 10 of a filtered result set that only has 2 pages. ]{#kobo.1672.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s see how we use this hook in the search and filters UI component: ]{#kobo.1673.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/components/idea-search-and-filters.tsx


import { useSearchAndFilters } from '@/features/ideas/hooks/use-search-and-filters';

export function IdeaSearchAndFilters() {
  const {
    searchTerm,
    selectedTags,
    sortBy,
    hasActiveFilters,
    setSearchTerm,
    toggleTag,
    setSortBy,
    clearFilters,
  } = useSearchAndFilters();

  const tagsQuery = useTagsQuery();
  const availableTags = tagsQuery.data?.data || [];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search ideas by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Filter by tags:</span>
        {availableTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      {/* ... */}
    </div>
  );
}
```

[ The ]{#kobo.1790.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` IdeaSearchAndFilters `{.codeHighlighted}]{#kobo.1791.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component uses our custom hook to provide an interactive filtering interface. ]{#kobo.1792.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Users can ]{#kobo.1793.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9ef8a235 .index-entry index-entry="application state:URL state"} [ search by text, filter by tags, and change the sort order. ]{#kobo.1794.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ All of these changes are immediately reflected in the URL, which means: ]{#kobo.1795.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Typing in the search box updates the URL with ]{#kobo.1796.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ?search=text `{.codeHighlighted}]{#kobo.1797.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted}
- [ Clicking a tag adds it to the URL with ]{#kobo.1798.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ?tags=tag1,tag2 `{.codeHighlighted}]{#kobo.1799.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted}
- [ Changing the sort order updates the URL with ]{#kobo.1800.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ?sortBy=rating `{.codeHighlighted}]{#kobo.1801.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted}
- [ All parameters can be combined: ]{#kobo.1802.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ?search=ai&tags=ml,nlp&sortBy=rating&page=2 `{.codeHighlighted}]{#kobo.1803.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted}

[ The beauty of this ]{#kobo.1804.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1ae5ebad .index-entry index-entry="URL state"} [ approach is that every user action creates a shareable URL. ]{#kobo.1805.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Users can bookmark their favorite filtered views or share links with other users. ]{#kobo.1806.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The browser\'s back button and forward button work naturally, letting users navigate through their filter history. ]{#kobo.1807.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s see how this is used in our application on the ideas page: ]{#kobo.1808.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/ideas/ideas.tsx

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const ideasParams = {
    search: searchParams.get('search') || undefined,
    tags: searchParams.get('tags') || undefined,
    sortBy: searchParams.get('sortBy') || undefined,
  } as GetAllIdeasData['query'];
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getIdeasQueryOptions(ideasParams)),
    queryClient.prefetchQuery(getTagsQueryOptions()),
  ]);

  return routerData({
    dehydratedState: dehydrate(queryClient),
  });
}

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <Ideas />
    </HydrationBoundary>
  );
}

function Ideas() {
  const { params } = useSearchAndFilters();

  const ideasQuery = useIdeasQuery({
    params: params as GetAllIdeasData['query'],
  });

  const allIdeas = ideasQuery.data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Seo
        title="Discover AI Ideas | AIdeas"
        description="Browse and explore innovative AI application ideas from the community"
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Discover AI Ideas</h1>
        <p className="text-muted-foreground mb-6">
          Browse and explore innovative AI application ideas from the community
        </p>
        <IdeaSearchAndFilters />
      </div>

      <IdeasList
        ideas={allIdeas}
        isLoading={ideasQuery.isLoading && allIdeas.length === 0}
        emptyMessage={'No ideas available yet'}
        error={ideasQuery.error}
      />
    </div>
  );
}
```

[ This ]{#kobo.2014.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0e9aaf35 .index-entry index-entry="application state:URL state"} [ page brings together multiple types of state management in a cohesive example. ]{#kobo.2015.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s trace how the different state types work together: ]{#kobo.2016.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The ]{#kobo.2017.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` loader `{.codeHighlighted}]{#kobo.2018.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ function runs on the server before the page renders. ]{#kobo.2019.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It reads the URL search parameters and uses them to prefetch data with React Query. ]{#kobo.2020.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This ensures the page loads with the correctly filtered data on the initial server-side render. ]{#kobo.2021.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The ]{#kobo.2022.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Ideas `{.codeHighlighted}]{#kobo.2023.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component ]{#kobo.2024.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_282778aa .index-entry index-entry="URL state"} [ uses our ]{#kobo.2025.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useSearchAndFilters `{.codeHighlighted}]{#kobo.2026.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook to access the current URL state and build the params object. ]{#kobo.2027.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These params are passed to ]{#kobo.2028.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useIdeasQuery `{.codeHighlighted}]{#kobo.2029.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , which fetches the ideas from the API on the client side. ]{#kobo.2030.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When users interact with the search and filters, the URL updates automatically. ]{#kobo.2031.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Because we pass the URL params to React Query\'s query key, any change to the filters triggers a new data fetch. ]{#kobo.2032.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React Query is smart enough to show the cached data while fetching the updated results in the background, providing a smooth user experience. ]{#kobo.2033.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The ]{#kobo.2034.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_166256a1 .index-entry index-entry="application state:URL state"} [ pagination component updates the page parameter in the URL, which triggers a new query for the next page of results. ]{#kobo.2035.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ All of this happens seamlessly, with the URL always reflecting the current state of the page. ]{#kobo.2036.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here is how the URL state is used in the ideas page: ]{#kobo.2037.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.2038.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_6_6.png" data-original-image-title="" style="width:528.0px; height:380.87835142920454px;">Figure 6.6 – URL state usage in ideas page</span> </span>
</figure>

[ Figure 6.6 -- URL state usage in ideas page ]{#kobo.2039.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Notice the URL params are reflected in the UI. ]{#kobo.2040.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The search term is displayed in the search input, the selected tags are displayed as badges, and the sort order is displayed in the select dropdown. ]{#kobo.2041.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This example demonstrates how different types of state work together in a real application. ]{#kobo.2042.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ URL state drives what data we fetch, async state manages the server data, and local state handles UI interactions. ]{#kobo.2043.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each type of state has its role, and using the right approach for each piece of state creates a maintainable and performant application. ]{#kobo.2044.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Summary ]{#kobo.2045.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_196 .heading-1}

[ In this chapter, we explored the five main types of state in React applications and learned when and how to use each approach. ]{#kobo.2046.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We started with local state, the simplest form of state management using React\'s ]{#kobo.2047.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useState `{.codeHighlighted}]{#kobo.2048.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook. ]{#kobo.2049.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Local state is perfect for UI state that\'s self-contained within a single component, such as whether a modal is open or closed. ]{#kobo.2050.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We learned to always start with local state and only move to more complex solutions when necessary. ]{#kobo.2051.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Next, we examined global state management with Zustand. ]{#kobo.2052.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Global state is useful for data that needs to be accessed from multiple components throughout the application, such as notifications or authentication status. ]{#kobo.2053.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We implemented a notifications system that can be triggered from any component, demonstrating how global state enables features that transcend component boundaries. ]{#kobo.2054.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We then looked at asynchronous state management with React Query. ]{#kobo.2055.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Server state has unique challenges including loading states, errors, caching, and synchronization. ]{#kobo.2056.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React Query handles all of these complexities for us, providing a declarative API for fetching, caching, and updating server data. ]{#kobo.2057.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We saw how this integrates with our API layer to create a robust data fetching strategy. ]{#kobo.2058.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Form state management was our next topic, using React Hook Form combined with Zod for schema validation. ]{#kobo.2059.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Forms require managing multiple pieces of state including field values, validation errors, touched fields, and submission status. ]{#kobo.2060.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React Hook Form handles all of this efficiently with minimal re-renders, while Zod provides type-safe validation. ]{#kobo.2061.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Finally, we explored URL state management with nuqs. ]{#kobo.2062.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ URL state is special because it\'s shareable, bookmarkable, and works naturally with browser navigation. ]{#kobo.2063.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We implemented a complete search and filter system where all user preferences are stored in the URL, making every filtered view shareable and persistent across page reloads. ]{#kobo.2064.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Throughout the chapter, we saw how these different types of state work together in a real application. ]{#kobo.2065.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ideas page demonstrates this perfectly: URL state drives what data to fetch, async state manages the server data, form state handles user input, global state shows notifications, and local state manages UI interactions. ]{#kobo.2066.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Understanding when to use each type of state is crucial for building maintainable React applications. ]{#kobo.2067.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Get this book\'s PDF version and more ]{#kobo.2068.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_197 .heading-1}

[ Scan the QR code (or go to ]{#kobo.2069.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.2070.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ ). ]{#kobo.2071.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search for this book by name, confirm the edition, and then follow the steps on the page. ]{#kobo.2072.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_6_7.png" original-image-title="" style="width:25%;"} ]{#kobo.2073.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_6_8.png" original-image-title="" style="width:25%;"} ]{#kobo.2074.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[ Note: Keep your invoice handy. ]{#kobo.2075.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Purchases made directly from Packt don\'t require an invoice. ]{#kobo.2076.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}*

[ ]{#kobo.2077.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
:::
