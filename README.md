<div align="center">  
  <h1>Movies App [BE] - v3</h1>
  
# :video_game: View Demo</a> 
###  :link: Frontend repository</a> 
</div>  
<!-- Table of Contents -->  

<br/>
<br/>

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
    * [Tech Stack](#space_invader-tech-stack)
    * [Features](#dart-features)
    * [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
    * [Prerequisites](#heavy_exclamation_mark-prerequisites)
    * [Run Locally](#running-run-locally)
- [Usage](#eyes-usage)
- [Project Status](#hammer_and_wrench-project-status)

<br/>

# :star2: About the Project

* you can search your favourties movies or games
* it allows you to bookmark it and never forget
* you can register and have your own account

<br/>

# :space_invader: Tech Stack

<details>  
  <summary>Server</summary>  
  <ul>  
    <li>Express.js</li>  
    <li>TypeScript</li>
  </ul>  
</details>  
<details>  
<summary>Security</summary>  
<ul>  
<li>Helmet</li> 
<li>Express Rate Limit</li>
</ul>  
</details>  
<details>  
<summary>Database</summary>  
  <ul>  
    <li>MySQL</li>  
  </ul>  
</details>  

## Technology used

<p align="left">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> &nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> &nbsp;&nbsp;&nbsp;
<img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" alt="react" width="40" height="40"/> &nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> &nbsp; &nbsp;&nbsp;&nbsp;
<img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/>&nbsp;&nbsp;&nbsp;
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/express/express.png" alt="express js" height="40"/> &nbsp; &nbsp;&nbsp;&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> &nbsp; &nbsp;&nbsp;
<img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/>&nbsp;&nbsp;&nbsp;
<img src="https://www.vectorlogo.zone/logos/npmjs/npmjs-ar21.svg" alt="npm" width="40" height="40"/>&nbsp;&nbsp;&nbsp;
</p>

<br/>
<!-- Features -->  

# :dart: Features

- adding a new book to the list :heavy_check_mark:
- editing existing ones :heavy_check_mark:
- deleting specific one or all at once :heavy_check_mark:
- you can search your book by title or by author name :heavy_check_mark:
- you can list your positions by title, author, page number or by status :heavy_check_mark:

<br/>

# :toolbox: Getting Started

### :key: Environment Variables

In order to run this app you need to create config.ts and place it in config folder. File should contain following
fields with your correct data, for instance:

```json  
const config = {  
    dbHost: 'localhost',  
    dbUser: 'user',  
    dbDatabase: 'databaseName',
    dbPassword: "",
    corsOrigin: 'http://localhost:3000',  
}
```

<!-- Prerequisites -->  

### :heavy_exclamation_mark: Prerequisites

This project uses npm as package manager

```bash  
 npm install --global npm  
```  

<br/>

<!-- Run Locally -->  

# :running: Run Locally

Clone the project

```bash  
 git clone https://github.com/RavenPl/MyLibrary-v3-BE.git
```  

Go to the project directory

```bash  
 cd my-library-BE  
```  

Install dependencies

```bash  
 npm install  
```  

Start the server

```bash  
 npm start  
```  
<br/>
<!-- Usage -->  

# :eyes: Usage

1. Add your data into config file.
2. Create table in your database using this SQL:

 ```
 CREATE TABLE IF NOT EXISTS `books` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(5633) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pages` int(5) NOT NULL,
  `status` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'not read',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
 ```
 
<br/>

# :deciduous_tree: Lessons Learned

<p> :ballot_box_with_check: putting together JavaScript, Typescript, mysql2 into one, working application</p>
<p> :ballot_box_with_check: creating and running few test using Jest</p>
<p> :ballot_box_with_check: adding basic security middlewares: express-rate-limit and helmet</p>
<p> :ballot_box_with_check: fixing CORS problem</p>

<br/>

# :hammer_and_wrench: Project Status

