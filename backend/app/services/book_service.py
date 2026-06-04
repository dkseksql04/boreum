"""
Book Service — 책 등록/조회 비즈니스 로직
"""

from sqlalchemy.orm import Session

from app.models.book import Book
from app.repositories import book_repo
from app.schemas.book import BookCreate


def get_all_books(db: Session):
    return book_repo.get_all_books(db)


def get_book(db: Session, book_id: int):
    book = book_repo.get_book_by_id(db, book_id)
    if not book:
        raise ValueError("책을 찾을 수 없습니다")
    return book


def get_current_book(db: Session, year: int, month: int):
    """특정 연월의 이번 달 책 조회"""
    book = book_repo.get_current_book(db, year, month)
    if not book:
        raise ValueError("해당 월의 책이 등록되어 있지 않습니다")
    return book


def create_book(db: Session, request: BookCreate):
    # 같은 연월에 책이 이미 있으면 중복 방지
    existing = book_repo.get_current_book(db, request.meeting_year, request.meeting_month)
    if existing:
        raise ValueError(f"{request.meeting_year}년 {request.meeting_month}월 책이 이미 등록되어 있습니다")

    new_book = Book(
        title=request.title,
        author=request.author,
        publisher=request.publisher,
        description=request.description,
        meeting_year=request.meeting_year,
        meeting_month=request.meeting_month,
    )
    return book_repo.create_book(db, new_book)


def delete_book(db: Session, book_id: int):
    book = book_repo.get_book_by_id(db, book_id)
    if not book:
        raise ValueError("책을 찾을 수 없습니다")
    book_repo.delete_book(db, book)
