"""
Book 모델 — books 테이블

보름이 읽은/읽을 책 목록.
meeting_year + meeting_month 로 "몇 년 몇 월의 책인지"를 표시한다.
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, SmallInteger
from sqlalchemy.sql import func
from app.database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True)

    title = Column(String(200), nullable=False)         # 제목
    author = Column(String(100), nullable=False)        # 저자
    publisher = Column(String(100), nullable=True)      # 출판사
    description = Column(Text, nullable=True)           # 책 소개

    # 몇 년 몇 월의 책인지 (예: 2026년 5월 → meeting_year=2026, meeting_month=5)
    # SmallInteger: -32768 ~ 32767 범위. 연도·월에 충분하고 용량이 작다.
    meeting_year = Column(SmallInteger, nullable=False)
    meeting_month = Column(SmallInteger, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
