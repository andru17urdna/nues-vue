# Telivy Backend Project
Thank you for checking out my small application. I would like to start by saying that I wanted to see how much my skills with vue have developed on my own and I set a time limit 20 working hours for this application including Backend and Frontend. I didn't focus so much on styling as I wanted to have more features than looks. I will be continuing to work on this app but this is it at 20 hours.

Quick notes

    - The api key is only good for 100 request per day so if nothing is showing up I guess I burned through them all.
    - There is no real database for this project. Some of the fetches are to .json files to minimize API calls


## Table of Contents

#### Components
* #### AppHeader.vue
* #### Article.vue
* #### MainArticles.vue
* #### TopHeadlines.vue
#### Layouts
* #### default.vue
#### Pages
* #### search.vue
#### Server
* #### Concurrency News fetch

----
----
### List of Tech for this project
* Nuxt
* Vuex
* SCSS
* axios
* nodemon
* fetch
* express
* dotenv



Install dependencies:

    npm i or yarn

Create .env 

    based on example.env
    add api key
To run server:

    npm start or yarn server 
To run application:

    yarn dev
Server running:

    Party on Port:8000!

____
## Future of this project
* styling (everything)
* Better randomization of user favorited articles on display
* More Search Parameters
* Better division of components
* improved user features
* add a way to save favorite searches
* add seo
____


----
## Components
----
### AppHeader.vue
----
I set up a simple way to navigate the site by using my AppHeader component with nuxts layouts/default.vue feature.
By importing it here and using it, I have access to it on any page.

### Features:
* Navigation
* user sign-in
* user sign-out

```html
<template>
  <header class="header">
    <h1 class="title">Navigation</h1>

    <div v-if="!userLoggedIn">
        <button @click="login">Login</button>
    </div>
    <div v-else>
        <button @click="logout">Logout</button>
    </div>
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/search">Search</nuxt-link>

  </header>
</template>
```

Here I display the log in and logout button (conditionally rendered) depending on if the user is logged in or not. I set up a "boolean switch" as it was the easiest way to implement this feature.

```html
~/layouts/default.vue

<template>
  <div>
    <AppHeader v-on:user-login="signIn"
               v-on:user-logout="logout"/>
    <Nuxt />
  </div>
</template>

```


----
### Article.vue
----
As the focus of the site was news articles I created a component that could render and display articles across the site utilizing props from a parent component.


### Features:
* Displays Articles
* Delete feature


```js
props: ['source', 'author', 'content', 'description', 'publishedAt', 'title', 'url', 'urlToImage', 'theArticle', 'location'],


created() {
      if (this.userInfo.session && this.location === 'MainArticles') {
        this.deleteable = true;
      }
    }

```
I created a deleteable prop that would take in a string. If that string was "MainArticles" when passed in, it would allow the user to delete the article from the slice of state.

----
### MainArticles.vue
----
MainArticles is the landing page for any user arriving. By default it displays a collection of articles that can easily be changed. When a user logs in, if the user has currently favorited articles, the app will fetch the newest articles based off of the users favorites, saves them to the state and renders them on screen.

### Features:
* Conditional rendering on log-in
* Delete

```js
computed: {
    ...mapGetters('articlesData',['mainArticles']),
    ...mapGetters('userInfo', ['userInfo'])
  },
  data() {
    return {

    }
  },
  async created() {
    if (!this.userInfo.session) {
      this.fetchDefaultArticles();
    } else {
      this.fetchUserArticles();
    }
  },
  methods:{
    ...mapActions('articlesData',['fetchDefaultArticles', 'fetchUserArticles', 'deleteArticle']),
  }
```

----
### TopHeadlines.vue
----
This component does exactly what it sounds like, but I wanted to make it so that it would iterate through the most recent headlines after the component fetches them.



### Features:
* Iterates through a list
* Pauses on hover
* Resumes on exit

```js

data() {
        return {
            headlines: [],
            topHeadline: null,
            interval: null,
            num: 1,
        }
    },
    async created() {
        const config = {
            headers: {
                'Accept': 'applications/json'
            }
        }

        try {
            const res = await axios.get(`http://localhost:8000/api/news/top-headlines`, config);
            this.headlines = res.data.articles
            this.topHeadline = this.headlines[0];
            this.iterate();
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        iterate() {
            this.interval = setInterval(() => {
                this.topHeadline = this.headlines[this.num];
                this.num++
                if (this.num === this.headlines.length) this.num = 0;
            }, 3000)
        },
        clearIterate() {
            clearInterval(this.interval);
        }
    }

```
Here the component calls the iterate method during the fetch. As I wanted the user to have the most up to date articles I did not save these in vuex state. Instead on creation the component will fetch the newest articles to display them on screen. When a user hovers over the component it will pause on the current article and upon exiting will resume where it left off.

----
## layouts
----
### default.vue
----
I layered the AppHeader component here for rendering across all pages. I also rendered the current users information so that on change you could watch the current users data mutate in the vuex state. As this is the top level component this is where I wanted sign-in and sign-out to happen to allow for dynamic rendering across all pages.

### Features:
* Sign-in (vuex state)
* Sign-out (vuex state)

```html
<template>
  <div>
    <p>current User: {{ userInfo.username }}</p>
    <p>recent searches: {{ userInfo.recent_searches }}</p>
    <p>current favorites: {{ userInfo.favorited }}</p>
    <p>session: {{ userInfo.session }}</p>
    <AppHeader v-on:user-login="signIn"
               v-on:user-logout="logout"/>
    <Nuxt />
  </div>
</template>
```

## Pages
----
### Search.vue
----
Fully working search feature. When a user searches their most recent search string is updated in the user slice of state and renders on screen, allowing the user to easily search for the same articles again by clicking.

### Features:
* Most Recent Searches

```js
computed: {
        ...mapGetters('userInfo', ['userInfo'])
    },
    methods: {
        ...mapActions('userInfo', ['updateUserSearches']),
        async searchNews() {
            try {
                const res = await axios.get(`http://localhost:8000/api/search/?tags=${this.searchString}`);
                this.searchResults = res.data.articles
                this.updateUserSearches(this.searchString)
            } catch (err) {
                console.log(err);
            }
        },
        async previousSearch(string){
            try {
                this.searchString = string
                const res = await axios.get(`http://localhost:8000/api/search/?tags=${string}`);
                this.searchResults = res.data.articles
            } catch (err) {
                console.log(err);
            }
        },
    },
```
The updateUserSearches() is called with the most recent search string and mutates/ updates the vuex state for the current user.

----
## Server
----
### AppHeader.vue
----
Nothing too crazy. Simple Express server but the one section I wanted to talk about was the users article fetch that happens.
I wanted this to be a concurrent function, fetching any amount of user favorites and combining them into a single arr to be used in the front end.

### Features:
* text

```js

router.get('/user-favorites', async (req, res) => {
    const paramsArr = req.query.tags.split(',')
    console.log(paramsArr);

    const fetchParamsArr = await paramsArr.map(request => request =`https://newsapi.org/v2/everything?q=${request}`)
    const favoritedArticles = await fetchArticlesByParams(fetchParamsArr);
    console.log(favoritedArticles);

    res.send(favoritedArticles);
});


async function fetchArticlesByParams(paramsArr) {

    const requests = paramsArr.map((param) => fetch(`${param}&apiKey=${process.env.API_KEY}`))
    const responseData = await Promise.all(requests);
    const jsonResponse = responseData.map(article => article.json());
    const jsonData = await Promise.all(jsonResponse);
    const allArticles = jsonData.map((obj) => obj = obj.articles);
    return allArticles.flat();

}

```
This routed makes multiple fetches to the server the concurrently updates the data before sending it back to the frontend to be rendered.
