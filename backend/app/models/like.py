"""
Like 모델 — likes 테이블

독서 감상(review)에 누르는 좋아요.
참조 레포의 Like와 동일한 구조. post_id → review_id로 변경.
UniqueConstraint: 한 사람이 같은 감상에 좋아요를 두 번 누를 수 없다.
"""

from sqlalchemy import Column, Integer, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
from app.database import Base


class Like(Base):
    __tablename__ = "likes"

    __table_args__ = (
        UniqueConstraint("user_id", "review_id"),
    )

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    review_id = Column(Integer, ForeignKey("reviews.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
