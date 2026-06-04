"""
Comments Router — 댓글 API

GET    /api/v1/reviews/{review_id}/comments          댓글 목록
POST   /api/v1/reviews/{review_id}/comments?user_id  댓글 작성
DELETE /api/v1/comments/{comment_id}?user_id         댓글 삭제
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.comment import CommentCreate, CommentResponse
from app.services import comment_service

router = APIRouter(tags=["Comments"])


@router.get("/reviews/{review_id}/comments", response_model=list[CommentResponse])
def get_comments(review_id: int, db: Session = Depends(get_db)):
    try:
        return comment_service.get_comments(db, review_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/reviews/{review_id}/comments", response_model=CommentResponse)
def create_comment(review_id: int, request: CommentCreate, user_id: int, db: Session = Depends(get_db)):
    try:
        return comment_service.create_comment(db, user_id, review_id, request)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.delete("/comments/{comment_id}")
def delete_comment(comment_id: int, user_id: int, db: Session = Depends(get_db)):
    try:
        comment_service.delete_comment(db, user_id, comment_id)
        return {"message": "댓글이 삭제되었습니다"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except PermissionError as e:
        raise HTTPException(status_code=403, detail=str(e))
