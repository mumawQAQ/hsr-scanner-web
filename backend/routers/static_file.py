from fastapi import APIRouter

router = APIRouter()

@router.get("/requirement-files")
def get_requirement_files():
    return {"message": "Requirement files"}