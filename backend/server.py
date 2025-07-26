"""
NetworkSync Backend - Professional Relationship Intelligence Platform
FastAPI server with Supabase integration
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional, List
import os
from dotenv import load_dotenv
import httpx
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="NetworkSync API",
    description="Professional Relationship Intelligence Platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure based on environment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_ANON_KEY:
    print("⚠️  Warning: Supabase credentials not found in environment variables")

# Pydantic models
class HealthResponse(BaseModel):
    status: str
    message: str
    timestamp: datetime
    version: str

class UserCreate(BaseModel):
    email: str
    password: str
    name: str

class ContactBase(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    title: Optional[str] = None
    notes: Optional[str] = None

class ContactCreate(ContactBase):
    pass

class ContactResponse(ContactBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime

# Dependency to verify JWT token (placeholder for now)
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verify JWT token and return current user
    This is a placeholder - will be implemented with Supabase auth
    """
    # For now, return a mock user for development
    return {"id": "mock-user-id", "email": "test@example.com"}

# Health check endpoint
@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint to verify API is running"""
    return HealthResponse(
        status="healthy",
        message="NetworkSync API is running successfully",
        timestamp=datetime.now(),
        version="1.0.0"
    )

# Database connection test
@app.get("/api/health/database")
async def database_health():
    """Test database connection"""
    if not SUPABASE_URL or not SUPABASE_ANON_KEY:
        raise HTTPException(
            status_code=503, 
            detail="Database configuration missing"
        )
    
    try:
        # Test Supabase connection
        async with httpx.AsyncClient() as client:
            headers = {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": f"Bearer {SUPABASE_ANON_KEY}"
            }
            response = await client.get(
                f"{SUPABASE_URL}/rest/v1/",
                headers=headers
            )
            
            if response.status_code == 200:
                return {
                    "status": "healthy",
                    "message": "Database connection successful",
                    "timestamp": datetime.now()
                }
            else:
                raise HTTPException(
                    status_code=503,
                    detail=f"Database connection failed: {response.status_code}"
                )
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Database connection error: {str(e)}"
        )

# Authentication endpoints (placeholders)
@app.post("/api/auth/register")
async def register(user: UserCreate):
    """Register new user"""
    return {
        "message": "Registration endpoint - to be implemented with Supabase Auth",
        "user": user.dict(exclude={"password"})
    }

@app.post("/api/auth/login")
async def login():
    """User login"""
    return {"message": "Login endpoint - to be implemented with Supabase Auth"}

# Contact management endpoints (placeholders)
@app.get("/api/contacts")
async def get_contacts(current_user: dict = Depends(get_current_user)):
    """Get user's contacts"""
    return {
        "message": "Contacts list - to be implemented",
        "user_id": current_user["id"],
        "contacts": []
    }

@app.post("/api/contacts")
async def create_contact(
    contact: ContactCreate, 
    current_user: dict = Depends(get_current_user)
):
    """Create new contact"""
    return {
        "message": "Contact created - to be implemented",
        "contact": contact.dict(),
        "user_id": current_user["id"]
    }

# Network analysis endpoints (placeholders)
@app.get("/api/network/graph")
async def get_network_graph(current_user: dict = Depends(get_current_user)):
    """Get network graph data"""
    return {
        "message": "Network graph - to be implemented",
        "user_id": current_user["id"],
        "nodes": [],
        "edges": []
    }

@app.post("/api/network/path")
async def find_shortest_path(current_user: dict = Depends(get_current_user)):
    """Find shortest path between contacts"""
    return {
        "message": "Path finding - to be implemented",
        "user_id": current_user["id"],
        "path": []
    }

# Root endpoint redirect
@app.get("/")
async def root():
    """Root endpoint - redirect to docs"""
    return {
        "message": "NetworkSync API",
        "version": "1.0.0",
        "docs": "/api/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="info"
    )