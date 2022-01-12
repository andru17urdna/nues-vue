<template>
    <div>
        <h1>TOP-HEADLINES</h1>
        <Article v-if="topHeadline !== null" :source="topHeadline.source" :author="topHeadline.source"
             :content="topHeadline.content" :description="topHeadline.description" :publishedAt="topHeadline.publishedAt"
             :title="topHeadline.title" :url="topHeadline.url" :urlToImage="topHeadline.urlToImage"/>
            <!-- <p>{{topHeadline.source}}</p>
            <p>{{topHeadline.author}}</p>
            <p>{{topHeadline.title}}</p>
            <p>{{topHeadline.description}}</p>
            <p>{{topHeadline.url}}</p>
            <p>{{topHeadline.urlToImage}}</p>
            <p>{{topHeadline.content}}</p> -->
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
            console.log(res.data)
            this.headlines = res.data.articles
            this.iterate();
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        iterate() {
            let num = 0;
            this.interval = setInterval(() => {
                this.topHeadline = this.headlines[num];
                num++
                if (num === this.headlines.length) num = 0;
            }, 3000)
        }
    }
}
</script>

<style>

</style>
