## Build a Quiz Management Platform:
### Admin Panel (CMS)
- Ability to create a quiz with:
    Quiz title
    A few questions of various types (MCQ, True/False, text, etc.)

### Public Page (LMS)
- A page where a quiz can be taken by anyone
- Display results after completion (e.g., score or correct answers)

### Deliverables
- [Quiz Management](https://quiz-management-te23.onrender.com)
- Final demo
- A short reflection (~5 min) at the end on what you would do next if you had more time


### Approach
- Assumptions
- Scope
- High-level architecture, 
- Schema

### Scope:
#### CMS
- admin should be able to create quiz
- admin should be able to create various types of questions

#### LMS
- user can see list of quizes
- user can attemp any quiz
- user should be able to see the quiz score on submission


### Assumptions:

#### CMS
- question types will be MCQ and radio type
- scoring of each of the question types will be positive (+1mark only)
- add question to multiple quiz

#### LMS
- we will not have user authentication & authorization
- user can attemp test multiple times
- quiz will not have a timer

Higher level architecture
- ReactJS, Django

Schema