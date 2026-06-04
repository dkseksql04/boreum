"""
Review Repository — 독서 감상 DB 조작
"""

from sqlalchemy.orm import Session
from app.models.review import Review


def get_all_reviews(db: Session):
    """전체 감상 목록 (최신순)"""
    return db.query(Review).order_by(Review.created_at.desc()).all()


def get_reviews_by_book(db: Session, book_id: int):
    """특정 책의 감상 목록"""
    return db.query(Review).filter(Review.book_id == book_id).order_by(Review.created_at.desc()).all()


def get_review_by_id(db: Session, review_id: int):
    return db.query(Review).filter(Review.id == review_id).first()


def create_review(db: Session, review: Review):
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


def update_review(db: Session, review: Review):
    db.commit()
    db.refresh(review)
    return review


def delete_review(db: Session, review: Review):
    db.delete(review)
    db.commit()
