"""
Meeting 모델 — meetings 테이블

보름 모임 일정.
어떤 책(book_id)을 읽는 모임인지, 언제 어디서 열리는지를 저장한다.
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, SmallInteger, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True)

    # 이 모임에서 다루는 책
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)

    title = Column(String(200), nullable=False)        # 모임 이름 (예: "5월 정기 모임")
    description = Column(Text, nullable=True)          # 모임 소개

    meeting_date = Column(DateTime(timezone=True), nullable=False)   # 모임 날짜·시작 시각
    end_time = Column(DateTime(timezone=True), nullable=True)        # 종료 시각

    location = Column(String(200), nullable=False)     # 장소 (예: "연남동 카페 달빛")
    max_attendees = Column(SmallInteger, nullable=False)  # 최대 참석 인원

    created_at = Column(DateTime(timezone=True), server_default=func.now())
