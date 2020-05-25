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
      { title: '自主学习', collapsable: false, children: ['learn-by-self', 'design-pattern', 'web-security'] },
      { title: '浏览器', collapsable: false, children: ['browser-study', 'network'] },
      { title: 'Http', collapsable: false, children: ['http-status-code', 'http-study'] },
      { title: 'Css', collapsable: false, children: ['css-often-used', 'css-study', 'scss', 'stylus'] },
      { title: 'Javascript', collapsable: false, children: ['js-study'] },
      { title: 'DOM', collapsable: false, children: ['dom-study'] },
      { title: 'Vue', collapsable: false, children: ['vuepress-use'] },
      { title: 'React', collapsable: false, children: ['react-hooks'] },
      { title: 'Webpack', collapsable: false, children: ['webpack'] },
      { title: 'Git', collapsable: false, children: ['git-cmd'] },
      { title: 'Linux', collapsable: false, children: ['linux-cmd'] },
      { title: 'Docker', collapsable: false, children: ['docker-often-used'] },
      { title: '项目规范', collapsable: false, children: ['husky', 'commitlint'] },
      { title: '持续集成', collapsable: false, children: ['travis-use', 'gitlab-ci-use'] },
    ],
    '/blogs/': [{ title: 'DOM', collapsable: false, children: ['cursor-position-summary'] }],
    '/': [{ title: '个人简历', collapsable: false, children: ['curriculum-vitae'] }],
  },

  search: true,
  searchMaxSuggestions: 10,

  repo: 'https://github.com/lainazy',
  repoLabel: 'Github',
}
