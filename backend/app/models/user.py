"""
User 모델 — users 테이블

보름 멤버 정보를 저장한다.
bio(한 줄 소개), interests(관심 분야)가 참조 레포의 User에 추가됐다.
"""

from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    password = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    nickname = Column(String(50), nullable=False)

    # 멤버 프로필 추가 정보
    bio = Column(Text, nullable=True)                  # 한 줄 소개 (선택)
    interests = Column(String(255), nullable=True)     # 관심 분야 (쉼표 구분, 선택)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
