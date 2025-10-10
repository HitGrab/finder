import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/finder/markdown-page',
    component: ComponentCreator('/finder/markdown-page', 'c0b'),
    exact: true
  },
  {
    path: '/finder/',
    component: ComponentCreator('/finder/', 'f1b'),
    routes: [
      {
        path: '/finder/',
        component: ComponentCreator('/finder/', 'afc'),
        routes: [
          {
            path: '/finder/',
            component: ComponentCreator('/finder/', 'd1d'),
            routes: [
              {
                path: '/finder/api/',
                component: ComponentCreator('/finder/api/', '2a4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/api/events-api',
                component: ComponentCreator('/finder/api/events-api', '451'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/api/filters-api',
                component: ComponentCreator('/finder/api/filters-api', '136'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/api/group-by-api',
                component: ComponentCreator('/finder/api/group-by-api', '58c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/api/matches-api',
                component: ComponentCreator('/finder/api/matches-api', '16c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/api/pagination-api',
                component: ComponentCreator('/finder/api/pagination-api', '621'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/api/search-api',
                component: ComponentCreator('/finder/api/search-api', '1f2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/api/sort-by-api',
                component: ComponentCreator('/finder/api/sort-by-api', 'f2a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/api/test-api',
                component: ComponentCreator('/finder/api/test-api', 'f6c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/components/',
                component: ComponentCreator('/finder/components/', '6ae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/components/finder',
                component: ComponentCreator('/finder/components/finder', '4bb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/components/finder-content',
                component: ComponentCreator('/finder/components/finder-content', 'f7d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/components/finder-search-term-haystack',
                component: ComponentCreator('/finder/components/finder-search-term-haystack', '268'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/components/string-match',
                component: ComponentCreator('/finder/components/string-match', 'd40'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/components/use-finder',
                component: ComponentCreator('/finder/components/use-finder', 'ad4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/examples/',
                component: ComponentCreator('/finder/examples/', '201'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/',
                component: ComponentCreator('/finder/rules/', '280'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/effects/',
                component: ComponentCreator('/finder/rules/effects/', '4d6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/effects/rule-effects',
                component: ComponentCreator('/finder/rules/effects/rule-effects', 'b46'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/effects/search-effects',
                component: ComponentCreator('/finder/rules/effects/search-effects', '133'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/filter-rule',
                component: ComponentCreator('/finder/rules/filter-rule', '171'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/group-by-rule',
                component: ComponentCreator('/finder/rules/group-by-rule', 'ac9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/ruleset',
                component: ComponentCreator('/finder/rules/ruleset', '89a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/search-rule',
                component: ComponentCreator('/finder/rules/search-rule', 'ef7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/sort-by-rule',
                component: ComponentCreator('/finder/rules/sort-by-rule', '614'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/',
                component: ComponentCreator('/finder/tutorial/', '02c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/basic-usage/',
                component: ComponentCreator('/finder/tutorial/basic-usage/', '1ab'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/basic-usage/component',
                component: ComponentCreator('/finder/tutorial/basic-usage/component', 'd93'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/basic-usage/controls',
                component: ComponentCreator('/finder/tutorial/basic-usage/controls', 'c2a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/basic-usage/filters',
                component: ComponentCreator('/finder/tutorial/basic-usage/filters', 'f95'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/basic-usage/result',
                component: ComponentCreator('/finder/tutorial/basic-usage/result', 'a60'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/basic-usage/search',
                component: ComponentCreator('/finder/tutorial/basic-usage/search', 'd74'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/basic-usage/sort-by',
                component: ComponentCreator('/finder/tutorial/basic-usage/sort-by', '1e8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/context',
                component: ComponentCreator('/finder/tutorial/context', 'e86'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/effects',
                component: ComponentCreator('/finder/tutorial/effects', '127'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/pagination',
                component: ComponentCreator('/finder/tutorial/pagination', 'ac4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/testing',
                component: ComponentCreator('/finder/tutorial/testing', '658'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/',
                component: ComponentCreator('/finder/', '8bd'),
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
    path: '*',
    component: ComponentCreator('*'),
  },
];
