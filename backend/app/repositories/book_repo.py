"""
Book Repository — 책 DB 조작
"""

from sqlalchemy.orm import Session
from app.models.book import Book


def get_all_books(db: Session):
    """전체 책 목록 (최신 모임 순)"""
    return db.query(Book).order_by(Book.meeting_year.desc(), Book.meeting_month.desc()).all()


def get_book_by_id(db: Session, book_id: int):
    return db.query(Book).filter(Book.id == book_id).first()


def get_current_book(db: Session, year: int, month: int):
    """특정 연월의 책 조회"""
    return db.query(Book).filter(
        Book.meeting_year == year,
        Book.meeting_month == month,
    ).first()


def create_book(db: Session, book: Book):
    db.add(book)
    db.commit()
    db.refresh(book)
    return book


def delete_book(db: Session, book: Book):
    db.delete(book)
    db.commit()
