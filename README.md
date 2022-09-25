# Relevant links
[favicon.io](https://favicon.io/)
[I'm heading out right now and can't check but this might allow me to pull all the songs an artist is a part of onto their profile easily](https://firebase.blog/posts/2019/06/understanding-collection-group-queries)

# personal notes for reference

## structure

### bad

/                                          : main portfolio page with blog/socials etc

/work                                      : 'artist zone' with more work/technical related stuff

/work/profile                              : user's profile page listing relevant info + all their songs -- non-shareable

<!-- /work/profile?song=songname    : page dedicated to the song passed in through the url -- shareable -->

/work/profile/projectName?song=songName    : page dedicated to the song passed in through the url, projectName would be 'single' if not part of a full project -- shareable -->
<hr>

- it's either the above, or making it 'song focused' and just collection essentially links and previews about each song on the users profile. would make it easier to enable artists to 'share ownership' of a song, since they would exist independent of 
- the structure below would make things much more flexible, basically take a 'song first' approach to the app instead of a 'profile first'
    - the way I saw it before was that profile would be the parent of album which would be the parent of song
        - but now I think it's smarter to create dedicated project and song pages, which would use the url to query firebase and if their uid matches one of the accepted ones (or if its marked shareable) return the data and hydrate the page
    - i think this makes more sense because it avoids the issue I ran into with v2 where I had to create dedicated 'share pages' which were awkward. Basically the 'songShare' component from v2 would be the focus on this v3

- **SO essentially making the projects and songs independent of the artist, and then requiring authorization to view them**

    
<hr>

### good

/audio                                        : main portfolio page with blog/socials etc

/audio/[[...work]].js                                   : 'artist zone' with more work/technical related stuff - dynamic catch all

/audio/work/profile.js                      : user's profile page listing relevant info + all their songs -- non-shareable

/audio/work/project/[...projectName].js                  : project overview linking to each song

/audio/work/[...songName].js                  : song page (but using a catch-all route can also catch file versions specified? maybe not needed.

<hr>

- what I'm trying to avoid is rendering an entirely different page depending upon whether or not an extra path exists. 
    - /[projectName] should always just render the project overview, and not render a dedicated song page if /[...projectName]/songName is given
        - i'm avoiding this because even though it works, it creates a superfluous connection
            - just because I can, doesn't give me a reason to
                - it's also *more* common for songs to exist as singles anyways, so avoiding having /work/single/songName is also good (also then I get this weird situation where the route 'single' exists when it doesn't need to)

### firebase

The structure of the pages also makes it a lot easier on the firebase end, because each album and song can exist as their own documents, with the album document just linking to the songs?

When somebody goes to a song url, i need to search for a document containing that, and then if they are authorized, return the data

When somebody goes to an album url, I don't need all the data from every song, just the names of the songs (along with some metadata probably) so that the album page can be populated with previews/links to each song if the person is authorized.

Only users specified to have access can write, but if the song is set to shareable then anybody can view?

Yeah the projects collection on firebase will just hold documents which are used to provide a basic metadata overview and previews/links to songs.

then in the 'songs' collection, each song has a document containing metadata, and an array containing all the authorized users

the song document has a subcollection containing all the file versions.

I remember my mistake from V1 where I made the firebase structure too reliant on the data it contained - using UID for collections and stuff so each time the database needed to be called i need to also get all the data from everywhere. This way I can call it much easier, and any special route is provided by the URL.

```js
// for example, accesing the file versions would be done like so:
    const docRef = doc(db, 'songsCollection', 'songNameDocument', 'fileVersionsCollection', 'fileVersionDocument');

// then you'd just iterate over the documents within the fileVersions collection and/or access the most recent. 
// having them as separate documents might be easier because 99% of the time the artist just needs the most recent.
```

A mistake I made in v2 was using both the router query *and* the signed in artists uid to fetch stuff, which was made more complicated with the shareable versions and ugh. it was a mess. redoing this a 3rd time is super worth it.

The way I was generation shareable links in V1 was comedic. You can look through the [readme](https://github.com/xylvnking/xktransfer#unresolved-problems) on the repo if you want to see it. It basically generated a paragraph long URL because I was passing ALL the necessary data through the URL. I could have created a link shortening service or used the simple one I've already made but still funny.

The difference between v2 and this v3 is that in v2 I was using nested data within documents, instead of using more documents/collections/subcollections on firebase. Both *work* but I don't think calling all the data all the time is good practise, and dealing with all the nesting was kind of a pain. Especially when that data is nested within arrays and you need to also make sure to keep passing indexes down and blah blah it just became a hassle which can be avoided by using firebase close to the way I feel it's intended to be used.

The other major difference is that I want to make all my firebase calls on the server using api routes. Again it works either way, but this feels cleaner and 'more right'. If it proves to be too much of a hassle I don't mind abandoning it though. I know that I won't be able to upload files through the api, because full quality audio files exceed the 4mb payload limit. I could have that be handled on a totally different application alltogether though if I wanted the client side code of this to remain 'pure'.

Looking through the V2 code and pretty much anything which isn't jsx could have gone into an api

Overall I'm just putting a lot of forethought into the architecture because the past 2 times I just rushed forwards and ended up here, redoing it a 3rd time. I learned a lot from the v1 and v2 but obviously it would have been nice to have it done already haha. It is what it is.

Yup we're good to go. Create!

<hr />

Rethinking this the next day

/           : main home page for everything
/audio/[[...portfolio]].js          : audio sales/portfolio - optional dynamic catch all so it's default for the 'audio' folder
/audio/work.js         : client homepage work announcements etc
/audio/profile.js           : profile page displaying client info and previews of/links to songs the user is authorized one 
/audio/song/[...songName].js            : page displaying song info to authorized users
/audio/project/[...projectName]         : page displaying previews of/links to songs

- since this will end up being the site which holds a lot of what I do, a dedicated audio folder is necessary even just for dx.
- dedicated song and project sub folders with dynamic catch alls are required because otherwise entering the wrong name would default you to the optional dynamic catch all portfolio which is weird. If no song is found I want to be able to still load the song/project page and say hey there were no songs by that name
- yeah just implemented it and it makes a lot of sense. using a layout for the nav also makes a lot of sense. going to skim the docs and make sure i'm not missing any other major feature
