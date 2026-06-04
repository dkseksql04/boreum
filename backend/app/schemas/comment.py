"""
Comment 스키마 — 댓글 요청·응답 형태
"""

from datetime import datetime
from pydantic import BaseModel


class CommentCreate(BaseModel):
    content: str


class CommentResponse(BaseModel):
    id: int
    review_id: int
    user_id: int
    content: str
    created_at: datetime
