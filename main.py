from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import nav_router, auth_router

app = FastAPI(
    title="Steady Gains 2025 - Trading Dashboard",
    description="A comprehensive web-based dashboard for managing a personal trading fund"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(nav_router.router)
app.include_router(auth_router.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Steady Gains API"}
