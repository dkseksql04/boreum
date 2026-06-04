"""
Meetings Router — 모임 일정 API

GET    /api/v1/meetings                       전체 모임 목록
GET    /api/v1/meetings/{meeting_id}          모임 상세
POST   /api/v1/meetings                       모임 등록
DELETE /api/v1/meetings/{meeting_id}          모임 삭제
POST   /api/v1/meetings/{meeting_id}/attend?user_id  참석 신청/취소 토글
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.meeting import MeetingCreate, MeetingResponse
from app.services import meeting_service

router = APIRouter(prefix="/meetings", tags=["Meetings"])


@router.get("/", response_model=list[MeetingResponse])
def get_meetings(db: Session = Depends(get_db)):
    return meeting_service.get_all_meetings(db)


@router.get("/{meeting_id}", response_model=MeetingResponse)
def get_meeting(meeting_id: int, db: Session = Depends(get_db)):
    try:
        return meeting_service.get_meeting(db, meeting_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/", response_model=MeetingResponse)
def create_meeting(request: MeetingCreate, db: Session = Depends(get_db)):
    return meeting_service.create_meeting(db, request)


@router.delete("/{meeting_id}")
def delete_meeting(meeting_id: int, db: Session = Depends(get_db)):
    try:
        meeting_service.delete_meeting(db, meeting_id)
        return {"message": "모임이 삭제되었습니다"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/{meeting_id}/attend")
def toggle_attend(meeting_id: int, user_id: int, db: Session = Depends(get_db)):
    """참석 신청/취소 토글 — POST /api/v1/meetings/3/attend?user_id=1"""
    try:
        return meeting_service.toggle_attend(db, user_id, meeting_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
