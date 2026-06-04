"""
Like Repository — 좋아요 DB 조작
"""

from sqlalchemy.orm import Session
from app.models.like import Like


def get_like(db: Session, user_id: int, review_id: int):
    return db.query(Like).filter(Like.user_id == user_id, Like.review_id == review_id).first()


def get_like_count(db: Session, review_id: int):
    return db.query(Like).filter(Like.review_id == review_id).count()


def create_like(db: Session, like: Like):
    db.add(like)
    db.commit()
    db.refresh(like)
    return like


def delete_like(db: Session, like: Like):
    db.delete(like)
    db.commit()
