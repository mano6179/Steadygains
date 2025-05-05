from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import date
import random
from app.routers.auth_router import get_current_user, User

router = APIRouter(
    prefix="/api",
    tags=["nav"],
)

# Models
class Investor(BaseModel):
    id: int
    name: str
    initial_capital: float
    current_capital: float
    join_date: date
    profit_share: float
    is_active: bool

class NAVRecord(BaseModel):
    id: int
    investor_id: int
    date: date
    total_value: float
    cash_balance: float
    equity_value: float
    other_assets: float

# Mock data
investors = [
    {
        "id": 1,
        "name": "John Doe",
        "initial_capital": 1000000,
        "current_capital": 1150000,
        "join_date": date(2023, 1, 15),
        "profit_share": 20,
        "is_active": True
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "initial_capital": 500000,
        "current_capital": 575000,
        "join_date": date(2023, 3, 10),
        "profit_share": 15,
        "is_active": True
    }
]

# Generate mock NAV history
def generate_nav_history(investor_id: int):
    start_date = date(2023, 1, 1)
    initial_value = 1000000 if investor_id == 1 else 500000
    
    nav_history = []
    for i in range(365):  # One year of data
        day = start_date.replace(day=1) + date.resolution * i
        if day > date.today():
            break
            
        # Generate a somewhat realistic NAV progression
        growth_factor = 1 + (random.random() * 0.002 - 0.0005)  # Daily fluctuation between -0.05% and +0.15%
        
        if i == 0:
            value = initial_value
        else:
            value = nav_history[-1]["total_value"] * growth_factor
            
        nav_history.append({
            "id": i + 1,
            "investor_id": investor_id,
            "date": day,
            "total_value": round(value, 2),
            "cash_balance": round(value * 0.3, 2),
            "equity_value": round(value * 0.6, 2),
            "other_assets": round(value * 0.1, 2)
        })
        
    return nav_history

# Routes
@router.get("/investors", response_model=List[Investor])
async def get_investors(current_user: User = Depends(get_current_user)):
    # In a real app, you would filter based on user permissions
    if current_user.role != "admin" and not hasattr(current_user, 'investor_id'):
        raise HTTPException(status_code=403, detail="Not authorized to view all investors")
    return investors

@router.get("/investors/{investor_id}", response_model=Investor)
async def get_investor(investor_id: int, current_user: User = Depends(get_current_user)):
    # Check if user has permission to view this investor
    if current_user.role != "admin" and getattr(current_user, 'investor_id', None) != investor_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this investor")
    
    for investor in investors:
        if investor["id"] == investor_id:
            return investor
    
    raise HTTPException(status_code=404, detail="Investor not found")

@router.post("/investors", response_model=Investor)
async def create_investor(investor: Investor, current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can create investors")
    
    # In a real app, you would save to a database
    new_id = max(i["id"] for i in investors) + 1
    new_investor = investor.dict()
    new_investor["id"] = new_id
    investors.append(new_investor)
    return new_investor

@router.get("/nav/{investor_id}", response_model=List[NAVRecord])
async def get_nav_history(investor_id: int, current_user: User = Depends(get_current_user)):
    # Check if user has permission to view this NAV history
    if current_user.role != "admin" and getattr(current_user, 'investor_id', None) != investor_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this NAV history")
    
    # Check if investor exists
    investor_exists = any(i["id"] == investor_id for i in investors)
    if not investor_exists:
        raise HTTPException(status_code=404, detail="Investor not found")
    
    return generate_nav_history(investor_id)
