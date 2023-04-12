<div align="center">  
  <h1>Movies App [BE]</h1>
  
# :video_game: View Demo</a> 
###  :link: <a href="https://github.com/RavenPl/movies-app-front.git"> Frontend repository</a> 
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
- [Bugs](#hammer_and_wrench-project-status)

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
 <li>JWT</li>
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

- search for movies, series or games :heavy_check_mark:
- adding them to your favourite list :heavy_check_mark:
- removing from the bookmark list :heavy_check_mark:
- create your own account :heavy_check_mark:
- delete your account :heavy_check_mark:

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
 git clone https://github.com/RavenPl/movies-app-back.git
```  

Go to the project directory

```bash  
 cd movies-app-back 
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
 CREATE TABLE IF NOT EXISTS `movies` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `movieId` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isFavourite` int(1) NOT NULL DEFAULT 0,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_movies_users` (`userId`),
  CONSTRAINT `FK_movies_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currentTokenId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
 ```
 3. You can test the app using test user:
 
 ```
 - email: test@test.com
 - password: 12345678
 ```
 
<br/>

# :deciduous_tree: Lessons Learned

<p> :ballot_box_with_check: created authentication system using JWT
<p> :ballot_box_with_check: putting together JavaScript, Typescript, mysql2 into one, working application</p>
<p> :ballot_box_with_check: creating and running few test using Jest</p>
<p> :ballot_box_with_check: adding basic security middlewares: express-rate-limit and helmet</p>
<p> :ballot_box_with_check: fixing CORS problem</p>
<p> :ballot_box_with_check: using one to many relation in real project and solving problems which come with it 

<br/>

# :hammer_and_wrench: Bugs
  
1. cant remove bookmark on bookmarks page 
2. routes logic needs improvement
