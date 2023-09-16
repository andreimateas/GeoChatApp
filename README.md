<a name="readme-top"></a>


[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/andreimateas/GeoChatApp">
  </a>

<h1 align="center">GeoChat App</h1>

  <h3 align="center">
    Localized social media web application
    <br />
  </h3>
</div>

<br />

![alt text](AppOverview.png)

<br />

<!-- TABLE OF CONTENTS -->
<details open>
  <summary><b"><h3>Table of Contents</h3></b></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#description">Project description + Screenshots</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

### Project description + Screenshots

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React-badge]][React-url]
* [![JavaScript][JavaScript-badge]][JavaScript-url]
* [![CSS][CSS-badge]][CSS-url]
* [![HTML][HTML-badge]][HTML-url]
* [![Spring Boot][Spring-Boot-badge]][Spring-Boot-url]
* [![Java][Java-badge]][Java-url]
* [![Hibernate][Hibernate-badge]][Hibernate-url]
* [![MySQL][MySQL-badge]][MySQL-url]
* [![REST][REST-badge]][REST-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

#### Frontend

* npm
  ```sh
  npm install npm@latest -g
  ```

#### Backend

...

### Installation

#### Frontend

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/andreimateas/GeoChatApp.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Backend

...



<!-- USAGE EXAMPLES -->
## Usage

### Frontend

...


### Backend

...


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] MySQL Database and Spring Boot project creation
    - [x] Users, Feed Posts and Messages tables
- [x] Java Domain Model creation and object relational mapping using Hibernate
    - [x] User, Feed Post and Message entities
- [x] Spring Repository and Service development
    - [x] User, Feed Post and Message repositories
    - [x] Get user, get all users and add user methods
    - [x] Get feed posts and add feed posts methods
    - [x] Get all messages, add message and get messages between 2 users methods
- [x] Adding a REST Controller to the server
- [x] Implementing AES Encryption for passwords
- [x] React project creation
- [x] Home Page creation
    - [x] Home component
    - [x] Navigate to login or register functionality
- [x] Login and register pages development
    - [x] Login and Register component creation
    - [x] Login and register functionality
    - [x] Adding a User REST Controller to the client to handle login and registration
- [x] User Page development
    - [x] User profile details page
    - [x] Feed page
      - [x] Map component for region selection using Mapbox API
      - [x] Post component that represents a user post
      - [x] Feed component that represents all the posts on the page
      - [x] Select region functionality
      - [x] View feed posts from the selected region functionality
      - [x] Add a post functionality
      - [x] Adding a Feed Post REST Controller to the client to handle viewing the feed and adding a post
    - [x] Chats page
      - [x] User Messages Page that contains the recent chats of a user
      - [x] Messages component that represents the chat between the current user and a selected user
      - [x] Selecting a user to start a chat with functionality
      - [x] Sending messages between users functionality
      - [x] Adding a Message REST Controller to the client to handle sending messages between users
- [x] Creating a NavBar for the User Page to switch between profile, feed and chat pages
- [x] Adding a logout functionality
- [x] Implementing Web Sockets to update every client when an event happens
- [x] Configuring private routes, handling access denied and page not found cases
- [x] User input validation and exception handling


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Mateaș Andrei - mateasandrei10@gmail.com

Project Link: [https://github.com/andreimateas/GeoChatApp](https://github.com/andreimateas/GeoChatApp)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/andreimateas/GeoChatApp.svg?style=for-the-badge
[contributors-url]: https://github.com/andreimateas/GeoChatApp/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/andreimateas/GeoChatApp.svg?style=for-the-badge
[forks-url]: https://github.com/andreimateas/GeoChatApp/network/members
[stars-shield]: https://img.shields.io/github/stars/andreimateas/GeoChatApp.svg?style=for-the-badge
[stars-url]: https://github.com/andreimateas/GeoChatApp/stargazers
[issues-shield]: https://img.shields.io/github/issues/andreimateas/GeoChatApp.svg?style=for-the-badge
[issues-url]: https://github.com/andreimateas/GeoChatApp/issues
[license-shield]: https://img.shields.io/github/license/andreimateas/GeoChatApp.svg?style=for-the-badge
[license-url]: https://github.com/andreimateas/GeoChatApp/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/andrei-mateas
[product-screenshot]: images/screenshot.png
[React-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[JavaScript-badge]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[CSS-badge]: https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[HTML-badge]: https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[Spring-Boot-badge]: https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[Spring-Boot-url]: https://spring.io/projects/spring-boot
[Java-badge]: https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white
[Java-url]: https://www.java.com/
[Hibernate-badge]: https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white
[Hibernate-url]: https://hibernate.org/
[MySQL-badge]: https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[REST-badge]: https://img.shields.io/badge/REST-FF5733?style=for-the-badge&logo=api&logoColor=white
[REST-url]: https://en.wikipedia.org/wiki/Representational_state_transfer
