---
title: Teaching CS in the age of AI
author: Haris Skiadas
date: 2026-01-15
description: Presentation to the Hanover College Trustees about the effects of AI in teaching CS
theme: uncover
paginate: true
---

<!-- _class: lead -->

# Teaching CS in the age of AI

Haris Skiadas · 2026-10-23

<!--
Speaker notes live in HTML comments. In the browser press `p` for presenter view.
These notes are not published in the built HTML.
-->

---

# Me

- Programming since 6yo
- Pure math background
- Came to HC to teach Applied Stats
- Started helping out in CS
- Current focus on software development courses
- Started Data Science program
- Write software for college (evals, elections, scheduler)

---

# Overview

- Communicating with computers
- AI writes the code
- Everyone can make simple apps
- Teaching Data Science

---

# Making PB&J

Provide precise instructions for making a PB&J sandwich

![w:600](./assets/PBJ.png)

---

# Key takeaways

- Break problem into smaller pieces
- Provide precise steps
- Computers are very literal
- Natural language is imprecise
- Normal communication assumes common context

---

# My AI summer experiment

How far can I go without writing any code myself?

- LLM model: DeepSeek v4 flash
  - Text in, text out
- Agent: OpenCode
    - Uses an LLM model for the "thinking"
    - Provides general instructions (plan/build mode)
    - Sends user prompt and conversation history
    - Specifies "tool calls" (edit, list, search, run)
    - Loop driven by model responses

---

# Example Agent interaction

- User: I would like more color contrast on this button.
- Agent to Model:
  - Here are rules to follow
  - user wants ....
- Model reply: List files that end in `.css`
- Agent to model: here they are
- Model reply: Read file `buttons.css`
- Agent to model: Here it is
- Model reply: Web search for "color contrast rules"

---

- Agent reply: Here are webpage contents ...
- Model: I have two possible solutions, ask the user
- Agent to user: Here are two possibilities.
- User to agent: Let's go with the first one
- Agent to model: Here is the previous convo. User wants first option.
- Model to agent: Edit `buttons.css` with ...
- Agent: OK, done

---

- Model: Run build process
- Agent: Done, no errors
- Model: Run "playwright" script
- Agent: Here are the results (all pass)
- Model: Run `git commit` and `git push`
- Agent: Done, no errors
- Model to Agent: Report back to user
- Agent to user: Here is what I did. The website is updated

---

# Projects undertaken

- Math placement test
    - Understand the existing solution (WebWork, PG)
    - Research options for PG without WebWork
    - Create new website + database + renderer
    - Plan data migration
- Psych projects site
    - Understand PsychoJS + Pavlovia API
    - Implement Pavlovia equivalent

---

- Octave-in-browser (MatLab alternative)
  - Determine what packages can be ported to WebAssembly
  - Figure out how to make plotting work
  - Deploy suitable interface
- Registrar tools (scheduler, major planner, catalog)
  - Read and process catalog.hanover.edu
  - Identify course entry parts (requirements, prereqs)
  - Resolve inconsistencies
  - Codify trackable major requirements
  - Interface for faculty to visualize schedules

---

![w:900](./assets/schedulerScreenshot.png)

---

| Project | Sessions | Segments | Turns |
| --- | ---: | ---: | ---: |
| Math Placement | 56 | 87 | 755 |
| Psych | 59 | 66 | 750 |
| Scheduler/Planner | 44 | 64 | 746 |
| As Racket tutor | 8 | 11 | 336 |
| Elections | 5 | 17 | 221 |
| R-chat-helper | 5 | 20 | 176 |
| Pretext | 9 | 12 | 138 |
| Runestone | 4 | 7 | 110 |
| octave-server | 3 | 6 | 93 |

---

# Takeaways

- AI can write, test, deploy the code
- AI lacks "common sense" (bloated/inconsistent UI)
- AI needs specific goals
- AI lacks common subtext
- AI conversation size is limiting
- AI forgets anything it wasn't trained on

---

# AI-driven coding enables us

- Everyone can get a basic app going
- Can build simple apps quicker
- Apps that weren't worth building before now are
- Emergence of "micro-apps"
- Opportunities for savings/efficiency for HC

---

# Classifying interactions

- L1 Prompt/operator: goals, preferences, approvals, site testing, bug reports.
- L2 Domain knowledge: exam content, institutional policy.
- L3 Technical: code/architecture, security
- L4 AI orchestration: stop drift, ask explanations, prevent over-engineering.

---

# AI on our interactions

The premise “how far could someone go without technical knowledge?” has a nuanced answer:

1. **Far enough to build a working prototype and most user-facing features.** The AI implemented substantial features from one-sentence prompts and visual feedback. L1 work was 22% of topic segments, and 11 sessions were pure L1.

---

2. **Domain knowledge is the first non-negotiable.** Placement cutoffs, exam content, Barb’s feedback, institutional SSO, registrar workflow, and security policy cannot be invented by the AI. L2 was 31% of segments and dominant in 12 sessions.

---

3. **Technical knowledge becomes the bottleneck at integration.** The AI can write the code, but it cannot reliably diagnose why the code fails inside the renderer, the browser, the database, the mail system, or the production server. L3 was 44% of segments, 60% of turns, and appeared in 61% of sessions.

---

4. **AI orchestration is the other hidden expertise.** L4 was a significant theme in about 28% of segments. Knowing when to stop, simplify, demand evidence, reject band-aids, and prevent over-engineering was as important as domain knowledge.

---

> The AI removed the need to write code, but not the need to understand systems. The technical knowledge was not used to generate code; it was used to verify, diagnose, and decide when the AI was wrong.

---

# Teaching Data Science

- Brings together Math/Stats and CS
- Students typically not strong in math or CS
- Students have to code (Python, R)
- MAT337: Statistical modeling
  - Basic stats knowledge
  - Programming with R
  - Challenge for the students
  - Learning programming distracts from the stats content

---

# R is fiddly

- Programming language, ugly UI
- weird errors, multiple ways of doing things
- a lot of inappropriate documentation out there
- help usually targets programmers
- goal: reduce the "accidental complexities"

---

# R-chat-helper

- A custom AI chatbot
- Instructed to provide "reasonable" feedback
- Knows what libraries we use in the course
- Keeps answers short and focused
- Answers the specific question asked
- Provides minimal code example
- Focuses on help with the programming part

---

# Learning Assistant

- work in progress, a "practice companion"
- Curriculum organized by topics
- AI generates practice problems on demand
- student can try to solve them (code). AI can run the code and provides feedback
- A tutoring loop that gives helpful, level-aware feedback without spoiling the answer.
- Persistent progress tracking, adaptive next-topic suggestions.
- Could in theory apply to other disciplines

---

- A number of custom LLM roles:
  - Topic designer (creates full "topic" from one-line input)
  - Calibration critic (helps revise the topic)
  - Exercise author (generates problem + tests)
  - Tutor (feedback on student code)
  - Eval judge (evaluates tutor feedback)
  - Tag curator (organizes the topics)
