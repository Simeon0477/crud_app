from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Etudiant
from schemas import EtudiantCreate, EtudiantResponse


router = APIRouter(
    prefix="/etudiants",
    tags=["Étudiants"]
)


# GET /etudiants
@router.get("/", response_model=list[EtudiantResponse])
def get_etudiants(db: Session = Depends(get_db)):
    etudiants = db.query(Etudiant).all()

    return etudiants


# GET /etudiants/{id}
@router.get("/{id}", response_model=EtudiantResponse)
def get_etudiant(id: int, db: Session = Depends(get_db)):
    etudiant = db.query(Etudiant).filter(Etudiant.id == id).first()

    if etudiant is None:
        raise HTTPException(
            status_code=404,
            detail="Étudiant introuvable"
        )

    return etudiant


# POST /etudiants
@router.post("/", response_model=EtudiantResponse, status_code=201)
def create_etudiant(
    etudiant: EtudiantCreate,
    db: Session = Depends(get_db)
):
    nouvel_etudiant = Etudiant(
        nom=etudiant.nom,
        prenom=etudiant.prenom,
        classe=etudiant.classe,
        age=etudiant.age
    )

    db.add(nouvel_etudiant)
    db.commit()
    db.refresh(nouvel_etudiant)

    return nouvel_etudiant


# PUT /etudiants/{id}
@router.put("/{id}", response_model=EtudiantResponse)
def update_etudiant(
    id: int,
    etudiant: EtudiantCreate,
    db: Session = Depends(get_db)
):
    etudiant_existant = (
        db.query(Etudiant)
        .filter(Etudiant.id == id)
        .first()
    )

    if etudiant_existant is None:
        raise HTTPException(
            status_code=404,
            detail="Étudiant introuvable"
        )

    etudiant_existant.nom = etudiant.nom
    etudiant_existant.prenom = etudiant.prenom
    etudiant_existant.classe = etudiant.classe
    etudiant_existant.age = etudiant.age

    db.commit()
    db.refresh(etudiant_existant)

    return etudiant_existant


# DELETE /etudiants/{id}
@router.delete("/{id}")
def delete_etudiant(
    id: int,
    db: Session = Depends(get_db)
):
    etudiant = (
        db.query(Etudiant)
        .filter(Etudiant.id == id)
        .first()
    )

    if etudiant is None:
        raise HTTPException(
            status_code=404,
            detail="Étudiant introuvable"
        )

    db.delete(etudiant)
    db.commit()

    return {
        "message": "Étudiant supprimé avec succès"
    }