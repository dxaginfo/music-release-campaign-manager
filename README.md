# Music Release Campaign Manager

A comprehensive web application designed to help artists, managers, and labels streamline the process of launching and promoting new music releases. This platform coordinates marketing activities, tracks campaign performance, manages assets, and automates workflow processes to maximize the impact of music releases.

## Features

- **Campaign Dashboard**: Visualize active and upcoming release campaigns in an intuitive timeline
- **Release Planning**: Create comprehensive release timelines with milestones and automated reminders
- **Team Collaboration**: Assign tasks, share materials, and track progress in real-time
- **Asset Management**: Upload, organize, and tag promotional assets for easy retrieval
- **Marketing Coordination**: Schedule and monitor social media posts and advertising campaigns
- **Fan Engagement**: Create pre-save campaigns and deploy landing pages for contests
- **Analytics**: Access real-time performance metrics and generate comprehensive reports
- **Contact Management**: Maintain industry contact databases and segment fan data
- **Integration Capabilities**: Connect with streaming platforms and social media for seamless data flow

## Technology Stack

### Frontend
- React.js with Redux for state management
- Material-UI for consistent design components
- Chart.js for analytics dashboards
- Formik with Yup validation
- React-Big-Calendar for campaign planning

### Backend
- Node.js with Express
- JWT with OAuth2 for authentication
- MongoDB for database
- AWS S3 for media asset storage
- Elasticsearch for search functionality

### DevOps & Infrastructure
- AWS Elastic Beanstalk for hosting
- GitHub Actions for CI/CD
- Sentry for error tracking
- CloudFront CDN for global asset delivery

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- MongoDB (v4.4 or later)
- AWS Account (for S3 storage)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/music-release-campaign-manager.git
cd music-release-campaign-manager
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In the server directory, create a .env file with the following variables
cp .env.example .env
# Edit the .env file with your specific configuration
```

4. Start the development servers
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend development server (from client directory)
npm start
```

5. Access the application
```
Backend API: http://localhost:5000
Frontend: http://localhost:3000
```

## Project Structure

```
music-release-campaign-manager/
├── client/                   # Frontend React application
│   ├── public/               # Static files
│   └── src/                  # Source files
│       ├── components/       # Reusable UI components
│       ├── pages/            # Page components
│       ├── redux/            # Redux state management
│       ├── services/         # API service integrations
│       └── utils/            # Utility functions
├── server/                   # Backend Node.js/Express application
│   ├── config/               # Configuration files
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Express middleware
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   └── services/             # Business logic
├── database/                 # Database migration scripts
└── deployment/               # Deployment configuration files
```

## API Documentation

API documentation is available at `/api/docs` when running the development server.

## Deployment

### Production Setup

1. Build the frontend
```bash
cd client
npm run build
```

2. Configure AWS Elastic Beanstalk
```bash
# Install EB CLI
pip install awsebcli

# Initialize EB project
eb init

# Deploy to AWS
eb deploy
```

### Docker Deployment

```bash
# Build Docker image
docker build -t music-release-campaign-manager .

# Run Docker container
docker run -p 3000:3000 music-release-campaign-manager
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Spotify API](https://developer.spotify.com/documentation/web-api/)
- [Facebook Marketing API](https://developers.facebook.com/docs/marketing-apis/)
- [YouTube API](https://developers.google.com/youtube/v3)
- [AWS SDK](https://aws.amazon.com/sdk-for-javascript/)
- [Material-UI](https://mui.com/)