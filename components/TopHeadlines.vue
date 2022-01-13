<template>
    <div class="Top-Headline_conatiner-div" @mouseover="clearIterate" @mouseleave="iterate">
        <h1>TOP-HEADLINES</h1>
        <Article  v-if="topHeadline !== null" :source="topHeadline.source" :author="topHeadline.source"
             :content="topHeadline.content" :description="topHeadline.description" :publishedAt="topHeadline.publishedAt"
             :title="topHeadline.title" :url="topHeadline.url" :urlToImage="topHeadline.urlToImage" :location="'TopHeadlines'"/>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'TopHeadlines',
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
}
</script>

<style lang="scss">
    .Top-Headline_conatiner-div{
        a{
            color:red
        }
    }
</style>
