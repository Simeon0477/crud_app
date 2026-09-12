from fastapi import FastAPI

from database import Base, engine
from routes.etudiants import router as etudiants_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="API Gestion des étudiants",
    description="API REST pour gérer les étudiants",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(etudiants_router)


@app.get("/")
def root():
    return {
        "message": "API de gestion des étudiants"
    }