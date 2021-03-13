const ONE_STAR = '<i class="fa fa-star" aria-hidden="true"></i>';
const HALF_STAR = '<i class="fa fa-star-half" aria-hidden="true"></i>';
app.models.Band = Backbone.RelationalModelX.extend({
        initialize: function () {
        },
        urlRoot: CONFIG.restUrl + 'band',
        relations: [
            /*{
            type: Backbone.HasMany,
            key: 'events',
            relatedModel: 'app.models.Event',
            reverseRelation: {
                'key': 'bands'
            },
            autoFetch: true
        }*/
            {
                type: Backbone.HasMany,
                key: 'band_events',
                relatedModel: 'app.models.BandEvent',
                reverseRelation: {
                    key:'band'
                },
                // includeInJSON: 'id',
            },
        ],
        localStorage: false,
        defaults: {
            name: '',
            genre: '',
            logo: '',
            lno_score: 0,
            type: 'unknown',
            similar_to: '',
            hometown_city: '',
            hometown_state: '',
            description: '',
            website: '',
            youtube: '',
            instagram: '',
            facebook: '',
            twitter: '',
        },
        setCreatedby: function (created_by_user) {
            this.createdby = created_by_user;
            this.set('user_id', created_by_user.get('id'));
        },
        genre_array: function () {
            let genre = this.get('genre');
            if (genre === null) {
                return [];
            }
            return genre.split(',');
        },
        pull_random_venue: function () {
            if (!(this.get('events') instanceof Backbone.Collection)) {
                return false;
            }
            let events = this.get('events');
            if (events.length < 1) {
                return false;
            }
            let ev = events.at(0);
            /**@var app.model.Event ev **/
            if (!(ev.get('venue') instanceof app.models.Venue)) {
                return false;
            }
            return ev.get('venue');
        },
        pull_first_event_date_time: function () {
            let events = this.get('events')
            if (typeof events !== app.models.Events) return ''
            let first_event = events.at(0);
            if (!(first_event instanceof app.models.Event)) {
                return '';
            }
            let start_time = first_event.get('start_time');
            let date_time_format = 'ddd, MMM Do';
            let date_time_string = first_event.get('date');

            if (!_.isEmpty(start_time)) {
                date_time_format += ' hA';
            }

            let date_time = moment(date_time_string, 'YYYY-MM-DD hh:mm:ss');
            return date_time.format(date_time_format);
        },
        pull_star_html: function () {
            let lno_score = this.get('lno_score');
            if (!$.isNumeric(lno_score)) {
                return '';
            }
            lno_score = lno_score / 2;
            let full_stars = Math.floor(lno_score);
            let half_stars = (lno_score - full_stars >= 0.5 ? 1 : 0);

            return 'LNO score: ' + ONE_STAR.repeat(full_stars) + HALF_STAR.repeat(half_stars);
        },
        is_fav: function () {
            let is_fav = false;
            let ls_fav = ls.get('favs');
            if (ls_fav && typeof ls_fav === "object") {
                is_fav = ls.get('favs').hasOwnProperty(this.get('id'));
            }
            return is_fav;
        }
    }
);

app.collections.Bands = Backbone.PageableCollection.extend({
    model: app.models.Band,
    /*comparator: function (a) {
        return a.get('name').toLowerCase();
    },*/
    url: CONFIG.restUrl + 'band',
    initialize: function () {
        // this.fetch();
    },
    // Any `state` or `queryParam` you override in a subclass will be merged with
    // the defaults in `Backbone.PageableCollection` 's prototype.
    state: {
        // You can use 0-based or 1-based indices, the default is 1-based.
        // You can set to 0-based by setting ``firstPage`` to 0.
        firstPage: 1,

        // Set this to the initial page index if different from `firstPage`. Can
        // also be 0-based or 1-based.
        currentPage: 1,
        pageSize: 15

        // Required under server-mode
        // totalRecords: 200
    },
    // You can configure the mapping from a `Backbone.PageableCollection#state`
    // key to the query string parameters accepted by your server API.
    queryParams: {
        // `Backbone.PageableCollection#queryParams` converts to ruby's
        // will_paginate keys by default.
        currentPage: "page",
        pageSize: "page_size"
    }
});
