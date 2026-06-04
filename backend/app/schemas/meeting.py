"""
Meeting 스키마 — 모임 일정 요청·응답 형태
"""

from datetime import datetime
from pydantic import BaseModel


class MeetingCreate(BaseModel):
    book_id: int
    title: str
    description: str | None = None
    meeting_date: datetime
    end_time: datetime | None = None
    location: str
    max_attendees: int


class MeetingResponse(BaseModel):
    id: int
    book_id: int
    title: str
    description: str | None
    meeting_date: datetime
    end_time: datetime | None
    location: str
    max_attendees: int
    created_at: datetime
