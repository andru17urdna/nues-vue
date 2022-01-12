<template>
    <div>
        <h1>TOP-HEADLINES</h1>
        <span>{{headlines}}</span>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'TopHeadlines',
    data() {
        return {
            headlines: [],
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

            } catch (err) {
            console.log(err);
            }
    }
}
</script>

<style>

</style>
