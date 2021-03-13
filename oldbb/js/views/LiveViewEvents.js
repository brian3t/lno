app.views.LiveViewEvents = Backbone.View.extend({
        model: {},
        collections: {events: {}, bands: {}},
        initialize: function (){
            // this.render() //a child view does not render itself at the beginning
        },
        post_initialize: function(){
            this.setElement(this.parentView.childViewEl)
            // this.listenTo(this.parentView.collections.events.fullCollection, "add", this.render);
            // this.listenTo(this.parentView.collections.events, "add", this.render);
            this.listenTo(this.parentView.collections.events, "reset", this.render);
            this.listenTo(this.parentView.collections.events, "update", this.render);
            this.parentView.collections.events.fetch()
            this.listenTo(app.event_bus, 'infi_reached', () => {
                console.log(`infi_reached captured`)
                if (this.parentView.collections.events.hasNextPage()) {
                    this.parentView.collections.events.getNextPage()
                } else {
                    // $$('.infi_content').off('infinite')
                    // fapp.allow_infinite = false
                    $$('.infinite-scroll-preloader').hide()
                }
            })
        },
        tagName: 'li',
        parentView: null,
        liveViewEvents: {},
        /*
        make sure all events has first band data before we start rendering
         */
        /*prepare_data: function (){
            this.collections.events.forEach((e) => {
                let first_band_event = e.get('band_events')
                e.firt_band = first_band_event
            })
        },*/
        render: function (events_collection, xhr, return_html =false){
            if (typeof this.model === "object") {
                this.model.models = _.first(this.model.models, 18);
            }
            if (!this.collections || typeof this.collections !== 'object') {console.error(`col not valid`); return}
            if (!this.collections.events || typeof this.collections.events !== 'object') {console.error(`col events not valid`); return}
            // console.log(templ({events:this.collections.events}))
            let templ = this.template({events:this.collections.events})
            fapp.allow_infinite = true
            if (return_html) { this.dom_ready(); return templ} else { this.$el.append(templ); this.dom_ready(); return this}
        },

        events: {
            "submit #loginForm ": "login",
            'scroll': 'scroll'
        },
        go_to_event: function (e){
            e = $(e.target);
            app.router.navigate('event/' + e.closest('li').data('id'), {trigger: true});
        },
        dom_ready: function (){
            // console.log(`length of events: `); console.log($$('.infi_content #liveviewevents_wrapper>li').length)
            fapp.infiniteScroll.create($$('.infi_content'))
            $$('.infi_content').off('infinite')
            $$('.infi_content').on('infinite', function (infi_event){
                // Exit, if loading in progress
                if (!fapp.allow_infinite) return;

                // Set loading flag
                fapp.allow_infinite = false;
                console.log(`infi reached`)
                app.event_bus.trigger('infi_reached', infi_event)
            })
            capp.geolocation.consume_success_geo()
        },
        scroll: function (e){
            console.log(`scrolled`)
        }
    },
    {
        username: '',
        password: '',
        $username: '',
        $password: '',
        hashedPassword: '',
        hashed: true,
        remember: true
    }
);
