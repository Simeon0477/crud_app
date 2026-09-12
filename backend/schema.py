from pydantic import BaseModel


class EtudiantBase(BaseModel):
    nom: str
    prenom: str
    classe: str
    age: int


class EtudiantCreate(EtudiantBase):
    pass


class EtudiantResponse(EtudiantBase):
    id: int

    class Config:
        from_attributes = True