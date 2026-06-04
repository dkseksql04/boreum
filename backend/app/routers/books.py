"""
Books Router — 책 등록/조회 API

GET  /api/v1/books              전체 책 목록
GET  /api/v1/books/current      이번 달 책 (year, month 쿼리 파라미터)
GET  /api/v1/books/{book_id}    책 상세
POST /api/v1/books              책 등록
DELETE /api/v1/books/{book_id}  책 삭제
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.book import BookCreate, BookResponse
from app.services import book_service

router = APIRouter(prefix="/books", tags=["Books"])


@router.get("/", response_model=list[BookResponse])
def get_books(db: Session = Depends(get_db)):
    return book_service.get_all_books(db)


@router.get("/current", response_model=BookResponse)
def get_current_book(year: int, month: int, db: Session = Depends(get_db)):
    """
    GET /api/v1/books/current?year=2026&month=5
    해당 연월의 이번 달 책을 반환한다.
    """
    try:
        return book_service.get_current_book(db, year, month)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/{book_id}", response_model=BookResponse)
def get_book(book_id: int, db: Session = Depends(get_db)):
    try:
        return book_service.get_book(db, book_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/", response_model=BookResponse)
def create_book(request: BookCreate, db: Session = Depends(get_db)):
    try:
        return book_service.create_book(db, request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    try:
        book_service.delete_book(db, book_id)
        return {"message": "책이 삭제되었습니다"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
