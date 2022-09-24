# Relevant links
[favicon.io](https://favicon.io/)



# structure

## bad

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

## good

/                                       : main portfolio page with blog/socials etc

/work                                   : 'artist zone' with more work/technical related stuff

/work/[profile].js                      : user's profile page listing relevant info + all their songs -- non-shareable

/work/[projectName].js                  : project overview linking to each song

/work/[...songName].js                  : song page (but using a catch-all route can also catch file versions specified? maybe not needed.

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