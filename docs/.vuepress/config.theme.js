// https://vuepress.vuejs.org/zh/default-theme-config

module.exports = {
  nav: [
    {
      text: 'Articles',
      items: [{ text: '随笔', link: '/jottings/' }, { text: '博客', link: '/blogs/' }],
    },
  ],

  sidebar: {
    '/jottings/': [
      { title: '自主学习', collapsable: false, children: ['learn-by-self'] },
      { title: '浏览器', collapsable: false, children: ['browser-study'] },
      { title: 'Http', collapsable: false, children: ['http-status-code'] },
      { title: 'Css', collapsable: false, children: ['css-often-used', 'css-study', 'scss'] },
      { title: 'Javascript', collapsable: false, children: ['js-study'] },
      { title: 'DOM', collapsable: false, children: ['dom-study'] },
      { title: 'Vue', collapsable: false, children: ['vuepress-use'] },
      { title: 'Git', collapsable: false, children: ['git-cmd'] },
      { title: 'Linux', collapsable: false, children: ['linux-cmd'] },
      { title: '持续集成', collapsable: false, children: ['travis-use'] },
    ],
    '/blogs/': [{ title: 'DOM', collapsable: false, children: ['cursor-position-summary'] }],
    '/': [],
  },

  search: true,
  searchMaxSuggestions: 10,

  repo: 'https://github.com/lainazy',
  repoLabel: 'Github',
}
