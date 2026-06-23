::: {.section .chapter-first}
# [ 12 ]{#kobo.1.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_287 .chapterNumber}

# [ Going to Production ]{#kobo.2.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_288 .chapterTitle}

[ Our application is finally ready to meet its first users. ]{#kobo.3.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'ve built all the features, set up linting, written unit and integration tests, and added end-to-end tests. ]{#kobo.4.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ All of that gives us confidence that the code works. ]{#kobo.5.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ But right now, every one of those checks has to be run manually on our local machine. ]{#kobo.6.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Every time we want to make a change to the application, we need to run all the scripts ourselves and then trigger the deployment manually. ]{#kobo.7.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ That\'s slow, error-prone, and honestly pretty tedious. ]{#kobo.8.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ What we really want is for all of this to happen automatically. ]{#kobo.9.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Every time we push code changes, a pipeline should run the checks, and if everything passes, deploy the new version without manual steps. ]{#kobo.10.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ That\'s exactly what CI/CD gives us. ]{#kobo.11.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We\'ll cover the following topics: ]{#kobo.12.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ What is CI/CD ]{#kobo.13.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Using GitHub Actions ]{#kobo.14.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Configuring the pipeline for continuous integration ]{#kobo.15.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Configuring the pipeline for continuous deployment ]{#kobo.16.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By the end of this chapter, we\'ll have a fully automated CI/CD pipeline that runs our checks on every push and deploys the application to Render whenever all checks pass. ]{#kobo.17.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Technical requirements ]{#kobo.18.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_289 .heading-1}

[ Before we get started, we need to set up our project. ]{#kobo.19.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To be able to develop our project, we\'ll need the following things installed on our computer: ]{#kobo.20.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Node.js version 24 or above. ]{#kobo.21.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ npm version 11 or above ships with Node. ]{#kobo.22.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can confirm that by executing ]{#kobo.23.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` node -v `{.codeHighlighted}]{#kobo.24.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.25.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` npm -v `{.codeHighlighted}]{#kobo.26.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ in the terminal. ]{#kobo.27.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There are multiple ways to install Node.js and npm. ]{#kobo.28.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here is a great article that goes into more detail: ]{#kobo.29.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js ]{#kobo.30.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js){style="text-decoration: none;"} [ . ]{#kobo.31.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ VS Code (optional) is a popular editor for JavaScript and TypeScript: open source, solid TypeScript support, and extensions. ]{#kobo.32.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It can be downloaded from ]{#kobo.33.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://code.visualstudio.com ]{#kobo.34.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://code.visualstudio.com){style="text-decoration: none;"} [ . ]{#kobo.35.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The code for this book is available at the book\'s repo. ]{#kobo.36.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ To access the repository link, follow the steps in the ]{#kobo.37.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ \" ]{#kobo.38.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ Download the example code files ]{#kobo.39.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ \" ]{#kobo.40.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ section in the ]{#kobo.41.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ Preface ]{#kobo.42.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ . ]{#kobo.43.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Clone it and enter the repository root: ]{#kobo.44.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

[ The repository contains chapter folders with the code for each chapter, plus a shared ]{#kobo.46.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` api `{.codeHighlighted}]{#kobo.47.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ folder with the API server used across all chapters. ]{#kobo.48.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We are in ]{#kobo.49.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ C ]{#kobo.50.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ hapter 12 ]{#kobo.51.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ so we need to navigate to the ]{#kobo.52.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` chapter- `{.codeHighlighted}]{#kobo.53.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} ` `{.codeHighlighted}[` 12 `{.codeHighlighted}]{#kobo.54.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ directory: ]{#kobo.55.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/chapter-12
```

[ Then we need to install dependencies: ]{#kobo.57.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm install
```

[ We also need to provide the environment variables: ]{#kobo.59.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cp .env.example .env
```

[ Now we should have the frontend ready running at ]{#kobo.61.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:5173 ]{#kobo.62.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:5173){style="text-decoration: none;"} [ . ]{#kobo.63.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We also need to have our API server running. ]{#kobo.64.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s open a new terminal window and navigate to the ]{#kobo.65.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` api `{.inlineCode}]{#kobo.66.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ directory: ]{#kobo.67.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
cd React-Application-Architecture-for-Production-Second-Edition/api
```

[ Now we need to run the setup script for ]{#kobo.69.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} *[ C ]{#kobo.70.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* *[ hapter 12 ]{#kobo.71.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}* [ to configure everything for us: ]{#kobo.72.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run setup 12
```

[ Then we need to run the API server: ]{#kobo.74.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-con}
npm run dev
```

[ We should see the API server running on ]{#kobo.76.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ http://localhost:9999 ]{#kobo.77.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](http://localhost:9999){style="text-decoration: none;"} [ . ]{#kobo.78.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For more information about the setup details, check out the ]{#kobo.79.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` README.md `{.codeHighlighted}]{#kobo.80.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file. ]{#kobo.81.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ What is CI/CD? ]{#kobo.82.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_290 .heading-1}

**[ Continuous integration/continuous deployment (CI/CD) ]{#kobo.83.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is the practice of delivering application changes to users ]{#kobo.84.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d0f0e243 .index-entry index-entry="continuous integration/continuous deployment (CI/CD)"} [ in an automated, reliable way. ]{#kobo.85.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of manually running checks and clicking deploy, the pipeline does it for us every single time. ]{#kobo.86.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The two parts each serve a different purpose: ]{#kobo.87.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- [ Continuous Integration (CI) is the automated process of verifying that code changes are correct before they get merged. ]{#kobo.88.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This means running builds, tests, and any other quality checks we care about. ]{#kobo.89.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- [ Continuous Deployment (CD) is the automated process of pushing those verified changes to a production server so users get the latest version without anyone having to manually trigger a release. ]{#kobo.90.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For our application, the process will look like this: ]{#kobo.91.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

1.  [ Run all code quality checks such as linting, type checking, and format checking ]{#kobo.92.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
2.  [ Run unit tests ]{#kobo.93.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
3.  [ Run integration tests ]{#kobo.94.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
4.  [ Run end-to-end tests ]{#kobo.95.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
5.  [ If all of the above pass on the main branch, deploy the application to production ]{#kobo.96.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The following diagram shows how all of these steps fit together. ]{#kobo.97.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.98.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_12_1.png" data-original-image-title="" style="width:528.0px; height:266.2814092621316px;">Figure 12.1 – Pipeline overview</span> </span>
</figure>

[ Figure 12.1 -- Pipeline overview ]{#kobo.99.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This kind ]{#kobo.100.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_cd466d2c .index-entry index-entry="continuous integration/continuous deployment (CI/CD)"} [ of setup really pays off as a team grows. ]{#kobo.101.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of relying on each developer to remember to run checks and deploy correctly, the pipeline handles it consistently every time code is pushed. ]{#kobo.102.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now that we understand what CI/CD is, let\'s look at the tool we\'ll use to build our pipeline. ]{#kobo.103.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Using GitHub Actions ]{#kobo.104.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_291 .heading-1}

[ For automating ]{#kobo.105.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5a840be2 .index-entry index-entry="GitHub Actions:using"} [ our CI/CD pipeline, we will use ]{#kobo.106.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ GitHub Actions ]{#kobo.107.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ , a platform built directly into GitHub. ]{#kobo.108.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We define automated workflows that run in response to things that happen in our repository, like a push or a pull request, and GitHub takes care of running them. ]{#kobo.109.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There is no external CI server to set up or maintain. ]{#kobo.110.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Before we write our first workflow, let\'s get familiar with the key concepts so we can understand the terminology used in GitHub Actions. ]{#kobo.111.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Workflows ]{#kobo.112.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_292 .heading-2}

[ A ]{#kobo.113.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ workflow ]{#kobo.114.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is an ]{#kobo.115.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_349699a1 .index-entry index-entry="GitHub Actions:workflow"} [ automated process made up of one or more jobs. ]{#kobo.116.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We define workflows as YAML files inside the ]{#kobo.117.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` .github/workflows `{.codeHighlighted}]{#kobo.118.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ folder of our repository. ]{#kobo.119.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A workflow runs whenever a specific event fires such as a push or a pull request. ]{#kobo.120.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can also trigger one manually from the GitHub UI using the ]{#kobo.121.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` workflow_dispatch `{.codeHighlighted}]{#kobo.122.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ event. ]{#kobo.123.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ A repository can have as many workflows as we need. ]{#kobo.124.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Events ]{#kobo.125.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_293 .heading-2}

[ An ]{#kobo.126.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ event ]{#kobo.127.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is what kicks ]{#kobo.128.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_97621dbf .index-entry index-entry="GitHub Actions:event"} [ off a workflow. ]{#kobo.129.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It could be something like pushing code to the repository, opening a pull request, or even a scheduled time. ]{#kobo.130.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Events can also be triggered externally via an HTTP request, which is useful for more advanced setups. ]{#kobo.131.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Jobs ]{#kobo.132.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_294 .heading-2}

[ A ]{#kobo.133.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ job ]{#kobo.134.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is a set ]{#kobo.135.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_0f17b817 .index-entry index-entry="GitHub Actions:job"} [ of steps that run together as part of a workflow. ]{#kobo.136.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Each step is either a shell command we write or a pre-built action. ]{#kobo.137.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ By default, all jobs in a workflow run in parallel, though we can configure a job to wait for another to finish first. ]{#kobo.138.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Steps ]{#kobo.139.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_295 .heading-2}

[ A ]{#kobo.140.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ step ]{#kobo.141.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is a single ]{#kobo.142.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_8d7384e5 .index-entry index-entry="GitHub Actions:step"} [ unit of work within a job, either a shell command we write or an action from the marketplace. ]{#kobo.143.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Steps within a job always run sequentially, and each step shares the same environment as the ones before it. ]{#kobo.144.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Actions ]{#kobo.145.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_296 .heading-2}

[ An ]{#kobo.146.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ action ]{#kobo.147.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is a reusable ]{#kobo.148.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_2692b031 .index-entry index-entry="GitHub Actions:action"} [ piece of work that handles a common task. ]{#kobo.149.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The GitHub Actions Marketplace ( ]{#kobo.150.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://github.com/marketplace?type=actions ]{#kobo.151.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://github.com/marketplace?type=actions){style="text-decoration: none;"} [ ) has many pre-built actions. ]{#kobo.152.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Think of them like npm packages, but for CI pipelines. ]{#kobo.153.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'ll use a few of them, like actions for checking out code, setting up Node.js, and deploying to a platform like Render. ]{#kobo.154.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Runners ]{#kobo.155.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_297 .heading-2}

[ A ]{#kobo.156.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ runner ]{#kobo.157.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ is the server ]{#kobo.158.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_c8f82a37 .index-entry index-entry="GitHub Actions:runner"} [ that actually executes a workflow when it\'s triggered. ]{#kobo.159.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ GitHub provides hosted runners on Ubuntu, macOS, and Windows. ]{#kobo.160.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If we need something more custom, we can also set up our own self-hosted runners. ]{#kobo.161.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now that we are familiar with the building blocks, let\'s put them together and build the CI/CD pipeline. ]{#kobo.162.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s start with the CI pipeline. ]{#kobo.163.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Configuring the pipeline for continuous integration ]{#kobo.164.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_298 .heading-1}

[ Our CI pipeline ]{#kobo.165.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e9d5918f .index-entry index-entry="continuous integration (CI) pipeline:configuring"} [ will have four jobs running in parallel: ]{#kobo.166.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ code quality ]{#kobo.167.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** **[ checks, unit tests ]{#kobo.168.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ , ]{#kobo.169.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ integration tests ]{#kobo.170.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ , and ]{#kobo.171.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ end-to-end tests ]{#kobo.172.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ . ]{#kobo.173.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Running them in parallel means we get results faster since there\'s no waiting for one job to finish before the next one starts. ]{#kobo.174.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Let\'s create the ]{#kobo.175.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` .github/workflows/ci.yml `{.codeHighlighted}]{#kobo.176.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file and start with the top-level workflow definition: ]{#kobo.177.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
# .github/workflows/ci.yml

name: Continuous Integration
on:
  - push
  - pull_request
jobs:
  # We will define the jobs here
```

[ Let\'s break down what we\'ve defined here: ]{#kobo.189.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.codeHighlighted}[` name `{.codeHighlighted}]{#kobo.190.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - The display name of the workflow shown in the GitHub Actions UI ]{#kobo.191.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` on `{.codeHighlighted}]{#kobo.192.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - The events that trigger this workflow. ]{#kobo.193.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We\'re listening to push and pull_request, so the pipeline runs whenever code is pushed to any branch or a pull request is opened ]{#kobo.194.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` jobs `{.codeHighlighted}]{#kobo.195.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - The container where all our jobs will live ]{#kobo.196.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s add the first job, which handles code quality checks: ]{#kobo.197.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
# .github/workflows/ci.yml

# ...
jobs:
  code-checks:
    name: Code Checks
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./chapter-12
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run format:check
```

[ Let\'s break ]{#kobo.240.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5790eb3b .index-entry index-entry="continuous integration (CI) pipeline:configuring"} [ down how this job works: ]{#kobo.241.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.codeHighlighted}[` runs-on: ubuntu-latest `{.codeHighlighted}]{#kobo.242.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Runs this job on the latest Ubuntu runner, which is the standard choice for Node.js projects ]{#kobo.243.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` defaults.run.working-directory `{.codeHighlighted}]{#kobo.244.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Sets the working directory for all run steps to ]{#kobo.245.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ./chapter-12 `{.codeHighlighted}]{#kobo.246.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.247.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Our repository holds multiple chapters, so we need to make sure the commands run against the right folder. ]{#kobo.248.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` actions/checkout@v6 `{.codeHighlighted}]{#kobo.249.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Uses a GitHub action from the marketplace that checks out our repository code onto the runner so the following steps can actually access it. ]{#kobo.250.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` actions/setup-node@v6 `{.codeHighlighted}]{#kobo.251.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Uses a GitHub action from the marketplace that installs Node.js version 24 on the runner ]{#kobo.252.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` npm ci `{.codeHighlighted}]{#kobo.253.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Installs dependencies from ]{#kobo.254.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` package-lock.json `{.codeHighlighted}]{#kobo.255.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ exactly as it is without updating anything, making it faster and producing a clean, reproducible install, which is exactly what we want in CI. ]{#kobo.256.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` npm run lint `{.codeHighlighted}]{#kobo.257.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.258.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` npm run typecheck `{.codeHighlighted}]{#kobo.259.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ , ]{#kobo.260.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` npm run format:check `{.codeHighlighted}]{#kobo.261.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Runs each quality check in sequence. ]{#kobo.262.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If any one of them fails, the job stops and the whole pipeline is marked as failed. ]{#kobo.263.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now let\'s add the unit tests job: ]{#kobo.264.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
# .github/workflows/ci.yml

# ...
jobs:
  # ...
  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./chapter-12
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
      - run: npm ci
      - run: cp .env.example .env
      - run: npm run test:unit
```

[ This follows the same pattern as before, with one small addition: we copy ]{#kobo.303.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` .env.example `{.codeHighlighted}]{#kobo.304.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ to ]{#kobo.305.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` .env `{.codeHighlighted}]{#kobo.306.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ before running the tests. ]{#kobo.307.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Our application needs environment variables to run, and ]{#kobo.308.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` .env.example `{.codeHighlighted}]{#kobo.309.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ has all the required keys with safe placeholder values that work in CI. ]{#kobo.310.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Next, the integration tests job: ]{#kobo.311.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
# .github/workflows/ci.yml

# ...
jobs:
  # ...
  integration-tests:
    name: Integration Tests
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./chapter-12
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: cp .env.example .env
      - run: npm run test:integration
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report-integration
          path: chapter-12/playwright-report/
          retention-days: 30
```

[ Because our ]{#kobo.368.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_6fb12eba .index-entry index-entry="continuous integration (CI) pipeline:configuring"} [ integration tests use Playwright, we need to install its browsers with ]{#kobo.369.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` npx playwright install --with-deps `{.codeHighlighted}]{#kobo.370.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ before running the tests. ]{#kobo.371.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The last step is interesting; it uploads the Playwright HTML report as a downloadable artifact, but only when the job fails ( ]{#kobo.372.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` if: failure() `{.codeHighlighted}]{#kobo.373.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ ). ]{#kobo.374.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ There\'s no point uploading it on every successful run, but when something breaks, having the report available makes debugging much easier. ]{#kobo.375.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ GitHub keeps it for 30 days before cleaning it up automatically. ]{#kobo.376.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ And finally, the end-to-end tests job: ]{#kobo.377.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
# .github/workflows/ci.yml

# ...
jobs:
  # ...
  e2e-tests:
    name: E2E Tests
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./chapter-12
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: cp .env.example .env
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report-e2e
          path: chapter-12/playwright-report/
          retention-days: 30
```

[ This is almost identical to the integration tests job. ]{#kobo.434.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The differences are the test command ( ]{#kobo.435.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` npm run test:e2e `{.codeHighlighted}]{#kobo.436.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ ) and the artifact name ( ]{#kobo.437.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` playwright-report-e2e `{.codeHighlighted}]{#kobo.438.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ ). ]{#kobo.439.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Keeping the names separate means we can tell at a glance whether a failure came from integration tests or end-to-end tests. ]{#kobo.440.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Once we commit the ]{#kobo.441.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ci.yml `{.codeHighlighted}]{#kobo.442.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ file and push it, GitHub picks it up automatically and starts running the pipeline. ]{#kobo.443.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We can watch all four jobs running in the Actions tab: ]{#kobo.444.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.445.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_12_2.png" data-original-image-title="" style="width:528.0px; height:269.8498664458417px;">Figure 12.2 – Continuous Integration pipeline</span> </span>
</figure>

[ Figure 12.2 -- Continuous Integration pipeline ]{#kobo.446.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ All four ]{#kobo.447.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f0f61bb3 .index-entry index-entry="continuous integration (CI) pipeline:configuring"} [ jobs run at the same time. ]{#kobo.448.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The pipeline is marked as successful only when every job passes. ]{#kobo.449.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ If any one of them fails, GitHub notifies us so we can fix it before it reaches production. ]{#kobo.450.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With CI sorted, let\'s move on to the deployment side. ]{#kobo.451.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Configuring the pipeline for continuous deployment ]{#kobo.452.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_299 .heading-1}

[ There are many different options for deploying a React Router application such as serverless platforms (Vercel, Netlify, and Cloudflare Pages), long-lived server platforms (Fly.io, Render, Railway) or self-hosted solutions on a VPS. ]{#kobo.453.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ For our application, we will use ]{#kobo.454.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.inlineCode}[` **Render** `{.inlineCode}]{#kobo.455.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.inlineCode} [ to deploy our application as it is simple to use and has a generous free tier. ]{#kobo.456.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Our deployment ]{#kobo.457.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_16c44c11 .index-entry index-entry="continuous deployment (CD) pipeline:configuring"} [ pipeline has a single job that triggers a deployment, but only after CI passes and only for pushes to the ]{#kobo.458.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` main `{.codeHighlighted}]{#kobo.459.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ branch. ]{#kobo.460.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We definitely don\'t want a deployment triggered every time someone pushes to a feature branch. ]{#kobo.461.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Creating the deployment workflow ]{#kobo.462.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_300 .heading-2}

[ Let\'s create ]{#kobo.463.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_19b43566 .index-entry index-entry="continuous deployment (CD) pipeline:workflow, creating"} [ a new file at ]{#kobo.464.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` .github/workflows/cd.yml `{.codeHighlighted}]{#kobo.465.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ : ]{#kobo.466.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

``` {.programlisting .snippet-code}
# .github/workflows/cd.yml

name: Continuous Deployment
run-name: ${{ github.event.workflow_run.head_commit.message }}
on:
  workflow_run:
    workflows: [Continuous Integration]
    branches: [main]
    types: [completed]
jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.event.workflow_run.conclusion == 'success' && github.event.workflow_run.event == 'push'
    env:
      RENDER_SERVICE_ID: ${{ secrets.RENDER_SERVICE_ID }}
      RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
    steps:
      - if: env.RENDER_SERVICE_ID != '' && env.RENDER_API_KEY != ''
        uses: JorgeLNJunior/render-deploy@v1.5.0
        with:
          service_id: ${{ secrets.RENDER_SERVICE_ID }}
          api_key: ${{ secrets.RENDER_API_KEY }}
          wait_deploy: true
```

[ Let\'s ]{#kobo.534.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_b0ffdab5 .index-entry index-entry="continuous deployment (CD) pipeline:workflow, creating"} [ break down the key parts: ]{#kobo.535.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

- ` `{.codeHighlighted}[` run-name `{.codeHighlighted}]{#kobo.536.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Sets the name of each workflow run to the commit message that triggered it. ]{#kobo.537.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This makes it easy to see at a glance what is being deployed without having to dig into the details. ]{#kobo.538.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` workflow_run `{.codeHighlighted}]{#kobo.539.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - This trigger fires whenever another named workflow completes. ]{#kobo.540.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Instead of triggering on a specific event, we\'re watching for Continuous Integration to finish on the ]{#kobo.541.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` main `{.codeHighlighted}]{#kobo.542.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ branch. ]{#kobo.543.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` if: conclusion == 'success' && event == 'push' `{.codeHighlighted}]{#kobo.544.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - This is the critical gate. ]{#kobo.545.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The deploy job only runs if CI finishes successfully, and only if it was triggered by a push. ]{#kobo.546.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` JorgeLNJunior/render-deploy@v1.5.0 `{.codeHighlighted}]{#kobo.547.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - A pre-built action that handles the Render deployment for us. ]{#kobo.548.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ It needs our service ID and API key, which we pass in as repository secrets so they never appear in the code. ]{#kobo.549.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
- ` `{.codeHighlighted}[` wait_deploy: true `{.codeHighlighted}]{#kobo.550.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ - Keeps the job running until Render finishes the deployment. ]{#kobo.551.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ This means the workflow accurately reflects whether the deployment actually succeeded rather than just that the request was sent. ]{#kobo.552.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Before this workflow can deploy anything, we need to create a service on Render and obtain the credentials it needs. ]{#kobo.553.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Setting up Render ]{#kobo.554.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_301 .heading-2}

[ To get ]{#kobo.555.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_d132d582 .index-entry index-entry="Render:setting up"} [ started, go ]{#kobo.556.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_15d850fb .index-entry index-entry="continuous deployment (CD) pipeline:Render, setting up"} [ to ]{#kobo.557.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ https://dashboard.render.com ]{#kobo.558.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://dashboard.render.com){style="text-decoration: none;"} [ and log ]{#kobo.559.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_9e1a12fe .index-entry index-entry="Render:reference link"} [ in to the Render dashboard. ]{#kobo.560.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Click ]{#kobo.561.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ New ]{#kobo.562.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ , and select ]{#kobo.563.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Web Service ]{#kobo.564.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ from the dropdown. ]{#kobo.565.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.566.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_12_3.png" data-original-image-title="" style="width:528.0px; height:236.33059606685896px;">Figure 12.3 – Creating a new service on Render</span> </span>
</figure>

[ Figure 12.3 -- Creating a new service on Render ]{#kobo.567.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ This takes ]{#kobo.568.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_be812076 .index-entry index-entry="Render:setting up"} [ us to a page where we connect Render to our GitHub repository. ]{#kobo.569.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We pick the ]{#kobo.570.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e1d5a497 .index-entry index-entry="continuous deployment (CD) pipeline:Render, setting up"} [ repository that holds our application code. ]{#kobo.571.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.572.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_12_4.png" data-original-image-title="" style="width:528.0px; height:252.82694835918994px;">Figure 12.4 – Connect the service to the repository</span> </span>
</figure>

[ Figure 12.4 -- Connect the service to the repository ]{#kobo.573.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Once the repository is connected, Render asks us to configure the service. ]{#kobo.574.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Here we set the service name, the branch to deploy from, the build command, and the start command. ]{#kobo.575.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.576.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_12_5.png" data-original-image-title="" style="width:528.0px; height:379.2404405878744px;">Figure 12.5 – Configure new service</span> </span>
</figure>

[ Figure 12.5 -- Configure new service ]{#kobo.577.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Scrolling ]{#kobo.578.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_e92a0140 .index-entry index-entry="continuous deployment (CD) pipeline:Render, setting up"} [ down, we can also choose the instance ]{#kobo.579.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_5f0b4881 .index-entry index-entry="Render:setting up"} [ type and add any environment variables the application needs at runtime. ]{#kobo.580.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.581.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_12_6.png" data-original-image-title="" style="width:528.0px; height:211.0011146905322px;">Figure 12.6 – Configure instance and environment</span> </span>
</figure>

[ Figure 12.6 -- Configure instance and environment ]{#kobo.582.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ By default, Render automatically deploys on every push to the configured branch. ]{#kobo.583.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We don\'t want that because we want GitHub Actions to be the only thing that triggers deployments. ]{#kobo.584.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Let\'s expand the ]{#kobo.585.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Advanced ]{#kobo.586.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ section and flip ]{#kobo.587.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Auto-Deploy ]{#kobo.588.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ to ]{#kobo.589.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Off ]{#kobo.590.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ to disable automatic deployments. ]{#kobo.591.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.592.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_12_7.png" data-original-image-title="" style="width:528.0px; height:437.27012991673314px;">Figure 12.7 – Disable automatic deployments</span> </span>
</figure>

[ Figure 12.7 -- Disable automatic deployments ]{#kobo.593.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ With that ]{#kobo.594.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_f60fbb99 .index-entry index-entry="continuous deployment (CD) pipeline:Render, setting up"} [ turned off, Render will sit and wait until ]{#kobo.595.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_ae5e334b .index-entry index-entry="Render:setting up"} [ our CD workflow tells it to deploy. ]{#kobo.596.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Getting the service ID and API key ]{#kobo.597.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_302 .heading-2}

[ Now we ]{#kobo.598.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_20e16b0e .index-entry index-entry="continuous deployment (CD) pipeline:service ID and API key"} [ need two things from Render: the service ID and an API key. ]{#kobo.599.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Our workflow will use these to authenticate with Render\'s API and start the deployment. ]{#kobo.600.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ The service ID is right there on the service\'s settings page. ]{#kobo.601.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.602.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_12_8.png" data-original-image-title="" style="width:528.0px; height:248.90760589803133px;">Figure 12.8 – Get the service ID</span> </span>
</figure>

[ Figure 12.8 -- Get the service ID ]{#kobo.603.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ For the API key, we head to ]{#kobo.604.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Account Settings ]{#kobo.605.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ and then to the ]{#kobo.606.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ API Keys ]{#kobo.607.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ section to create a new key. ]{#kobo.608.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.609.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_12_9.png" data-original-image-title="" style="width:528.0px; height:345.253281915076px;">Figure 12.9 – Get the API key</span> </span>
</figure>

[ Figure 12.9 -- Get the API key ]{#kobo.610.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Now we ]{#kobo.611.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_cb926239 .index-entry index-entry="continuous deployment (CD) pipeline:service ID and API key"} [ need to give our GitHub workflow access to these credentials. ]{#kobo.612.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Adding secrets to the repository ]{#kobo.613.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_303 .heading-2}

[ We provide ]{#kobo.614.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_56be4cbf .index-entry index-entry="continuous deployment (CD) pipeline:secrets, adding to repository"} [ these credentials to the GitHub workflow through repository secrets, which are encrypted values that workflows can read at runtime but never appear in our code or logs. ]{#kobo.615.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Go to the ]{#kobo.616.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Settings ]{#kobo.617.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ tab of the repository, navigate to ]{#kobo.618.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} **[ Secrets and Variables → Actions ]{#kobo.619.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}** [ , and add two secrets: ]{#kobo.620.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` RENDER_SERVICE_ID `{.codeHighlighted}]{#kobo.621.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.622.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` RENDER_API_KEY `{.codeHighlighted}]{#kobo.623.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.624.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.625.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_12_10.png" data-original-image-title="" style="width:528.0px; height:388.48305002079275px;">Figure 12.10 – Add the service ID and API key to the repository secrets</span> </span>
</figure>

[ Figure 12.10 -- Add the service ID and API key to the repository secrets ]{#kobo.626.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ These names match exactly what we referenced in ]{#kobo.627.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` cd.yml `{.codeHighlighted}]{#kobo.628.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ with ]{#kobo.629.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ${{ secrets.RENDER_SERVICE_ID }} `{.codeHighlighted}]{#kobo.630.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and ]{#kobo.631.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` ${{ secrets.RENDER_API_KEY }} `{.codeHighlighted}]{#kobo.632.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ . ]{#kobo.633.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ When the workflow runs, GitHub automatically injects the values. ]{#kobo.634.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

## [ Verifying the deployment ]{#kobo.635.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h2_304 .heading-2}

[ Let\'s push ]{#kobo.636.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_2db33d65 .index-entry index-entry="continuous deployment (CD) pipeline:verifying"} [ a new commit to ]{#kobo.637.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ` `{.codeHighlighted}[` main `{.codeHighlighted}]{#kobo.638.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}` `{.codeHighlighted} [ and see the whole thing in action. ]{#kobo.639.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ The CI pipeline runs first, and once it passes, the CD workflow kicks off automatically: ]{#kobo.640.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.641.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_12_11.png" data-original-image-title="" style="width:528.0px; height:223.87060160850046px;">Figure 12.11 – Continuous Deployment pipeline</span> </span>
</figure>

[ Figure 12.11 -- Continuous Deployment pipeline ]{#kobo.642.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We can watch the deployment progress in real time. ]{#kobo.643.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Over on the Render dashboard, we can see the new deployment has been triggered: ]{#kobo.644.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.645.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_12_12.png" data-original-image-title="" style="width:528.0px; height:327.35296618280387px;">Figure 12.12 – Deployment status on Render</span> </span>
</figure>

[ Figure 12.12 -- Deployment status on Render ]{#kobo.646.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ And once it finishes, our application is live. ]{#kobo.647.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

<figure class="mediaobject">
<span id="kobo.648.1" class="koboSpan" data-xmlns="http://www.w3.org/1999/xhtml"> <span class="image placeholder" data-original-image-src="images/B31385_12_13.png" data-original-image-title="" style="width:528.0px; height:256.1028208552033px;">Figure 12.13 – Live application</span> </span>
</figure>

[ Figure 12.13 -- Live application ]{#kobo.649.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ From now on, every ]{#kobo.650.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{#idx_38485502 .index-entry index-entry="continuous deployment (CD) pipeline:verifying"} [ push to main that passes CI will automatically result in a fresh deployment. ]{#kobo.651.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ No more running scripts by hand, no more manually triggering releases---the pipeline handles all of it. ]{#kobo.652.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Summary ]{#kobo.653.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_305 .heading-1}

[ In this chapter, we set up a complete CI/CD pipeline using GitHub Actions and Render. ]{#kobo.654.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ We started by understanding what CI/CD is and why it matters. ]{#kobo.655.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Rather than manually running checks and deploying every time, a pipeline does it reliably and consistently on every push. ]{#kobo.656.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We then went through the core concepts of GitHub Actions: workflows, events, jobs, actions, runners, and steps, which gave us the vocabulary to understand what we were building. ]{#kobo.657.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ From there, we created the CI workflow with four parallel jobs covering code quality checks, unit tests, integration tests, and end-to-end tests. ]{#kobo.658.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We set up Playwright report uploads that only fire on failure so we always have something to debug when things go wrong. ]{#kobo.659.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ Finally, we built the CD workflow that watches for CI to pass on main and automatically deploys to Render. ]{#kobo.660.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ We configured the Render service, turned off its built-in auto-deploy, and wired up the credentials through GitHub repository secrets. ]{#kobo.661.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

# [ Get this book\'s PDF copy, code bundle, and more ]{#kobo.662.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} {#h1_306 .heading-1}

[ Scan the QR code (or go to ]{#kobo.663.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [[ [ packtpub.com/unlock ]{#kobo.664.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} ]{.url}](https://packtpub.com/unlock){style="text-decoration: none;"} [ ). ]{#kobo.665.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Search for this book by name, confirm the edition, and then follow the steps on the page. ]{#kobo.666.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_12_14.png" original-image-title="" style="width:25%;"} ]{#kobo.667.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

[ [Image]{.image .placeholder original-image-src="images/B31385_12_15.png" original-image-title="" style="width:25%;"} ]{#kobo.668.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}

*[ Note: Have your invoice handy. ]{#kobo.669.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"} [ ]{.sentence-end} [ Purchases made directly from the Packt website don\'t require an invoice. ]{#kobo.670.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}*

[ ]{#kobo.671.1 .koboSpan xmlns="http://www.w3.org/1999/xhtml"}
:::
