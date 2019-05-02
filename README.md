# Sensei-YT

See the live project on [Heroku](https://sensei-yt.herokuapp.com)

## Overview
---

Sensei YouTube is my Unit 2 project for General Assembly's Software Engineering Immersive course. It is a full-stack application built over the course of one week and hosted via Heroku. 

## The Stack
---


<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmL-M9-HB7CNqnXdYSbPW8EdVCewJrydzrZrSOZNDhExgZlvGs">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5gpoI2s0V09id3qeHfC7mwwv46bQQktgN6YW2jWtCWJenUpegQ">


The main technologies used were MongoDB, Express, EJS, and Node.js. I also took advantage of the YouTube Data API v3 to search and obtain data on videos. Styling was done utilizing the Materialize CSS framework in conjunction with a project stylesheet. Finally, the Bcrypt package was used to hash user passwords on account creation.

## Planning and Approach
---
### Inspiration
I started out thinking about a problem I wanted to solve in my personal life. One of my biggest passions outside of coding is Brazilian Jiujitsu. I'm often scouring YouTube for various videos of techniques and training methods. However, even after finding a video that's well made; it's difficult to retain all of the information. I wanted to create an app that would allow me to take notes on videos that I felt had a lot of good advice to offer.

### MVP
Initially, the goal was to implement the MVP of the project: a full CRUD app served through Express with at least one controller featuring all 7 Restful Routes. From there I wanted to see how much I could implement over the span of one week. This created an opportunity where I could really push myself and see how much I could learn and apply in one week.

### Above and Beyond
I wanted to try and replicate features that users have come to expect when utilizing a full-fledged app. Authentication with Encryption was a natural choice; allowing users to create an account and save their favorite videos in their own personal libraries. Also allowing logged in users to search YouTube via the API and add videos to the public pool. I attempted to dive into the Express documentation and some error-handling middleware to turn error messages into a way to guide the user back to safe waters.

## Challenges and Future Goals
---
### 1. Greater Flexibility with YouTube API
When I  started this project, the inital functionality was for the user to paste a youtube video link into a form. On submitting I would write logic in the backend that would strip the video ID from the URL and add it to the database. 

However, I quickly realized that this wasn't an ideal user experience as it requires the user to visit another site before coming to mine with the URL of the video that they want. I decided to implement the YouTube API into my project so users could search and watch videos without having to navigate away. Ultimately I want to reimplement pasting video links alongside querying the API to give the user options of how they want to access videos.

Even with that in place, it's not very strict. Currently the user can search for any video on YouTube and add it to the library; I want to do more work with the API to filter what videos are brought back to keep the site on the central theme of jiujitsu.

### 2. A deeper understanding  of Express Middleware
As I was working on my server routes with express. I started to read the documentation on middleware that can run in between the request-response cycle. This seemed like a very powerful tool and one that I attempted to use to handle common error that might happen when the user is on the site, such as going to an undefined route or trying to log in with invalid credentials. While I was successful, I still don't feel very confident in the details of middleware and how to get the most out of it.

### 3. Getting things to work... the right way
One mantra I keep repeating to myself during this journey to learn to code is to get it working first. The idea being not to think about optimization or refactoring while you're still trying to solve the problem at hand. I experienced the other side of this during the project.

 Initially I was querying the api with an AJAX request set up in my client-side javascript. This has one big flaw in that there's no way to keep the api key hidden from the client, or even from my github repo. Even though this project won't see a lot of traffic and the api key I have isn't for any sensitive information, I still didn't feel like it was good practice to leave that information out where anyone could see or access it. As such, I spend an entire morning tearing down my working AJAX request and building a server-side request using the appropriately-named npm package 'request'. 
 
 The end result was a big challenge of this project was fixing something I didn't do right the first time. I'm hoping I can keep this lesson in mind moving forward.


## Conclusion
---
Thanks for taking the time to check this project of mine out. Feel free to contact me if you have any questions or feedback.