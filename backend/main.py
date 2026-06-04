import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

from app.routers import auth, books, reviews, comments, meetings

app = FastAPI(title="보름 API")

_frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[_frontend_url, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(books.router, prefix="/api/v1")
app.include_router(reviews.router, prefix="/api/v1")
app.include_router(comments.router, prefix="/api/v1")
app.include_router(meetings.router, prefix="/api/v1")


@app.get("/", response_class=HTMLResponse)
def root():
    return """
    <html>
      <head><title>보름 API</title></head>
      <body style="font-family: -apple-system, sans-serif; padding: 40px; color: #1A2E2B;">
        <h1 style="color: #2DD4BF;">🌕 보름 API</h1>
        <p>YoungCoreCrew 독서 모임 플랫폼 백엔드</p>
        <p>Swagger 문서: <a href="/docs" style="color: #2DD4BF;">/docs</a></p>
      </body>
    </html>
    """
