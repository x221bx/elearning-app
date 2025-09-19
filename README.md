![Edudu – E-Learning for Kids](<img width="1440" height="1130" alt="Cover" src="https://github.com/user-attachments/assets/70dda61a-6e6d-43b1-b85f-fcb89a9e787a" />
# Edudu — E-Learning Platform

A modern React application for kids’ e-learning that connects students with teachers and courses, with a clean MUI design, robust routing, and reusable components.

## Features
- **Teachers directory** with clickable cards → navigates to **/teachers/:id**.
- **Teacher Detail** page with a two-column layout (sticky profile left; About/Certification/Courses right).
- **Reusable yellow pagination** (2 courses per page on the detail view).
- **Fallback languages** to **Arabic, English** if a teacher has none set.
- **Auth pages**, wishlist/cart stubs, and an admin area for courses.
- **Consistent layout & styling** via MUI theme and shared components.

## Tech Stack
- React 18, Vite
- React Router v6
- MUI (Material UI)
- Redux Toolkit
- Context + custom hooks
- Modular APIs in `src/api/*`

## Project Structure (key)
src
├─ api/ # auth, teachers, courses, cart, wishlist
├─ assets/ # icons, images, placeholders
├─ components/ # admin, auth, common, course, teacher, user
├─ contexts/ # AuthContext, LanguageContext
├─ hooks/ # useAuth, useCourses, useWishlist, ...
├─ pages/ # Home, Teachers, TeacherDetail, Courses, Wishlist, Admin...
├─ redux/ # store + slices (auth, courses, ui, wishlist)
├─ routes/ # AppRoutes, ProtectedRoute, TeacherRoute
├─ styles/ # global.css, theme.js, page/component CSS
└─ utils/ # constants, helpers, permissions, validation, i18n

markdown
Copy code

## Routing
- `/` → Home  
- `/teachers` → Teachers list  
- `/teachers/:id` → Teacher Detail (sticky profile + About/Certification/Courses with yellow pagination)

## Reusable Components
- **CustomPagination**: `src/components/common/customPagination.jsx`  
  ```jsx
  <CustomPagination count={pageCount} page={page} onChange={(_, p) => setPage(p)} />
TeacherCard: keeps original visual style; navigation via transparent full-card link overlay.

Getting Started
bash
Copy code
npm install
npm run dev
# build
npm run build
npm run preview
Notes
Teacher IDs are matched safely as string/number.

Default teacher languages: Arabic, English when missing.

Card background uses a light tone (#fafafa) for hierarchy against white content areas.

License
Add your preferred license (e.g., MIT) if you plan to distribute.

makefile
Copy code
::contentReference[oaicite:0]{index=0}
