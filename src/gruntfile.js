/**
 * Unfamiliar with Grunt? Here are some links that will allow you to learn more.
 *
 * - http://gruntjs.com
 * - http://gruntjs.com/getting-started
 * - http://howtonode.org/introduction-to-npm
 */

'use strict';

module.exports = function(grunt) {

    /**
     * Configuration object for the build process.
     */
    var config = {
        css: 'assets/css/'
    };

    /**
     * Configuring the tasks available for the build process.
     */
    grunt.initConfig({
        config: config,
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Compiles Sass into CSS.
         */
        sass: {
            /**
             * For development, Sass is compiled into readable style sheet.
             */
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= config.css %>styles.css': '<%= config.css %>styles.scss'
                }
            }
        },

        /**
         * Starts watching files for additions, changes or deletions, which will
         * trigger a task to be run. Current tasks are display below.
         *
         * - Changes to .scss files will trigger a Sass to CSS conversion.
         */
        watch: {

            /**
             * Any changes made to a .scss file in the project trigger a conversion
             * of Sass to CSS.
             */
            sass: {
                files: '**/*.scss',
                tasks: ['sass:dev']
            }
        },

    });

    /**
     * Loads libraries to assist with the build process.
     */
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
};
