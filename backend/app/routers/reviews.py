"""
Reviews Router — 독서 감상 CRUD + 좋아요 API

GET    /api/v1/reviews                    전체 감상 목록
GET    /api/v1/reviews?book_id=1          특정 책의 감상 목록
GET    /api/v1/reviews/{review_id}        감상 상세
POST   /api/v1/reviews?user_id=1         감상 작성
PATCH  /api/v1/reviews/{id}?user_id=1    감상 수정
DELETE /api/v1/reviews/{id}?user_id=1    감상 삭제
POST   /api/v1/reviews/{id}/like?user_id=1  좋아요 토글
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.like import Like
from app.repositories import like_repo
from app.schemas.review import ReviewCreate, ReviewResponse, ReviewUpdate
from app.services import review_service

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.get("/", response_model=list[ReviewResponse])
def get_reviews(book_id: int | None = None, db: Session = Depends(get_db)):
    if book_id:
        return review_service.get_reviews_by_book(db, book_id)
    return review_service.get_all_reviews(db)


@router.get("/{review_id}", response_model=ReviewResponse)
def get_review(review_id: int, db: Session = Depends(get_db)):
    try:
        return review_service.get_review(db, review_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/", response_model=ReviewResponse)
def create_review(request: ReviewCreate, user_id: int, db: Session = Depends(get_db)):
    try:
        return review_service.create_review(db, user_id, request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.patch("/{review_id}", response_model=ReviewResponse)
def update_review(review_id: int, request: ReviewUpdate, user_id: int, db: Session = Depends(get_db)):
    try:
        return review_service.update_review(db, user_id, review_id, request)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except PermissionError as e:
        raise HTTPException(status_code=403, detail=str(e))


@router.delete("/{review_id}")
def delete_review(review_id: int, user_id: int, db: Session = Depends(get_db)):
    try:
        review_service.delete_review(db, user_id, review_id)
        return {"message": "감상이 삭제되었습니다"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except PermissionError as e:
        raise HTTPException(status_code=403, detail=str(e))


@router.post("/{review_id}/like")
def toggle_like(review_id: int, user_id: int, db: Session = Depends(get_db)):
    """좋아요 토글 — 이미 눌렀으면 취소, 안 눌렀으면 좋아요"""
    existing = like_repo.get_like(db, user_id, review_id)
    if existing:
        like_repo.delete_like(db, existing)
        message = "좋아요를 취소했습니다"
    else:
        like_repo.create_like(db, Like(user_id=user_id, review_id=review_id))
        message = "좋아요를 눌렀습니다"
    count = like_repo.get_like_count(db, review_id)
    return {"message": message, "like_count": count}
