"""
MeetingAttendee 모델 — meeting_attendees 테이블

모임 참석 신청 내역.
UniqueConstraint: 한 사람이 같은 모임에 두 번 신청할 수 없다.
"""

from sqlalchemy import Column, Integer, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
from app.database import Base


class MeetingAttendee(Base):
    __tablename__ = "meeting_attendees"

    __table_args__ = (
        UniqueConstraint("user_id", "meeting_id"),
    )

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    meeting_id = Column(Integer, ForeignKey("meetings.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
