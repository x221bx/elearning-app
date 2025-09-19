![Edudu – E-Learning for Kids](<img width="1440" height="1130" alt="Cover" src="https://github.com/user-attachments/assets/70dda61a-6e6d-43b1-b85f-fcb89a9e787a" />
 # React E-learning Platform

A modern e-learning platform built with React, Material-UI, and Redux. Features course management, wishlist, shopping cart, and role-based authentication.

## 🚀 Features

- **User Authentication**
  - Role-based access (Admin/Student)
  - Secure login/register system
  - Protected routes

- **Course Management**
  - Browse courses
  - Filter by category
  - Search functionality
  - Course details view

- **Shopping Features**
  - Wishlist management
  - Shopping cart
  - Checkout process
  - Order history

- **Admin Dashboard**
  - Course CRUD operations
  - Teacher management
  - User management
  - Analytics dashboard

## 🛠️ Technologies

- React 18
- Material-UI (MUI)
- Redux Toolkit
- React Router v6
- Context API
- Local Storage for persistence

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/react-elearning.git
```

2. Install dependencies:
```bash
cd react-elearning
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
```

## 📂 Project Structure

```
src/
├── api/          # API service layer
├── components/   # Reusable components
├── contexts/     # React contexts
├── hooks/        # Custom hooks
├── pages/        # Page components
├── redux/        # Redux store and slices
├── routes/       # Route configurations
└── utils/        # Utility functions
```

## 🔐 Authentication

The application uses role-based authentication:
- **Admin**: Full access to dashboard and management features
- **Student**: Access to courses, wishlist, and personal profile

## 💻 Usage

### As a Student
1. Register/Login to your account
2. Browse available courses
3. Add courses to wishlist
4. Add courses to cart
5. Complete checkout process
6. Access enrolled courses

### As an Admin
1. Login with admin credentials
2. Access admin dashboard
3. Manage courses and teachers
4. View analytics and reports

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Authors

 

## 🙏 Acknowledgments

- Material-UI team for the awesome component library
- React team for the amazing framework
- All contributors who helped with the project



makefile
Copy code
::contentReference[oaicite:0]{index=0}
