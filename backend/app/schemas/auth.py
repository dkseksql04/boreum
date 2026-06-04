"""
Auth 스키마 — 회원가입/로그인 요청·응답 형태
"""

from pydantic import BaseModel


class SignupRequest(BaseModel):
    email: str
    username: str
    password: str
    nickname: str


class SignupResponse(BaseModel):
    id: int
    email: str
    username: str
    nickname: str


class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    user_id: int
