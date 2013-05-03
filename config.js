/*
    This is the config file that contains the blog configuration data.
*/
module.exports = {
    blog: {
        name: 'Raging Flame Blog',
        description: 'Rants about code and stuff...',
        keywords: ['Joomla!', 'Extensions', 'JavaScript', 'Node.js', 'PHP'],
        baseUrl: '/blog',
        postsFolder: __dirname + '/posts',
        postsFile: './posts.json'
    },
    
    author: {
        name: 'Qawelesizwe Mlilo(Que)',
        autobio: 'Hi, my name is Qawelesizwe Mlilo(Que), I write code and build stuff on the web. This is the official blog for Raging Flame Lab.',
        email: 'qawemlilo@gmail.com',
        twitterHandle: 'ragingflameblog',
        facbookPage: '',
        avatar: 'img/qawe.png'
    },
    
    posts: {
        perpage: 5,
        showDate: true,
        showAuthor: false,
        showShareButtons: false
    }
};