"""
Review 모델 — reviews 테이블

멤버가 책을 읽고 남기는 독서 감상.
참조 레포의 Post와 구조가 같고, book_id + rating이 추가됐다.
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, SmallInteger, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)

    # 어떤 멤버(user_id)가 어떤 책(book_id)에 대한 감상인지
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)

    title = Column(String(200), nullable=False)        # 감상 제목
    content = Column(Text, nullable=False)             # 감상 본문

    # 별점: 1~5점, SmallInteger로 충분
    rating = Column(SmallInteger, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
