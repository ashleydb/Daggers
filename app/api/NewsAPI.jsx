var $ = require('jquery');
//var UUID = require('uuid');
//var moment = require('moment');
var Axios = require('axios');

// TODO: Finish API operations, actually connecting to a DB.
// TODO: Add dates to the story object. Created and Last Updated?
// TODO: Add a category?
// TODO: Can a story have a YouTube video in it?
// TODO: Add ability to search?
// TODO: Update State in these functions?

// TODO: should this be part of NewsAPI and should that be a class?
export const DEFAULT_STORY_ID = "new";
//export const DEFAULT_STORY = {id: DEFAULT_STORY_ID, headline: "", image: "/images/news-main.jpg", summary: "", story: "" };

export const DEFAULT_STORY = {
        id: DEFAULT_STORY_ID,
        headline: "Placeholder",
        image: "/images/News-Generic2_169.jpg",
        summary: "Placeholder",
        story: "Placeholder",
        createdAt: 0
    };

    /*
    // Fetches a batch of stories, (most recent 4 by default.)
    // TODO: Add a count and pagenation. Add caching? Make this part of the state to save from continually calling.
    function loadDefaultStories() {        
        return [
            {
                id: 1,
                headline: "Zlatan Signs for the Daggers",
                image: "/images/news-main.jpg",
                summary: `"This is the move my whole career has been leading up to."`,
                story: `<p>The name ‘Glyn Hopkin’ is recognised by most Dagenham & Redbridge supporters with his name having been emblazoned on advertising around the ground as well as the Stadium sponsorship carrying his name for a number of years. However, recently Full & Life Members overwhelmingly accepted a proposal by a consortium of existing Directors, with Glyn being the lead investor, to invest a total of £1.3 million into the Club. He will be bringing his considerable business expertise gained as a very successful local and regional motor trader to bear on the club.</p><p><strong>Becoming involved in Dagenham & Redbridge Football Club</strong></p><p>"I've been coming to Dagenham since 1994. Steve Thompson invited me down just after I opened my first showroom to dine in the hospitality lounge with a friend. The funny thing about that day I remember is that I wasn’t allowed in the boardroom because I wasn’t wearing a tie, but I’ve forgiven them for that.</p><p>"I was the first Stadium sponsor but that was done on the back of actually helping the club out after the club missed promotion in their first play-off final. After that I was keen to get some investment into the club so I actually offered the club some money to help them get promoted the next season. Steve Thompson offered to call the ground the Glyn Hopkin Stadium which was very nice.</p><p>"I was also a trustee around that time for two years during the early 2000’s, so I came to understand how the club works financially. I knew then that the club is very well run but can basically really only survive by selling a player or having a cup run to make the books balance.</p><p>"I think the current Board have done a terrific job over the years I’ve always said that, they’ve put their heart and soul into the club and they’ve done whatever they think is best for the club. Unfortunately, well run clubs get relegated that is one of things about football. I was very keen to work with people that have been at the Club a long time and know the ins and outs of how the club works."</p>`
            },
            {
                id: 2,
                headline: "D&R 5-0 Man Utd",
                image: "/images/news-thumbnail.jpg",
                summary: `Daggers ease to another win at Old Trafford.`,
                story: `<p>With a free weekend in the U18 league fixture, Academy Manager Micah Hyde used the opportunity to look at U16 players looking to impress and gain a scholarship.</p><p>And he wasn't disappointed with a spirited performance from the Daggers players inflicting a ruthless 6-0 defeat on to rivals Southend United in an eventful encounter at Parkonians.</p><p>The hosts were three goals up by the interval after Blue Gallagher had bundled in before strikes by Dylan Florence and Anointed Chukwu increased their advantage. Luke Hurst’s 50th minute effort made it 4-0, and a spectacular volley from Jack Lee gave the Daggers their fifth, before Anointed Chukwu grabbed his brace to round off an impressive day for the east London side.</p><p>It was a thoroughly entertaining game made so by a bright and positive young Daggers, who shone in confidence and ambition from kick-off, testing the Seasiders’ defence with their mazy runs and incisive passing, creating an abundance of opportunities in the process.</p><p>The Daggers were not made to wait long for their breakthrough however, as Blue Gallagher profited from Jack Lee’s strength to bundle in following a corner, giving the hosts a lead that was doubled by Dylan Florence, who finessed in at the near post having been found in space by Deniz Alici.</p><p>Despite the Daggers keeping the majority of the first-half much in their control, an excellent goal-line clearance from Blue Gallagher denied Southend a route back into the game, and it wasn’t long until the home side established a three-goal lead through Anointed Chukwu, who tapped into an empty goal after an initial effort had been parried by the away stopper.</p><p>The second half saw the east London outfit reproduce more of their excellent form in the first, getting off to the brightest possible start just five minutes in as Luke Hurst squeezed through the gloves of the Seasiders number one from Mekhi Hyde’s pull-back.</p><p>The same combination very nearly gave the hosts an instant fifth - this time it was Hyde with the effort after latching onto Hurst’s cross, but the visiting keeper was equal to the shot, before being forced into a taxing save to keep out a powerfully-struck drive.</p><p>Hyde, who was at the heart of most of the Daggers’ creative moves, was once again involved in their next opening, as the midfielder combined with Anointed Chukwu and Sam Salis on the left-hand side of the box, but the former was just inches away from connecting with the final ball.</p><p>The forward also rode several heavy challenges as he ran coolly at goal, but his shot from a tight-angle flashed across the face of goal to safety, before Luke Hirst ran clear and forced another good save from a busy Seasiders keeper with a powerful rising shot. Chukwu once again tested the resolve of the Seasiders stopper with a placed finish from a Vijay Seenath through-ball, but saw his effort diverted as the Daggers sought to contribute further to the scoreboard.</p><p>That they did through the brilliance of centre-back Jack Lee, who netted the Daggers fifth with a sensational volley that flew into the roof of the Southend United goal from 25- yards, one of many highlights in an impeccable display of confidence and quality by the Daggers.</p><p>With five minutes remaining, there was still time for one more, and with the way the hosts were playing, it was no surprise that they managed to get their sixth, once again from the tireless figure of Anointed Chukwu, who fired in at the far post to round off an excellent day for a dominant Daggers.</p><p>After the encounter, the Academy Head coach Micah Hyde gave his thoughts on the tie:</p><p>"It was a perfect opportunity to look at these younger players today, we have been diligently working away for the last couple months identifying future Daggers talent as we no longer have a younger age group. We have utilised our contacts in watching boys released from cat 1,2 & 3, while also making sure we closely monitor the grassroots talent. So we have already played a number of games with lots of players U16 age group, against varied opposition. I liked the hunger and desire in this group, and the quality on and the ball which is difficult given the conditions they were playing in," explained Hyde.</p><p>"The creativity and the endeavour they showed was very pleasing to see, so it bodes well for these young players, as we continue our process of selection and elimination, for the next Academy players," continued the Coach.</p><p>Line-up: Dagenham & Redbridge: 1. Louie Chapman, 2. David Agboola, 3. Deniz Alici, 4. Elliot Bonds, 5. Jack Lee, 6. Henry Fisher, 7. Christoper Thorpe, 8. Jay Matete, 9. Dylan Florence, 10. Blue Gallagher, 11. James Turvey, 12. Mekhi Hyde, 14. Anointed Chukwu, 15. Luke Hirst, 16. Vijay Seenath, 17. Emmanuel Ogunrinde, 18. Oskar Garbarczyk, 19. Sam Salis, Liam Tuitt</p><p>Goalscorers: Dagenham & Redbridge: Blue Gallagher 8’, Dylan Florence, Anointed Chukwu 33’ + 87’, Luke Hirst 50’, Jack Lee 85’</p>`
            }
        ];
    };
    */
    
/*
    export function setStories(stories) {
        if ($.isArray(stories)) {
            //TODO: This is not going to work, since stories is an array of stories, not a single story
            // Could loop over the stories array and make multiple requests, (call addStory(),) or could add support for multiple stories in my news API on the server.
            Axios.post('/api/v1/news', stories)
                .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                //debugger;
                // TODO: Show error message on UI
                console.log(error.response.data);
            });
        }
        return undefined;
    };
*/

//    getStoriesSync: function() {
//        var stringNews = localStorage.getItem('news');
//        try {
//            // parse may fail with invalid input, so we can catch that error
//            var stories = JSON.parse(stringNews);
//            // double check this is an array and not malicious data
//            if ($.isArray(stories)) {
//                // Cool, we got content. Resolve the promise to return the data
//                return stories;
//            }
//        } catch(e) {
//            // parse failed, we'll just return an empty array below
//        }
//        // try failed
//        return [];  
//    },

    // TODO: This is dumb and just loads in all story data we have. Page it? (Placeholders here aren't used)
    export function getStories(page = 0, count = 3) {
        return new Promise(
            // The resolver function is called with the ability to resolve or reject the promise
            function(resolve, reject) {
                // Call our server to fetch some news
                Axios.get('/api/v1/news', {
                    params: {
                        page,
                        count
                    }
                })
                .then(function (response) {
                    try {
                        // parse may fail with invalid input, so we can catch that error
                        //var stories = JSON.parse(response.data); // TODO: not parsing, so don't need the extra catch?
                        var stories = response.data;
                        // double check this is an array and not malicious data
                        if ($.isArray(stories) && stories.length > 0) {
                            // Cool, we got content. Resolve the promise to return the data
                            resolve(stories);
                        } else {
                            console.log("WARN: getStories() was empty");
                            resolve([]);
                        }
                    } catch(e) {
                        console.log("ERR: Problem parsing news:", e);
                        //resolve([]);
                        reject(e);
                    }
                })
                .catch(function (error) {
                    console.log("ERR: Problem fetching news:", error);
                    //resolve([]);
                    reject(e);
                });
            }
        );
    };
    
    // Get the content for a story which may be cached in the stories array.
    // TODO: If the ID doesn't match one we have cached, do we try fetching from the server? Feels like that should happen on the caller's side so they can update the state.
    export function getStory(id, stories) {
        // Look through the list of stories passed in, (would typically be from the state)
        if (stories) {
            for (var i = 0; i < stories.length; ++i) {
                if (id == stories[i].id) {
                    return stories[i];
                }
            }
        }
        console.log("ERR: Story not found:", id);
        return this.DEFAULT_STORY;
    };
    
    
    export function addStory(story) {
        return new Promise(
            // The resolver function is called with the ability to resolve or reject the promise
            function(resolve, reject) {
                try {
                    const axiosInstance = Axios.create({
                        headers: {'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTIwNTk3MDg3MDIsInVzZXJuYW1lIjoidGVzdC11c2VyIn0.DrrdpFkoTG7YN3t-U5TRUsLBKH2im9ZCR00af2WQ0ks'}
                    });
                        
                    if (story.id == DEFAULT_STORY_ID) {
                        /*
                        // This is a new story
                        story.id = UUID();
                        story.createdAt = moment().unix();
                        // HACK: And we would store on the server too, much better than this
                        news.push(story);
                        */
                        
                        // This is a POST
                        axiosInstance.post('/api/v1/news', story)
                        .then(function (response) {
                            console.log(response);
                            story.id = response.data.id;
                            resolve(story);
                        })
                        .catch(function (error) {
                            //debugger;
                            // TODO: Show error message on UI
                            console.log(error.response.data);
                            //resolve({});
                            reject(error.response.data);
                        });
                    } else {
                        /*
                        // Editing an existing story
                        story.updatedAt = moment().unix();
                        // HACK: And we would store on the server too, much better than this
                        news = news.map((existingStory) => {
                            if (existingStory.id == story.id) {
                                // We edited this story
                                return story;
                            } else {
                                // Leave this story as-is
                                return existingStory;
                            }
                        });
                        */
                        
                        // This is a PUT
                        axiosInstance.put(`/api/v1/news/${story.id}`, story)
                        .then(function (response) {
                            console.log(response);
                            resolve(story);
                        })
                        .catch(function (error) {
                            //debugger;
                            // TODO: Show error message on UI
                            console.log(error.response.data);
                            //resolve({});
                            reject(error.response.data);
                        });
                    }
                } catch(e) {
                    // try failed
                    //resolve({});
                    console.log("ERR: addStory() failed:", e);
                    reject(e);
                }
            }        
        );  
    };

/*
    // Get the number of stories we have loaded.
    // Pass true to get the count in the local cache, or false, (default,) to get the count on the server.
    // TODO: Add a fetch from the server.
    getStoryCount: function(local = false) {
        if (local)
            return this.stories.length;
        return 0;
    },
    
    // Get an array of headlines we have loaded.
    getHeadlines: function() {
        return this.stories.map((story) => {
            return {id: story.id, headline: story.headline};
        });
    },
*/
/*    
    // Get the array of stories we have loaded.
    // TODO: Dangerous, since someone could update this data and not update the server? const?
    getStories: function() {
        return this.stories;
    },
*/ 
/*
    // Get the content for a story we have loaded.
    // TODO: If the ID doesn't match one we have cached, do we try fetching from the server?
    getStory: function(id) {
        for (var i = 0; i < this.stories.length; ++i) {
            if (id == this.stories[i].id) {
                return this.stories[i];
            }
        };
        return undefined;
    },
    
    // Add/Update a news story.
    // TODO: Update the server
    writeStory: function(story) {
        // TODO: Check validity of story first?
        if (story.id) {
            // This is a PUT to update an existing story
            for (var i = 0; i < this.stories.length; ++i) {
                if (story.id == this.stories[i].id) {
                    this.stories[i] = story;
                    return true;
                }
            };
        } else {
            // This is a POST to add a new story.
            // TODO: Post to the server, get the real ID back and add that to the story in our local state. Hacking an ID for now.
            story.id = this.stories.length + 1;
            this.stories.push(story);
            return true;
        }
        return false;
    },
    
    // Delete a story from the DB and the local cache if present.
    // TODO: Remove the story on the server.
    removeStory: function(id) {
        // This is a DELETE on an existing story
        for (var i = 0; i < this.stories.length; ++i) {
            if (id == this.stories[i].id) {
                this.stories.splice(i, 1);
                return true;
            }
        };
        return false;
    },

    // Return a blank story object
    // TODO: Story should probably be it's own class with a constructor for this kind of thing.
    createStoryObject: function() {
//        return {
//                id: 0,
//                headline: "",
//                image: "/images/news-main.jpg",
//                summary: "",
//                story: ""
//            };
            return DEFAULT_STORY;
    }
*/

