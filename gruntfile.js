module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            css: {
                files: ['**/*.scss'],
                tasks: ['sass']
            },
            scripts: {
                files: ['src/js/**/*.js'],
                tasks: ['uglify']
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            src: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js',
                        src: '**/*.js',
                        dest: 'dist/assets/js',
                        ext: '.min.js'
                    }
                ]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{expand: true, cwd: 'src/sass', src: '**/*.scss', dest: 'dist/assets/css', ext: '.min.css'}]
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: [
                            'node_modules/jquery/dist/jquery.min.js'
                        ],
                        dest: 'dist/assets/js/',
                        flatten: true
                    }
                ],
            },
        }/*,
        ftp_push: {
            your_target: {
                options: {
                    authKey: "",
                    host: "",
                    dest: "/",
                    port: 21
                },
                */
                //files: [{expand: true, cwd: 'dist', src: '**/*'}]
                /*
            }
        }*/
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ftp-push');
    
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('actualizar', ['copy', 'sass', 'uglify']);
    //grunt.registerTask('deploy', ['copy', 'sass', 'uglify', 'ftp_push']);
};