"""
Book 스키마 — 책 등록·응답 형태
"""

from datetime import datetime
from pydantic import BaseModel


class BookCreate(BaseModel):
    title: str
    author: str
    publisher: str | None = None
    description: str | None = None
    meeting_year: int
    meeting_month: int


class BookResponse(BaseModel):
    id: int
    title: str
    author: str
    publisher: str | None
    description: str | None
    meeting_year: int
    meeting_month: int
    created_at: datetime
