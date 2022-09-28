# why?

There's a ton of apps for making music together online, but not really any geared towards professionals working in studios, where the work is usually done asynchronously without the client and engineer/producer/whoever scheduling a time and meeting for a call or whatever. I don't offer 1 on 1 sessions with my clients because 99% of the time I can get the work done far before the time we schedule, or I've been so busy that I actually have zero time to schedule, and have to plan on short notice (for example if something takes less time than expected, I can do some work from my backlog, but if i have to wait until a scheduled time to do the work, it has to wait. *most* professionals I know in the music industry work this way)

This app is to provide a hub for asynchronous music industry pipelines. It has support for real-time events, and is something I'd like to make sure *is* there, even if it's not the focus, because in the odd time it is needed I don't need to have users having to all use another program when stuff like video conferencing and live chat and whatnot are all within my ability to include natively here.

This is my passion project, because I'm going to be the most active user.

# Relevant links
[favicon.io](https://favicon.io/)

[I'm heading out right now and can't check but this might allow me to pull all the songs an artist is a part of onto their profile easily](https://firebase.blog/posts/2019/06/understanding-collection-group-queries)

[how-to-get-the-email-of-any-user-in-firebase-based-on-user-id](https://stackoverflow.com/a/66544110/19101255)

[might not need for a while, but an npm package promising video conferencing](https://www.npmjs.com/package/@videosdk.live/react-sdk)

# so ref

[how-to-query-within-an-array-of-object-in-firestore](https://stackoverflow.com/a/70812323/19101255)

[why-does-this-firestore-query-require-an-index](https://stackoverflow.com/a/53790652/19101255)

https://stackoverflow.com/questions/51412901/javascript-sort-an-array-of-objects-based-on-numeric-key

# learned

Pages with dynamic routes always render twice in Next.

## custom hooks

Custom hooks are amazing. I had already written reusable functions I was importing with modules, but I was still using native hooks within the components. Switching over to custom hooks allowed me to also put all of the necessary native hook logic outside of the component as well, making it reusable and the component cleaner, which was just a win win win.

So far I have two, one for getting song data, then one for getting file version data, since the two aren't always used together. I'm destructuring a lot from them, and using the uid directly from the firebase session token or whatever to make sure that the uid being passed around the hook is not just the correct one, but also the one of the signed in user. 

I really thought it would be tougher to create custom hooks, and every time something like this happens I always feel goofy that I never took the time to learn about the topic sooner.

## next

I'm learning the difference between pages and components.

The situation is that I had a page which rendered a component which rendered everything on the page.

The component was rendering multipl times even if it was empty, so I made sure it wasn't strict mode and it ended up being the page.

I found out that pages with dynamic routes render twice, ok cool, but I don't want to rerender my component if it doesn't need to. (I'm also assuming strict mode might do some trickery behind the scenes and it not be as 'heavy' of a rerender so I wanted to avoid the re-render I was causing because I knew it was a 'full' render)

My solution was to handle the router query within the page itself, and pass the data to the component, while also conditionally rendering it. This also has the advantage that my component, if rendered, is guaranteed to have the router query data, so it can safely render jsx or subcomponents unconditionally. 

I'm currently unsure if I should also pass authentication info, because the component can't (and shouldn't) work without it, so maybe it is best to pass it from the page?