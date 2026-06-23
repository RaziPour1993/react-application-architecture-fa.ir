::: {.section .chapter-first}
# [ 10 ]{#kobo.1.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_263 .chapterNumber}

# [ Making the Application Accessible ]{#kobo.2.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_264 .chapterTitle}

[ Imagine you\'re a user who relies on the keyboard to navigate through the application. ]{#kobo.3.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Perhaps a motor impairment makes using a mouse difficult, or perhaps it\'s simply your preference. ]{#kobo.4.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ You open the application, press Tab to move through the interface, and nothing happens. ]{#kobo.5.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ No focus indicators, no logical tab order, no way forward. ]{#kobo.6.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ You close the ]{#kobo.7.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_cec28241 .index-entry index-entry="accessibility"} [ tab and move on. ]{#kobo.8.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For you, the application is unusable. ]{#kobo.9.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} **[ Accessibility ]{#kobo.10.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ , often abbreviated as ]{#kobo.11.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ a11y ]{#kobo.12.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ , ensures that our applications can be used by everyone, including people with disabilities. ]{#kobo.13.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This includes users who rely on screen readers, navigate with keyboards, have low vision, or experience motor impairments. ]{#kobo.14.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Building accessible applications isn\'t just the right thing to do. ]{#kobo.15.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s often a legal requirement and expands our potential user base significantly. ]{#kobo.16.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll cover the following topics: ]{#kobo.17.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Understanding accessibility fundamentals ]{#kobo.18.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Laying the architectural foundation with semantic HTML and accessible component libraries ]{#kobo.19.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Practical accessibility optimizations ]{#kobo.20.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By the end of this chapter, we\'ll learn how to think about accessibility from the start. ]{#kobo.21.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'ll see how making the right choices early on makes our applications more maintainable and helps us reach more users. ]{#kobo.22.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Technical requirements ]{#kobo.23.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_265 .heading-1}

[ Before we get started, we need to set up our project. ]{#kobo.24.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To be able to develop our project, we\'ll need the following things installed on our computer: ]{#kobo.25.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Node.js version 24 or above, npm version 11 or above ships with Node. ]{#kobo.26.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can confirm that by executing ]{#kobo.27.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` node -v `{.codeHighlighted}]{#kobo.28.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.29.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` npm -v `{.codeHighlighted}]{#kobo.30.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ in the terminal. ]{#kobo.31.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There are multiple ways to install Node.js and npm. ]{#kobo.32.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here is a great article that goes into more detail: ]{#kobo.33.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js ]{#kobo.34.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js){style="text-decoration: none;"} [ . ]{#kobo.35.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ VS Code (optional) is a popular editor for JavaScript and TypeScript: open source, solid TypeScript support, and extensions. ]{#kobo.36.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It can be downloaded from ]{#kobo.37.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://code.visualstudio.com ]{#kobo.38.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://code.visualstudio.com){style="text-decoration: none;"} [ . ]{#kobo.39.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The code for this book is available at the book\'s repo. ]{#kobo.40.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To access the repository link, follow the steps in the \" ]{#kobo.41.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Download the example code files ]{#kobo.42.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ \" section in the ]{#kobo.43.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Preface ]{#kobo.44.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ . ]{#kobo.45.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Clone it and enter the repository root: ]{#kobo.46.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

[ The repository contains chapter folders with the code for each chapter, plus a shared ]{#kobo.48.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` api `{.codeHighlighted}]{#kobo.49.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ folder with the API server used across all chapters. ]{#kobo.50.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We are on ]{#kobo.51.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Chapter ]{#kobo.52.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ 10 ]{#kobo.53.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ , so we need to navigate to the ]{#kobo.54.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` chapter‑10 `{.inlineCode}]{#kobo.55.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.56.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/chapter-10
```

[ Then we need to install dependencies: ]{#kobo.58.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm install
```

[ We also need to provide the environment variables: ]{#kobo.60.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cp .env.example .env
```

[ Now we should have the frontend running at ]{#kobo.62.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:5173 ]{#kobo.63.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:5173){style="text-decoration: none;"} [ . ]{#kobo.64.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We also need to have our API server running. ]{#kobo.65.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s open a new terminal window and navigate to the ]{#kobo.66.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` api `{.inlineCode}]{#kobo.67.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.68.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/api
```

[ Now we need to run the setup script for ]{#kobo.70.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[[ Chapter 10 ]{#kobo.71.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_10.xhtml#h1_263){.chapref}* [ to configure everything for us: ]{#kobo.72.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run setup 10
```

[ Then we need to run the API server: ]{#kobo.74.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run dev
```

[ We should see the API server running on ]{#kobo.76.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:9999 ]{#kobo.77.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:9999){style="text-decoration: none;"} [ . ]{#kobo.78.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For more information about the setup details, check out the ]{#kobo.79.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` README.md `{.inlineCode}]{#kobo.80.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ file. ]{#kobo.81.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Understanding accessibility fundamentals ]{#kobo.82.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_266 .heading-1}

[ Before diving into ]{#kobo.83.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b8c66458 .index-entry index-entry="accessibility:fundamentals"} [ technical details, let\'s see why accessibility matters and which principles guide our work. ]{#kobo.84.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ It\'s about people ]{#kobo.85.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : More than one billion people experience some form of disability. ]{#kobo.86.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These disabilities range from permanent conditions like blindness to temporary situations like a broken arm to situational limitations like trying to use a phone in bright sunlight. ]{#kobo.87.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we build inaccessible applications, we\'re excluding a significant portion of potential users. ]{#kobo.88.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ It\'s good for business ]{#kobo.89.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Accessible applications reach more users. ]{#kobo.90.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Every barrier we remove opens our application to more people. ]{#kobo.91.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Major tech companies have found that prioritizing accessibility doesn\'t just help users with disabilities; it often improves the experience for everyone. ]{#kobo.92.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ It\'s often required by law ]{#kobo.93.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Many countries have laws requiring digital accessibility. ]{#kobo.94.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In the United States, the ]{#kobo.95.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Americans with Disabilities Act ]{#kobo.96.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ( ]{#kobo.97.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ ADA ]{#kobo.98.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ ) applies to many websites. ]{#kobo.99.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The European Union has the European Accessibility Act. ]{#kobo.100.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Similar laws exist worldwide. ]{#kobo.101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Organizations face lawsuits when their digital properties aren\'t accessible. ]{#kobo.102.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ It makes better code ]{#kobo.103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ : Accessible code tends to be better code. ]{#kobo.104.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It requires us to use good practices. ]{#kobo.105.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we use semantic HTML, our markup becomes more meaningful. ]{#kobo.106.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we structure content logically, it becomes easier to maintain. ]{#kobo.107.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we test with keyboards and screen readers, we find bugs that affect all users. ]{#kobo.108.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Accessibility principles ]{#kobo.109.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_267 .heading-2}

[ The ]{#kobo.110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Web Content Accessibility Guidelines (WCAG) ]{#kobo.111.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ provide ]{#kobo.112.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_789ade20 .index-entry index-entry="accessibility:principles"} [ a framework for making web content ]{#kobo.113.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_18b4a53b .index-entry index-entry="Web Content Accessibility Guidelines (WCAG)"} [ accessible. ]{#kobo.114.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ WCAG is organized around four principles, often remembered by the acronym ]{#kobo.115.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ POUR ]{#kobo.116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ : ]{#kobo.117.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Perceivable - Information must be presentable in ways users can perceive. ]{#kobo.118.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This means providing text alternatives for images, captions for videos, and sufficient color contrast. ]{#kobo.119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Operable - Users must be able to operate the interface. ]{#kobo.120.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This means supporting keyboard navigation, providing users enough time to read content, and avoiding content that causes seizures. ]{#kobo.121.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Understandable - Users must be able to understand the information and operation of the interface. ]{#kobo.122.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This means using clear language, consistent navigation, and helpful error messages. ]{#kobo.123.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Robust - Users must be able to rely on content being interpreted reliably by a wide variety of technologies. ]{#kobo.124.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This means using valid HTML and following standards. ]{#kobo.125.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We will use these principles throughout this chapter to focus on architectural decisions that have the greatest impact on real users. ]{#kobo.126.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Laying the architectural foundation ]{#kobo.127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_268 .heading-1}

[ The foundation has two important parts: using semantic HTML and using accessible component libraries. ]{#kobo.128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s important to get these correct from the start, as they will affect the entire application. ]{#kobo.129.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Semantic HTML ]{#kobo.130.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_269 .heading-2}

[ HTML isn\'t just markup. ]{#kobo.131.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s ]{#kobo.132.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a47dc789 .index-entry index-entry="architectural foundation, accessibility:semantic HTML"} [ an accessibility API that browsers and assistive technologies understand. ]{#kobo.133.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we use the right HTML element, we get behavior for free. ]{#kobo.134.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we use the wrong one, we have to rebuild that behavior ourselves. ]{#kobo.135.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Think about a ]{#kobo.136.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` < `{.codeHighlighted}]{#kobo.137.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` button `{.codeHighlighted}]{#kobo.138.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` > `{.codeHighlighted}]{#kobo.139.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ versus a ]{#kobo.140.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` < `{.codeHighlighted}]{#kobo.141.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` div `{.codeHighlighted}]{#kobo.142.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` > `{.codeHighlighted}]{#kobo.143.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ with an ]{#kobo.144.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` onClick `{.codeHighlighted}]{#kobo.145.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ handler. ]{#kobo.146.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They can look identical and both respond to clicks. ]{#kobo.147.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But under the hood, they\'re different. ]{#kobo.148.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ A button element comes with built-in behavior. ]{#kobo.149.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It responds to keyboard events. ]{#kobo.150.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Screen readers announce it as a button. ]{#kobo.151.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Form submissions recognize it. ]{#kobo.152.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Focus management systems know how to handle it. ]{#kobo.153.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When we use a ]{#kobo.154.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` div `{.codeHighlighted}]{#kobo.155.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ instead, we lose all of that. ]{#kobo.156.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We need to add ]{#kobo.157.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` tabIndex `{.codeHighlighted}]{#kobo.158.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to make it focusable, ]{#kobo.159.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` onKeyDown `{.codeHighlighted}]{#kobo.160.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ handlers to respond to Enter and Space, and ]{#kobo.161.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` role="button" `{.codeHighlighted}]{#kobo.162.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to tell screen readers what it is. ]{#kobo.163.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ And even then, we still fall short. ]{#kobo.164.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A ]{#kobo.165.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` div `{.codeHighlighted}]{#kobo.166.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ can never participate in form submission or have the full semantics of ]{#kobo.167.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` disabled `{.codeHighlighted}]{#kobo.168.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.169.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We are not fixing the problem; we are patching around it. ]{#kobo.170.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In the context of our application, when users filter ideas by tag we use the ]{#kobo.171.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Badge `{.codeHighlighted}]{#kobo.172.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component. ]{#kobo.173.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we click on a badge, we toggle the tag filter. ]{#kobo.174.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ That sounds like a button\'s behavior. ]{#kobo.175.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But our ]{#kobo.176.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Badge `{.codeHighlighted}]{#kobo.177.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component renders a ]{#kobo.178.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` < `{.codeHighlighted}]{#kobo.179.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` span `{.codeHighlighted}]{#kobo.180.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` > `{.codeHighlighted}]{#kobo.181.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ by default: ]{#kobo.182.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/components/ui/badge.tsx

function Badge({
  className,
  variant = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'>&VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ className, variant })),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
}
```

[ How do we keep the ]{#kobo.227.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Badge `{.codeHighlighted}]{#kobo.228.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ styling while using a button element? ]{#kobo.229.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ We need to make sure our design system is flexible enough to support overrides when needed. ]{#kobo.229.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Fortunately, we can achieve that easily by using the ]{#kobo.230.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` render `{.codeHighlighted}]{#kobo.231.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ prop, which ]{#kobo.232.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_aaba774c .index-entry index-entry="architectural foundation, accessibility:semantic HTML"} [ allows us to provide a custom element to render. ]{#kobo.233.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we provide it, the ]{#kobo.234.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Badge `{.codeHighlighted}]{#kobo.235.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component passes its styling to the provided element instead of creating its own span element. ]{#kobo.236.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This lets us provide a button and get Badge\'s appearance: ]{#kobo.237.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/components/idea-search-and-filters.tsx

<Badge
  key={tag}
  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
  className="cursor-pointer"
  render={
    <button
      type="button"
      aria-pressed={selectedTags.includes(tag)}
      aria-label={t('ideas:tagStatus', {
        tag,
        status: selectedTags.includes(tag)
          ? t('common:selected')
          : t('common:notSelected'),
      })}
      onClick={() => toggleTag(tag)}
    >
      {tag}
    </button>
  }
/>
```

[ The button element brings everything we need. ]{#kobo.293.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s keyboard focusable. ]{#kobo.294.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It responds to keyboard events. ]{#kobo.295.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Screen readers announce it as a button. ]{#kobo.296.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ If we used divs or spans instead, we\'d need to manually add all of this behavior to every single tag filter. ]{#kobo.297.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ By using a button, we get all of that behavior from the platform: keyboard handling, ARIA role, and event semantics without writing a single line of JavaScript. ]{#kobo.298.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ If we wanted to go further, we could make an abstraction with something like ]{#kobo.299.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` SelectableBadge `{.codeHighlighted}]{#kobo.300.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ on top of the ]{#kobo.301.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Badge `{.codeHighlighted}]{#kobo.302.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component so we don\'t have to repeat this pattern everywhere. ]{#kobo.303.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

### [ Defining page landmarks ]{#kobo.304.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h3_270 .heading-3}

[ Buttons ]{#kobo.305.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c73a5bbe .index-entry index-entry="architectural foundation, accessibility:page landmarks, defining"} [ and links handle interactive elements, but semantic HTML also provides structural elements that help users navigate the page itself. ]{#kobo.306.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Elements like ]{#kobo.307.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` < `{.codeHighlighted}]{#kobo.308.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` header `{.codeHighlighted}]{#kobo.309.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` > `{.codeHighlighted}]{#kobo.310.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.311.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` < `{.codeHighlighted}]{#kobo.312.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` main `{.codeHighlighted}]{#kobo.313.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` > `{.codeHighlighted}]{#kobo.314.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.315.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` < `{.codeHighlighted}]{#kobo.316.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` nav `{.codeHighlighted}]{#kobo.317.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` > `{.codeHighlighted}]{#kobo.318.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , and ]{#kobo.319.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` < `{.codeHighlighted}]{#kobo.320.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` footer `{.codeHighlighted}]{#kobo.321.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` > `{.codeHighlighted}]{#kobo.322.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ create landmarks that screen readers can jump between. ]{#kobo.323.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s look at our application\'s layout structure: ]{#kobo.324.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/layout.tsx

export default function Layout() {
  // ...
  return (
    <div className="min-h-screen flex flex-col">
      {/* ... */}
      <header>
        <Navigation user={user} onLogout={handleLogout} />
      </header>
      <main id="main-content" className="flex-1 bg-background">
        <Outlet />
      </main>
      <footer className="border-t py-6 px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AIdeas. All rights reserved.
      </footer>
    </div>
  );
}
```

[ The ]{#kobo.391.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` < `{.codeHighlighted}]{#kobo.392.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` header `{.codeHighlighted}]{#kobo.393.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` > `{.codeHighlighted}]{#kobo.394.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.395.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` < `{.codeHighlighted}]{#kobo.396.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` main `{.codeHighlighted}]{#kobo.397.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` > `{.codeHighlighted}]{#kobo.398.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , and ]{#kobo.399.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` < `{.codeHighlighted}]{#kobo.400.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` footer `{.codeHighlighted}]{#kobo.401.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` > `{.codeHighlighted}]{#kobo.402.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ elements ]{#kobo.403.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e8bdefda .index-entry index-entry="architectural foundation, accessibility:page landmarks, defining"} [ create landmarks that screen readers can navigate. ]{#kobo.404.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Users can jump directly to the main content or footer without tabbing through everything. ]{#kobo.405.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This works without JavaScript, survives CSS failures, and provides meaning to assistive technologies. ]{#kobo.406.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Using accessible component libraries ]{#kobo.407.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_271 .heading-2}

[ Semantic HTML ]{#kobo.408.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_72878a08 .index-entry index-entry="architectural foundation, accessibility:accessible component libraries"} [ handles simple elements, but complex UIs need more. ]{#kobo.409.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Building accessible interactive components from scratch is hard, and the difficulty doesn\'t end at initial implementation. ]{#kobo.410.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Browsers and assistive technologies behave inconsistently and evolve independently, so keeping components correct over time is where teams most often fall short. ]{#kobo.411.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A dropdown menu needs keyboard navigation with arrow keys, focus management, Escape to close, disabled state handling, screen reader announcements, and correct ARIA attributes. ]{#kobo.412.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Get any of it wrong and some users can\'t use the menu. ]{#kobo.413.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This is where component libraries matter. ]{#kobo.414.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We already covered how to choose a component library in ]{#kobo.415.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[[ Chapter 3 ]{#kobo.416.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_3.xhtml#h1_106){.chapref}* [ . ]{#kobo.417.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Besides their baked-in functionality, they should also provide accessibility support and allow us to focus on application logic and styling. ]{#kobo.418.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Take dialogs as an example. ]{#kobo.419.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A properly accessible dialog needs: ]{#kobo.420.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Focus trapping - Focus stays inside the dialog until it closes ]{#kobo.421.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Return focus - Focus returns to the trigger when dismissed ]{#kobo.422.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Keyboard handling - Escape closes the dialog, Tab cycles through content ]{#kobo.423.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ ARIA attributes - Proper ]{#kobo.424.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` role `{.codeHighlighted}]{#kobo.425.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.426.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` aria-modal `{.codeHighlighted}]{#kobo.427.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.428.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` aria- `{.codeHighlighted}]{#kobo.429.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.430.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` labelledby `{.codeHighlighted}]{#kobo.431.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ set automatically ]{#kobo.432.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Body scroll locking - Prevents page content from scrolling behind the modal ]{#kobo.433.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Portal rendering - Renders dialog at document root for proper stacking ]{#kobo.434.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When we use the right component library, we get all of this for free. ]{#kobo.435.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ That\'s why making the right decision here is very important, as it will affect the entire application and may be difficult to change later. ]{#kobo.436.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Practical accessibility optimizations ]{#kobo.437.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_272 .heading-1}

[ Semantic HTML and accessible ]{#kobo.438.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_523e31f4 .index-entry index-entry="accessibility optimizations"} [ component libraries handle most accessibility concerns, but some situations need extra work. ]{#kobo.439.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s look at the most common optimizations and where they fit in the application. ]{#kobo.440.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Skip links for keyboard navigation ]{#kobo.441.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_273 .heading-2}

[ When users ]{#kobo.442.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_2af1d792 .index-entry index-entry="accessibility optimizations:links, skipping for keyboard navigation"} [ navigate with a keyboard, they tab through every interactive element. ]{#kobo.443.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If our navigation has five links, keyboard users must press Tab five times on every page just to reach the main content. ]{#kobo.444.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For users who use only keyboards, this gets exhausting. ]{#kobo.445.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The solution is a skip link: a hidden anchor that navigates directly to the main content. ]{#kobo.446.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s the first focusable element on the page. ]{#kobo.447.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/layout.tsx

export default function Layout() {
  const { t } = useTranslation(['navigation']);
  // ...

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:border focus:rounded focus:ring-2 focus:ring-ring"
      >
        {t('navigation:skipToContent')}
      </a>
      <header>
        <Navigation user={user} onLogout={handleLogout} />
      </header>
      <main id="main-content" className="flex-1 bg-background">
        <Outlet />
      </main>
      <footer className="border-t py-6 px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AIdeas. All rights reserved.
      </footer>
    </div>
  );
}
```

[ The skip link is visually hidden by default ( ]{#kobo.533.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` sr-only `{.codeHighlighted}]{#kobo.534.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ ) but becomes visible when focused. ]{#kobo.535.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It targets the ]{#kobo.536.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` main `{.codeHighlighted}]{#kobo.537.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ element via ]{#kobo.538.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` id="main-content" `{.codeHighlighted}]{#kobo.539.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , so users can bypass navigation with a single Tab and Enter. ]{#kobo.540.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ If we press the Tab button, the skip link becomes visible: ]{#kobo.541.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.542.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_10_1.png" data-original-image-title="" style="width:528.0px; height:314.9514735209395px;">Figure 10.1: Skip link becomes visible when focused</span> </span>
</figure>

[ Figure 10.1: Skip link becomes visible when focused ]{#kobo.543.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This takes us ]{#kobo.544.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_754c1f35 .index-entry index-entry="accessibility optimizations:links, skipping for keyboard navigation"} [ directly to the main content, skipping the navigation and other less important elements. ]{#kobo.545.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Providing accessible labels ]{#kobo.546.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_274 .heading-2}

[ When ]{#kobo.547.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_fcf3741b .index-entry index-entry="accessibility optimizations:accessible labels, providing"} [ we show a button with only an icon (like a three-dot menu button), sighted users know that it opens a menu. ]{#kobo.548.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ However, screen reader users hear only \"button\" with no information about what it does since there is no visible text. ]{#kobo.549.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Every interactive element needs an accessible name. ]{#kobo.550.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For any element that doesn\'t have visible text, we use ]{#kobo.551.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` aria-label `{.codeHighlighted}]{#kobo.552.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : ]{#kobo.553.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/components/idea-actions.tsx

<DropdownMenuTrigger
  render={
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0"
      aria-label={t('ideas:ideaActionsMenu')}
    >
      <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
    </Button>
  }
/>
```

[ The ]{#kobo.591.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` aria-label `{.codeHighlighted}]{#kobo.592.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ provides the accessible name that screen readers announce: \"Idea actions menu, button.\" ]{#kobo.593.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ The icon itself gets ]{#kobo.593.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` aria-hidden="true" `{.codeHighlighted}]{#kobo.594.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ because it\'s purely visual, so it\'s not announced by screen readers. ]{#kobo.595.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This same pattern applies anywhere we need to provide text that screen readers can announce but sighted users don\'t need to see: close buttons, menu buttons, icon toggles, or any visual representation that doesn\'t translate well to text. ]{#kobo.596.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Announcing dynamic changes ]{#kobo.597.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_275 .heading-2}

[ When ]{#kobo.598.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_3ef42190 .index-entry index-entry="accessibility optimizations:dynamic changes, announcing"} [ users select a tag filter, React updates the list without a page reload. ]{#kobo.599.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Sighted users see the list change, but screen reader users don\'t get any notification. ]{#kobo.600.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They don\'t know if the filter worked or how many results are showing. ]{#kobo.601.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For dynamic applications, this creates a gap between action and feedback. ]{#kobo.602.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ React applications update without page reloads, and screen readers don\'t announce DOM changes unless they affect focus or a live region. ]{#kobo.603.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To solve this, we can use ARIA live regions. ]{#kobo.604.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s look at how we announce search results to screen readers: ]{#kobo.605.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/ideas/ideas.tsx

function Ideas() {
  const { t } = useTranslation(['ideas', 'common']);
  const { params } = useSearchAndFilters();

  const ideasInfiniteQuery = useIdeasInfiniteQuery({
    params: params as GetAllIdeasData['query'],
  });

  const allIdeas =
    ideasInfiniteQuery.data?.pages.flatMap((page) => page.data) || [];

  // ...

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {/* ... */}
        <IdeaSearchAndFilters />
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {t('ideas:resultsFound', { count: allIdeas.length })}
      </div>

      <ListComponent
        ideas={allIdeas}
        isLoading={ideasInfiniteQuery.isLoading && allIdeas.length === 0}
        emptyMessage={t('ideas:noIdeasAvailable')}
        error={ideasInfiniteQuery.error}
      />
    </div>
  );
}
```

[ The live region is visually hidden ( ]{#kobo.714.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` sr-only `{.codeHighlighted}]{#kobo.715.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ ), but screen readers monitor it. ]{#kobo.716.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When ]{#kobo.717.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` allIdeas.length `{.codeHighlighted}]{#kobo.718.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ changes, screen readers announce \"5 results found.\" ]{#kobo.719.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ The ]{#kobo.719.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` aria-live="polite" `{.codeHighlighted}]{#kobo.720.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ means the announcement waits for a pause in speech. ]{#kobo.721.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Use ]{#kobo.722.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` aria-live="assertive" `{.codeHighlighted}]{#kobo.723.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ for critical updates like errors. ]{#kobo.724.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.725.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` role="status" `{.codeHighlighted}]{#kobo.726.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ indicates this is status information. ]{#kobo.727.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To scale it even further, we can consider centralizing announcements in a shared utility or hook to keep live region logic consistent. ]{#kobo.728.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Summary ]{#kobo.729.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_276 .heading-1}

[ Accessibility is important for multiple reasons. ]{#kobo.730.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s about people, it\'s good for business, it\'s often required by law, and it leads to better code. ]{#kobo.731.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can use the WCAG POUR principles to guide our decisions and build applications that are accessible to everyone. ]{#kobo.732.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Semantic HTML and accessible component libraries form the foundation. ]{#kobo.733.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Semantic HTML gives us keyboard support and screen reader compatibility for simple interactions. ]{#kobo.734.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Accessible component libraries handle complex patterns, managing focus and ARIA attributes so we don\'t have to. ]{#kobo.735.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Beyond the foundation, we covered three key optimizations. ]{#kobo.736.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Skip links let keyboard users jump directly to main content. ]{#kobo.737.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Accessible labels provide context for icon-only buttons and visual elements. ]{#kobo.738.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Live regions announce dynamic changes so screen reader users know when content updates. ]{#kobo.739.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Get this book\'s PDF copy, code bundle, and more ]{#kobo.740.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_277 .heading-1}

[ Scan the QR code (or go to ]{#kobo.741.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.742.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ ). ]{#kobo.743.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search for this book by name, confirm the edition, and then follow the steps on the page. ]{#kobo.744.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_10_2.png" original-image-title="" style="width:25%;"} ]{#kobo.745.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_10_3.png" original-image-title="" style="width:25%;"} ]{#kobo.746.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[ Note: Have your invoice handy. ]{#kobo.747.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Purchases made directly from the Packt website don\'t require an invoice. ]{#kobo.748.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}*

[ ]{#kobo.749.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
:::
