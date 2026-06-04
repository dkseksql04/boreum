"""
database.py — Supabase(PostgreSQL) 연결 설정

이 파일이 하는 일:
1. .env 파일에서 DB 주소(DATABASE_URL)를 읽어온다
2. SQLAlchemy가 DB에 연결할 수 있도록 설정한다
3. API 요청마다 DB 세션을 열고 닫는 함수를 제공한다
"""

import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

_backend_dir = Path(__file__).resolve().parent.parent
load_dotenv(_backend_dir / ".env", override=True)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./boreum.db")  # 기본 SQLite 사용

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """
    API 요청마다 DB 세션을 열고, 끝나면 자동으로 닫는다.
    Router에서 Depends(get_db)로 사용한다.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
