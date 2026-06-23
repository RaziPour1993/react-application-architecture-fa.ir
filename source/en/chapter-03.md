::: {.section .chapter}
# [ 3 ]{#kobo.1.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_106 .chapterNumber}

# [ Building and Documenting Components ]{#kobo.2.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_107 .chapterTitle}

[ In React, everything is a ]{#kobo.3.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ce4010e9 .index-entry index-entry="component"} [ component. ]{#kobo.4.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This paradigm allows us to split user interfaces into smaller parts, making it easier to develop larger user interfaces and applications. ]{#kobo.5.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It also adheres to the DRY (Don\'t Repeat Yourself) principle by enabling component reusability since we can reuse the same components in multiple places. ]{#kobo.6.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In this chapter, we will learn how to build the foundational components for our application\'s design system. ]{#kobo.7.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This will make the application UI more consistent and easier to understand and maintain. ]{#kobo.8.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will also learn how to document these components with Storybook, a great tool that serves as a catalog for all our reusable UI elements. ]{#kobo.9.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll cover the following topics: ]{#kobo.10.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Anatomy of a component ]{#kobo.11.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Creating our component library ]{#kobo.12.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Documenting components ]{#kobo.13.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By the end of this chapter, we\'ll have a solid understanding of component architecture and a reusable component library documented with Storybook that we can use throughout our application. ]{#kobo.14.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Technical requirements ]{#kobo.15.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_108 .heading-1}

[ Before we get started, we need to set up our project. ]{#kobo.16.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To develop our project, we need the following tools installed on our computer: ]{#kobo.17.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Node.js version 24 or above. ]{#kobo.18.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ npm version 11 or above ships with Node. ]{#kobo.19.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can confirm this by executing ]{#kobo.20.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` node ‑v `{.inlineCode}]{#kobo.21.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.22.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` npm ‑v `{.inlineCode}]{#kobo.23.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ in the terminal. ]{#kobo.24.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There are multiple ways to install Node.js and npm. ]{#kobo.25.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here is a helpful article that goes into more detail: ]{#kobo.26.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js ]{#kobo.27.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js){style="text-decoration: none;"} [ . ]{#kobo.28.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ VS Code ]{#kobo.29.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ (optional), a popular editor for JavaScript and TypeScript. ]{#kobo.30.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It is open source, has solid TypeScript support, and offers many extensions. ]{#kobo.31.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It can be downloaded from ]{#kobo.32.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://code.visualstudio.com ]{#kobo.33.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://code.visualstudio.com){style="text-decoration: none;"} [ . ]{#kobo.34.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The code for this book is available at the book\'s repo. ]{#kobo.35.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To access the repository link, follow the steps in the ]{#kobo.36.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ \" ]{#kobo.37.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ Download the example code files ]{#kobo.38.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ \" ]{#kobo.39.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ section in the ]{#kobo.40.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Preface ]{#kobo.41.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ . ]{#kobo.42.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Clone it and enter the repository root: ]{#kobo.43.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

[ The repository contains chapter folders with the code for each chapter, along with a shared ]{#kobo.45.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` api `{.inlineCode}]{#kobo.46.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ folder that includes the API server used across all chapters. ]{#kobo.47.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We are working on ]{#kobo.48.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Chapter ]{#kobo.49.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ 3 ]{#kobo.50.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , so navigate to the ]{#kobo.51.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` chapter‑03 `{.inlineCode}]{#kobo.52.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.53.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/chapter-03
```

[ Next, install the dependencies: ]{#kobo.55.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm install
```

[ We also need to provide the environment variables: ]{#kobo.57.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cp .env.example .env
```

[ At this point, the frontend should be ready and running at ]{#kobo.59.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:5173 ]{#kobo.60.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:5173){style="text-decoration: none;"} [ . ]{#kobo.61.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now we should have the project code ready. ]{#kobo.62.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For more information about the setup details, check out the ]{#kobo.63.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` README.md `{.inlineCode}]{#kobo.64.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file. ]{#kobo.65.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Anatomy of a component ]{#kobo.66.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_109 .heading-1}

[ Before ]{#kobo.67.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_25c8a4d3 .index-entry index-entry="component:anatomy"} [ we start building our component library, we need to understand what a component is and how it works. ]{#kobo.68.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In this section, we\'ll cover the following: ]{#kobo.69.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ What is a component? ]{#kobo.70.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Component props ]{#kobo.71.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Component state ]{#kobo.72.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Event handlers ]{#kobo.73.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ TypeScript and components ]{#kobo.74.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s explore each of these concepts using a practical example. ]{#kobo.75.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ What is a component? ]{#kobo.76.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_110 .heading-2}

[ A component ]{#kobo.77.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b9177e97 .index-entry index-entry="component"} [ is a self-contained, reusable piece of UI that encapsulates its own structure, behavior, and styling. ]{#kobo.78.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Components combine to form complete user interfaces. ]{#kobo.79.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here\'s a simple example: ]{#kobo.80.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/components/counter.tsx
import { useState } from 'react';

export type CounterProps = {
  initialValue: number;
  label: string;
  onIncrement?: (newValue: number) => void;
  onDecrement?: (newValue: number) => void;
};

export function Counter(props: CounterProps) {
  const [value, setValue] = useState(props.initialValue);

  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    props.onIncrement?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = value - 1;
    setValue(newValue);
    props.onDecrement?.(newValue);
  };

  return (
    <div>
      <label>{props.label}</label>
      <div className="flex items-center gap-2">
        <button onClick={handleDecrement}>-</button>
        <p>{value}</p>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}
```

[ This component demonstrates the key parts of a React component: ]{#kobo.214.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ The component function ]{#kobo.215.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : At its core, a ]{#kobo.216.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_dc9dc79d .index-entry index-entry="component:component function"} [ component is just a JavaScript function that returns JSX (JavaScript XML), which looks like HTML but is actually JavaScript. ]{#kobo.217.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The function describes what should appear on the ]{#kobo.218.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4ede026d .index-entry index-entry="component:component function"} [ screen. ]{#kobo.219.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Under the hood, the JSX compiler transforms markup into plain ]{#kobo.220.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` React.createElement `{.inlineCode}]{#kobo.221.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ calls, so ]{#kobo.222.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` <button onClick={fn}>Click</button> `{.inlineCode}]{#kobo.223.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ becomes: ]{#kobo.224.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` React.createElement('button', { onClick: fn }, 'Click') `{.inlineCode}]{#kobo.225.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.226.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Props ( ]{#kobo.227.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ p ]{#kobo.228.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ roperties) ]{#kobo.229.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : The ]{#kobo.230.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` props `{.codeHighlighted}]{#kobo.231.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ parameter ]{#kobo.232.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_10cdb1ab .index-entry index-entry="component:props"} [ is how we pass data into components. ]{#kobo.233.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Props can be anything -- strings, numbers, functions, objects, arrays, or even other components. ]{#kobo.234.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They make components dynamic and reusable. ]{#kobo.235.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ TypeScript ]{#kobo.236.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ t ]{#kobo.237.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ ypes ]{#kobo.238.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Notice ]{#kobo.239.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_6b7d071c .index-entry index-entry="component:TypeScript types"} [ the ]{#kobo.240.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` CounterProps `{.inlineCode}]{#kobo.241.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ type definition. ]{#kobo.242.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ TypeScript will prevent us from passing a string where we need a number or forgetting required props. ]{#kobo.243.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It also gives us excellent IntelliSense in our IDE. ]{#kobo.244.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ State ]{#kobo.245.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : The ]{#kobo.246.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` useState `{.inlineCode}]{#kobo.247.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ hook lets the ]{#kobo.248.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_edcb9ce9 .index-entry index-entry="component:state"} [ component remember values between renders. ]{#kobo.249.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we call ]{#kobo.250.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` setValue `{.inlineCode}]{#kobo.251.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , React re-renders the component with the new value, updating what users see onscreen. ]{#kobo.252.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Event ]{#kobo.253.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ h ]{#kobo.254.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ andlers ]{#kobo.255.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Functions such as ]{#kobo.256.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` handleIncrement `{.inlineCode}]{#kobo.257.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} ` `{.codeHighlighted}[` `{.codeHighlighted}]{#kobo.258.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ respond to user interactions. ]{#kobo.259.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When ]{#kobo.260.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_428da9b0 .index-entry index-entry="component"} [ someone clicks the increment button, we update the ]{#kobo.261.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7e318a5c .index-entry index-entry="component:event handlers"} [ state and optionally call a callback prop. ]{#kobo.262.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Using the component ]{#kobo.263.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_111 .heading-2}

[ Once we\'ve ]{#kobo.264.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_bca6839b .index-entry index-entry="component:usage"} [ defined a component, we can use it anywhere in our application: ]{#kobo.265.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/home.tsx
import { Counter } from '@/components/counter';

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

[ When this renders, users will see a \" ]{#kobo.316.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Click ]{#kobo.317.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ Counter ]{#kobo.318.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ \" label, the current count value, and two buttons. ]{#kobo.319.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Clicking the buttons updates the displayed number and logs messages to the console. ]{#kobo.320.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We could use this same ]{#kobo.321.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Counter `{.inlineCode}]{#kobo.322.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component multiple times on a page, each with different ]{#kobo.323.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` initialValue `{.inlineCode}]{#kobo.324.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.325.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` label `{.inlineCode}]{#kobo.326.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ props, and they\'d all work independently. ]{#kobo.327.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now that we understand ]{#kobo.328.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d63442ac .index-entry index-entry="component:usage"} [ component basics, let\'s build a component library that will serve as a base for our application. ]{#kobo.329.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Creating our component library ]{#kobo.330.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_112 .heading-1}

[ When ]{#kobo.331.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b0b54ec9 .index-entry index-entry="component library:creating"} [ building a production application, we need a consistent set of UI components -- buttons, inputs, dialogs, forms, and more. ]{#kobo.332.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We have several options for how to get these components. ]{#kobo.333.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In this section, we\'ll cover the following: ]{#kobo.334.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ What is a component library, and why do we need one? ]{#kobo.335.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Different approaches to component libraries ]{#kobo.336.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ What is Shadcn UI and why did we choose it? ]{#kobo.337.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ How to set up Shadcn UI ]{#kobo.338.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s start by understanding what a component library is and why we need one. ]{#kobo.339.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ What is a component library, and why do we need one? ]{#kobo.340.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_113 .heading-2}

[ Without a component library, we\'d build each button, input, or modal from scratch every time we need one. ]{#kobo.341.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This leads to the following: ]{#kobo.342.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Inconsistent UI ]{#kobo.343.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Different buttons styled differently across the app ]{#kobo.344.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Repeated code ]{#kobo.345.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : The same components built multiple times ]{#kobo.346.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Harder maintenance ]{#kobo.347.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Need to update the same component in many places ]{#kobo.348.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Accessibility issues ]{#kobo.349.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Easy to miss keyboard navigation, screen readers, and ARIA attributes ]{#kobo.350.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Slower development ]{#kobo.351.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Building everything from scratch takes time ]{#kobo.352.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ A component library solves these problems by providing a set of pre-built, tested, accessible components that we can reuse throughout our application. ]{#kobo.353.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Different approaches to component libraries ]{#kobo.354.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_114 .heading-2}

[ There are several ways ]{#kobo.355.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e8755921 .index-entry index-entry="component library:approaches"} [ to get a component library for our React application: ]{#kobo.356.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Option 1: Install a package (Material-UI, Ant Design, Chakra UI, Mantine) ]{#kobo.357.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_115 .heading-3}

[ We install a library via ]{#kobo.358.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` npm `{.inlineCode}]{#kobo.359.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.360.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_55a07486 .index-entry index-entry="component library:package installation"} [ import components: ]{#kobo.361.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
import Button from '@mui/material/Button';

<Button variant="contained">Click me</Button>
```

#### [ Pros: ]{#kobo.380.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h4_116 .heading-4}

- [ Quick to get started ]{#kobo.381.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Well-tested and maintained ]{#kobo.382.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Good documentation and community ]{#kobo.383.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

#### [ Cons: ]{#kobo.384.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h4_117 .heading-4}

- [ Large bundle sizes (we ship the entire library even if we use a few components) ]{#kobo.385.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Limited customization (following the library\'s design system) ]{#kobo.386.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Upgrades can break things ]{#kobo.387.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ At the other end of the spectrum, we have the option to build everything ourselves. ]{#kobo.388.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Option 2: Build from scratch ]{#kobo.389.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_118 .heading-3}

[ We create ]{#kobo.390.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_2aff60fe .index-entry index-entry="component library:building, from scratch"} [ all components ourselves from basic HTML elements. ]{#kobo.391.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

#### [ Pros: ]{#kobo.392.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h4_119 .heading-4}

- [ Full control over everything ]{#kobo.393.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ No extra dependencies ]{#kobo.394.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Exactly what we need ]{#kobo.395.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

#### [ Cons: ]{#kobo.396.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h4_120 .heading-4}

- [ Time-consuming to build ]{#kobo.397.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Need to handle accessibility ourselves ]{#kobo.398.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Need to test everything ]{#kobo.399.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Reinventing the wheel ]{#kobo.400.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ There\'s also a middle ground that combines the benefits of both approaches. ]{#kobo.401.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Option 3: Shadcn UI (copy-paste components) ]{#kobo.402.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_121 .heading-3}

[ Shadcn UI takes a ]{#kobo.403.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c2748ce7 .index-entry index-entry="Shadcn UI"} [ different ]{#kobo.404.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_351706a0 .index-entry index-entry="component library:Shadcn UI"} [ approach -- it\'s not an npm package. ]{#kobo.405.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead, it\'s a collection of accessible components that we copy directly into our project. ]{#kobo.406.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The components are built with Radix UI or Base UI (which are headless component libraries for accessibility and behavior) and styled with Tailwind CSS. ]{#kobo.407.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We will use Base UI for our project as it is being more actively maintained at the time of writing this book, which is always something to consider when choosing a component library. ]{#kobo.408.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

#### [ Pros: ]{#kobo.409.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h4_122 .heading-4}

- [ Components ]{#kobo.410.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e35072d9 .index-entry index-entry="Shadcn UI:advantages"} [ live in our code base (full control and customization) ]{#kobo.411.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ No runtime dependencies to manage ]{#kobo.412.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Smaller bundle sizes (only install and ship what we use) ]{#kobo.413.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Built on Base UI for functionality and accessibility ]{#kobo.414.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Easy to modify and extend ]{#kobo.415.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

#### [ Cons: ]{#kobo.416.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h4_123 .heading-4}

- [ Need to ]{#kobo.417.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_27096238 .index-entry index-entry="Shadcn UI:disadvantages"} [ manually update components if Shadcn UI releases improvements or in case of any upstream updates of Base UI or Tailwind ]{#kobo.418.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Initial setup required ]{#kobo.419.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For this project, we\'ll ]{#kobo.420.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b6dc4b51 .index-entry index-entry="component library:Shadcn UI"} [ use Shadcn UI. ]{#kobo.421.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s look at why it fits our needs. ]{#kobo.422.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Why we chose Shadcn UI ]{#kobo.423.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_124 .heading-2}

[ For this ]{#kobo.424.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_46349279 .index-entry index-entry="Shadcn UI:features"} [ project, we chose Shadcn UI for the following reasons: ]{#kobo.425.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Ownership ]{#kobo.426.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : The components become part of our code base, so we can customize them however we need without worrying about library constraints or breaking changes from upstream ]{#kobo.427.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Modern ]{#kobo.428.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ s ]{#kobo.429.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ tack ]{#kobo.430.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : It uses Tailwind CSS for styling, which aligns with modern React development practices and makes styling intuitive and fast ]{#kobo.431.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Accessibility ]{#kobo.432.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Built on Base UI, which handles complex accessibility requirements (keyboard navigation, focus management, ARIA attributes) that would take significant time to implement correctly ourselves ]{#kobo.433.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Bundle Size ]{#kobo.434.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : We only include components we actually use, keeping our application lean ]{#kobo.435.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Developer Experience ]{#kobo.436.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : The CLI makes adding components simple, and since they\'re in our code base, we can see exactly how they work ]{#kobo.437.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Configuring Shadcn UI ]{#kobo.438.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_125 .heading-2}

[ Shadcn UI ]{#kobo.439.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f5383aa1 .index-entry index-entry="Shadcn UI:configuring"} [ components ]{#kobo.440.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_adddbc01 .index-entry index-entry="component library:Shadcn UI, configuring"} [ can be added to our project using the CLI or manually. ]{#kobo.441.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s look at both approaches. ]{#kobo.442.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Using the CLI ]{#kobo.443.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_126 .heading-3}

[ The Shadcn CLI sets ]{#kobo.444.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_2636ac7d .index-entry index-entry="Shadcn UI:CLI"} [ up all the necessary files and configurations for us if we run the following: ]{#kobo.445.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npx shadcn@latest init --base=base --preset=vega 
```

[ We are choosing Base UI as the component library and Vega as the preset. ]{#kobo.447.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This command will do the following: ]{#kobo.448.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Install necessary dependencies ]{#kobo.449.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Create configuration files ]{#kobo.450.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Set up Tailwind CSS styles ]{#kobo.451.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Configure path aliases ]{#kobo.452.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The ]{#kobo.453.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b62cc090 .index-entry index-entry="component library:Shadcn UI, configuring"} [ CLI generates a ]{#kobo.454.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` components.json `{.inlineCode}]{#kobo.455.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file that contains the configuration for generating components: ]{#kobo.456.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-vega",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/app.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}
```

[ Here\'s what this configuration does: ]{#kobo.558.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` style `{.inlineCode}]{#kobo.559.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : The design style to use ( ]{#kobo.560.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` base‑vega `{.inlineCode}]{#kobo.561.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ to use Base UI as the component library with Vega preset) ]{#kobo.562.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` tailwind.css `{.inlineCode}]{#kobo.563.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Where to find our Tailwind CSS file ]{#kobo.564.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` aliases `{.inlineCode}]{#kobo.565.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Path mappings that match our TypeScript configuration, which Shadcn UI needs to know because ]{#kobo.566.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b40e1647 .index-entry index-entry="Shadcn UI:CLI"} [ it will use these folders to store required components and utilities ]{#kobo.567.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` iconLibrary `{.inlineCode}]{#kobo.568.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Icon library to use ( ]{#kobo.569.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` lucide‑react `{.inlineCode}]{#kobo.570.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ ) ]{#kobo.571.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Adding components ]{#kobo.572.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_127 .heading-3}

[ Now we ]{#kobo.573.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4d78efd9 .index-entry index-entry="Shadcn UI:components, adding"} [ can add components using the CLI: ]{#kobo.574.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npx shadcn@latest add button
```

[ This command will generate and add the component to our code base. ]{#kobo.576.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The generated button component looks like this: ]{#kobo.577.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/components/ui/button.tsx

import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        outline:
          'border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
        lg: 'h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        icon: 'size-9',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props&VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

[ These are key features of the generated component: ]{#kobo.813.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Type-safe ]{#kobo.814.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Uses TypeScript for props validation ]{#kobo.815.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Variants ]{#kobo.816.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Multiple visual styles ( ]{#kobo.817.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` default `{.inlineCode}]{#kobo.818.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , ]{#kobo.819.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` destructive `{.inlineCode}]{#kobo.820.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , ]{#kobo.821.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` outline `{.inlineCode}]{#kobo.822.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , ]{#kobo.823.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` secondary `{.inlineCode}]{#kobo.824.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , ]{#kobo.825.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ghost `{.inlineCode}]{#kobo.826.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , ]{#kobo.827.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` link `{.inlineCode}]{#kobo.828.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ ) ]{#kobo.829.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Sizes ]{#kobo.830.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Different sizes ( ]{#kobo.831.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` default, sm, lg, icon `{.inlineCode}]{#kobo.832.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ ) ]{#kobo.833.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Extensible: Can override styles with the className prop ]{#kobo.834.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Accessible ]{#kobo.835.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Built on Base UI primitives ]{#kobo.836.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can ]{#kobo.837.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_6e619b7c .index-entry index-entry="Shadcn UI:components, adding"} [ generate multiple components at once by providing multiple components to the ]{#kobo.838.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` add `{.inlineCode}]{#kobo.839.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ command: ]{#kobo.840.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npx shadcn@latest add button card
```

## [ Creating components manually ]{#kobo.842.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_128 .heading-2}

[ We can also add ]{#kobo.843.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f6ff8485 .index-entry index-entry="component library:components, creating manually"} [ components manually by visiting the Shadcn UI website: ]{#kobo.844.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.845.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_3_1.png" data-original-image-title="" style="width:528.0px; height:315.13331696919875px;">Figure 3.1 – Installing Shadcn UI components manually</span> </span>
</figure>

[ Figure 3.1 -- Installing Shadcn UI components manually ]{#kobo.846.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The manual process involves the following: ]{#kobo.847.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Creating the component file in ]{#kobo.848.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` src/components/ui/ `{.inlineCode}]{#kobo.849.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode}
- [ Copying the component code from the website to the component file ]{#kobo.850.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Installing any required dependencies manually ]{#kobo.851.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ While the ]{#kobo.852.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_54b2d42d .index-entry index-entry="Shadcn UI:components, adding"} [ CLI is faster, the manual approach gives us more control over what\'s being added to our project. ]{#kobo.853.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now that we have our components, we need a way to document and try them out. ]{#kobo.854.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For the latest setup instructions, always check the official Shadcn UI documentation at https://ui.shadcn.com/ ]{#kobo.855.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Documenting components ]{#kobo.856.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_129 .heading-1}

[ Our ]{#kobo.857.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Button `{.inlineCode}]{#kobo.858.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component ]{#kobo.859.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1febc302 .index-entry index-entry="component:documenting"} [ has different variants and sizes. ]{#kobo.860.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We need a way to document and test these different states. ]{#kobo.861.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In this section, we\'ll explore two approaches: ]{#kobo.862.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Creating a dedicated route in our application ]{#kobo.863.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Using Storybook for component documentation ]{#kobo.864.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can start from the simplest approach. ]{#kobo.865.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Creating a component route ]{#kobo.866.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_130 .heading-2}

[ A simple ]{#kobo.867.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b26576aa .index-entry index-entry="component:component route, creating"} [ way to view our components is to create a dedicated route. ]{#kobo.868.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can create a components route in our application: ]{#kobo.869.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/components.tsx
import { Button } from '@/components/ui/button';

export default function Components() {
  return (
    <div className="container mx-auto py-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-8">Components in Action</h1>
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Button Component</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon-sm">⌕</Button>
              <Button size="icon">⌕ </Button>
              <Button size="icon-lg">⌕ </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
```

[ This ]{#kobo.1138.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_db74adcb .index-entry index-entry="component:component route, creating"} [ renders all the button variants: ]{#kobo.1139.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1140.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_3_2.png" data-original-image-title="" style="width:528.0px; height:328.4px;">Figure 3.2 – Documenting components on a dedicated application route</span> </span>
</figure>

[ Figure 3.2 -- Documenting components on a dedicated application route ]{#kobo.1141.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This approach works without much additional setup, but has several problems: ]{#kobo.1142.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Exposes components in the application ]{#kobo.1143.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Our application routes should focus on features, not component documentation ]{#kobo.1144.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Difficult to maintain ]{#kobo.1145.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Adding every component and variant to one route becomes crowded ]{#kobo.1146.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ No interactivity ]{#kobo.1147.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : We can\'t easily test different prop combinations ]{#kobo.1148.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ No isolation ]{#kobo.1149.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Components ]{#kobo.1150.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_fb5e954f .index-entry index-entry="component:component route, creating"} [ aren\'t developed in isolation from the application ]{#kobo.1151.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We need a better solution. ]{#kobo.1152.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ That\'s where Storybook comes in. ]{#kobo.1153.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ What is storybook? ]{#kobo.1154.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_131 .heading-2}

[ Storybook is a ]{#kobo.1155.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_788c14d2 .index-entry index-entry="Storybook"} [ tool for developing and testing UI components in isolation. ]{#kobo.1156.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It serves as a catalog of our application\'s components. ]{#kobo.1157.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ These are the ]{#kobo.1158.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9a48e9de .index-entry index-entry="Storybook:benefits"} [ benefits of using Storybook: ]{#kobo.1159.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Component isolation ]{#kobo.1160.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Develop and test components without running the full application. ]{#kobo.1161.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Visual testing ]{#kobo.1162.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : See all variants of a component in one place. ]{#kobo.1163.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Interactive playground: Experiment with different prop combinations in real time. ]{#kobo.1164.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Living documentation ]{#kobo.1165.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Stories stay up to date with our code. ]{#kobo.1166.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Team collaboration ]{#kobo.1167.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Designers and product managers can review components without technical setup. ]{#kobo.1168.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Regression testing ]{#kobo.1169.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Catch visual bugs by comparing screenshots of stories. ]{#kobo.1170.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If you want to dive deeper into regression testing with Storybook, check out their docs at ]{#kobo.1171.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://storybook.js.org/docs/writing-tests/visual-testing ]{#kobo.1172.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://storybook.js.org/docs/writing-tests/visual-testing){style="text-decoration: none;"} [ . ]{#kobo.1173.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s see how we can configure Storybook to work with our project. ]{#kobo.1174.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Configuring Storybook ]{#kobo.1175.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_132 .heading-2}

[ We can use ]{#kobo.1176.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4128ff51 .index-entry index-entry="Storybook:configuring"} [ Storybook CLI to install and configure everything automatically. ]{#kobo.1177.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Storybook is initialized in the project with the following command: ]{#kobo.1178.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm create storybook@latest
```

[ This command will do the following: ]{#kobo.1180.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Install Storybook and its dependencies ]{#kobo.1181.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Create a ]{#kobo.1182.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` .storybook `{.inlineCode}]{#kobo.1183.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory with configuration files ]{#kobo.1184.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Add Storybook scripts to our ]{#kobo.1185.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` package.json `{.inlineCode}]{#kobo.1186.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode}
- [ Detect our project setup (React, Vite, TypeScript) and configure accordingly ]{#kobo.1187.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ There are a few things we need to configure to make Storybook work with our project. ]{#kobo.1188.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Configuring Vite for storybook ]{#kobo.1189.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_133 .heading-2}

[ Since we\'re ]{#kobo.1190.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_2283e201 .index-entry index-entry="Storybook:Vite, configuring for"} [ using React Router with Vite, we need to make a small adjustment to our Vite configuration. ]{#kobo.1191.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The React Router plugin should only run when we\'re building our application, not when running Storybook. ]{#kobo.1192.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We need to update our ]{#kobo.1193.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` vite.config.ts `{.inlineCode}]{#kobo.1194.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : ]{#kobo.1195.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// vite.config.ts
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isStorybook = process.env.STORYBOOK === 'true';

export default defineConfig({
  plugins: [tailwindcss(), !isStorybook && reactRouter(), tsconfigPaths()],
});
```

[ Here\'s what we changed: ]{#kobo.1246.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` const isStorybook = process.env.STORYBOOK === 'true'; `{.inlineCode}]{#kobo.1247.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Detects if we\'re running Storybook. ]{#kobo.1248.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` !isStorybook && reactRouter() `{.inlineCode}]{#kobo.1249.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Only loads the React Router plugin when we\'re not running Storybook. ]{#kobo.1250.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We don\'t need it in Storybook; that\'s why we are disabling it. ]{#kobo.1251.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This prevents conflicts between React Router and Storybook in the Vite setup. ]{#kobo.1252.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Configuring Storybook preview ]{#kobo.1253.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_134 .heading-3}

[ The ]{#kobo.1254.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` .storybook/preview.ts `{.inlineCode}]{#kobo.1255.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file controls ]{#kobo.1256.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_fdd56c2a .index-entry index-entry="Storybook:preview, configuring"} [ how our stories are displayed. ]{#kobo.1257.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We need to import our application styles so our components look the same in Storybook as they do in our application: ]{#kobo.1258.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// .storybook/preview.ts
import type { Preview } from '@storybook/react-vite'
import '../src/app/app.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
```

[ Here\'s what this ]{#kobo.1301.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f566f884 .index-entry index-entry="Storybook:preview, configuring"} [ configuration does: ]{#kobo.1302.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` import '../src/app/app.css' `{.inlineCode}]{#kobo.1303.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Imports our Tailwind CSS styles so components render with proper styling ]{#kobo.1304.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` parameters.controls.matchers `{.inlineCode}]{#kobo.1305.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Tells Storybook to provide color pickers for color props and date pickers for date props ]{#kobo.1306.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Running Storybook ]{#kobo.1307.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_135 .heading-2}

[ The CLI added ]{#kobo.1308.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_89d301b8 .index-entry index-entry="Storybook:running"} [ two new scripts to our ]{#kobo.1309.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` package.json `{.inlineCode}]{#kobo.1310.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : ]{#kobo.1311.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
{
  "scripts": {
    "storybook": "STORYBOOK=true storybook dev -p 6006",
    "build-storybook": "STORYBOOK=true storybook build"
  }
}
```

[ We can now run Storybook with the following: ]{#kobo.1323.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
# Start Storybook development server
npm run storybook

# Build static Storybook for deployment
npm run build-storybook
```

[ The ]{#kobo.1325.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` storybook `{.inlineCode}]{#kobo.1326.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ command starts a development server on port ]{#kobo.1327.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` 6006 `{.inlineCode}]{#kobo.1328.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.1329.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we open ]{#kobo.1330.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:6006 ]{#kobo.1331.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:6006){style="text-decoration: none;"} [ in our browser, we\'ll see the Storybook interface with all our documented components. ]{#kobo.1332.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Documenting components with Storybook ]{#kobo.1333.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_136 .heading-2}

[ Now that we ]{#kobo.1334.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f8c102d7 .index-entry index-entry="Storybook:components, documenting with"} [ have Storybook configured, let\'s create our first story. ]{#kobo.1335.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Stories are examples of how a component can be used with different props. ]{#kobo.1336.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Creating a story file ]{#kobo.1337.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_137 .heading-3}

[ Story ]{#kobo.1338.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d8667f18 .index-entry index-entry="story file creation"} [ files use ]{#kobo.1339.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_87080cbc .index-entry index-entry="Storybook:story file, creating"} [ the naming convention ]{#kobo.1340.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` ComponentName.stories.tsx `{.inlineCode}]{#kobo.1341.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ . ]{#kobo.1342.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'ll ]{#kobo.1343.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4f127ca3 .index-entry index-entry="Component Story Format version 3 (CSF3)"} [ use ]{#kobo.1344.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Component Story Format version 3 ]{#kobo.1345.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.1346.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ CSF3 ]{#kobo.1347.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ), which is the modern way to write Storybook stories. ]{#kobo.1348.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s create a story for our ]{#kobo.1349.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Button `{.inlineCode}]{#kobo.1350.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ component: ]{#kobo.1351.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/components/ui/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

// ... more stories ...
```

[ Let\'s break down what each part does: ]{#kobo.1497.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

#### [ Meta configuration ]{#kobo.1498.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h4_138 .heading-4}

[ The ]{#kobo.1499.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` meta `{.inlineCode}]{#kobo.1500.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ object ]{#kobo.1501.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_926c49da .index-entry index-entry="story file creation:meta configuration"} [ defines the configuration for all stories of this component: ]{#kobo.1502.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` title: 'UI/Button' `{.inlineCode}]{#kobo.1503.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Organizes the story in Storybook\'s sidebar under ]{#kobo.1504.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ UI ]{#kobo.1505.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ \> ]{#kobo.1506.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Button ]{#kobo.1507.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}**
- ` `{.inlineCode}[` component: Button `{.inlineCode}]{#kobo.1508.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Tells Storybook which component these stories are for ]{#kobo.1509.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` parameters: { layout: 'centered' } `{.inlineCode}]{#kobo.1510.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Centers the component in the canvas ]{#kobo.1511.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` tags: ['autodocs'] `{.inlineCode}]{#kobo.1512.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Automatically generates documentation from the component\'s props and stories ]{#kobo.1513.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` argTypes `{.inlineCode}]{#kobo.1514.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Defines interactive controls for component props in Storybook\'s controls panel ]{#kobo.1515.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

#### [ ArgTypes configuration ]{#kobo.1516.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h4_139 .heading-4}

[ The ]{#kobo.1517.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` argTypes `{.inlineCode}]{#kobo.1518.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ section ]{#kobo.1519.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_8a5a5a85 .index-entry index-entry="story file creation:argTypes configuration"} [ creates interactive controls in Storybook: ]{#kobo.1520.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` variant `{.inlineCode}]{#kobo.1521.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Creates a dropdown with all variant options ]{#kobo.1522.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` size `{.inlineCode}]{#kobo.1523.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Creates a dropdown with all size options ]{#kobo.1524.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` asChild `{.inlineCode}]{#kobo.1525.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.1526.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` disabled `{.inlineCode}]{#kobo.1527.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Create toggle switches for boolean props ]{#kobo.1528.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

#### [ Individual stories ]{#kobo.1529.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h4_140 .heading-4}

[ Each exported ]{#kobo.1530.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_03712591 .index-entry index-entry="story file creation:individual stories"} [ story represents a different state or variation of the component: ]{#kobo.1531.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.inlineCode}[` Default `{.inlineCode}]{#kobo.1532.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Shows the default button ]{#kobo.1533.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` Destructive `{.inlineCode}]{#kobo.1534.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Shows the destructive variant (for delete actions) ]{#kobo.1535.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` Outline `{.inlineCode}]{#kobo.1536.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , ]{#kobo.1537.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Secondary `{.inlineCode}]{#kobo.1538.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , ]{#kobo.1539.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Ghost `{.inlineCode}]{#kobo.1540.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ , ]{#kobo.1541.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Link `{.inlineCode}]{#kobo.1542.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Show different visual styles ]{#kobo.1543.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` Small `{.inlineCode}]{#kobo.1544.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and ]{#kobo.1545.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` Large `{.inlineCode}]{#kobo.1546.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Shows different sizes ]{#kobo.1547.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.inlineCode}[` Disabled `{.inlineCode}]{#kobo.1548.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ : Shows the disabled state ]{#kobo.1549.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Each story has an args object that defines the props passed to the component. ]{#kobo.1550.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These can be modified in Storybook\'s controls panel to see how the component responds to different inputs. ]{#kobo.1551.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Viewing stories in Storybook ]{#kobo.1552.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_141 .heading-2}

[ When ]{#kobo.1553.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_26061087 .index-entry index-entry="Storybook:stories, viewing"} [ we run ]{#kobo.1554.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` npm run storybook `{.inlineCode}]{#kobo.1555.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ and open ]{#kobo.1556.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:6006 ]{#kobo.1557.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:6006){style="text-decoration: none;"} [ , we\'ll see the Storybook interface: ]{#kobo.1558.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1559.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_3_3.png" data-original-image-title="" style="width:528.0px; height:309.5333333333333px;">Figure 3.3 – Viewing documented components in Storybook</span> </span>
</figure>

[ Figure 3.3 -- Viewing documented components in Storybook ]{#kobo.1560.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The ]{#kobo.1561.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4506fb16 .index-entry index-entry="Storybook:stories, viewing"} [ Storybook interface has several key areas: ]{#kobo.1562.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Sidebar (left) ]{#kobo.1563.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Lists all our components and their stories ]{#kobo.1564.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Canvas (center) ]{#kobo.1565.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Shows the rendered component ]{#kobo.1566.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Controls panel (bottom) ]{#kobo.1567.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Interactive controls to modify component props ]{#kobo.1568.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Docs tab ]{#kobo.1569.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Auto-generated documentation showing all variants and prop descriptions ]{#kobo.1570.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can do the following: ]{#kobo.1571.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Click on different stories to see different states ]{#kobo.1572.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Use the controls panel to change props interactively ]{#kobo.1573.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Switch to the ]{#kobo.1574.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Docs ]{#kobo.1575.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ tab to see all variants at once ]{#kobo.1576.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Copy code examples for how to use the component ]{#kobo.1577.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With our component library and documentation system in place, we can build our application UI with confidence. ]{#kobo.1578.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Summary ]{#kobo.1579.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_142 .heading-1}

[ In this chapter, we built the foundation for our application\'s user interface. ]{#kobo.1580.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We started by understanding what components are -- self-contained pieces of UI that use props for input, state for managing values, event handlers for interactions, and TypeScript for type safety. ]{#kobo.1581.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Next, we evaluated different approaches to component libraries. ]{#kobo.1582.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We chose Shadcn UI because it gives us full control by copying components directly into our code base, while still benefiting from Base UI for accessibility and Tailwind CSS for styling. ]{#kobo.1583.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can use the shadcn CLI to add components, or we can copy the code manually. ]{#kobo.1584.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Finally, we set up Storybook for component documentation. ]{#kobo.1585.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We configured Storybook to work with React Router and Vite, created story files that showcase different component states, and learned how Storybook provides an isolated environment for developing and testing components. ]{#kobo.1586.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This gives us a living catalog that designers, developers, and stakeholders can reference. ]{#kobo.1587.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With our component library and documentation system in place, we\'re ready to start building the features of our application. ]{#kobo.1588.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Get this book\'s PDF copy, code bundle, and more ]{#kobo.1589.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_143 .heading-1}

[ Scan the QR code (or go to ]{#kobo.1590.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.1591.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ ). ]{#kobo.1592.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search for this book by name, confirm the edition, and then follow the steps on the page. ]{#kobo.1593.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_3_4.png" original-image-title="" style="width:25%;"} ]{#kobo.1594.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_3_5.png" original-image-title="" style="width:25%;"} ]{#kobo.1595.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[ Note: Have your invoice handy. ]{#kobo.1596.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Purchases made directly from the Packt website don ]{#kobo.1597.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ \' ]{#kobo.1598.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ t require an invoice. ]{#kobo.1599.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}*

[ ]{#kobo.1600.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
:::
