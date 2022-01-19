

export default function( { $axios }, inject) {
    const api = {
        news: NewsAPI( $axios ),

    }


    inject('api', api)

};
