"""
Meeting Repository — 모임 일정 DB 조작
"""

from sqlalchemy.orm import Session
from app.models.meeting import Meeting
from app.models.meeting_attendee import MeetingAttendee


def get_all_meetings(db: Session):
    """전체 모임 목록 (날짜 가까운 순)"""
    return db.query(Meeting).order_by(Meeting.meeting_date).all()


def get_meeting_by_id(db: Session, meeting_id: int):
    return db.query(Meeting).filter(Meeting.id == meeting_id).first()


def create_meeting(db: Session, meeting: Meeting):
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    return meeting


def delete_meeting(db: Session, meeting: Meeting):
    db.delete(meeting)
    db.commit()


# ── 참석 신청 ──

def get_attendee(db: Session, user_id: int, meeting_id: int):
    return db.query(MeetingAttendee).filter(
        MeetingAttendee.user_id == user_id,
        MeetingAttendee.meeting_id == meeting_id,
    ).first()


def get_attendee_count(db: Session, meeting_id: int):
    return db.query(MeetingAttendee).filter(MeetingAttendee.meeting_id == meeting_id).count()


def create_attendee(db: Session, attendee: MeetingAttendee):
    db.add(attendee)
    db.commit()
    db.refresh(attendee)
    return attendee


def delete_attendee(db: Session, attendee: MeetingAttendee):
    db.delete(attendee)
    db.commit()
