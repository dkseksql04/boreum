"""
Auth Service — 회원가입/로그인 비즈니스 로직
"""

from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories import user_repo
from app.schemas.auth import LoginRequest, SignupRequest


def signup(db: Session, request: SignupRequest):
    existing = user_repo.get_user_by_email(db, request.email)
    if existing:
        raise ValueError("이미 존재하는 이메일입니다")

    new_user = User(
        email=request.email,
        username=request.username,
        password=request.password,
        nickname=request.nickname,
    )
    return user_repo.create_user(db, new_user)


def login(db: Session, request: LoginRequest):
    user = user_repo.get_user_by_email(db, request.email)
    if not user or user.password != request.password:
        raise ValueError("이메일 또는 비밀번호가 올바르지 않습니다")
    return {"user_id": user.id}
