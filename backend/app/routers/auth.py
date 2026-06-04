"""
Auth Router — 회원가입/로그인 API
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.auth import LoginRequest, LoginResponse, SignupRequest, SignupResponse
from app.services import auth_service

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup", response_model=SignupResponse)
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    """POST /api/v1/auth/signup"""
    try:
        return auth_service.signup(db, request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """POST /api/v1/auth/login"""
    try:
        return auth_service.login(db, request)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))
