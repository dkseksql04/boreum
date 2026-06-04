"""
Review Service — 독서 감상 비즈니스 로직

규칙:
- 별점은 1~5 사이여야 한다
- 수정/삭제는 작성자 본인만 가능
"""

from sqlalchemy.orm import Session

from app.models.review import Review
from app.repositories import review_repo
from app.schemas.review import ReviewCreate, ReviewUpdate


def get_all_reviews(db: Session):
    return review_repo.get_all_reviews(db)


def get_reviews_by_book(db: Session, book_id: int):
    return review_repo.get_reviews_by_book(db, book_id)


def get_review(db: Session, review_id: int):
    review = review_repo.get_review_by_id(db, review_id)
    if not review:
        raise ValueError("감상을 찾을 수 없습니다")
    return review


def create_review(db: Session, user_id: int, request: ReviewCreate):
    if not (1 <= request.rating <= 5):
        raise ValueError("별점은 1~5 사이여야 합니다")

    new_review = Review(
        user_id=user_id,
        book_id=request.book_id,
        title=request.title,
        content=request.content,
        rating=request.rating,
    )
    return review_repo.create_review(db, new_review)


def update_review(db: Session, user_id: int, review_id: int, request: ReviewUpdate):
    review = review_repo.get_review_by_id(db, review_id)
    if not review:
        raise ValueError("감상을 찾을 수 없습니다")
    if review.user_id != user_id:
        raise PermissionError("본인의 감상만 수정할 수 있습니다")
    if request.rating is not None and not (1 <= request.rating <= 5):
        raise ValueError("별점은 1~5 사이여야 합니다")

    if request.title is not None:
        review.title = request.title
    if request.content is not None:
        review.content = request.content
    if request.rating is not None:
        review.rating = request.rating

    return review_repo.update_review(db, review)


def delete_review(db: Session, user_id: int, review_id: int):
    review = review_repo.get_review_by_id(db, review_id)
    if not review:
        raise ValueError("감상을 찾을 수 없습니다")
    if review.user_id != user_id:
        raise PermissionError("본인의 감상만 삭제할 수 있습니다")
    review_repo.delete_review(db, review)
