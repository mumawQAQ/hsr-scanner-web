from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers import static_file

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(static_file.router)


@app.get("/health")
def health():
    return {'status': 'ok'}