/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All the tests are within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test suite for the RSS feeds definitions
    *  and the allFeeds variable in the application
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable has been
        * defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs', function() {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            });
         });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            });
         });
    });

    /* Test suite for the menu */
    describe('The Menu', function() {

        /* Test that ensures the menu element is hidden by default. */
        const   body = $('body'),
                menuIcon = $('.menu-icon-link');

        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /*  Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
        */

        it('changes visibility when menu icon is clicked', function() {
            // When menu icon clicked for the first time, menu should show
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            // The second click should hide the menu
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite for the initial entries */
    describe('Initial Entries', function() {
        let     entries;
        const   feed = $('div.feed'),
                entry = $('article.entry');

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(1);
            entries = feed.find(entry);
            done();
        });

        it('have at least one entry', function() {
            expect(entries).toBeDefined();
        });
    });

    /* Test suite for "New Feed Selection" */
    describe('New Feed Selection', function() {
        let feedOne;
        let feedTwo;

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedOne = $('div.feed');
                loadFeed(1, function() {
                    feedTwo = $('div.feed');
                    done();
                });
            });
        });

        it('has content that changes', function() {
            expect(feedOne === feedTwo).toBe(false);
        });
    });
}());
