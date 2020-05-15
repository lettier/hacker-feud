/*
  (C) 2020 David Lettier
  lettier.com
*/

import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    teamNames: ["Dunning–Kruger Effect", "Impostor Syndrome"],
    qas: [
      {
        question: "Which programing language is dead?",
        answers: [
          {
            text: "Perl",
            money: 17
          },
          {
            text: "PHP",
            money: 11
          },
          {
            text: "Haskell",
            money: 6
          },
          {
            text: "Lisp",
            money: 4
          },
          {
            text: "Ruby",
            money: 3
          },
          {
            text: "Elm",
            money: 1
          }
        ]
      },
      {
        question: "What is the most hated thing about programming?",
        answers: [
          {
            text: "Whiteboarding",
            money: 17
          },
          {
            text: "Naming Things",
            money: 11
          },
          {
            text: "Stand-ups",
            money: 6
          },
          {
            text: "OBOE",
            money: 4
          },
          {
            text: "Cache Invalidation",
            money: 3
          },
          {
            text: "Jira",
            money: 1
          }
        ]
      },
      {
        question: "Name a flame war you've been in.",
        answers: [
          {
            text: "Tabs vs Spaces",
            money: 17
          },
          {
            text: "OOP vs Functional",
            money: 11
          },
          {
            text: "GNOME vs KDE",
            money: 6
          },
          {
            text: "Vim vs Emacs",
            money: 4
          },
          {
            text: "Chrome vs Firefox",
            money: 3
          },
          {
            text: "NoSQL vs RDMS",
            money: 1
          }
        ]
      },
      {
        question: "Which language should you rewrite something in?",
        answers: [
          {
            text: "Rust",
            money: 17
          },
          {
            text: "Go",
            money: 11
          },
          {
            text: "JavaScript",
            money: 6
          },
          {
            text: "Elm",
            money: 4
          },
          {
            text: "Kotlin",
            money: 3
          },
          {
            text: "Elixir",
            money: 1
          }
        ]
      }
    ]
  }
});

export default app;
