from sqlalchemy import Column, Integer, String

from database import Base


class Etudiant(Base):
    __tablename__ = "etudiants"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nom = Column(String, nullable=False)
    prenom = Column(String, nullable=False)
    classe = Column(String, nullable=False)
    age = Column(Integer, nullable=False)