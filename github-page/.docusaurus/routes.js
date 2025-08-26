import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '019'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'dbc'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '8ac'),
            routes: [
              {
                path: '/docs/api/config',
                component: ComponentCreator('/docs/api/config', '03b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/finder-core',
                component: ComponentCreator('/docs/api/finder-core', 'c71'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/events',
                component: ComponentCreator('/docs/events', 'b5c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/mixins/',
                component: ComponentCreator('/docs/mixins/', '452'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/mixins/filters-mixin',
                component: ComponentCreator('/docs/mixins/filters-mixin', '29c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/mixins/pagination-mixin',
                component: ComponentCreator('/docs/mixins/pagination-mixin', 'a68'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/mixins/search-mixin',
                component: ComponentCreator('/docs/mixins/search-mixin', '6c6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/react/finder-content',
                component: ComponentCreator('/docs/react/finder-content', '860'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/react/finder-search-term',
                component: ComponentCreator('/docs/react/finder-search-term', '0cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rules/',
                component: ComponentCreator('/docs/rules/', 'ce3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rules/filter',
                component: ComponentCreator('/docs/rules/filter', 'b5a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rules/group-by',
                component: ComponentCreator('/docs/rules/group-by', '87d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rules/search',
                component: ComponentCreator('/docs/rules/search', 'f9d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rules/sort-by',
                component: ComponentCreator('/docs/rules/sort-by', '763'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/utils/',
                component: ComponentCreator('/docs/utils/', 'e1a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/utils/string-comparison',
                component: ComponentCreator('/docs/utils/string-comparison', 'be1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/utils/type-guards',
                component: ComponentCreator('/docs/utils/type-guards', 'b9c'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
