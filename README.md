# Relevant links
[favicon.io](https://favicon.io/)

[I'm heading out right now and can't check but this might allow me to pull all the songs an artist is a part of onto their profile easily](https://firebase.blog/posts/2019/06/understanding-collection-group-queries)

[how-to-get-the-email-of-any-user-in-firebase-based-on-user-id](https://stackoverflow.com/a/66544110/19101255)

# so ref

[how-to-query-within-an-array-of-object-in-firestore](https://stackoverflow.com/a/70812323/19101255)

[why-does-this-firestore-query-require-an-index](https://stackoverflow.com/a/53790652/19101255)

https://stackoverflow.com/questions/51412901/javascript-sort-an-array-of-objects-based-on-numeric-key

# quick learned

Pages with dynamic routes always render twice in Next. 

## next

I'm learning the difference between pages and components.

The situation is that I had a page which rendered a component which rendered everything on the page.

The component was rendering multipl times even if it was empty, so I made sure it wasn't strict mode and it ended up being the page.

I found out that pages with dynamic routes render twice, ok cool, but I don't want to rerender my component if it doesn't need to. (I'm also assuming strict mode might do some trickery behind the scenes and it not be as 'heavy' of a rerender so I wanted to avoid the re-render I was causing because I knew it was a 'full' render)

My solution was to handle the router query within the page itself, and pass the data to the component, while also conditionally rendering it. This also has the advantage that my component, if rendered, is guaranteed to have the router query data, so it can safely render jsx or subcomponents unconditionally. 

I'm currently unsure if I should also pass authentication info, because the component can't (and shouldn't) work without it, so maybe it is best to pass it from the page?