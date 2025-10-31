## Local storage authorization with redux
- Interviewers will be happy if you can explain tradeoffs of two authorization way:
- 1. LocalStorage = easier, vulnerable to XSS.
- 2. HttpOnly cookies = protected from XSS, need CSRF mitigation.
- Best practice: HttpOnly cookies for refresh tokens + short-lived access tokens in memory.
- For junior/front-end interviews, demonstrating understanding of XSS vs CSRF and recommending HttpOnly cookies + refresh flow is a strong answer.


## Client folder
- npm install @reduxjs/toolkit react-redux
- Created store folder
- Code changed files 
   0. App.jsx
   1. CheckAuth.jsx
   2. Register.jsx
   3. Login.jsx
   4. ChangePassword.jsx