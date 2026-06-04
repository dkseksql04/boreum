# 보름 (Boreum)

YoungCoreCrew 독서 모임 플랫폼

## 구조

```
boreum/
├── frontend/   # Next.js + Supabase + Gemini AI
└── backend/    # FastAPI + SQLAlchemy + Supabase
```

## 프론트엔드

```bash
cd frontend
npm install
npm run dev
```

## 백엔드

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
