# An application for asynchronous collaboration in the music industry

React | Next | Firebase | Sass

[visit the live demo (no authentication required)](www.github.com)

![screenshot of the application's ui](/public/static/screenshot1.png)

# About

During the pandemic lots of tools for real-time collaboration popped up to allow live sessions to take place online, but that's not the way myself and many other audio professionals work.

Time is extremely valuable when running a remote service based business - and with effective time management one can keep their schedule packed but also flexible. Generally we have an idea of how long a project will take, but sometimes things take less time and we're left with some extra left over. The reason myself and many others choose not to schedule sessions or zoom calls or whatnot is because then those extra moments of free time go to waste. If I have a revision to do for a song and I have the notes ready to go in an email, if I finish other work early I can get that done and get it over same day. If I have to wait for a scheduled session to accomplish the same work, the process gets delayed, and my time is potentially wasted.

I work asynchronously, as do many other freelancing professionals, because it allows me to keep my schedule flexible and in the end have more energy and time to put into doing great work. I'm building this application to fascilitate that workflow, and much more in the future.

There's currently 3 relevant options for this which I could find:

[highnote.fm](https://www.highnote.fm/) | [notetracks](https://www.notetracks.com/) | [filepass](https://filepass.com/)

If you're looking to use a service like this for professional work right now, check those out. They seem great. I'm building my own because I want it to have the exact features I want, and because I want to do more public facing 'community' features in the future. It also allows me to leverage the platform however I want by offering discounts to my clients, implementing their feedback, and building the absolute perfect solution for my audio career's needs. 

I'm planning to have the app also have a public version of each song where fans can come on and see extra media surrounding the song and the process, leave comments, ahve discussions, etc. This was born out of frustration surrounding the lack of community features on streaming services, which has always bothered me. This side of the project is much further down the line, but it's where I will be taking the project long term.

# Current Features

## Authorization

## NoSQL Cloud Backend

## Security Rules

## File Storage

## Custom hooks for fetching and organizing data 

## User-customizable priviledges to allow either access or admin roles

## Realtime updates with Cloud Firestore

## CRUD functionality

## Audio file uploading and streaming

# Features to add

## Live chat

## Photo/mood boards

## Markdown support for revision notes

## Custom audio player

## 

# Learned / Challenges during development

## Firebase security

The biggest challenge was learning how to allow specific users to access specific data, according to data set by other users, all while making sure there's no exploitable vulnerabilities. It's easy enough to accomplish this client-side, but I also had to make sure that somebody with malicious intent would be blocked from performing any destructive actions. I have to become very comfortable with writing security rules on firebase. I learned that I should do that *first* during development, because trying to trace exactly where permissions issues are coming from within a fully built out app was a pain. If I did them first, I'd immediately know what was causing any issues since it would be exactly what I'm working on - so then I could adjust the action I'm building or the security rule to allow it. I figured it all out and learned a lot.

## Development experience

I've created and finished about 20 projects in the past 6 months. I'm really starting to value good DX. With this project I spent a couple full days planning out the entire folder structure as well as the routes and component hiearchy and ended up sticking to it about 90%, which saved a ton of time. Any refactoring I did was generally 'close-by' and didn't involve big structural changes. I'm still learning the best practises for all of this, but I started to really focus on it during this project and it showed by how much smoother it went than the 19+ before it.

## Custom hooks

I don't know why I thought these would be was more complicated to create. You don't know what you don't know, I guess. I ended up going a little hook crazy and undid some of them and just put the functionality back into the component itself, but learning how to create them was super valuable.

## UI Design

I'm not a designer. I have a creative eye but visuals have never been my strong suit. I chose a style and stuck to it, and I'm satisfied with the results for now. I wanted it to feel like an app, which I'd say it mostly does. 

I plan to implement a LOT more features into this project, so I didn't want to go overboard on the design because it will probably change completely over time.

## SASS

Sass is awesome. I'd just it before but basically just for nesting. This time though I used @use, @include, and $variables which sped up my work a lot and provided a much better dx than vanilla css. I'm very happy I picked it up, and can't wait to really dive into the docs.
