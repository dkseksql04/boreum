"""
Comment Service — 댓글 비즈니스 로직
"""

from sqlalchemy.orm import Session

from app.models.comment import Comment
from app.repositories import comment_repo, review_repo
from app.schemas.comment import CommentCreate


def get_comments(db: Session, review_id: int):
    review = review_repo.get_review_by_id(db, review_id)
    if not review:
        raise ValueError("감상을 찾을 수 없습니다")
    return comment_repo.get_comments_by_review(db, review_id)


def create_comment(db: Session, user_id: int, review_id: int, request: CommentCreate):
    review = review_repo.get_review_by_id(db, review_id)
    if not review:
        raise ValueError("감상을 찾을 수 없습니다")

    new_comment = Comment(
        user_id=user_id,
        review_id=review_id,
        content=request.content,
    )
    return comment_repo.create_comment(db, new_comment)


def delete_comment(db: Session, user_id: int, comment_id: int):
    comment = comment_repo.get_comment_by_id(db, comment_id)
    if not comment:
        raise ValueError("댓글을 찾을 수 없습니다")
    if comment.user_id != user_id:
        raise PermissionError("본인의 댓글만 삭제할 수 있습니다")
    comment_repo.delete_comment(db, comment)
