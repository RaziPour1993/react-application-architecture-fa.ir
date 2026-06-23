:::: {.section .chapter}
# [ 8 ]{#kobo.1.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_214 .chapterNumber}

# [ Improving Application Performance ]{#kobo.2.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_215 .chapterTitle}

[ Performance is one of the most important aspects of any web application. ]{#kobo.3.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When users interact with our application, they expect it to respond as soon as possible. ]{#kobo.4.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Delays of even a few hundred milliseconds can feel sluggish and frustrating. ]{#kobo.5.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For every application, performance matters in user experience. ]{#kobo.6.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Users are more likely to engage with content and complete actions when the application responds quickly. ]{#kobo.7.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Slow applications can impact business metrics and lose users. ]{#kobo.8.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Even small delays can significantly impact conversion rates and user engagement. ]{#kobo.9.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Fortunately, with the right architectural decisions, we can build applications that feel much faster to users. ]{#kobo.10.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll cover the following topics: ]{#kobo.11.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Detecting performance issues ]{#kobo.12.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Optimizing components ]{#kobo.13.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Code splitting and lazy loading ]{#kobo.14.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Streaming content from the server ]{#kobo.15.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Debouncing user input ]{#kobo.16.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Handling large data sets with pagination and virtualization ]{#kobo.17.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Optimistic updates ]{#kobo.18.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By the end of this chapter, we\'ll have implemented several performance optimizations that make our application feel snappy and responsive, even when dealing with slow networks or large amounts of data. ]{#kobo.19.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Technical requirements ]{#kobo.20.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_216 .heading-1}

[ Before we get started, we need to set up our project. ]{#kobo.21.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To be able to develop our project, we\'ll need the following things installed on our computer: ]{#kobo.22.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Node.js version 24 or above, npm version 11 or above ships with Node. ]{#kobo.23.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can confirm that by executing ]{#kobo.24.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` node -v `{.codeHighlighted}]{#kobo.25.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.26.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` npm -v `{.codeHighlighted}]{#kobo.27.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ in the terminal. ]{#kobo.28.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There are multiple ways to install Node.js and npm. ]{#kobo.29.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here is a great article that goes into more detail: ]{#kobo.30.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js ]{#kobo.31.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js){style="text-decoration: none;"} [ . ]{#kobo.32.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ VS Code (optional) is a popular editor for JavaScript and TypeScript: open source, solid TypeScript support, and extensions. ]{#kobo.33.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It can be downloaded from ]{#kobo.34.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://code.visualstudio.com ]{#kobo.35.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://code.visualstudio.com){style="text-decoration: none;"} [ . ]{#kobo.36.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The code for this book is available at the book\'s repo. ]{#kobo.37.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To access the repository link, follow the steps in the ]{#kobo.38.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ \" ]{#kobo.39.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ Download the example code files ]{#kobo.40.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ \" ]{#kobo.41.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ section in the ]{#kobo.42.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Preface ]{#kobo.43.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ . ]{#kobo.44.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Clone it and enter the repository root: ]{#kobo.45.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

[ The repository contains chapter folders with the code for each chapter, plus a shared ]{#kobo.47.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` api `{.codeHighlighted}]{#kobo.48.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ folder with the API server used across all chapters. ]{#kobo.49.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We are on ]{#kobo.50.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[[ Chapter 8 ]{#kobo.51.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}](Chapter_8.xhtml#h1_214){.chapref}* [ , so we need to navigate to the ]{#kobo.52.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` chapter-08 `{.codeHighlighted}]{#kobo.53.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ directory: ]{#kobo.54.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/chapter-08
```

[ Then we need to install dependencies: ]{#kobo.56.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm install
```

[ We also need to provide the environment variables: ]{#kobo.58.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cp .env.example .env
```

[ Now we should have the frontend running at ]{#kobo.60.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:5173 ]{#kobo.61.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:5173){style="text-decoration: none;"} [ . ]{#kobo.62.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We also need to have our API server running. ]{#kobo.63.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s open a new terminal window and navigate to the ]{#kobo.64.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` api `{.inlineCode}]{#kobo.65.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.66.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/api
```

[ Now we need to run the setup script for ]{#kobo.68.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ C ]{#kobo.69.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ hapter 8 ]{#kobo.70.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ to configure everything for us: ]{#kobo.71.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run setup 08
```

[ Then we need to run the API server: ]{#kobo.73.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run dev
```

[ We should see the API server running on ]{#kobo.75.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:9999 ]{#kobo.76.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:9999){style="text-decoration: none;"} [ . ]{#kobo.77.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For more information about the setup details, check out the ]{#kobo.78.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` README.md `{.codeHighlighted}]{#kobo.79.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file. ]{#kobo.80.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Detecting performance issues ]{#kobo.81.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_217 .heading-1}

[ Before we can fix performance problems, we need to identify them. ]{#kobo.82.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React applications can suffer from unnecessary re-renders, which waste CPU cycles ]{#kobo.83.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b3201ad5 .index-entry index-entry="application performance:issues, detecting"} [ and make the UI feel unresponsive. ]{#kobo.84.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Understanding when and why components re-render is crucial for building fast React applications. ]{#kobo.85.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ React DevTools is the best way to understand how our application renders and identify components that might be causing slowdowns. ]{#kobo.86.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s a browser extension created by the React team that gives us insight into what React is doing behind the scenes. ]{#kobo.87.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The ]{#kobo.88.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ React DevTools Profiler ]{#kobo.89.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ tab lets us record a session and see exactly which components rendered, how long each render took, and what triggered the render. ]{#kobo.90.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To use it, we open the ]{#kobo.91.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Profiler ]{#kobo.92.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ tab, click the record button, interact with our application, and then stop recording. ]{#kobo.93.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The profiler shows us a flame graph of renders, where wider bars indicate longer render times. ]{#kobo.94.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The profiler output looks like this: ]{#kobo.95.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.96.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_8_1.png" data-original-image-title="" style="width:528.0px; height:329.4588913099862px;">Figure 8.1 – Profiler output</span> </span>
</figure>

[ Figure 8.1 -- Profiler output ]{#kobo.97.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When looking at the profiler output, we can see which components are rendered, how much time rendering took, and how many times they ]{#kobo.98.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_883402ff .index-entry index-entry="application performance:issues, detecting"} [ rendered. ]{#kobo.99.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We should focus on three things: ]{#kobo.100.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Components that render frequently ]{#kobo.101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - If a component re-renders too often, it might be doing unnecessary work ]{#kobo.102.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Components with long render times ]{#kobo.103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - These are the most impactful to optimize since they block the UI for longer ]{#kobo.104.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Cascading renders ]{#kobo.105.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - When one component update causes many child components to re-render, we might have a state management issue ]{#kobo.106.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The key insight is that not all re-renders are bad. ]{#kobo.107.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React is designed to re-render efficiently. ]{#kobo.108.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We should only optimize when we see actual performance problems. ]{#kobo.109.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Premature optimization can make code harder to understand without providing real benefits. ]{#kobo.110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Optimizing components ]{#kobo.111.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_218 .heading-1}

[ Since React is all about components, we need to ]{#kobo.112.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e87fcc4c .index-entry index-entry="application performance:components, optimizing"} [ have the right approach when it comes to building and composing them together for optimal performance. ]{#kobo.113.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The way we structure our components ]{#kobo.114.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5d33c58c .index-entry index-entry="component optimization"} [ directly impacts how often they re-render and how much work React must do. ]{#kobo.115.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here are some important techniques for optimizing components for best performance: ]{#kobo.116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Colocate state ]{#kobo.117.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Memoize expensive calculations ]{#kobo.118.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Use component composition ]{#kobo.119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s take a look at a practical example of how to apply these techniques. ]{#kobo.120.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Colocating state ]{#kobo.121.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_219 .heading-2}

**[ State colocation ]{#kobo.122.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ means keeping state as close ]{#kobo.123.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_4544c220 .index-entry index-entry="component optimization:state, colocating"} [ as possible to where it\'s used. ]{#kobo.124.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If only one component needs a piece of state, that state should live in that component, not in a parent. ]{#kobo.125.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is one of the most impactful performance optimizations because it directly controls which components re-render. ]{#kobo.126.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Consider a dashboard that has a user profile section and an ideas list. ]{#kobo.127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here\'s a common mistake where all state lives in one component: ]{#kobo.128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
function Dashboard() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [ideas, setIdeas] = useState([
    { id: 1, title: 'Smart City Noise Monitoring' },
    { id: 2, title: 'AI-Powered Personal Assistant' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIdeas = ideas.filter(idea => 
    idea.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <h2>Profile</h2>
        <input 
          value={user.name}
          onChange={e => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
        />
        <input 
          value={user.email}
          onChange={e => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
      </div>

      <div>
        <h2>My Ideas</h2>
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search ideas..."
        />
        {filteredIdeas.map(idea => (
          <div key={idea.id}>{idea.title}</div>
        ))}
      </div>
    </div>
  );
}
```

[ What\'s wrong with this? ]{#kobo.269.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ Every time we type in the profile name field, the entire component re-renders, including the ideas list. ]{#kobo.269.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we search ]{#kobo.270.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9cc5030b .index-entry index-entry="component optimization:state, colocating"} [ for ideas, the profile inputs re-render too. ]{#kobo.271.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Everything affects everything because all state lives in one place. ]{#kobo.272.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can fix this by splitting into focused components where each piece of state lives in the component that uses it. ]{#kobo.273.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Look how each component manages its own state: ]{#kobo.274.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
function UserProfile() {
  const [user, setUser] = useState({ name: '', email: '' });

  return (
    <div>
      <h2>Profile</h2>
      <input 
        value={user.name}
        onChange={e => setUser({ ...user, name: e.target.value })}
        placeholder="Name"
      />
      <input 
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
    </div>
  );
}

function IdeasList() {
  const [ideas] = useState([
    { id: 1, title: 'Smart City Noise Monitoring' },
    { id: 2, title: 'AI-Powered Personal Assistant' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIdeas = ideas.filter(idea => 
    idea.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>My Ideas</h2>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search ideas..."
      />
      {filteredIdeas.map(idea => (
        <div key={idea.id}>{idea.title}</div>
      ))}
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <UserProfile />
      <IdeasList />
    </div>
  );
}
```

[ Now state is properly colocated. ]{#kobo.435.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s break down what ]{#kobo.436.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_15b1ebd0 .index-entry index-entry="component optimization:state, colocating"} [ changed: ]{#kobo.437.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.codeHighlighted}[` user `{.codeHighlighted}]{#kobo.438.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ state lives in ]{#kobo.439.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` UserProfile `{.codeHighlighted}]{#kobo.440.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Only the profile section needs this data, so it owns the state ]{#kobo.441.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` ideas `{.codeHighlighted}]{#kobo.442.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.443.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` searchTerm `{.codeHighlighted}]{#kobo.444.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ live in ]{#kobo.445.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` IdeasList `{.codeHighlighted}]{#kobo.446.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - The ideas section manages its own data and search functionality ]{#kobo.447.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` Dashboard `{.codeHighlighted}]{#kobo.448.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ has no state - It\'s purely a composition component that arranges the layout ]{#kobo.449.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The result? ]{#kobo.450.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ When we type in the search box, only ]{#kobo.450.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` IdeasList `{.codeHighlighted}]{#kobo.451.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ re-renders. ]{#kobo.452.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When we edit our profile, only ]{#kobo.453.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` UserProfile `{.codeHighlighted}]{#kobo.454.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ re-renders. ]{#kobo.455.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The parent ]{#kobo.456.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Dashboard `{.codeHighlighted}]{#kobo.457.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ never re-renders because it has no state. ]{#kobo.458.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ State colocation directly prevents unnecessary re-renders ]{#kobo.459.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_86e44b8b .index-entry index-entry="component optimization:state, colocating"} [ by keeping components isolated from each other\'s changes. ]{#kobo.460.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Memoizing expensive calculations ]{#kobo.461.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_220 .heading-2}

[ With our state properly colocated, our components are optimized for most scenarios. ]{#kobo.462.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But what if a component performs an expensive ]{#kobo.463.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_185282ea .index-entry index-entry="component optimization:expensive calculations, memoizing"} [ calculation that doesn\'t need to run on every render? ]{#kobo.464.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s say our ideas list needs to calculate statistics about the filtered results, and we also want to let users toggle between list and grid views: ]{#kobo.465.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
function IdeasList() {
  const [ideas] = useState([
    { id: 1, title: 'Smart City Noise Monitoring' },
    { id: 2, title: 'AI-Powered Personal Assistant' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredIdeas = ideas.filter(idea => 
    idea.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = calculateIdeaStatistics(filteredIdeas);

  return (
    <div>
      <h2>My Ideas</h2>
      <div>
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search ideas..."
        />
        <button onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
          {viewMode === 'list' ? 'Grid View' : 'List View'}
        </button>
      </div>
      
      <div>
        <p>Total: {stats.total}</p>
        <p>Average length: {stats.averageLength}</p>
      </div>

      <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : ''}>
        {filteredIdeas.map(idea => (
          <div key={idea.id}>{idea.title}</div>
        ))}
      </div>
    </div>
  );
}
```

[ The problem here is that ]{#kobo.624.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` calculateIdeaStatistics `{.codeHighlighted}]{#kobo.625.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ runs on every render, even when it doesn\'t need to. ]{#kobo.626.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the user toggles the view mode, the ]{#kobo.627.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ae6a62ed .index-entry index-entry="component optimization:expensive calculations, memoizing"} [ component re-renders, but the filtered ideas haven\'t changed, so recalculating the statistics is wasted work. ]{#kobo.628.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can fix this by memoizing the expensive calculation with ]{#kobo.629.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useMemo `{.codeHighlighted}]{#kobo.630.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : ]{#kobo.631.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
function IdeasList() {
  const [ideas] = useState([
    { id: 1, title: 'Smart City Noise Monitoring' },
    { id: 2, title: 'AI-Powered Personal Assistant' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredIdeas = useMemo(() => {
    return ideas.filter(idea => 
      idea.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [ideas, searchTerm]);

  const stats = useMemo(() => {
    return calculateIdeaStatistics(filteredIdeas);
  }, [filteredIdeas]);

  // ...
}
```

[ Now when the user toggles the view mode, React sees that ]{#kobo.702.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ideas `{.codeHighlighted}]{#kobo.703.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.704.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` searchTerm `{.codeHighlighted}]{#kobo.705.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ haven\'t changed, so it skips the filtering and returns the cached ]{#kobo.706.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` filteredIdeas `{.codeHighlighted}]{#kobo.707.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.708.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Similarly, since ]{#kobo.709.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` filteredIdeas `{.codeHighlighted}]{#kobo.710.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ is the same reference, the expensive ]{#kobo.711.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` calculateIdeaStatistics `{.codeHighlighted}]{#kobo.712.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ calculation is skipped too. ]{#kobo.713.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

::: note
[ We should not memoize everything. ]{#kobo.714.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} ` `{.codeHighlighted}[` useMemo `{.codeHighlighted}]{#kobo.715.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ has overhead, so we should only use it for calculations that are actually expensive. ]{#kobo.716.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To make this decision, we need to determine if we have another piece of state in our component that is irrelevant to the expensive calculation. ]{#kobo.717.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In the context of our example, the viewMode causes re-renders without affecting the memoized value of ]{#kobo.718.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` stats `{.codeHighlighted}]{#kobo.719.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.720.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can use the React DevTools Profiler to identify which calculations are causing slow re-renders before reaching for ]{#kobo.721.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useMemo `{.codeHighlighted}]{#kobo.722.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.723.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
:::

## [ Using component composition ]{#kobo.724.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_221 .heading-2}

**[ Component composition ]{#kobo.725.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ allows us to build ]{#kobo.726.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b7d72948 .index-entry index-entry="component optimization:component composition, using"} [ complex UIs from simple, reusable ]{#kobo.727.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_8dbed5c5 .index-entry index-entry="component composition"} [ pieces while maintaining excellent performance characteristics. ]{#kobo.728.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When done correctly, composition gives us automatic optimization through stable prop references. ]{#kobo.729.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s say we want to add a visual indicator when the user profile section is focused. ]{#kobo.730.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A common approach is to add focus tracking directly to the component: ]{#kobo.731.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
function UserProfile() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
      style={{ border: isFocused ? '2px dashed blue' : 'none' }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <h2>Profile</h2>
      <input 
        value={user.name}
        onChange={e => setUser({ ...user, name: e.target.value })}
        placeholder="Name"
      />
      <input 
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
    </div>
  );
}
```

[ The problem with this approach is that focus changes re-render the entire profile form, and form input changes re-render the focus ]{#kobo.812.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_cbdc1bfe .index-entry index-entry="component optimization:component composition, using"} [ handling logic. ]{#kobo.813.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ These are unrelated concerns that ]{#kobo.814.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f98d511f .index-entry index-entry="component composition"} [ shouldn\'t affect each other. ]{#kobo.815.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can use composition to separate these concerns: ]{#kobo.816.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
function FocusTracker({ children }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
      style={{ border: isFocused ? '2px dashed blue' : 'none' }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {children}
    </div>
  );
}

function UserProfile() {
  const [user, setUser] = useState({ name: '', email: '' });

  return (
    <div>
      <h2>Profile</h2>
      <input 
        value={user.name}
        onChange={e => setUser({ ...user, name: e.target.value })}
        placeholder="Name"
      />
      <input 
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <FocusTracker>
        <UserProfile />
      </FocusTracker>
      <IdeasList />
    </div>
  );
}
```

[ Now, when we focus on a section, only ]{#kobo.940.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` FocusTracker `{.codeHighlighted}]{#kobo.941.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ re-renders to update its border style. ]{#kobo.942.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Since the ]{#kobo.943.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` UserProfile `{.codeHighlighted}]{#kobo.944.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component ]{#kobo.945.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_638bb199 .index-entry index-entry="component optimization:component composition, using"} [ manages its own state independently, focus changes in the ]{#kobo.946.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` FocusTracker `{.codeHighlighted}]{#kobo.947.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component don\'t trigger re-renders in ]{#kobo.948.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` UserProfile `{.codeHighlighted}]{#kobo.949.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ because the two ]{#kobo.950.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_6db1c205 .index-entry index-entry="component composition"} [ components are isolated from each other\'s state updates. ]{#kobo.951.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This composition pattern gives us two optimization benefits: ]{#kobo.952.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- **[ Props optimization ]{#kobo.953.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - The ]{#kobo.954.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` children `{.codeHighlighted}]{#kobo.955.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ prop is created once in the parent and passed down. ]{#kobo.956.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Even though ]{#kobo.957.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` FocusTracker `{.codeHighlighted}]{#kobo.958.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ re-renders when focus changes, React doesn\'t re-render the children because the prop reference is stable. ]{#kobo.959.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- **[ Rendering optimization ]{#kobo.960.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ - Each component only re-renders when its own state changes. ]{#kobo.961.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Focus updates are isolated to ]{#kobo.962.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` FocusTracker `{.codeHighlighted}]{#kobo.963.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and form changes are isolated to ]{#kobo.964.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` UserProfile `{.codeHighlighted}]{#kobo.965.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.966.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When components are properly structured with colocated state, memoized calculations, and thoughtful composition, they naturally re-render less often. ]{#kobo.967.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is why good component architecture is a great step towards optimizing the application performance. ]{#kobo.968.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ These were some basic React optimizations. ]{#kobo.969.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Now let\'s look at some more advanced techniques that go beyond React for optimizing different aspects of our application. ]{#kobo.970.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Code splitting and lazy loading ]{#kobo.971.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_222 .heading-2}

[ When users visit our application for the first time, the browser downloads all the JavaScript code before the page becomes interactive. ]{#kobo.972.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For large applications, this can be several megabytes of code. ]{#kobo.973.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But here\'s the thing: users might not need all the features of the application, so why make them download code they\'ll never use? ]{#kobo.974.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

**[ Code splitting ]{#kobo.975.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ allows us to ]{#kobo.976.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_eb6a4f8e .index-entry index-entry="component optimization:code splitting"} [ break our JavaScript bundle into smaller chunks that load on demand. ]{#kobo.977.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of downloading all the code upfront, users only download what they need. ]{#kobo.978.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is especially valuable for ]{#kobo.979.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_892ac8bb .index-entry index-entry="code splitting"} [ large applications, where users might never visit certain pages. ]{#kobo.980.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We should at least code split at the route level, so that the code for each page is loaded only when the user navigates to it. ]{#kobo.981.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The good news is that React ]{#kobo.982.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b9be8238 .index-entry index-entry="component optimization:lazy loading"} [ Router in framework mode automatically code-splits routes. ]{#kobo.983.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ However, we should still consider code splitting and lazy loading heavy components within the pages, like complex charts, editors, or features that many users won\'t use. ]{#kobo.984.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ React provides the ]{#kobo.985.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` lazy `{.codeHighlighted}]{#kobo.986.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ function for loading components on demand. ]{#kobo.987.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here\'s a simple example: ]{#kobo.988.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('@/components/heavy-component'));

function Ideas() {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);

  return (
    <div>
      <button onClick={() => setShowHeavyComponent(true)}>View Heavy Component</button>
      <Suspense fallback={<div>Loading...</div>}>
{showHeavyComponent&&<HeavyComponent />}
      </Suspense>
    </div>
  );
}
```

[ The ]{#kobo.1060.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` lazy `{.codeHighlighted}]{#kobo.1061.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ function takes a function that returns a dynamic import. ]{#kobo.1062.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the component is first rendered, React will load the JavaScript file containing ]{#kobo.1063.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` HeavyComponent `{.codeHighlighted}]{#kobo.1064.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.1065.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.1066.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Suspense `{.codeHighlighted}]{#kobo.1067.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component shows a fallback while the code is loading. ]{#kobo.1068.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Note that we should only code split and lazy load ]{#kobo.1069.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5b1efd4f .index-entry index-entry="component optimization:lazy loading"} [ components that are actually heavy, since we don\'t want to make additional chunk requests ]{#kobo.1070.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_7b898687 .index-entry index-entry="component optimization:code splitting"} [ without a significant benefit. ]{#kobo.1071.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To understand the size of the chunks, we can use the analyzer plugin for Vite. ]{#kobo.1072.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To get the report, we can run the ]{#kobo.1073.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` analyze `{.codeHighlighted}]{#kobo.1074.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ command and then open the report in the browser. ]{#kobo.1075.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run analyze
```

[ This will open a report in the browser. ]{#kobo.1077.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1078.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_8_2.png" data-original-image-title="" style="width:528.0px; height:289.7389572707798px;">Figure 8.2 – Bundle analyzer report</span> </span>
</figure>

[ Figure 8.2 -- Bundle analyzer report ]{#kobo.1079.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Here we can explore which parts of the application are heavy and should be code split and lazy loaded. ]{#kobo.1080.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Streaming content from the server ]{#kobo.1081.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_223 .heading-1}

**[ Server-side rendering (SSR) ]{#kobo.1082.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ improves ]{#kobo.1083.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_92e9ef56 .index-entry index-entry="server-side rendering (SSR)"} [ initial page load by rendering HTML on the server. ]{#kobo.1084.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ However, traditional SSR typically has a limitation: the server must wait for all data before sending anything to the browser. ]{#kobo.1085.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If one API call is slow, the entire page is delayed. ]{#kobo.1086.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This creates a frustrating experience. ]{#kobo.1087.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Imagine a ]{#kobo.1088.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_19162b26 .index-entry index-entry="content:streaming, from server"} [ page that shows an idea and its reviews. ]{#kobo.1089.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The idea data loads in 100 ms, but the reviews take 2 seconds. ]{#kobo.1090.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ With traditional SSR, users wait 2 seconds to see anything, even ]{#kobo.1091.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_822d125a .index-entry index-entry="application performance:content, streaming from server"} [ though the idea was ready almost immediately. ]{#kobo.1092.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The solution is to stream the content as it arrives. ]{#kobo.1093.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Fast content appears immediately, while slower content loads progressively in the background. ]{#kobo.1094.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s implement streaming for the idea detail page. ]{#kobo.1095.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The idea data loads first because users need to see it immediately. ]{#kobo.1096.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Reviews can load afterward since they are less critical for the user to see. ]{#kobo.1097.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/ideas/idea.tsx

export async function loader({ params }: Route.LoaderArgs) {
  const idea = await getIdeaById(params.id);
  const reviewsPromise = getReviewsByIdea(params.id);
  
  return routerData({
    idea,
    reviewsPromise,
  });
}
```

[ Notice the difference in how we handle the two pieces of data. ]{#kobo.1121.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We ]{#kobo.1122.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` await `{.codeHighlighted}]{#kobo.1123.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ the idea, which means the server waits for it before sending anything. ]{#kobo.1124.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But we don\'t ]{#kobo.1125.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` await `{.codeHighlighted}]{#kobo.1126.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ the reviews; we pass the promise directly to the component. ]{#kobo.1127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.1128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` reviewsPromise `{.codeHighlighted}]{#kobo.1129.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ is sent to the component as an unresolved promise. ]{#kobo.1130.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React\'s streaming renderer detects the pending promise through the Suspense boundary and starts sending the available HTML to the browser immediately, without ]{#kobo.1131.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1655fc3c .index-entry index-entry="application performance:content, streaming from server"} [ waiting for the reviews to resolve. ]{#kobo.1132.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In the component, we use React\'s ]{#kobo.1133.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Suspense `{.codeHighlighted}]{#kobo.1134.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to handle the loading state for the reviews: ]{#kobo.1135.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
export default function IdeaDetailPage({
  params,
  loaderData,
}: Route.ComponentProps) {
  const ideaId = params.id as string;

  const ideaQuery = useIdeaByIdQuery({
    id: ideaId,
    options: {
      ...(loaderData?.idea && { initialData: loaderData.idea }),
    },
  });
  const idea = ideaQuery?.data ?? loaderData?.idea;

  return (
    <div className="container mx-auto px-4 py-8">
      <Seo
        title={`${idea?.title || 'Idea'} | AIdeas`}
        description={idea?.shortDescription || 'View idea details'}
      />
      <div className="max-w-4xl mx-auto">
        <IdeaDetails idea={idea} />
        <Suspense fallback={<ReviewsSkeleton />}>
          <IdeaReviews
            idea={idea}
            reviewsPromise={loaderData.reviewsPromise}
          />
        </Suspense>
      </div>
    </div>
  );
}
```

[ The ]{#kobo.1244.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Suspense `{.codeHighlighted}]{#kobo.1245.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component wraps the reviews section. ]{#kobo.1246.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ While the reviews promise is still pending, React shows the ]{#kobo.1247.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ReviewsSkeleton `{.codeHighlighted}]{#kobo.1248.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ fallback. ]{#kobo.1249.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the data arrives, the skeleton is seamlessly replaced with the actual reviews. ]{#kobo.1250.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ But how does the ]{#kobo.1251.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` IdeaReviews `{.codeHighlighted}]{#kobo.1252.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component access the data from the promise? ]{#kobo.1253.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ React provides the ]{#kobo.1253.2 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` use `{.codeHighlighted}]{#kobo.1254.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook for exactly this purpose: ]{#kobo.1255.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
function IdeaReviews({
  idea,
  reviewsPromise,
}: {
  idea: Idea;
  reviewsPromise: Promise<ReviewListResponse>;
}) {
  const reviewsData = use(reviewsPromise);
  
  // Now we can use reviewsData to render the reviews
  // ...
}
```

[ The ]{#kobo.1279.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` use `{.codeHighlighted}]{#kobo.1280.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook from React unwraps the promise. ]{#kobo.1281.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the promise resolves, React re-renders the component with the data. ]{#kobo.1282.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If the promise is still pending, ]{#kobo.1283.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` use `{.codeHighlighted}]{#kobo.1284.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ suspends the component, which is why we need the ]{#kobo.1285.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Suspense `{.codeHighlighted}]{#kobo.1286.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ wrapper above. ]{#kobo.1287.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It\'s worth noting that the use hook is available from React 19. ]{#kobo.1288.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Alternatively, we can use the ]{#kobo.1289.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` Await `{.codeHighlighted}]{#kobo.1290.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ component from React ]{#kobo.1291.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_954055eb .index-entry index-entry="application performance:content, streaming from server"} [ Router to unwrap the promise in a similar way: ]{#kobo.1292.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
import { Await } from "react-router";

function IdeaReviews({
  idea,
  reviewsPromise,
}: {
  idea: Idea;
  reviewsPromise: Promise<ReviewListResponse>;
}) {
  return (
    <Await promise={reviewsPromise}>
      {({ data }) => (
        // Use data to render the reviews
      )}
    </Await>
  );
}
```

[ With streaming SSR, the idea details appear immediately while a skeleton shows where reviews will appear. ]{#kobo.1330.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the reviews finish loading, they seamlessly replace the skeleton. ]{#kobo.1331.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This makes the page feel faster because users can start reading the idea while reviews load in the background. ]{#kobo.1332.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Debouncing user input ]{#kobo.1333.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_224 .heading-1}

[ When users type in a search input, each ]{#kobo.1334.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_01862532 .index-entry index-entry="user input:debouncing"} [ keystroke can trigger a new API request. ]{#kobo.1335.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If someone searches for education-related ideas and types \" ]{#kobo.1336.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Education ]{#kobo.1337.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ \" quickly, that\'s nine characters and most likely nine separate ]{#kobo.1338.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f3cc3de5 .index-entry index-entry="application performance:user input, debouncing"} [ network requests. ]{#kobo.1339.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Most of these requests are wasted because the user hasn\'t finished typing yet. ]{#kobo.1340.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can see this problem in action from the network tab in the browser. ]{#kobo.1341.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1342.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_8_3.png" data-original-image-title="" style="width:528.0px; height:277.92244657880644px;">Figure 8.3 – Network requests while typing without debouncing</span> </span>
</figure>

[ Figure 8.3 -- Network requests while typing without debouncing ]{#kobo.1343.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ As we can see, there are 9 network requests being made while the user is typing. ]{#kobo.1344.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This wastes bandwidth, puts unnecessary load on the server, and can cause race conditions where responses arrive out of order. ]{#kobo.1345.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Imagine if the response for \"Edu\" arrives after the ]{#kobo.1346.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_896597e8 .index-entry index-entry="user input:debouncing"} [ response for \"Education\"; the UI would show the wrong results, which is a bad user experience. ]{#kobo.1347.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Debouncing solves this by waiting for a pause in user input before making the request. ]{#kobo.1348.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of firing on every keystroke, we wait until the user ]{#kobo.1349.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f69edbc9 .index-entry index-entry="application performance:user input, debouncing"} [ stops typing for a specified duration (usually 300--500 ms), then make a single request with the final value. ]{#kobo.1350.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ To debounce the input, let\'s start by creating a reusable ]{#kobo.1351.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useDebouncedValue `{.codeHighlighted}]{#kobo.1352.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook: ]{#kobo.1353.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/hooks/use-debounced-value.ts
import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

[ The hook accepts any value and a delay in milliseconds. ]{#kobo.1392.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here\'s how it works: when the value changes, it starts a timer. ]{#kobo.1393.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If the value changes again before the timer completes, the timer resets. ]{#kobo.1394.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Only when the value stays stable for the full delay does the debounced value update. ]{#kobo.1395.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s use this hook in our search and filters hook: ]{#kobo.1396.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/hooks/use-search-and-filters.ts

export function useSearchAndFilters(debounceMs: number = 500) {
  const [urlSearchTerm, setUrlSearchTerm] = useQueryState(
    'search',
    parseAsString.withDefault(''),
  );

  const debouncedSearchTerm = useDebouncedValue(urlSearchTerm, debounceMs);

  return {
    searchTerm: urlSearchTerm,
    debouncedSearchTerm,
    params: {
      ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
      // ...other params
    },
    setSearchTerm: setUrlSearchTerm,
    // ...other actions
  };
}
```

[ We\'re returning two different values here, and this is important. ]{#kobo.1436.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.1437.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` searchTerm `{.codeHighlighted}]{#kobo.1438.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ updates immediately when users type, keeping the input field responsive; users see their characters appear instantly. ]{#kobo.1439.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.1440.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` debouncedSearchTerm `{.codeHighlighted}]{#kobo.1441.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ only updates after the user pauses, and we use this debounced value in our ]{#kobo.1442.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` params `{.codeHighlighted}]{#kobo.1443.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ object for API requests. ]{#kobo.1444.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ In the component, the search input binds directly to ]{#kobo.1445.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` searchTerm `{.codeHighlighted}]{#kobo.1446.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : ]{#kobo.1447.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/components/idea-search-and-filters.tsx

export function IdeaSearchAndFilters() {
  const {
    searchTerm,
    setSearchTerm,
    // ...
  } = useSearchAndFilters();

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
      {/* ... */}
    </div>
  );
}
```

[ The input shows what users type ]{#kobo.1504.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_8ccf07a7 .index-entry index-entry="user input:debouncing"} [ instantly, but the ]{#kobo.1505.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` params `{.codeHighlighted}]{#kobo.1506.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ object used by the query only updates after the ]{#kobo.1507.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e0b22512 .index-entry index-entry="application performance:user input, debouncing"} [ user stops typing for 500 ms: ]{#kobo.1508.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/ideas/ideas.tsx

function Ideas() {
  const { params } = useSearchAndFilters();

  const ideasInfiniteQuery = useIdeasInfiniteQuery({
    params: params as GetAllIdeasData['query'],
  });

  // ...
}
```

[ After implementing debouncing, we can see the difference in the network tab. ]{#kobo.1530.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1531.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_8_4.png" data-original-image-title="" style="width:528.0px; height:256.98029201666617px;">Figure 8.4 – Network requests while typing with debouncing</span> </span>
</figure>

[ Figure 8.4 -- Network requests while typing with debouncing ]{#kobo.1532.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ As we can see, there is only one network request being ]{#kobo.1533.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_8e32fca0 .index-entry index-entry="application performance:user input, debouncing"} [ made after the user stops typing for 500 ms. ]{#kobo.1534.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Debouncing is one of the simplest ]{#kobo.1535.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ae09f080 .index-entry index-entry="user input:debouncing"} [ optimizations we can make, but the impact is significant. ]{#kobo.1536.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This reduces API calls from nine to one per search, improving both client performance and server load. ]{#kobo.1537.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Large data set optimization ]{#kobo.1538.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_225 .heading-1}

[ When dealing with large data sets, performance can become a bottleneck for both the server and the client. ]{#kobo.1539.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The server must process potentially ]{#kobo.1540.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1861e24d .index-entry index-entry="application performance:large data set optimization"} [ thousands of records, increasing response time and bandwidth usage. ]{#kobo.1541.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The client must render all those records, which can be slow and memory-intensive, especially on ]{#kobo.1542.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ee044c55 .index-entry index-entry="large data set optimization"} [ mobile and lower-end devices. ]{#kobo.1543.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can address these challenges with two techniques: pagination, which reduces the amount of data transferred, and virtualization, which reduces the number of list items rendered on the page. ]{#kobo.1544.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Pagination ]{#kobo.1545.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_226 .heading-2}

[ Instead of returning all ideas at once, we ]{#kobo.1546.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e800e032 .index-entry index-entry="large data set optimization:pagination"} [ can implement infinite pagination to fetch a set of ideas, then fetch more ideas as the user scrolls or clicks a \" ]{#kobo.1547.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Load More ]{#kobo.1548.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ \" button. ]{#kobo.1549.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This way, users start with a small, fast-loading ]{#kobo.1550.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_a8296f0c .index-entry index-entry="infinite pagination"} [ set of data and can load more when they need it. ]{#kobo.1551.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1552.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_8_5.png" data-original-image-title="" style="width:528.0px; height:447.27321072457346px;">Figure 8.5 – Infinite pagination</span> </span>
</figure>

[ Figure 8.5 -- Infinite pagination ]{#kobo.1553.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ React Query provides the ]{#kobo.1554.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useInfiniteQuery `{.codeHighlighted}]{#kobo.1555.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook ]{#kobo.1556.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9f34ec4b .index-entry index-entry="large data set optimization:pagination"} [ specifically for this pattern. ]{#kobo.1557.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It manages ]{#kobo.1558.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_1eb67eeb .index-entry index-entry="infinite pagination"} [ multiple pages of data and knows when there are more pages available. ]{#kobo.1559.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s update our ideas API to support infinite loading. ]{#kobo.1560.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/api/get-ideas.ts

export async function getIdeas(
  params?: GetAllIdeasData['query'],
): Promise<GetAllIdeasResponse> {
  const validatedData = zGetAllIdeasData.parse({ query: params });

  const response = await api.get<GetAllIdeasResponse>('/ideas', {
    params: { ...validatedData.query, limit: 10 },
  });

  return zGetAllIdeasResponse.parse(response);
}

export function getIdeasInfiniteQueryOptions(
  params?: GetAllIdeasData['query'],
) {
  return infiniteQueryOptions({
    queryKey: ideasQueryKeys.list(params),
    queryFn: ({ pageParam }) =>
      getIdeas({ ...params, page: pageParam.toString() }),
    getNextPageParam: ({ pagination }) => pagination.nextPage,
    initialPageParam: 1,
  });
}

export function useIdeasInfiniteQuery({
  params,
  options,
}: {
  params?: GetAllIdeasData['query'];
  options?: Omit<
    ReturnType<typeof getIdeasInfiniteQueryOptions>,
    'queryKey' | 'queryFn'
  >;
}) {
  return useInfiniteQuery({
    ...getIdeasInfiniteQueryOptions(params),
    ...options,
  });
}
```

[ Let\'s break down the key parts: ]{#kobo.1674.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.codeHighlighted}[` limit: 10 `{.codeHighlighted}]{#kobo.1675.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ -- We request only 10 ]{#kobo.1676.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_821ae1ac .index-entry index-entry="large data set optimization:pagination"} [ ideas per page instead of all ideas at once. ]{#kobo.1677.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This keeps each request fast and the response small. ]{#kobo.1678.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` getNextPageParam `{.codeHighlighted}]{#kobo.1679.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ -- The function extracts the next page number from the API response. ]{#kobo.1680.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React Query uses this to know when there are more pages to load. ]{#kobo.1681.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If it returns ]{#kobo.1682.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` undefined `{.codeHighlighted}]{#kobo.1683.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , there are no more pages. ]{#kobo.1684.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` initialPageParam: 1 `{.codeHighlighted}]{#kobo.1685.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - The first page to load when the query runs. ]{#kobo.1686.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s use this in the ideas page: ]{#kobo.1687.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/ideas/ideas.tsx

export async function loader({ request }: Route.LoaderArgs) {
  // ...

  await Promise.all([
    queryClient.prefetchInfiniteQuery(
      getIdeasInfiniteQueryOptions(ideasParams),
    ),
    queryClient.prefetchQuery(getTagsQueryOptions()),
  ]);

  return routerData({
    dehydratedState: dehydrate(queryClient),
  });
}

function Ideas() {
  const { params } = useSearchAndFilters();

  const ideasInfiniteQuery = useIdeasInfiniteQuery({
    params: params as GetAllIdeasData['query'],
  });

  const allIdeas =
    ideasInfiniteQuery.data?.pages.flatMap((page) => page.data) || [];

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
        isLoading={ideasInfiniteQuery.isLoading && allIdeas.length === 0}
        emptyMessage="No ideas available yet"
        error={ideasInfiniteQuery.error}
      />

      {allIdeas.length > 0 && ideasInfiniteQuery.hasNextPage && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => ideasInfiniteQuery.fetchNextPage()}
            disabled={ideasInfiniteQuery.isFetchingNextPage}
          >
            {ideasInfiniteQuery.isFetchingNextPage
              ? 'Loading more ideas...'
              : 'Load more ideas'}
          </Button>
        </div>
      )}
    </div>
  );
}
```

[ The ]{#kobo.1850.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` pages `{.codeHighlighted}]{#kobo.1851.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ array contains all the pages we\'ve loaded so far. ]{#kobo.1852.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each page has its own ]{#kobo.1853.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` data `{.codeHighlighted}]{#kobo.1854.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ array of ideas. ]{#kobo.1855.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We use ]{#kobo.1856.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` flatMap `{.codeHighlighted}]{#kobo.1857.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to combine all the ideas from all pages into a single array that we can pass to our list component. ]{#kobo.1858.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ When the user clicks \"Load more ideas\", ]{#kobo.1859.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` fetchNextPage `{.codeHighlighted}]{#kobo.1860.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ loads the next page and adds it to the ]{#kobo.1861.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` pages `{.codeHighlighted}]{#kobo.1862.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ array. ]{#kobo.1863.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React Query handles all the caching and state management for us. ]{#kobo.1864.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.1865.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` hasNextPage `{.codeHighlighted}]{#kobo.1866.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ boolean tells us whether there are more pages to load, so we ]{#kobo.1867.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0391b037 .index-entry index-entry="large data set optimization:pagination"} [ can hide the button when we\'ve reached the end. ]{#kobo.1868.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Pagination improves server performance and initial load time, but as users load more pages, we can end up with hundreds of items in the DOM. ]{#kobo.1869.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s explore how we can optimize this. ]{#kobo.1870.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ List virtualization ]{#kobo.1871.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_227 .heading-1}

[ Even with pagination, users might load 10, 20, or ]{#kobo.1872.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_692a644e .index-entry index-entry="application performance:list virtualization"} [ 50 pages of data. ]{#kobo.1873.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If each page has 10 items, that\'s 500 DOM elements, each with its own event listeners, layout calculations, and memory usage. ]{#kobo.1874.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ On slower devices, this can make the page feel sluggish. ]{#kobo.1875.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This can be demonstrated by inspecting the DOM in the browser. ]{#kobo.1876.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1877.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_8_6.png" data-original-image-title="" style="width:528.0px; height:477.80899274834997px;">Figure 8.6 – DOM inspection</span> </span>
</figure>

[ Figure 8.6 -- DOM inspection ]{#kobo.1878.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ As we can see, there are more DOM elements being rendered than the user can see at a time. ]{#kobo.1879.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This can be a performance bottleneck, especially on ]{#kobo.1880.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_35c0142f .index-entry index-entry="application performance:list virtualization"} [ slower devices. ]{#kobo.1881.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is where list virtualization comes in. ]{#kobo.1882.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ List virtualization is a technique that only renders items currently visible in the viewport. ]{#kobo.1883.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of creating DOM elements for all 500 items in a list, we might only render the 10 that are visible, plus a few extra for smooth scrolling. ]{#kobo.1884.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ As the user scrolls, items are mounted and unmounted as they enter and leave the viewport. ]{#kobo.1885.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.1886.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_8_7.png" data-original-image-title="" style="width:384.38582677165357px; height:544.0px;">Figure 8.7 – List virtualization</span> </span>
</figure>

[ Figure 8.7 -- List virtualization ]{#kobo.1887.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll use the ]{#kobo.1888.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` @tanstack/react-virtual `{.codeHighlighted}]{#kobo.1889.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ library to implement this. ]{#kobo.1890.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The library handles all the complex scroll math and element positioning ]{#kobo.1891.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_972b0f8b .index-entry index-entry="application performance:list virtualization"} [ for us. ]{#kobo.1892.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here\'s a virtualized version of our ideas list: ]{#kobo.1893.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/ideas/components/virtualized-ideas-list.tsx

import { useWindowVirtualizer } from '@tanstack/react-virtual';

export function VirtualizedIdeasList({
  ideas,
  isLoading,
  emptyMessage,
  error,
}: VirtualizedIdeasListProps) {
  const virtualizer = useWindowVirtualizer({
    count: ideas?.length || 0,
    estimateSize: () => 150,
    overscan: 5,
  });

  // ...

  return (
    <Card>
      <CardContent className="p-0">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const idea = ideas[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <div className="px-6 border-b border-border last:border-b-0">
                  <IdeaListItem idea={idea} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
```

[ The ]{#kobo.2037.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` useWindowVirtualizer `{.codeHighlighted}]{#kobo.2038.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ hook takes three key options: ]{#kobo.2039.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.codeHighlighted}[` count `{.codeHighlighted}]{#kobo.2040.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - The total number ]{#kobo.2041.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_8d24b5a9 .index-entry index-entry="application performance:list virtualization"} [ of items in the list. ]{#kobo.2042.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The virtualizer needs to know this to calculate the total scroll height. ]{#kobo.2043.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` estimateSize `{.codeHighlighted}]{#kobo.2044.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - A function that returns the estimated height of each item. ]{#kobo.2045.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This doesn\'t need to be exact, as the virtualizer will measure actual sizes as items render. ]{#kobo.2046.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A good estimate just helps with initial layout and prevents layout shifts and jumpy scrolling during initial renders. ]{#kobo.2047.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` overscan `{.codeHighlighted}]{#kobo.2048.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - How many items to render outside the visible area. ]{#kobo.2049.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A higher value makes scrolling smoother (items are ready before they become visible) but renders more items. ]{#kobo.2050.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ 5 is a good starting point. ]{#kobo.2051.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The virtualizer gives us several methods that make the magic happen: ]{#kobo.2052.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.codeHighlighted}[` getTotalSize() `{.codeHighlighted}]{#kobo.2053.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Returns the total height needed to contain all items. ]{#kobo.2054.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We use this for the container height so the scrollbar is the right size. ]{#kobo.2055.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` getVirtualItems() `{.codeHighlighted}]{#kobo.2056.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Returns only the items that should be rendered right now. ]{#kobo.2057.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is the key to virtualization, instead of mapping over all 500 ideas, we only map over the 15-20 that are visible. ]{#kobo.2058.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` measureElement `{.codeHighlighted}]{#kobo.2059.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Measure each item\'s actual size with a ref callback. ]{#kobo.2060.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is important because item heights might vary. ]{#kobo.2061.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Since virtualization is a client-side optimization that depends on scroll position, we need to use the regular list during server-side rendering because the server doesn\'t know what\'s visible in the viewport or what the scroll position is. ]{#kobo.2062.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can conditionally use the virtualized list on the client after hydration: ]{#kobo.2063.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/app/routes/ideas/ideas.tsx

function Ideas() {
  // ...

  const isClient = useIsClient();

  const ListComponent = isClient ? VirtualizedIdeasList : IdeasList;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... */}

      <ListComponent
        ideas={allIdeas}
        isLoading={ideasInfiniteQuery.isLoading && allIdeas.length === 0}
        emptyMessage="No ideas available yet"
        error={ideasInfiniteQuery.error}
      />

      {/* ... */}
    </div>
  );
}
```

[ We can verify virtualization is working ]{#kobo.2115.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0e12751a .index-entry index-entry="application performance:list virtualization"} [ by inspecting the DOM. ]{#kobo.2116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Even with hundreds of ideas loaded, only a small number of DOM elements exist. ]{#kobo.2117.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.2118.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_8_8.png" data-original-image-title="" style="width:528.0px; height:424.4591482416533px;">Figure 8.8 – List virtualization DOM</span> </span>
</figure>

[ Figure 8.8 -- List virtualization DOM ]{#kobo.2119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ As we can see, only the items visible in the viewport are rendered. ]{#kobo.2120.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The rest are created as the user scrolls, keeping the DOM lean ]{#kobo.2121.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c730aa97 .index-entry index-entry="application performance:list virtualization"} [ regardless of how many items are in the list. ]{#kobo.2122.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Optimistic updates ]{#kobo.2123.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_228 .heading-1}

[ When a user submits a form, they typically have to wait for the server to respond before seeing their changes. ]{#kobo.2124.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This round trip can take some time ]{#kobo.2125.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_995c67e5 .index-entry index-entry="application performance:optimistic updates"} [ depending on the network conditions and the server response time, potentially making the application feel slow. ]{#kobo.2126.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Think about posting a review: we click submit, see a loading spinner, wait for the server, and finally see our review appear. ]{#kobo.2127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It works, but it sometimes feels sluggish. ]{#kobo.2128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Optimistic updates solve this by immediately showing the expected result before the server confirms it. ]{#kobo.2129.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When a user submits a review, we show it right away as if it already succeeded. ]{#kobo.2130.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ In most cases, the server confirms the action moments later, and the user never notices the difference. ]{#kobo.2131.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The application feels instant. ]{#kobo.2132.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The approach has three parts: ]{#kobo.2133.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Update immediately - When the user submits, update the UI as if the request succeeded ]{#kobo.2134.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Handle errors - If the request fails, roll back to the previous state and show an error ]{#kobo.2135.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Sync with server - When the request succeeds, replace optimistic data with real server data ]{#kobo.2136.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s implement optimistic updates for creating reviews. ]{#kobo.2137.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ First, we handle the optimistic update in ]{#kobo.2138.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` onMutate `{.codeHighlighted}]{#kobo.2139.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.2140.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This callback runs before the request is sent to the server: ]{#kobo.2141.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
// src/features/reviews/api/create-review.ts

export function useCreateReviewMutation({
  options,
  onSuccess,
  onError,
  ideaId,
}: {
  options?: Omit<
    UseMutationOptions<CreateReviewResponse, Error, CreateReviewData['body']>,
    'mutationFn'
  >;
  onSuccess: () => void;
  onError: () => void;
  ideaId: string;
}) {
  const queryClient = useQueryClient();
  const user = useUser();
  
  return useMutation({
    ...getCreateReviewMutationOptions(),
    ...options,
    onMutate: async (newReview) => {
      // Cancel any outgoing refetches to prevent them from overwriting our optimistic update
      await queryClient.cancelQueries({
        queryKey: reviewsQueryKeys.byIdea(ideaId),
      });
      await queryClient.cancelQueries({
        queryKey: reviewsQueryKeys.current(),
      });

      // Snapshot the previous values
      const previousReviewsByIdea =
        queryClient.getQueryData<GetReviewsByIdeaResponse>(
          reviewsQueryKeys.byIdea(ideaId),
        );
      const previousCurrentReviews =
        queryClient.getQueryData<GetReviewsByIdeaResponse>(
          reviewsQueryKeys.current(),
        );

      // Optimistically update the cache with the new review
      if (user) {
        const optimisticReview: Review = {
          id: `temp-${Date.now()}`,
          content: newReview.content,
          rating: newReview.rating,
          authorId: user.id,
          author: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
          ideaId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        queryClient.setQueryData<GetReviewsByIdeaResponse>(
          reviewsQueryKeys.byIdea(ideaId),
          (old) => ({
            data: old?.data
              ? [optimisticReview, ...old.data]
              : [optimisticReview],
          }),
        );

        queryClient.setQueryData<GetReviewsByIdeaResponse>(
          reviewsQueryKeys.current(),
          (old) => ({
            data: old?.data
              ? [optimisticReview, ...old.data]
              : [optimisticReview],
          }),
        );
      }

      // Return context with the previous values for rolling back if the request fails
      return { previousReviewsByIdea, previousCurrentReviews };
    },
    // ...
  });
}
```

[ Let\'s break down what\'s ]{#kobo.2298.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_eb60517a .index-entry index-entry="application performance:optimistic updates"} [ happening here. ]{#kobo.2299.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The ]{#kobo.2300.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` onMutate `{.codeHighlighted}]{#kobo.2301.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ callback runs before the mutation starts, giving us a chance to update the UI immediately: ]{#kobo.2302.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Cancel in-flight queries - Cancel any queries that might be fetching reviews. ]{#kobo.2303.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If we don\'t do this, a pending refetch that happens after our optimistic update could overwrite it with stale data, causing the UI to briefly revert. ]{#kobo.2304.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Snapshot previous values - Save the current cache data so we can restore it if the request fails. ]{#kobo.2305.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This is our rollback plan. ]{#kobo.2306.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Create optimistic review - Build a review object that looks like what the server will return. ]{#kobo.2307.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Use a temporary ID because we don\'t know the real ID yet. ]{#kobo.2308.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Update the cache - Add ]{#kobo.2309.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e87dcaee .index-entry index-entry="application performance:optimistic updates"} [ the optimistic review to the cache. ]{#kobo.2310.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ React Query will immediately re-render any components that use this data. ]{#kobo.2311.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Return context - Return the previous values so we can access them in ]{#kobo.2312.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` onError `{.codeHighlighted}]{#kobo.2313.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ if we need to roll back. ]{#kobo.2314.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Next, we handle errors and success: ]{#kobo.2315.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
export function useCreateReviewMutation({
  // ...
}) {
  const queryClient = useQueryClient();
  const user = useUser();
  
  return useMutation({
    // ...
    onError: (_err, _newReview, context) => {
      // Rollback to the previous values on error
      if (context?.previousReviewsByIdea) {
        queryClient.setQueryData(
          reviewsQueryKeys.byIdea(ideaId),
          context.previousReviewsByIdea,
        );
      }
      if (context?.previousCurrentReviews) {
        queryClient.setQueryData(
          reviewsQueryKeys.current(),
          context.previousCurrentReviews,
        );
      }
      onError();
    },
    onSuccess: () => {
      // Refetch to get the server data with the real ID
      queryClient.invalidateQueries({
        queryKey: reviewsQueryKeys.byIdea(ideaId),
      });
      queryClient.invalidateQueries({
        queryKey: reviewsQueryKeys.current(),
      });
      onSuccess();
    },
  });
}
```

[ If the request fails, we restore the previous cache data from the context we returned in ]{#kobo.2379.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` onMutate `{.codeHighlighted}]{#kobo.2380.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.2381.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The optimistic review disappears, and we call ]{#kobo.2382.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` onError `{.codeHighlighted}]{#kobo.2383.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ so the component can show an error message. ]{#kobo.2384.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ If the request succeeds, we invalidate the queries to refetch from the server. ]{#kobo.2385.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This replaces our optimistic review (with its temporary ID) with the real review from the server. ]{#kobo.2386.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The user won\'t notice this swap because refetching happens in the background and the review stays in place, but now it has the correct ID and any server-side modifications. ]{#kobo.2387.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The user experience is much better ]{#kobo.2388.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_09c2f5a1 .index-entry index-entry="application performance:optimistic updates"} [ now. ]{#kobo.2389.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ They see their review appear immediately when they submit. ]{#kobo.2390.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If something goes wrong, the review disappears and they see an error message. ]{#kobo.2391.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Most of the time, the server confirms the action, and users don\'t even notice the background refetch that swaps in the real data. ]{#kobo.2392.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Summary ]{#kobo.2393.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_229 .heading-1}

[ In this chapter, we explored several techniques for making our React application faster and more responsive. ]{#kobo.2394.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We learned how to use React DevTools to identify performance issues and then addressed those issues with targeted optimizations. ]{#kobo.2395.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We started with state management best practices: collocating state and keeping components focused. ]{#kobo.2396.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When state lives close to where it\'s used, fewer components re-render when it changes. ]{#kobo.2397.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We then looked at code splitting and lazy loading to reduce initial bundle sizes. ]{#kobo.2398.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ By loading code on demand, users only download what they need for the current page. ]{#kobo.2399.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Streaming slow content during SSR allowed us to show content progressively instead of waiting for all data. ]{#kobo.2400.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Fast content appears immediately, while slower content loads in the background. ]{#kobo.2401.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Debouncing reduced unnecessary API calls when users type in search fields. ]{#kobo.2402.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of 9 requests for typing \"Education,\" we make just 1 request after the user pauses. ]{#kobo.2403.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For large data sets, we combined pagination with list virtualization. ]{#kobo.2404.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Pagination keeps API responses small and fast. ]{#kobo.2405.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Virtualization keeps the DOM lean by rendering only visible items, no matter how many items the user has loaded. ]{#kobo.2406.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Finally, optimistic updates made mutations feel instant by showing changes before server confirmation. ]{#kobo.2407.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The UI updates immediately, and we sync with the server in the background. ]{#kobo.2408.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ These techniques complement each other. ]{#kobo.2409.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A well-optimized application uses the right tool for each situation: debouncing for user input, pagination for large lists, streaming for slow data, and optimistic updates for mutations. ]{#kobo.2410.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The goal is always the same: make the application feel instant and responsive to users. ]{#kobo.2411.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Get this book\'s PDF copy, code bundle, and more ]{#kobo.2412.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_230 .heading-1}

[ Scan the QR code (or go to ]{#kobo.2413.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.2414.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ ). ]{#kobo.2415.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search for this book by name, confirm the edition, and then follow the steps on the page. ]{#kobo.2416.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_8_9.png" original-image-title="" style="width:25%;"} ]{#kobo.2417.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_8_10.png" original-image-title="" style="width:25%;"} ]{#kobo.2418.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[ Note: Have your invoice handy. ]{#kobo.2419.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Purchases made directly from the Packt website don ]{#kobo.2420.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ \' ]{#kobo.2421.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ t require an invoice. ]{#kobo.2422.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}*
::::
