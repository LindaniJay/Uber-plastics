#!/bin/bash

echo "🚀 Starting Uber Plastic Python Backend..."
echo ""
echo "📍 This will start the Python API server for real bottle detection"
echo "📚 API Documentation will be available at: http://localhost:8000/docs"
echo "🔍 Health Check: http://localhost:8000/health"
echo ""
echo "⚠️  Make sure you have Python installed and dependencies installed:"
echo "   pip install -r python-backend/requirements.txt"
echo ""

cd python-backend
python start_server.py


