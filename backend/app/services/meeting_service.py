"""
Meeting Service — 모임 일정 비즈니스 로직

규칙:
- 참석 신청 시 정원 초과면 거부
- 참석 취소는 신청한 본인만 가능
"""

from sqlalchemy.orm import Session

from app.models.meeting import Meeting
from app.models.meeting_attendee import MeetingAttendee
from app.repositories import meeting_repo
from app.schemas.meeting import MeetingCreate


def get_all_meetings(db: Session):
    return meeting_repo.get_all_meetings(db)


def get_meeting(db: Session, meeting_id: int):
    meeting = meeting_repo.get_meeting_by_id(db, meeting_id)
    if not meeting:
        raise ValueError("모임을 찾을 수 없습니다")
    return meeting


def create_meeting(db: Session, request: MeetingCreate):
    new_meeting = Meeting(
        book_id=request.book_id,
        title=request.title,
        description=request.description,
        meeting_date=request.meeting_date,
        end_time=request.end_time,
        location=request.location,
        max_attendees=request.max_attendees,
    )
    return meeting_repo.create_meeting(db, new_meeting)


def delete_meeting(db: Session, meeting_id: int):
    meeting = meeting_repo.get_meeting_by_id(db, meeting_id)
    if not meeting:
        raise ValueError("모임을 찾을 수 없습니다")
    meeting_repo.delete_meeting(db, meeting)


def toggle_attend(db: Session, user_id: int, meeting_id: int):
    """
    참석 신청 토글 (신청 ↔ 취소)

    이미 신청했으면 취소, 아직 안 했으면 신청.
    정원이 꽉 찬 경우 신청 불가.
    """
    meeting = meeting_repo.get_meeting_by_id(db, meeting_id)
    if not meeting:
        raise ValueError("모임을 찾을 수 없습니다")

    existing = meeting_repo.get_attendee(db, user_id, meeting_id)

    if existing:
        meeting_repo.delete_attendee(db, existing)
        count = meeting_repo.get_attendee_count(db, meeting_id)
        return {"message": "참석 신청을 취소했습니다", "attendee_count": count}

    count = meeting_repo.get_attendee_count(db, meeting_id)
    if count >= meeting.max_attendees:
        raise ValueError("정원이 꽉 찼습니다")

    new_attendee = MeetingAttendee(user_id=user_id, meeting_id=meeting_id)
    meeting_repo.create_attendee(db, new_attendee)
    return {"message": "참석 신청이 완료됐습니다", "attendee_count": count + 1}
