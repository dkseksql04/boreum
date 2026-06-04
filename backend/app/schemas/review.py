"""
Review 스키마 — 독서 감상 요청·응답 형태
"""

from datetime import datetime
from pydantic import BaseModel


class ReviewCreate(BaseModel):
    book_id: int
    title: str
    content: str
    rating: int          # 1~5


class ReviewUpdate(BaseModel):
    title: str | None = None
    content: str | None = None
    rating: int | None = None


class ReviewResponse(BaseModel):
    id: int
    user_id: int
    book_id: int
    title: str
    content: str
    rating: int
    created_at: datetime
    updated_at: datetime
