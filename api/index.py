"""
Vercel serverless function entry point for FastAPI
"""
from webapp.app.main import app

# Vercel expects the handler to be named 'app' or 'handler'
# FastAPI app is already named 'app', so we export it directly
handler = app

