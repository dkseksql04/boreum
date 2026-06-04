"""
Comment Repository — 댓글 DB 조작
"""

from sqlalchemy.orm import Session
from app.models.comment import Comment


def get_comments_by_review(db: Session, review_id: int):
    return db.query(Comment).filter(Comment.review_id == review_id).order_by(Comment.created_at).all()


def get_comment_by_id(db: Session, comment_id: int):
    return db.query(Comment).filter(Comment.id == comment_id).first()


def create_comment(db: Session, comment: Comment):
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


def delete_comment(db: Session, comment: Comment):
    db.delete(comment)
    db.commit()
